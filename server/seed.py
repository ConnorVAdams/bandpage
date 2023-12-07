#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import datetime, timedelta
from random import choice, randint

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
from models.event import Event

fake = Faker()
# *****************************
# * RANDOM DATETIME FUNCTIONS *
# *****************************

def round_to_nearest_half_hour(dt):
    new_minute = 0 if dt.minute < 15 else 30
    rounded_dt = dt.replace(second=0, microsecond=0, minute=new_minute)
    return rounded_dt

def rand_date():
    current_time = datetime.now()
    one_year_ago = current_time - timedelta(days=365)
    one_year_later = current_time + timedelta(days=365)
    dt = current_time + timedelta(days=randint(-365, 365))
    random_hour = randint(0, 23) 
    dt = dt.replace(hour=random_hour, minute=randint(0, 1) * 30)
    return round_to_nearest_half_hour(dt)

# ********************************
# * SEED DATA CREATION FUNCTIONS *
# ********************************

def create_artists():
    artists = []

    for i in range(11):
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
    follows = []

    # Fetch all artist IDs from the database
    all_artist_ids = [artist.id for artist in Artist.query.all()]

    # Create rows for the artist_to_artist table
    for i in range(31):
        id_one = choice(all_artist_ids)
        id_two = choice(all_artist_ids)

        # If the pair doesn't exist in follows or in the database, add it to follows
        if not (id_one, id_two) in follows:
            follow = (id_one, id_two)
            follows.append(follow)

    return follows

def create_fans():
    fans = []

    for i in range(50):
        fan = Fan(
            name=fake.name().title(),
            bio=fake.text(max_nb_chars=200),
            location=fake.city(),
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        fans.append(fan)

    return fans

def create_events():
    events = []

    all_artist_ids = [artist.id for artist in Artist.query.all()]

    for i in range(60):
        venues = ['Melissa\'s', 'Jake\'s', 'Calypso', 'Circe', 'Agamemnon', 'Ajax', 'Red\'s Bar']
        event = Event(
            date_time = rand_date(),
            venue = choice(venues),
            artist_id = choice(all_artist_ids)
        )
        events.append(event)
    
    return events

if __name__ == '__main__':
    with app.app_context():
        print('Clearing db...')
        Artist.query.delete()
        Fan.query.delete()
        db.session.query(artist_to_artist).delete()
        db.session.commit()

        print("Starting seed...")
        artists = create_artists()
        db.session.add_all(artists)

        fans = create_fans()
        db.session.add_all(fans)

        events = create_events()
        db.session.add_all(events)

        db.session.commit()

        artist_follows = create_artist_follows()
        for row_data in artist_follows:
            association_row = artist_to_artist.insert().values(row_data)
            db.session.execute(association_row)
        db.session.commit()
        
