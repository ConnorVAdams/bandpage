from marshmallow import fields, validate
from models.like import Like
from app_setup import ma

class LikeSchema(ma.SQLAlchemySchema):
    class Meta():
        model: Like
        load_instance = True
        fields = [
                    'id', 
                    'artist_id',
                    'fan_id',
                    
                    ]
