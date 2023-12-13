from marshmallow import fields, validate
from models.user import User
from app_setup import ma

class UserSchema(ma.SQLAlchemySchema):
    class Meta():
        model: User
        load_instance = True
        fields = [
            'id',
            'username',
            'password_hash'
        ]