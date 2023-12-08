from marshmallow import fields, validate
from models.track import Track
from app_setup import ma

class TrackSchema(ma.SQLAlchemySchema):
    class Meta():
        model: Track
        load_instance = True
        fields = [
                    'id', 
                    'name',
                    'audio',
                    'artist_id'
                    ]