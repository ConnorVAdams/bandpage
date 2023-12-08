from marshmallow import fields, validate
from models.artist import Artist
from schemas.fan_schema import FanSchema
from schemas.track_schema import TrackSchema
from schemas.event_schema import EventSchema
from app_setup import ma

class ArtistSchema(ma.SQLAlchemySchema):
    tracks = fields.List(fields.Nested(TrackSchema(only=("id", "name", "audio"))))
    events = fields.List(fields.Nested(EventSchema(only=('id', 'date_time', 'venue'))))
    
    class Meta():
        model: Artist
        load_instance = True
        fields = [
                    'id', 
                    'name',
                    'genres',
                    'bio',
                    'location',
                    'tracks',
                    'events'
                    # 'fan_followers'
                    ]
        
        # TODO are these circular serializations necessary or beneficial?
        # following = ma.Nested(ArtistSchema, many=True)
        # artist_followers = ma.Nested(ArtistSchema, many=True)
        # fan_followers = ma.Nested(FanSchema, many=True)

        # tracks = fields.List(fields.Nested("TrackSchema", only=("id", "name", "audio")))
        # events = fields.List(fields.Nested(EventSchema))


