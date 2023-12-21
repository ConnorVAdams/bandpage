#!/usr/bin/env python3
from flask import jsonify, abort, current_app, request, session, redirect, url_for, make_response
from flask_restful import Resource
from flask_cors import cross_origin
import logging
import time
import re
from urllib.parse import urlencode, urlparse, parse_qs
import requests
import base64
import secrets
from datetime import datetime
import pytz

from werkzeug.exceptions import NotFound
from app_setup import app, db, api, jwt
from models.artist import Artist
from models.fan import Fan
from models.user import User
from models.track import Track
from models.like import Like
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

# @app.route('/')
# def index():
#     response = redirect('http://localhost:4000/landing')
#     # response.headers.add("Access-Control-Allow-Origin", "*")
#     return response

# @app.route('/spotify_api')
# def spotify_api():

@app.route('/authorize')
def authorize():
    # request comes from http://localhost/authorize

    client_id = app.config['SPOTIFY_CLIENT_ID']
    redirect_uri = 'http://localhost:4000/callback'
    scope = 'user-read-private user-read-email user-top-read'

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

    try:
        response = redirect(authorization_url)

        return response, 200
    except Exception as e:
        abort(400, str(e))
        
@app.route('/callback')
def callback():
    client_id = app.config['SPOTIFY_CLIENT_ID']
    client_secret= app.config['SPOTIFY_CLIENT_SECRET']
    token_url = 'https://accounts.spotify.com/api/token'
    redirect_uri = 'http://localhost:4000/callback'

    headers = {
                'Authorization': 'Basic ' + base64.b64encode(f"{client_id}:{client_secret}".encode()).decode('utf-8'),
                'Content-Type': 'application/x-www-form-urlencoded'
                }
    
    body = {}
    
    if ('code') in request.referrer: # if this is an initial token request
        url = request.referrer
        parsed_url = urlparse(url)
        query_params = parse_qs(parsed_url.query)

        code = query_params.get('code', [None])[0]

        body = {
                'code': code,
                'redirect_uri': redirect_uri,
                'grant_type': 'authorization_code'
            }

    else: # if this is a refresh request for a token
        data = request.get_json()
        refresh_token = data.get('refresh_token')

        body = {
                    "grant_type": "refresh_token",
                    "refresh_token": refresh_token,
                    "client_id": client_id
                }

    post_response = requests.post(token_url,headers=headers,data=body)
    
    if post_response.status_code == 200:
        pr = post_response.json()

        session['spotify_access_token'] = pr.get('access_token')
        session['spotify_refresh_token'] = pr.get('refresh_token')
        session['spotify_exp'] = pr.get('expires_in')
        session['token_acquired'] = datetime.utcnow()
        print(pr.get('access_token'))
        print(pr.get('refresh_token'))

        return jsonify({'expires_in': pr.get('expires_in')}), 200
    else:
        return jsonify({'error': 'Failed to obtain access token.'}), 500    

@app.route('/refresh_spotify')
def refresh_spotify():
    refresh_token = session.get('spotify_refresh_token')
    exp_in_secs = session.get('spotify_exp') * 60
    acq = session.get('token_acquired')
    now = datetime.utcnow()
    acq_aware = acq.replace(tzinfo=pytz.UTC)
    now_aware = now.replace(tzinfo=pytz.UTC)
    diff_in_secs = (now_aware - acq_aware).seconds

    if diff_in_secs > exp_in_secs:

        client_id = app.config['SPOTIFY_CLIENT_ID']
        client_secret = app.config['SPOTIFY_CLIENT_SECRET']
        token_url = 'https://accounts.spotify.com/api/token'

        headers = {
            'Authorization': 'Basic ' + base64.b64encode(f"{client_id}:{client_secret}".encode()).decode('utf-8'),
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        body = {
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token
        }

        post_response = requests.post(token_url, headers=headers, data=body)

        if post_response.status_code == 200:
            response_data = post_response.json()
            # Update your session or storage with the new tokens
            session['spotify_access_token'] = response_data.get('access_token')
            session['spotify_refresh_token'] = response_data.get('refresh_token', refresh_token)  # New or existing refresh token
            session['spotify_exp'] = response_data.get('expires_in')
            session['token_acquired'] = datetime.utcnow()

            return 'Token refreshed successfully', 200  # Return the updated tokens or relevant response
        else:
            return 'Failed to refresh Spotify token.', 500 # Handle failed token refresh
    else: # if token is still valid
        return 'Token refreshed successfully', 200

@app.route('/my_spotify_prof')
def my_spotify_prof():
    url = 'https://api.spotify.com/v1/me'

    refresh_rq = refresh_spotify()

    if refresh_rq:

        headers = {
            'Authorization': f'Bearer {session.get("spotify_access_token")}'
        }

        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            data = response.json()
        
            return jsonify({'response': data, 'ok': True}), 200
        
        else:
            return jsonify({'ok': False}), response.status_code
    
@app.route('/my_top_artists')
def my_top_artists():
    url = 'https://api.spotify.com/v1/me/top/artists'

    refresh_rq = refresh_spotify()

    if refresh_rq:

        headers = {
            'Authorization': f'Bearer {session.get("spotify_access_token")}'
        }

        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            data = response.json()
        
            return jsonify({'response': data, 'ok': True}), 200
        
        else:
            return jsonify({'ok': False}), response.status_code

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