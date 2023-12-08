from app_setup import db

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

    fans_liked = db.relationship(
        'Fan',
        secondary='likes',
        primaryjoin=(
            "and_(Track.id==Like.likeable_id, "
            "Like.likeable_type=='Track')"
        ),
        secondaryjoin=(
            "and_(Fan.id==Like.fan_id, "
            "Like.likeable_type=='Track')"
        ),
        # backref=db.backref('liked_tracks', lazy='dynamic'),
        lazy='dynamic'
    )

    @property
    def fans(self):
        fans = self.fans_liked.all()
        return fans
