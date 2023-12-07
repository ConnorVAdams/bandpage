from app_setup import db

class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'), nullable=False)
    fan_id = db.Column(db.Integer, db.ForeignKey('fans.id'), nullable=False)
    likeable_id = db.Column(db.Integer, nullable=False)
    likeable_type = db.Column(db.Enum('artist', 'event', 'track', name='likeable_types'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())


    def to_dict(self):
        return {
            'id': self.id,
            'artist_id': self.artist_id,
            'fan_id': self.fan_id,
            'likeable_id': self.likeable_id,
            'likeable_type': self.likeable_type
        }