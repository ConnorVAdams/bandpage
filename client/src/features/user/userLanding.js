import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import EventCard from '../event/EventCard'
import ArtistCard from '../artist/ArtistCard'
import TrackCard from '../track/TrackCard'
import FanCard from '../fan/FanCard'
import { Container, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'

const UserLanding = () => {    
    const acct = useSelector(state => state.user.data)
    const user = acct.artist || acct.fan
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ view, setView ] = useState('')

    useEffect(() => {
        console.log(view)
    }, [])

    const handleEdit = () => {
        navigate('/artists/edit')
    }

    if (user) {

        const { 
            name, 
            img, 
            id, 
            upcoming_events, 
            fan_followers, 
            artist_followers,
            followed_artists,
            favorited_tracks,
            events_attending,
            user_id,
            created_at,
            genres,
            username 
        } = user

        return(
        <>
            <h2 
                className='visible rounded-pill mb-1 mx-8 shadow'
                style={{
                    backgroundColor: '#FFB120',
                    color: 'white',
                    padding: '10px',
                    width: '12vw',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: '1vh',
                    marginBottom: '1vh'
                    }}>
                HOME
            </h2>

            <div id={user_id} style={{ textAlign: 'center', display: 'flex', flexDirection: 'row', width: '100%' }}>
            {/* Left half for followed artist cards */}
            <div style={{ flex: '1', padding: '10px' }}>
                <h6
                className='visible rounded-pill mb-1 mx-8 shadow' // Applying the same classes as h2
                style={{
                    cursor: 'pointer',
                    backgroundColor: '#FFB120',
                    color: 'white',
                    padding: '10px',
                    width: '12vw',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: '1vh',
                    marginBottom: '1vh',
                }}
                >
                Favorite Artists
                </h6>
                <div id="liked-artists">
                {followed_artists && followed_artists.map(artist => artist && (
                    <ArtistCard key={`followed ${artist.id}`} artist={artist} />
                ))}
                </div>
            </div>

            {/* Right half with three equal-sized divs */}
            <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
            <Container style={{ textAlign: 'center', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <h6 
                    className='visible rounded-pill mb-1 mx-8 shadow'
                    onClick={() => setView('events')}
                    style={{
                    cursor: 'pointer',
                    backgroundColor: '#FFB120',
                    color: 'white',
                    padding: '10px',
                    marginTop: '1vh',
                    marginBottom: '1vh',
                    display: 'inline-flex',
                    flexShrink: 0,
                    }}
                >
                    Events
                </h6>
                <h6 
                    className='visible rounded-pill mb-1 mx-8 shadow'
                    onClick={() => setView('followers')}
                    style={{
                    cursor: 'pointer',
                    backgroundColor: '#FFB120',
                    color: 'white',
                    padding: '10px',
                    marginTop: '1vh',
                    marginBottom: '1vh',
                    display: 'inline-flex',
                    flexShrink: 0,
                    }}
                >
                    Followers
                </h6>
                <h6 
                    className='visible rounded-pill mb-1 mx-8 shadow'
                    onClick={() => setView('tracks')}
                    style={{
                    cursor: 'pointer',
                    backgroundColor: '#FFB120',
                    color: 'white',
                    padding: '10px',
                    marginTop: '1vh',
                    marginBottom: '1vh',
                    display: 'inline-flex',
                    flexShrink: 0,
                    }}
                >
                    Tracks
                </h6>
            </Container>

            {view === 'followers' &&
                <div style={{ flex: '1', padding: '10px' }}>
                <div>
                    {fan_followers && fan_followers.map(fan => fan && (
                    <FanCard key={fan.id} fan={fan} />
                    ))}
                    {artist_followers && artist_followers.map(artist => artist && (
                    <ArtistCard key={`follower ${artist.id}`} artist={artist} />
                    ))}
                </div>
                </div>
            }

            {/* Div 2 - Tracks */}
            {view === 'tracks' &&
            <div style={{ flex: '1', padding: '10px' }}>
            <div>
                {favorited_tracks && favorited_tracks.map(track => track && (
                <TrackCard key={track.id} track={track} />
                ))}
            </div>
            </div>
            }

            {/* Div 3 - Events */}
            {view === 'events' &&
            <div style={{ flex: '1', padding: '10px' }}>
            <div id="events-attending-div">
                {events_attending && events_attending.map(event => event && (
                <EventCard key={event.id} event={event} />
                ))}
            </div>
            </div>
            }
        </div>
        </div>
        </>
    )} else if (user && user.fan) {
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
            {/* <h1 
    className='visible rounded-pill mb-1 mx-8'
    style={{
        backgroundColor: '#FFB120',
        color: 'white',
        padding: '10px',
        width: '30vw',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '1vh',
        marginBottom: '1vh'
        }}>
    HOME
    </h1>
            <div id={user_id}>
                <div id='profile-info'>
                    <h1>ProfileInfo</h1>
                    <h4>Username: {username}</h4>
                        <h2>{name}</h2>
                        <img src={img} alt={name}/>
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
            </div> */}
        </>
        )
    }
}

export default UserLanding