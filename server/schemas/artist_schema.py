from marshmallow import fields, validate
from models.artist import Artist
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
                    'location',
                    'following',
                    'artist_followers',
                    'fan_followers'
                    ]
