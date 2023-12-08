from app_setup import db
from sqlalchemy import and_
from sqlalchemy.ext.associationproxy import association_proxy

from models.like import Like
from models.track import Track
from models.event import Event

# artist_to_artist = db.Table(
#     'artist_to_artist',
#     db.Column('followed_artist_id', db.Integer, db.ForeignKey('artists.id'), primary_key=True, viewonly=True),
#     db.Column('following_artist_id', db.Integer, db.ForeignKey('artists.id'), primary_key=True, viewonly=True),
# )

class Artist(db.Model):
    __tablename__ = 'artists'

    id = db.Column(db.Integer, primary_key=True)
    # username = db.Column(db.String, unique=True)
    # _password_hash = db.Column(db.String, nullable=False)
    name = db.Column(db.String, unique=True)
    # TODO serialize genres w/ dumps and loads
    genres = db.Column(db.String)
    bio = db.Column(db.String)
    location = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # band_members = db.Relationship('BandMember', back_populates='bands')

    tracks = db.relationship('Track', back_populates='artist')
    events = db.relationship('Event', back_populates='artist')

    likes = db.relationship(
        'Like',
        primaryjoin=lambda: and_(
            Like.liker_type == 'artist',
            Like.artist_id == Artist.id
            )
    )

    likeables = association_proxy(
        'likes', 
        'likeable',
    )

    @property
    def followed_artists(self):
        return [likeable for likeable in self.likeables if isinstance(likeable, Artist)]
    
    @property
    def favorited_tracks(self):
        return [likeable for likeable in self.likeables if isinstance(likeable, Track)]
    
    @property
    def rsvped_events(self):
        return [likeable for likeable in self.likeables if isinstance(likeable, Event)]