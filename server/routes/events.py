from flask import request, abort
from flask_restful import Resource
from marshmallow import ValidationError
# from flask_jwt_extended import jwt_required
from app_setup import db
from models.event import Event
from schemas.event_schema import EventSchema

crew_members_schema = EventSchema(many=True, session=db.session)
crew_member_schema = EventSchema(session=db.session)