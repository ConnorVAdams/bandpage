# TODO How to separate these schemas into separate files without circular imports?

from marshmallow import fields, validate
from models.artist import Artist
from models.band_member import BandMember
from models.event import Event
from models.fan import Fan
from models.track import Track

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
                    'tracks',
                    # 'events'
                    # 'fan_followers'
                    ]
        
        # TODO are these circular serializations necessary or beneficial?
        # following = ma.Nested(ArtistSchema, many=True)
        # artist_followers = ma.Nested(ArtistSchema, many=True)
        # fan_followers = ma.Nested(FanSchema, many=True)

        tracks = fields.List(fields.Nested(lambda: TrackSchema(only=('id', 'name'))))
        # events = fields.List(fields.Nested(EventSchema))

class BandMemberSchema(ma.SQLAlchemySchema):
    class Meta():
        model: BandMember
        load_instance = True
        fields = [
                    'id',
                    'name',
                    'instruments',
                    'bio',
                    'img'
                ]