from marshmallow import fields, validate
from models.artist import Artist
from schemas.fan_schema import FanSchema
from app_setup import ma

class ArtistSchema(ma.SQLAlchemySchema):
    class Meta():
        model: Artist
        load_instance = True
        fields = [
                    'id', 
                    'name',
                    'genres',
                    'bio',
                    'location'
                    ]
        
        # TODO are these circular serializations necessary or beneficial?
        # following = ma.Nested(ArtistSchema, many=True)
        # artist_followers = ma.Nested(ArtistSchema, many=True)
        fan_followers = ma.Nested(FanSchema, many=True)
