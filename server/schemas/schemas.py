# from marshmallow import fields, validate
# from models.artist import Artist
# from models.band_member import BandMember
# from models.event import Event
# from models.fan import Fan
# from models.track import Track

# from app_setup import ma

# class ArtistSchema(ma.SQLAlchemySchema):
#     tracks = fields.List(fields.Nested(TrackSchema(only=('id', 'name', 'audio'))))
#     events = fields.List(fields.Nested(EventSchema(only=('id', 'date_time', 'venue'))))
#     followers = fields.List(fields.Nested(FanSchema(only=('id', 'name', 'location'))))
#     followed_artists = fields.List(fields.Nested(FanSchema(only=('id', 'name', 'location'))))
#     favorited_tracks = fields.List(fields.Nested(TrackSchema(only=("id", "name", "audio"))))
#     rsvped_events = fields.List(fields.Nested(EventSchema(only=('id', 'date_time', 'venue'))))
    
#     class Meta():
#         model: Artist
#         load_instance = True
#         fields = [
#                     'id', 
#                     'name',
#                     'genres',
#                     'bio',
#                     'location',
#                     'tracks',
#                     'events',
#                     'followers',
#                     'followed_artists',
#                     'favorited_tracks',
#                     'rsvped_events'
#                     ]
        
# class EventSchema(ma.SQLAlchemySchema):
#     class Meta():
#         model: Event
#         load_instance = True
#         fields = [
#                 'id', 
#                 'date_time',
#                 'venue',
#                 'artist_id',
#                 'attendees'
#                 ]
