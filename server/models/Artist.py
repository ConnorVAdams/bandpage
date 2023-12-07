from app_setup import db

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

    # band_members = db.Relationship('BandMember', back_populates='bands')

    followed_artists_rel = db.relationship(
        'Artist',
        secondary=artist_to_artist,
        primaryjoin=id == artist_to_artist.c.following_artist_id,
        secondaryjoin=id == artist_to_artist.c.followed_artist_id,
        backref=db.backref('following', lazy='dynamic'),
        lazy='dynamic'
    )

    following_artists_rel = db.relationship(
        'Artist',
        secondary=artist_to_artist,
        primaryjoin=id == artist_to_artist.c.followed_artist_id,
        secondaryjoin=id == artist_to_artist.c.following_artist_id,
        backref=db.backref('followed', lazy='dynamic'),
        lazy='dynamic'
    )

    # Other artists that this artist follows
    def followed(self):
        return self.followed_artists_rel.all()
    
    # Followers of this artist
    def followers(self):
        return self.following_artists_rel.all()

    fans_followed = db.relationship(
        'Fan',
        secondary='likes',
        primaryjoin=(
            "and_(Artist.id==Like.likeable_id, "
            "Like.likeable_type=='artist')"
        ),
        secondaryjoin=(
            "and_(Fan.id==Like.fan_id, "
            "Like.likeable_type=='artist')"
        ),
        # backref=db.backref('artists_followed', lazy='dynamic'),
        lazy='dynamic'
    )



