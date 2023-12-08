from flask import request, abort, jsonify
from flask_restful import Resource
from marshmallow import ValidationError
# from flask_jwt_extended import jwt_required
from app_setup import db
from models.artist import Artist
from schemas.artist_schema import ArtistSchema

artists_schema = ArtistSchema(many=True, session=db.session)
artist_schema = ArtistSchema(session=db.session)

class Artists(Resource):
    def get(self):
        artists = artists_schema.dump(Artist.query)
        return artists, 200

    # @jwt_required()
    def post(self):
        try:
            data = request.json
            # * Validate the data, if problems arise you'll see ValidationError
            artist_schema.validate(data)
            # * Deserialize the data with load()
            artist = artist_schema.load(data)
            db.session.add(artist)
            db.session.commit()
            # * Serialize the data and package your JSON response
            serialized_crew = artist_schema.dump(artist)
            return serialized_crew, 201
        except (ValidationError, ValueError) as e:
            db.session.rollback()
            abort(400, str(e))