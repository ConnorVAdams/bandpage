from flask import request, abort
from flask_restful import Resource
from marshmallow import ValidationError
# from flask_jwt_extended import jwt_required
from app_setup import db
from models.track import Track
from schemas.track_schema import TrackSchema

crew_members_schema = TrackSchema(many=True, session=db.session)
crew_member_schema = TrackSchema(session=db.session)