from app_setup import db
from sqlalchemy.schema import UniqueConstraint


class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)

    likeable_type = db.Column(db.Enum('artist', 'event', 'track', name='likeable_types'), nullable=False)
    likeable_id = db.Column(db.Integer, nullable=False)
    
    liker_type = db.Column(db.Enum('artist', 'fan', name='liker_types'), nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'))
    fan_id = db.Column(db.Integer, db.ForeignKey('fans.id'))

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    __table_args__ = (
        UniqueConstraint('likeable_type', 'likeable_id', 'liker_type', 'artist_id', 'fan_id', name='unique_likes'),
    )

    @property
    def likeable(self):
        from models.artist import Artist
        from models.event import Event
        from models.track import Track

        if self.likeable_type == 'artist':
            return Artist.query.get(self.likeable_id)
        elif self.likeable_type == 'event':
            return Event.query.get(self.likeable_id)
        elif self.likeable_type == 'track':
            return Track.query.get(self.likeable_id)
        else:
            return None 
        
    @property
    def liker(self):
        from models.artist import Artist
        from models.fan import Fan
        
        if self.liker_type == 'artist':
            return Artist.query.get(self.artist_id)
        elif self.liker_type == 'fan':
            return Fan.query.get(self.fan_id)
        else:
            return None