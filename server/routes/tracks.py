from flask import request, abort
from flask_restful import Resource
from marshmallow import ValidationError
# from flask_jwt_extended import jwt_required
from app_setup import db
from models.track import Track
from schemas.track_schema import TrackSchema

tracks_schema = TrackSchema(many=True, session=db.session)
track_schema = TrackSchema(session=db.session)

class Tracks(Resource):
    def get(self):
        tracks = tracks_schema.dump(Track.query)
        return tracks, 200

    # @jwt_required()
    def post(self):
        try:
            data = request.json
            # * Validate the data, if problems arise you'll see ValidationError
            track_schema.validate(data)
            # * Deserialize the data with load()
            track = track_schema.load(data)
            db.session.add(track)
            db.session.commit()
            # * Serialize the data and package your JSON response
            serialized_crew = track_schema.dump(track)
            return serialized_crew, 201
        except (ValidationError, ValueError) as e:
            db.session.rollback()
            abort(400, str(e))