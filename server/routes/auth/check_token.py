# This route is to abstract the functionality of token checking to its own route that can be called in different modules

from flask_restful import Resource
from flask_jwt_extended import (
    jwt_required,
)

class CheckToken(Resource):
    @jwt_required()
    def get(self):
        return {}, 202