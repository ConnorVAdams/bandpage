from app_setup import db
from sqlalchemy import and_
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import datetime
import random
import re

from models.like import Like
from models.track import Track
from models.event import Event

from app_setup import bcrypt


class Fan(db.Model):
    __tablename__ = 'fans'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String, nullable=False)
    name = db.Column(db.String)
    bio = db.Column(db.String)
    location = db.Column(db.String)
    img = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    likes = db.relationship('Like')

    likes = db.relationship(
            'Like',
            primaryjoin=lambda: and_(
                Like.liker_type == 'fan',
                Like.fan_id == Fan.id
                )
        )

    likeables = association_proxy(
        'likes', 
        'likeable',
    )

# *******************
    # * SECURITY & AUTH *
    # *******************

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Passwords cannot be revealed.')

    @password_hash.setter
    def password_hash(self, new_password):
        hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
        self._password_hash = hashed_password

    def authenticate(self, password_to_check):
        return bcrypt.check_password_hash(self._password_hash, password_to_check)

    # * FOLLOWED *
    
    @property
    def followed_artists(self):
        return [likeable for likeable in self.likeables if isinstance(likeable, Artist)]
    
    @property
    def top_five_artists(self):
        return sorted(self.followed_artists, key=lambda artist: len(artist.followers), reverse=True)[:5]

    # * TRACKS *

    @property
    def favorited_tracks(self):
        return [likeable for likeable in self.likeables if isinstance(likeable, Track)]
    
    @property
    def top_five_tracks(self):
        return sorted(self.favorited_tracks, key=lambda track: len(track.fans), reverse=True)[:5]

    # * EVENTS *

    @property
    def rsvped_events(self):
        return [likeable for likeable in self.likeables if isinstance(likeable, Event)]
    
    @property
    def upcoming_events(self):
        current_time = datetime.now()
        future_events = [event for event in self.rsvped_events if event.event_date_time > current_time]
        sorted_events = sorted(future_events, key=lambda event: event.event_date_time)
        return sorted_events[:5]
    
    @validates('name')
    def validate_name(self, _, name):
        if not isinstance(name, str):
            raise TypeError(
                'Name must be a string.'
            )
        elif len(name) not in range(40):
            raise ValueError(
                'Name must be between 1 and 40 characters.'
            )
        return name
    
    @validates('bio')
    def validate_bio(self, _, bio):
        if not isinstance(bio, str):
            raise TypeError(
                'Bio must be a string.'
            )
        elif len(bio) not in range(400):
            raise ValueError(
                'Bio must be between 1 and 40 characters.'
            )
        return bio

    @validates('location')
    def validate_location(self, _, location):
        if not isinstance(location, str):
            raise TypeError(
                'Location must be a string.'
            )
        elif len(location) not in range(30):
            raise ValueError(
                'Location must be between 1 and 40 characters.'
            )
        return location
    
    @validates('img')
    def validate_img(self, _, img):
        if not isinstance(img, str):
            raise TypeError('Image URL must be a string.')
        
        pattern = re.compile(
            r'^(http[s]?:\/\/)?'
            r'(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})'
            r'(?::\d+)?(?:\/\S*)?$'
        )

        if not re.match(pattern, img):
            raise ValueError('Invalid image URL format.')

        return img