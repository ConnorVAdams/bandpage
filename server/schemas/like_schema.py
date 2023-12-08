from marshmallow import fields, validate
from models.like import Like
from app_setup import ma

class LikeSchema(ma.SQLAlchemySchema):
    class Meta():
        model: Like
        load_instance = True
        fields = [
                    'id', 
                    'likeable_id',
                    'likeable_type',
                    'fan_id',
                    'artist_id',
                    'liker_type'
                    ]
