from app_setup import db

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

    fans_rsvped_rel = db.relationship(
        'Fan',
        secondary='likes',
        primaryjoin=(
            "and_(Event.id==Like.likeable_id, "
            "Like.likeable_type=='event')"
        ),
        secondaryjoin=(
            "and_(Fan.id==Like.fan_id, "
            "Like.likeable_type=='event')"
        ),
        # backref=db.backref('events_rsvped', lazy='dynamic'),
        lazy='dynamic'
    )

    @property
    def attending(self):
        fans_attending = self.fans_rsvped_rel.all()
        return fans_attending