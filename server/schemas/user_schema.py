from marshmallow import fields, validate
from models.user import User
from schemas.artist_schema import ArtistSchema
from schemas.fan_schema import FanSchema
from app_setup import ma

class UserSchema(ma.SQLAlchemySchema):
    # TODO is user_type only necessary in the front end?
    # user_type = fields.Function(lambda obj: 'artist' if obj.artist else 'fan')
    artist = fields.Nested(ArtistSchema(only=('id', 'name')))
    fan = fields.Nested(FanSchema(only=('id', 'name')))

    
    class Meta():
        model: User
        load_instance = True
        fields = [
            'id',
            'username',
            'password_hash',
            'user_type',
            'artist',
            'fan'
        ]