from flask import request, abort
from flask_restful import Resource
from marshmallow import ValidationError
# from flask_jwt_extended import jwt_required
from app_setup import db
from models.track import Track
from schemas.track_schema import TrackSchema

artists_schema = TrackSchema(many=True, session=db.session)
artist_schema = TrackSchema(session=db.session)

class TrackById(Resource):
    def get(self, id):
        artist = Track.query.get_or_404(
            id, description=f'Could not find artist with ID: {id}'
        )
        try:
            serialized_data = artist_schema.dump(artist)
            return serialized_data, 200
        except Exception as e:
            abort(400, str(e))

    # @jwt_required()
    def patch(self, id):
        artist = Track.query.get_or_404(
            id, description=f"Could not find artist with ID: {id}"
        )
        try:
            data = request.get_json()
            artist_schema.validate(data)
            updated_artist = artist_schema.load(
                data, instance=artist, partial=True, session=db.session
            )
            db.session.commit()
            return artist_schema.dump(updated_artist), 200
        except (ValueError, ValidationError, IntegrityError) as e:
            db.session.rollback()
            abort(400, str(e))

    # @jwt_required()
    def delete(self, id):
        prod = Track.query.get_or_404(
            id, description=f"Could not find production with id: {id}"
        )
        try:
            db.session.delete(prod)
            db.session.commit()
            return None, 204
        except Exception as e:
            db.session.rollback()
            abort(400, str(e))