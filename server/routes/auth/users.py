from flask import request, abort, jsonify
from flask_restful import Resource
from marshmallow import ValidationError
# from flask_jwt_extended import jwt_required
from app_setup import db
from models.user import User
from schemas.user_schema import UserSchema

users_schema = UserSchema(many=True, session=db.session)
user_schema = UserSchema(session=db.session)

class Users(Resource):
    def get(self):
        users = users_schema.dump(User.query)
        return users, 200

    # @jwt_required()
    def post(self):
        try:
            data = request.json
            # * Validate the data, if problems arise you'll see ValidationError
            user_schema.validate(data)
            # * Deserialize the data with load()
            user = user_schema.load(data)
            db.session.add(user)
            db.session.commit()
            # * Serialize the data and package your JSON response
            serialized_crew = user_schema.dump(user)
            return serialized_crew, 201
        except (ValidationError, ValueError) as e:
            db.session.rollback()
            abort(400, str(e))