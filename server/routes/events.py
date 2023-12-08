from flask import request, abort
from flask_restful import Resource
from marshmallow import ValidationError
# from flask_jwt_extended import jwt_required
from app_setup import db
from models.event import Event
from schemas.event_schema import EventSchema

events_schema = EventSchema(many=True, session=db.session)
event_schema = EventSchema(session=db.session)

class Events(Resource):
    def get(self):
        events = events_schema.dump(Event.query)
        return events, 200

    # @jwt_required()
    def post(self):
        try:
            data = request.json
            # * Validate the data, if problems arise you'll see ValidationError
            event_schema.validate(data)
            # * Deserialize the data with load()
            event = event_schema.load(data)
            db.session.add(event)
            db.session.commit()
            # * Serialize the data and package your JSON response
            serialized_crew = event_schema.dump(event)
            return serialized_crew, 201
        except (ValidationError, ValueError) as e:
            db.session.rollback()
            abort(400, str(e))