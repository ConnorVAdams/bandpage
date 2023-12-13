from flask import request, make_response
from flask_restful import Resource
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies,
)
from sqlalchemy.exc import IntegrityError
from app_setup import db
from schemas.user_schema import UserSchema

user_schema = UserSchema(session=db.session)

class Signup(Resource):
    def post(self):
        pass