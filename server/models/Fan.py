from app_setup import db

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

    tracks_liked = db.relationship(
        'Track',
        secondary='likes',
        primaryjoin="foreign(Like.fan_id)==Fan.id",
        secondaryjoin="and_(Like.likeable_type=='track', foreign(Like.likeable_id)==Track.id)",
        # backref=db.backref("fans_liked", lazy="dynamic"),
        lazy="dynamic"
    )
    
    events_rsvped = db.relationship(
        'Event',
        secondary='likes',
        primaryjoin="foreign(Like.fan_id)==Fan.id",
        secondaryjoin="and_(Like.likeable_type=='event', foreign(Like.likeable_id)==Event.id)",
        # backref=db.backref("fans_rsvped", lazy="dynamic"),
        lazy="dynamic"
    )

    artists_followed = db.relationship(
        'Artist',
        secondary='likes',
        primaryjoin="foreign(Like.fan_id)==Fan.id",
        secondaryjoin="and_(Like.likeable_type=='artist', foreign(Like.likeable_id)==Artist.id)",
        # backref=db.backref("fans_followed", lazy="dynamic"),
        lazy="dynamic"
    )