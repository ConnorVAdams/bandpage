from marshmallow import fields, validate
from models.track import Track
from app_setup import ma

class TrackSchema(ma.SQLAlchemySchema):
    # fans = fields.List(fields.Nested(FanSchema(only=('id', 'name', 'location'))))

    class Meta():
        model: Track
        load_instance = True
        fields = [
                    'id', 
                    'name',
                    'audio',
                    'artist_id'
                    ]
        
        
