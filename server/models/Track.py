from app_setup import db
from models.like import Like

class Track(db.Model):
    __tablename__ = 'tracks'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    # album = db.Column(db.String)
    # TODO Serialize with dumps and loads and connect to band's /about if possible
    audio = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'))

    artist = db.relationship('Artist', back_populates='tracks')

    @property
    def fans(self):
        likes = Like.query.filter(
            Like.likeable_type == 'track',
            Like.likeable_id == self.id
        ).all()
        return [like.liker for like in likes]
