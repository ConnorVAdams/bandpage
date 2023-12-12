from marshmallow import fields, validate
from models.fan import Fan
from models.artist import Artist
from app_setup import ma
from schemas.event_schema import EventSchema
from schemas.track_schema import TrackSchema

class FanSchema(ma.SQLAlchemySchema):
    top_five_artists = fields.List(fields.Nested('FanSchema', only=('id', 'name', 'location')))
    top_five_tracks = fields.List(fields.Nested(TrackSchema(only=("id", "name", "audio"))))
    upcoming_events = fields.List(fields.Nested(EventSchema(only=('id', 'date_time', 'venue'))))
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
                    'rsvped_events',
                    ]

    # TODO Throws 'map is not a function' error
    # def dump(self, obj, *args, **kwargs):
    #     serialized_data = super().dump(obj, *args, **kwargs)

    #     serialized_data['_metadata'] = {'user_type': 'Fan'}

    #     return serialized_data
