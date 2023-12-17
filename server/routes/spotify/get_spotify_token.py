from flask import jsonify, current_app, request, session, redirect, url_for, make_response
from flask_restful import Resource
import base64
import requests
from app import app


class GetSpotifyToken(Resource):
    def post(self):
        # Access Spotify client ID and client secret dynamically from current app context
        client_id = current_app.config.get('SPOTIFY_CLIENT_ID')
        client_secret = current_app.config.get('SPOTIFY_CLIENT_SECRET')

        if not client_id or not client_secret:
            return jsonify({'error': 'Spotify client ID or client secret not configured'}), 500

        auth_header = base64.b64encode(f'{client_id}:{client_secret}'.encode('utf-8')).decode('utf-8')
        headers = {
            'Authorization': f'Basic {auth_header}',
            'Content-Type': 'application/x-www-form-urlencoded',
        }
        data = {'grant_type': 'client_credentials'}

        response = requests.post('https://accounts.spotify.com/api/token', headers=headers, data=data)

        if response.status_code == 200:
            access_token = response.json().get('access_token')
            return jsonify({'access_token': access_token})
        else:
            return jsonify({'error': 'Unable to get access token'}), 500


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
