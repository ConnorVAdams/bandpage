from flask import request, abort
from flask_restful import Resource
from marshmallow import ValidationError
# from flask_jwt_extended import jwt_required
from app_setup import db
from models.fan import Fan
from schemas.fan_schema import FanSchema

crew_members_schema = FanSchema(many=True, session=db.session)
crew_member_schema = FanSchema(session=db.session)