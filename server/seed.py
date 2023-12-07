#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import datetime
from random import choice, sample

# Remote library imports
from faker import Faker

# Local imports
from app import app
from app_setup import db
from models.artist import Artist, artist_to_artist
from models.fan import Fan
from models.like import Like
from models.track import Track
from models.band_member import BandMember

fake = Faker()

def create_artists():
    artists = []
    for i in range(1, 11):
        artist = Artist(
            name=fake.word().title(),
            genres=choice(['Rock', 'Pop', 'Hip-Hop', 'Jazz', 'Electronic', 'Country', 'R&B', 'Classical']),
            bio=fake.text(max_nb_chars=200),
            location=fake.city(),
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        artists.append(artist)
    return artists

def create_artist_follows():
    # Fetch all artist IDs from the database
    all_artist_ids = [artist.id for artist in Artist.query.all()]

    # Generate 25 random pairs of followed and following artist IDs
    pairs_of_artist_ids = sample(all_artist_ids, k=10)  # k=50 since each row contains two IDs

    # Create rows for the artist_to_artist table
    artist_follows = [
        {'followed_artist_id': pairs_of_artist_ids[i], 'following_artist_id': pairs_of_artist_ids[i + 1]}
        for i in range(0, len(pairs_of_artist_ids), 2)
    ]

    return artist_follows

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print('Clearing db...')
        Artist.query.delete()
        db.session.query(artist_to_artist).delete()
        db.session.commit()

        print("Starting seed...")
        artists = create_artists()
        db.session.add_all(artists)
        db.session.commit()

        artist_follows = create_artist_follows()
        for row_data in artist_follows:
            association_row = artist_to_artist.insert().values(row_data)
            db.session.execute(association_row)
        db.session.commit()
        
