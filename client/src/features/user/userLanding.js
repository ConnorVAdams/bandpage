import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import EventCard from '../event/EventCard'
import ArtistCard from '../artist/ArtistCard'
import TrackCard from '../track/TrackCard'
import FanCard from '../fan/FanCard'
import ArtistWrapper from '../artist/ArtistWrapper'

const UserLanding = () => {
    const user = useSelector(state => state.user.data)
    
    if (user.artist) {

        const { 
            artist: { 
                name, 
                img, 
                id, 
                upcoming_events, 
                fan_followers, 
                artist_followers,
                followed_artists,
                favorite_tracks,
                events_attending
            },
            user_id,
            username 
        } = user

        const { artist } = user

        return(
        <>
            <div id={user_id}>
                <div id='profile-info'>
                    <h1>ProfileInfo</h1>
                    <h4>Username: {username}</h4>
                    <Link>Edit Profile</Link>
                    <br/>
                    <Link>Delete Account</Link>
                    <ArtistWrapper />
                </div>
                <div id='Landing-info'>
                    <h1>LandingInfo</h1>

                    <h5>Events I'm Attending:</h5>
                        <div id='events-attending-div'>
                        {events_attending && events_attending.map(event => event && (
                            <EventCard key={event.id} event={event} />
                        ))}
                        </div>

                    <h5>My Liked Artists</h5>
                    <div id={'liked-artists'}>
                        {followed_artists && followed_artists.map(artist => artist && (
                            <ArtistCard key={`followed ${artist.id}`} artist={artist} />
                        ))}
                    </div>

                    <h5>My Liked Tracks:</h5>
                        <div>
                            {favorite_tracks && favorite_tracks.map(track => track && (
                                <TrackCard key={track.id} track={track} />
                            ))}
                        </div>
                    <h5>My Followers:</h5>
                    <div>
                        {fan_followers && fan_followers.map(fan => fan && (
                            <FanCard key={fan.id} fan={fan} />
                        ))}
                        {artist_followers && artist_followers.map(artist => artist && (
                            <ArtistCard key={`follower ${artist.id}`} artist={artist} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )} 
    const { 
        fan: {
            name,
            img,
            id,
            followed_artists,
            favorite_tracks,
            events_attending
        },
        user_id,
        username 
        } = user

    return (
        <>
        <div id={user_id}>
            <div id='profile-info'>
                <h1>ProfileInfo</h1>
                <h4>Username: {username}</h4>
                    <h2>{name}</h2>
                    <img src={img} alt={name}/>
                    <br/>
                <Link>Edit Profile</Link>
            </div>
            <div id='Landing-info'>
                <h1>LandingInfo</h1>

                <h5>Events I'm Attending:</h5>
                        <div id='events-attending-div'>
                        {events_attending && events_attending.map(event => event && (
                            <EventCard key={event.id} event={event} />
                        ))}
                        </div>

                    <h5>My Liked Artists</h5>
                    <div id={'liked-artists'}>
                        {followed_artists && followed_artists.map(artist => artist && (
                            <ArtistCard key={`followed ${artist.id}`} artist={artist} />
                        ))}
                    </div>

                    <h5>My Liked Tracks:</h5>
                        <div>
                            {favorite_tracks && favorite_tracks.map(track => track && (
                                <TrackCard key={track.id} track={track} />
                            ))}
                        </div>
            </div>
        </div>
    </>
    )
}

export default UserLanding