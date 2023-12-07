from app_setup import db
from sqlalchemy.ext.associationproxy import association_proxy

from models.like import Like

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

    # Relationships for an artist's own content
    own_events = db.relationship('Event', back_populates='artist', cascade='all, delete-orphan')
    own_tracks = db.relationship('Track', back_populates='artist', cascade='all, delete-orphan')
    fans = db.relationship('Fan', back_populates='artists')

    # Relationships for content that an artist likes
    # following = db.relationship(
    #     'Artist',
    #     secondary='likes',
    #     primaryjoin='foreign'(Like.artist_id),
    #     secondaryjoin="and_(Like.likeable_type=='artist', foreign(Like.likeable_id)==Artist.id)",
    #     backref=db.backref('artists_liked', lazy='dynamic'),
    #     lazy='dynamic'
    # )
    # faves = 
    # rsvps = 

    # events = db.relationship('Event', )
