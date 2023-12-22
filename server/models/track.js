from sqlalchemy.orm import validates

from app_setup import db
from models.like import Like
import re

class Track(db.Model):
    __tablename__ = 'tracks'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    audio = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'))

    artist = db.relationship('Artist', back_populates='tracks')

    @property
    def artist_name(self):
        return self.artist.name

    @property
    def likes(self):
        likes = Like.query.filter(
            Like.likeable_type == 'track',
            Like.likeable_id == self.id
        ).all()
        return likes

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
    
    @validates('audio')
    def validate_audio(self, _, audio):
        if not isinstance(audio, str):
            raise TypeError('Audio must be a string.')
        
        pattern = re.compile(
            r'^(http[s]?:\/\/)?'
            r'(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})'
            r'(?::\d+)?(?:\/\S*)?$'
        )
        if not re.match(pattern, audio):
            raise ValueError('Invalid audio URL format.')
        return audio
