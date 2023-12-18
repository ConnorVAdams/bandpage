#!/usr/bin/env python3
from flask import jsonify, current_app, request, session, redirect, url_for, make_response
from flask_restful import Resource
from flask_cors import cross_origin
import logging
import time
import re
from urllib.parse import urlencode

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

# TODO Further Restrict CORS after OAuth achieved

@app.route('/')
def index():
    response = redirect('http://localhost:4000/landing')
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/spotify_api')
def spotify_api():
    response = redirect('http://localhost:4000/landing')
    response.headers.add("Access-Control-Allow-Origin", "*")

@app.route('/authorize')
def authorize():
    import secrets

    client_id = app.config['SPOTIFY_CLIENT_ID']
    redirect_uri = 'http://localhost:4000/callback'
    scope = 'user-read-private user-read-email'

    # # Generate a random state value and store it in the session
    state = secrets.token_urlsafe(16)
    session['state'] = state

    # # Redirect user to Spotify authorization page with the state parameter
    params = {
        "response_type": "code",
        "client_id": client_id,
        "scope": scope,
        "redirect_uri": redirect_uri,
        "state": state
    }

    authorization_url = 'https://accounts.spotify.com/authorize?' + urlencode(params)
        
    response = redirect(authorization_url)
    response.headers.add("Access-Control-Allow-Origin", "*")
    # import ipdb; ipdb.set_trace()

    return response

@app.route('/callback')
def callback():

    response = redirect('http://localhost:4000')
    response.headers.add("Access-Control-Allow-Origin", "*")

    # import ipdb; ipdb.set_trace()
    
    # if request.args.get('error'):
    #     return render_template('index.html', error='Spotify error.')

    # code = request.args.get('code')

    # # get access token to make requests on behalf of the user
    # payload = get_spotify_token(code)
    
    # if payload is not None:
    #     session['token'] = payload[0]
    #     session['refresh_token'] = payload[1]
    #     session['token_expiration'] = time.time() + payload[2]
    # else:
    #     return render_template('index.html', error='Failed to access token.')

    # current_user = getUserInformation(session)
    # session['user_id'] = current_user['id']
    # logging.info('new user:' + session['user_id'])

    # # Redirect to the previous URL or a default URL
    # return redirect(session.get('previous_url', '/'))

    return response

@app.route('/api/v1/get_spotify_token', methods=['POST'])
def get_spotify_token():
    import ipdb; ipdb.set_trace()
    print('e')

    authorization_code = request.form.get('code')
    redirect_uri = request.form.get('redirect_uri')

    client_id = app.config['SPOTIFY_CLIENT_ID']
    client_secret = app.config['SPOTIFY_CLIENT_SECRET']

    # Make a request to Spotify's token endpoint to exchange the code for tokens
    response = requests.post(
        'https://accounts.spotify.com/api/token',
        data={
            'grant_type': 'authorization_code',
            'code': authorization_code,
            'redirect_uri': redirect_uri,
            'client_id': client_id,
            'client_secret': client_secret,
        }
    )
    data = response.json()
    access_token = data.get('access_token')
    refresh_token = data.get('refresh_token')
    expires_in = data.get('expires_in')

    return jsonify({'access_token': access_token, 'refresh_token': refresh_token, 'expires_in': expires_in})


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

# @app.route("/")
# @app.route("/production-detail/<int:id>")
# @app.route("/edit-production/<int:id>")
# @app.route("/new-production")
# def index(id=0):
#     return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True, port=5555)