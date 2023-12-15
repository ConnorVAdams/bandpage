from flask import request, abort
from flask_restful import Resource
from marshmallow import ValidationError
from flask_jwt_extended import jwt_required
from app_setup import db
from models.user import User
from schemas.user_schema import UserSchema

user_schema = UserSchema(session=db.session)

class UserById(Resource):
    def get(self, id):
        user = User.query.get_or_404(
            id, description=f'Could not find user with ID: {id}'
        )
        try:
            serialized_data = user_schema.dump(user)
            return serialized_data, 200
        except Exception as e:
            abort(400, str(e))

    # @jwt_required()
    # def patch(self, id):
    #     artist = User.query.get_or_404(
    #         id, description=f"Could not find artist with ID: {id}"
    #     )
    #     try:
    #         data = request.get_json()
    #         artist_schema.validate(data)
    #         updated_artist = artist_schema.load(
    #             data, instance=artist, partial=True, session=db.session
    #         )
    #         db.session.commit()
    #         return artist_schema.dump(updated_artist), 200
    #     except (ValueError, ValidationError, IntegrityError) as e:
    #         db.session.rollback()
    #         abort(400, str(e))

    @jwt_required()
    def delete(self, id):
        user = User.query.get_or_404(
            id, description=f"Could not find user with id: {id}"
        )
        try:
            db.session.delete(user)
            db.session.commit()
            return None, 204
        except Exception as e:
            db.session.rollback()
            abort(400, str(e))