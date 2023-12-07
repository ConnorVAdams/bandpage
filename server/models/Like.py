from app_setup import db

class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    # TODO How to make one but not both of the below IDs nullable
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'))
    fan_id = db.Column(db.Integer, db.ForeignKey('fans.id'))
    likeable_id = db.Column(db.Integer, nullable=False)
    # Restrict possible value of likeable_type to allowed strings
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