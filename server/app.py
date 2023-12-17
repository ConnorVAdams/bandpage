#!/usr/bin/env python3
from flask import jsonify, current_app, request, session, redirect, url_for, make_response
from flask_restful import Resource


from werkzeug.exceptions import NotFound
from app_setup import app, db, api, jwt
from models.artist import Artist
from models.fan import Fan
from models.user import User
from models.track import Track
from models.like import Like
from models.band_member import BandMember
from models.event import Event
from routes.artists import Artists
from routes.artist_by_id import ArtistById
from routes.events import Events
from routes.event_by_id import EventById
from routes.fans import Fans
from routes.fan_by_id import FanById
from routes.tracks import Tracks
from routes.track_by_id import TrackById
from routes.auth.me import Me
from routes.users import Users
from routes.user_by_id import UserById
from routes.auth.login import Login
from routes.auth.signup import Signup
from routes.auth.refresh import Refresh
from routes.auth.check_token import CheckToken
from routes.like_by_id import LikeById
from routes.likes import Likes
# from routes.spotify.get_spotify_token import GetSpotifyToken
from flask import render_template

api.add_resource(Artists, "/artists")

api.add_resource(ArtistById, "/artists/<int:id>")

api.add_resource(Events, "/events")

api.add_resource(EventById, "/events/<int:id>")

api.add_resource(Fans, "/fans")

api.add_resource(FanById, "/fans/<int:id>")

api.add_resource(Tracks, "/tracks")

api.add_resource(TrackById, "/tracks/<int:id>")

api.add_resource(Me, "/me")

api.add_resource(Users, "/users")

api.add_resource(UserById, "/users/<int:id>")

api.add_resource(Likes, "/likes")

api.add_resource(LikeById, "/likes/<int:id>")

api.add_resource(Login, "/login")

api.add_resource(Signup, '/signup')

api.add_resource(Refresh, "/refresh")
# #! GET Check Token
api.add_resource(CheckToken, "/check")
# #! No need for a logout route in this configuration!
# api.add_resource(GetSpotifyToken, '/get_spotify_token')

@app.route('/api/v1/authorize')
def authorize():
	client_id = app.config['SPOTIFY_CLIENT_ID']
	client_secret = app.config['SPOTIFY_CLIENT_SECRET']
	redirect_uri = app.config['REDIRECT_URI']
	scope = ''

	# state key used to protect against cross-site forgery attacks
	# state_key = createStateKey(15)
	# session['state_key'] = state_key

	# redirect user to Spotify authorization page
	authorize_url = 'https://accounts.spotify.com/en/authorize?'
	parameters = f'response_type=code&client_id={client_id}&redirect_uri={redirect_uri}&scope={scope}'
	response = make_response(redirect(authorize_url + parameters))

	return response


# # Register a callback function that loads a user from your database whenever
# # a protected route is accessed. This should return any python object on a
# # successful lookup, or None if the lookup failed for any reason (for example
# # if the user has been deleted from the database).
@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return db.session.get(User, identity)


# #! Global Error Handling
@app.errorhandler(NotFound)  #! 404
def handle_404(error):
    response = {"message": error.description}
    return response, error.code

@app.route('/')
def index():
    return '<h1>BandPage</h1>'

# @app.route("/")
# @app.route("/production-detail/<int:id>")
# @app.route("/edit-production/<int:id>")
# @app.route("/new-production")
# def index(id=0):
#     return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True, port=5555)