from app_setup import db
from sqlalchemy import and_
from sqlalchemy.ext.associationproxy import association_proxy

from models.like import Like
from models.track import Track
from models.event import Event

class Fan(db.Model):
    __tablename__ = 'fans'

    id = db.Column(db.Integer, primary_key=True)
    # username = db.Column(db.String, unique=True)
    # _password_hash = db.Column(db.String, nullable=False)
    name = db.Column(db.String)
    bio = db.Column(db.String)
    location = db.Column(db.String)
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

    @property
    def followed_artists(self):
        from models.artist import Artist
        return [likeable for likeable in self.likeables if isinstance(likeable, Artist)]

    @property
    def favorited_tracks(self):
        return [likeable for likeable in self.likeables if isinstance(likeable, Track)]

    @property
    def rsvped_events(self):
        return [likeable for likeable in self.likeables if isinstance(likeable, Event)]