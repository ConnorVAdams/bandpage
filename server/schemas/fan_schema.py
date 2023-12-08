from marshmallow import fields, validate
from models.fan import Fan
from app_setup import ma

class FanSchema(ma.SQLAlchemySchema):
    class Meta():
        model: Fan
        load_instance = True
        fields = [
                    'id', 
                    'name',
                    'bio',
                    'location',
                    'tracks',
                    'events',
                    'artists'
                    ]
