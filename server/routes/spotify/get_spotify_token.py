from flask import jsonify, current_app, request, session, redirect, url_for, make_response
from flask_restful import Resource
import base64
import requests
from app import app




@app.route('/callback')
def callback():
    error = request.args.get('error')
    if error:
        # Handle error, user denied permission
        return 'Error: Authorization denied'

    code = request.args.get('code')
    # Exchange the code for an access token (additional steps required)
    # ...

    # Use the access token to make requests to the Spotify API
    # ...

    return 'Authorization successful'
