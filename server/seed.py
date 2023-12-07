#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from app_setup import db
from models.artist import Artist
from models.fan import Fan
from models.like import Like
from models.track import Track
from models.band_member import BandMember

fake = Faker()

a1 = Artist(name='test name', genres='test genres', bio='test bio', location='test location')

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        db.session.add(a1)
        db.session.commit()
        
