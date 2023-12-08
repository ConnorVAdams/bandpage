from app_setup import db

class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)

    likeable_type = db.Column(db.Enum('artist', 'event', 'track', name='likeable_types'), nullable=False)
    liker_type = db.Column(db.Enum('artist', 'fan', name='liker_types'), nullable=False)

    likeable_id = db.Column(db.Integer, nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'))
    fan_id = db.Column(db.Integer, db.ForeignKey('fans.id'))

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
        
