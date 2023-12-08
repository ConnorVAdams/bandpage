from flask import request, abort, jsonify
from flask_restful import Resource
from marshmallow import ValidationError
# from flask_jwt_extended import jwt_required
from app_setup import db
from models.fan import Fan
from schemas.fan_schema import FanSchema

fans_schema = FanSchema(many=True, session=db.session)
fan_schema = FanSchema(session=db.session)

class Fans(Resource):
    def get(self):
        fans = fans_schema.dump(Fan.query)
        return fans, 200

    # @jwt_required()
    def post(self):
        try:
            data = request.json
            # * Validate the data, if problems arise you'll see ValidationError
            fan_schema.validate(data)
            # * Deserialize the data with load()
            fan = fan_schema.load(data)
            db.session.add(fan)
            db.session.commit()
            # * Serialize the data and package your JSON response
            serialized_crew = fan_schema.dump(fan)
            return serialized_crew, 201
        except (ValidationError, ValueError) as e:
            db.session.rollback()
            abort(400, str(e))