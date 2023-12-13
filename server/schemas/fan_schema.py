from marshmallow import fields, validate
from models.fan import Fan
from models.artist import Artist
from app_setup import ma
from schemas.event_schema import EventSchema
from schemas.track_schema import TrackSchema

class FanSchema(ma.SQLAlchemySchema):
    top_five_artists = fields.List(fields.Nested('FanSchema', only=('id', 'name', 'location')))
    top_five_tracks = fields.List(fields.Nested(TrackSchema(only=("id", "name", "audio"))))
    events_attending = fields.List(fields.Nested(EventSchema(only=('id', 'date_time', 'venue'))))
    events_attended = fields.List(fields.Nested(EventSchema(only=('id', 'date_time', 'venue'))))

    class Meta():
        model: Fan
        load_instance = True
        fields = [
                    'id', 
                    'name',
                    'bio',
                    'location',
                    'img',
                    # TODO Why don't these serialize properly here like they do in artistSchema?
                    'top_five_artists',
                    'favorited_tracks',
                    'events_attended',
                    'events_attending',
                    'username'
                    ]

