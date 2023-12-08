from app_setup import db
from models.like import Like
from sqlalchemy.ext.associationproxy import association_proxy

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

    rsvped_events = association_proxy(
        'likes', 'likeable',
        creator=lambda event: Like(likeable=event, liker_type='fan')
    )

    # favorited_tracks = association_proxy(
    #     'likes', 'likeable',
    #     creator=lambda track: Like(likeable=track, liker_type='fan')
    # )

    # followed_artists = association_proxy(
    #     'likes', 'likeable', 
    #     creator=lambda artist: Like(likeable=artist, liker_type='fan')
    # )

    # tracks_liked_rel = db.relationship(
    #     'Track',
    #     secondary='likes',
    #     primaryjoin="foreign(Like.fan_id)==Fan.id",
    #     secondaryjoin="and_(Like.likeable_type=='Track', foreign(Like.likeable_id)==Track.id)",
    #     # backref=db.backref("fans_liked", lazy="dynamic"),
    #     lazy="dynamic"
    # )
    
    # events_rsvped_rel = db.relationship(
    #     'Event',
    #     secondary='likes',
    #     primaryjoin="foreign(Like.fan_id)==Fan.id",
    #     secondaryjoin="and_(Like.likeable_type=='Event', foreign(Like.likeable_id)==Event.id)",
    #     # backref=db.backref("fans_rsvped", lazy="dynamic"),
    #     lazy="dynamic"
    # )

    # artists_followed_rel = db.relationship(
    #     'Artist',
    #     secondary='likes',
    #     primaryjoin="foreign(Like.fan_id)==Fan.id",
    #     secondaryjoin="and_(Like.likeable_type=='Artist', foreign(Like.likeable_id)==Artist.id)",
    #     # backref=db.backref("fans_followed", lazy="dynamic"),
    #     lazy="dynamic"
    # )

    # @property
    # def tracks(self):
    #     tracks = self.tracks_liked_rel.all()
    #     return tracks
    
    # @property
    # def events(self):
    #     events = self.events_rsvped_rel.all()
    #     return events
    
    # @property
    # def artists(self):
    #     artists = self.artists_followed_rel.all()
    #     return artists