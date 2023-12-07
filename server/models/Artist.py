from app_setup import db
from sqlalchemy.ext.associationproxy import association_proxy

from models.like import Like

artist_to_artist = db.Table(
    'artist_to_artist',
    db.Column('followed_artist_id', db.Integer, db.ForeignKey('artists.id'), primary_key=True),
    db.Column('following_artist_id', db.Integer, db.ForeignKey('artists.id'), primary_key=True),
)

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

    # Other artists that this artist follows
    followed_artists = db.relationship(
        'Artist',
        secondary=artist_to_artist,
        primaryjoin=id == artist_to_artist.c.following_artist_id,
        secondaryjoin=id == artist_to_artist.c.followed_artist_id,
        backref=db.backref('following_artists', lazy='dynamic'),
        lazy='dynamic'
    )

    # Followers of this artist
    following_artists = db.relationship(
        'Artist',
        secondary=artist_to_artist,
        primaryjoin=id == artist_to_artist.c.followed_artist_id,
        secondaryjoin=id == artist_to_artist.c.following_artist_id,
        backref=db.backref('followed_artists', lazy='dynamic'),
        lazy='dynamic'
    )

    # Relationships for an artist's own content
    # own_events = db.relationship('Event', back_populates='artist', cascade='all, delete-orphan')
    # own_tracks = db.relationship('Track', back_populates='artist', cascade='all, delete-orphan')
    # fans = db.relationship('Fan', back_populates='artists')

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
