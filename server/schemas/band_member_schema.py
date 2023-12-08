from marshmallow import fields, validate
from models.band_member import BandMember
from app_setup import ma

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
