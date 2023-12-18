from app_setup import db

class BandMember(db.Model):
    # __tablename__ = 'band_members'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    # TODO serialize instruments w/ dumps and loads
    instruments = db.Column(db.String, nullable=False)
    bio = db.Column(db.String)
    img = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # bands = db.Relationship('Artist', back_populates='band_members')
