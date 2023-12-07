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

def create_band_members():
    band_members = []

    available_instruments = ['Guitar', 'Bass', 'Keys', 'Vocals', 'Drums', 'Brass', 'Percussion']

    for i in range(35):
        num_instruments = randint(1, 3)
        instruments = [choice(available_instruments) for _ in range(num_instruments)]
        
        member = BandMember(
            name=fake.name(),
            instruments=', '.join(instruments),
            bio=fake.text(max_nb_chars=200),
            img='https://via.placeholder.com/150',  # Replace with an actual image link
        )
        band_members.append(member)
    
    return band_members

def create_tracks():
    all_artist_ids = [artist.id for artist in Artist.query.all()]
    url = 'https://audio-hosting-service.com/audio1.mp3'

    tracks = []
    
    for i in range(100):
        track = Track(
            name=fake.text(max_nb_chars=20),
            audio=url,
            artist_id = choice(all_artist_ids)
        )
        tracks.append(track)
    
    return tracks

def create_likes():
    # Fetch all fan IDs from the database
    all_fan_ids = [fan.id for fan in Fan.query.all()]
    all_artist_ids = [artist.id for artist in Artist.query.all()]
    all_event_ids = [event.id for event in Event.query.all()]
    all_track_ids = [track.id for track in Track.query.all()]

    # Create placeholder relationships
    likes = []
    for i in range(50):  # Adjust the number of placeholder likes as needed
        fan_id = choice(all_fan_ids)
        likeable_type = choice(['artist', 'event', 'track'])
        
        if likeable_type == 'artist':
            likeable_id = choice(all_artist_ids)
        elif likeable_type == 'event':
            likeable_id = choice(all_event_ids)
        else:  # likeable_type == 'track'
            likeable_id = choice(all_track_ids)
        
        like = Like(
            fan_id=fan_id,
            likeable_id=likeable_id,
            likeable_type=likeable_type
        )
        likes.append(like)
    
    return likes

if __name__ == '__main__':
    with app.app_context():
        print('Clearing db...')
        Artist.query.delete()
        Fan.query.delete()
        Event.query.delete()
        BandMember.query.delete()
        Track.query.delete()
        Like.query.delete()
        db.session.query(artist_to_artist).delete()
        db.session.commit()

        print("Starting seed...")
        artists = create_artists()
        db.session.add_all(artists)

        fans = create_fans()
        db.session.add_all(fans)

        events = create_events()
        db.session.add_all(events)

        band_members = create_band_members()
        db.session.add_all(band_members)

        tracks = create_tracks()
        db.session.add_all(tracks)

        likes = create_likes()
        db.session.add_all(likes)

        db.session.commit()

        artist_follows = create_artist_follows()
        for row_data in artist_follows:
            association_row = artist_to_artist.insert().values(row_data)
            db.session.execute(association_row)
        db.session.commit()
        
