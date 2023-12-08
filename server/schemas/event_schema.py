from marshmallow import fields, validate
from models.event import Event
from app_setup import ma

class EventSchema(ma.SQLAlchemySchema):
    class Meta():
        model: Event
        load_instance = True
        fields = [
                    'id', 
                    'date_time',
                    'venue',
                    'artist_id'
                    ]
