from app_setup import db
from sqlalchemy import and_
from sqlalchemy.ext.associationproxy import association_proxy

from models.like import Like

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
    
    followed_artists = association_proxy(
        'likes', 'likeable', 
        creator=lambda artist: Like(likeable=artist, liker_type='artist')
    )

    favorited_tracks = association_proxy(
        'likes', 'likeable',
        creator=lambda track: Like(likeable=track, liker_type='artist')
    )
    
    rsvped_events = association_proxy(
        'likes', 'likeable',
        creator=lambda event: Like(likeable=event, liker_type='artist')
    )

    @property
    def fans(self):
        from models.fan import Fan
        fans = Fan.query.join(Like, (Like.fan_id == Fan.id)).filter(
            Like.likeable_id == self.id,
            Like.likeable_type == 'artist'
        ).all()

        return fans




