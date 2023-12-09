from marshmallow import fields, validate
from models.artist import Artist
from app_setup import ma

from schemas.event_schema import EventSchema
from schemas.fan_schema import FanSchema
from schemas.track_schema import TrackSchema

class ArtistSchema(ma.SQLAlchemySchema):
    tracks = fields.List(fields.Nested(TrackSchema(only=('id', 'name', 'audio'))))
    events = fields.List(fields.Nested(EventSchema(only=('id', 'date_time', 'venue'))))
    fan_followers = fields.List(fields.Nested(FanSchema(only=('id', 'name', 'location'))))
    artist_followers = fields.List(fields.Nested(FanSchema(only=('id', 'name', 'location'))))
    followed_artists = fields.List(fields.Nested(FanSchema(only=('id', 'name', 'location'))))
    favorited_tracks = fields.List(fields.Nested(TrackSchema(only=("id", "name", "audio"))))
    rsvped_events = fields.List(fields.Nested(EventSchema(only=('id', 'date_time', 'venue'))))
    
    class Meta():
        model: Artist
        load_instance = True
        fields = [
                    'id', 
                    'name',
                    'genres',
                    'bio',
                    'location',
                    'img',
                    'tracks',
                    'events',
                    'fan_followers',
                    'artist_followers',
                    'followed_artists',
                    'favorited_tracks',
                    'rsvped_events'
                    ]


