from app_setup import db

class Track(db.Model):
    __tablename__ = 'tracks'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    album = db.Column(db.String)
    # TODO Serialize with dumps and loads and connect to band's /about if possible
    credits = db.Column(db.String)
    audio = db.Column(db.BLOB)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
