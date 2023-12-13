from marshmallow import fields, validate
from models.artist import Artist
from app_setup import ma

from schemas.event_schema import EventSchema
from schemas.fan_schema import FanSchema
from schemas.track_schema import TrackSchema

class ArtistSchema(ma.SQLAlchemySchema):
    # TODO schema level validations
    # name = fields.Str(required=True, validate=validate.Length(min=1, max=40))
    tracks = fields.List(fields.Nested(TrackSchema(only=('id', 'name', 'audio'))))
    upcoming_events = fields.List(fields.Nested(EventSchema(only=('id', 'date_time', 'venue'))))
    rand_five_followers = fields.List(fields.Nested(FanSchema(only=('id', 'name', 'location', 'img'))))
    top_five_artists = fields.List(fields.Nested(FanSchema(only=('id', 'name', 'location', 'img'))))
    top_five_tracks = fields.List(fields.Nested(TrackSchema(only=("id", "name", "audio"))))
    events_attending = fields.List(fields.Nested(EventSchema(only=('id', 'date_time', 'venue'))))
    events_attended = fields.List(fields.Nested(EventSchema(only=('id', 'date_time', 'venue'))))

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
                    'upcoming_events',
                    'rand_five_followers',
                    'top_five_artists',
                    'top_five_tracks',
                    'events_attended',
                    'events_attending',
                    'username',
                    'user_id'
                    ]
