from app_setup import db
from sqlalchemy import and_
from sqlalchemy.ext.associationproxy import association_proxy

from models.like import Like

class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    date_time = db.Column(db.DateTime, nullable=False)
    venue = db.Column(db.String, nullable=False)
    # location = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'))

    artist = db.relationship('Artist', back_populates='events')

    @property
    def attendees(self):
        likes = Like.query.filter(
            Like.likeable_type == 'event',
            Like.likeable_id == self.id
            ).all()
        return [like.liker for like in likes]

