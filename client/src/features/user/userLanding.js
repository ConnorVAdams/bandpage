import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link, useLocation } from 'react-router-dom'
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
    const loc = useLocation()

    useEffect(() => {
        // console.log(user.followed_artists)
    }, [user])

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
                <div id={user_id} style={{ textAlign: 'center', display: 'flex', flexDirection: 'row', height: '68vh', width: '100%', marginTop: '20px' }}>
                <div style={{ overflow: 'auto', position: 'relative', display: 'flex', width: '50%' }}>
                    <Container>
                    <h5
                        className='visible rounded-pill mb-1 mx-8 shadow'
                        style={{
                        borderRadius: '20px',
                        cursor: 'pointer',
                        backgroundColor: '#FFB120',
                        color: 'white',
                        padding: '10px',
                        width: '160px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: '5px'
                        }}
                    >
                        ARTISTS
                    </h5>
                    {/* <div style={{ flex: '1', padding: '30px', backgroundColor: '#6D6466', borderRadius: '30px', marginTop: '10px', marginRight: '15px', height: '61.75vh' }}> */}
                        <div style={{ minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} id="liked-artists">
                        
                        {followed_artists && followed_artists.map(artist => artist && (
                            <ArtistCard key={`followed ${artist.id}`} artist={artist} />
                        ))}
                        {user.followed_artists.length === 0 && (
                            <Container style={{ textAlign: 'center' }}>
                            <h5 className='custom-text mb-4'>Start exploring to find your <br/> next favorite artist.</h5>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                className="d-inline-block p-2 rounded-pill shadow"
                                style={{ width: '150px', border: 'none', cursor: 'pointer', background: '#141416' }}
                                as={Link}
                                to="/artists"
                                >
                                Explore
                                </Button>
                            </div>
                            </Container>
                        )}
                        </div>
                    {/* </div> */}
                    </Container>
                </div>
            
                <div style={{ overflow: 'auto', flex: '1', display: 'flex', flexDirection: 'column', width: '50%' }}>
                    <Container style={{ textAlign: 'center', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '40px', paddingRight: '40px' }}>
                    
                    <h6
                    className={`visible rounded-pill mb-1 mx-8 shadow ${view === 'events' ? 'active-view' : ''} `}
                    onClick={() => setView('events')}
                    style={{
                        borderRadius: '20px',
                        cursor: 'pointer',
                        backgroundColor: '#FFB120',
                        color: 'white',
                        padding: '10px',
                        width: '150px',
                        marginLeft: '15px',
                        marginRight: '15px',
                        marginBottom: '10px'
                    }}
                    >
                    EVENTS
                    </h6>
                    <h6
                    className={`visible rounded-pill mb-1 mx-8 shadow ${view === 'tracks' ? 'active-view' : ''}`}
                    onClick={() => setView('tracks')}
                    style={{
                        borderRadius: '20px',
                        cursor: 'pointer',
                        backgroundColor: '#FFB120',
                        color: 'white',
                        padding: '10px',
                        width: '150px',
                        marginLeft: '15px',
                        marginRight: '15px',
                        marginBottom: '10px'
                    }}
                    >
                    TRACKS
                    </h6>
                    </Container>

                    {(view === 'events' || loc.pathname === '/landing') && view !== 'followers' && view !== 'tracks' && (
                    <div style={{ flex: '1', backgroundColor: 'transparent', borderRadius: '30px', marginRight: '10px', marginLeft: '25px' }}>
                        <div style={{ overflow: 'auto', maxHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', }} id="events-attending">
                            {events_attending && events_attending.map(event => event && (
                            <EventCard key={event.id} event={event} />
                            ))}

                            {user.events_attending.length === 0 && (
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-evenly',
                                    marginTop: '50px'
                                    }}>
                                    <h5 style={{ textAlign: 'center' }} className='custom-text mb-4'>No events yet!</h5>
                                </div>  
                            )}
                        </div>
                        </div>
                    )}

                    {view === 'followers' &&
                    <div style={{ flex: '1', backgroundColor: 'transparent', borderRadius: '30px', marginRight: '10px', marginLeft: '25px' }}>
                        <div style={{ overflow: 'auto', maxHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', }} id="followers">
                        
                        {fan_followers && fan_followers.map(fan => fan && (
                        <FanCard key={fan.id} fan={fan} />
                        ))}

                        {artist_followers && artist_followers.map(artist => artist && (
                        <ArtistCard key={`follower ${artist.id}`} artist={artist} />
                        ))} 

                        {user.fan_followers.length === 0 && user.artist_followers.length === 0 && (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            marginTop: '50px'
                            }}>
                            <h5 style={{ textAlign: 'center' }} className='custom-text mb-4'>No followers yet!</h5>
                        </div>
                        )}
                        </div>
                    </div>}

                    {view === 'tracks' &&
                    <div style={{ flex: '1', backgroundColor: 'transparent', borderRadius: '30px', marginRight: '10px', marginLeft: '25px' }}>
                        <div style={{ overflow: 'auto', maxHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', }} id="favorited-tracks">
                        
                        {favorited_tracks && favorited_tracks.map(track => track && (
                        <TrackCard key={track.id} track={track} />
                        ))}
                    
                        {user.favorited_tracks.length === 0 && (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            marginTop: '50px'
                            }}>
                            <h5 style={{ textAlign: 'center' }} className='custom-text mb-4'>No tracks yet!</h5>
                            </div>
                        )}
                        </div>
                    </div>}

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
                favorited_tracks,
                events_attending
            },
            user_id,
            username 
            } = user

        return (
            <>
            <div id={user_id} style={{ textAlign: 'center', display: 'flex', flexDirection: 'row', height: '68vh', width: '100%', marginTop: '20px' }}>
            <div style={{ position: 'relative', display: 'flex', width: '50%' }}>
                <Container>
                <h5
                    className='visible rounded-pill mb-1 mx-8 shadow'
                    style={{
                    borderRadius: '20px',
                    cursor: 'pointer',
                    backgroundColor: '#FFB120',
                    color: 'white',
                    padding: '10px',
                    width: '160px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: '5px'
                    }}
                >
                    ARTISTS
                </h5>
                {/* <div style={{ flex: '1', padding: '30px', backgroundColor: '#6D6466', borderRadius: '30px', marginTop: '10px', marginRight: '15px', height: '61.75vh' }}> */}
                    <div style={{ minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} id="liked-artists">
    
                    {followed_artists && followed_artists.map(artist => artist && (
                        <ArtistCard key={`followed ${artist.id}`} artist={artist} />
                    ))}
                    {user.followed_artists.length === 0 && (
                        <Container style={{ textAlign: 'center' }}>
                        <h5 className='custom-text mb-4'>Start exploring to find your <br/> next favorite artist.</h5>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                            className="d-inline-block p-2 rounded-pill shadow"
                            style={{ width: '150px', border: 'none', cursor: 'pointer', background: '#141416' }}
                            as={Link}
                            to="/artists"
                            >
                            Explore
                            </Button>
                        </div>
                        </Container>
                    )}
                    </div>
                {/* </div> */}
                </Container>
            </div>
        
            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', width: '50%' }}>
                <Container style={{ textAlign: 'center', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '40px', paddingRight: '40px' }}>
                
                <h6
                className={`visible rounded-pill mb-1 mx-8 shadow ${view === 'events' ? 'active-view' : ''} `}
                onClick={() => setView('events')}
                style={{
                    borderRadius: '20px',
                    cursor: 'pointer',
                    backgroundColor: '#FFB120',
                    color: 'white',
                    padding: '10px',
                    width: '150px',
                    marginLeft: '15px',
                    marginRight: '15px',
                    marginBottom: '10px'
                }}
                >
                EVENTS
                </h6>
                <h6
                className={`visible rounded-pill mb-1 mx-8 shadow ${view === 'tracks' ? 'active-view' : ''}`}
                onClick={() => setView('tracks')}
                style={{
                    borderRadius: '20px',
                    cursor: 'pointer',
                    backgroundColor: '#FFB120',
                    color: 'white',
                    padding: '10px',
                    width: '150px',
                    marginLeft: '15px',
                    marginRight: '15px',
                    marginBottom: '10px'
                }}
                >
                TRACKS
                </h6>
                </Container>

                {(view === 'events' || loc.pathname === '/landing') && view !== 'followers' && view !== 'tracks' && (
                <div style={{ flex: '1', backgroundColor: 'transparent', borderRadius: '30px', marginRight: '10px', marginLeft: '25px' }}>
                    <div style={{ overflow: 'auto', maxHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', }} id="events-attending">
                        {events_attending && events_attending.map(event => event && (
                        <EventCard key={event.id} event={event} />
                        ))}

                        {user.events_attending.length === 0 && (
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                                marginTop: '50px'
                                }}>
                                <h5 style={{ textAlign: 'center' }} className='custom-text mb-4'>No events yet!</h5>
                            </div>  
                        )}
                    </div>
                    </div>
                )}

                {view === 'tracks' &&
                <div style={{ flex: '1', backgroundColor: 'transparent', borderRadius: '30px', marginRight: '10px', marginLeft: '25px' }}>
                    <div style={{ overflow: 'auto', maxHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', }} id="favorited-tracks">
                    
                    {favorited_tracks && favorited_tracks.map(track => track && (
                    <TrackCard key={track.id} track={track} />
                    ))}
                
                    {user.favorited_tracks.length === 0 && (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        marginTop: '50px'
                        }}>
                        <h5 style={{ textAlign: 'center' }} className='custom-text mb-4'>No tracks yet!</h5>
                        </div>
                    )}
                    </div>
                </div>}

            </div>
        </div>
        </>
        )
    }
}

export default UserLanding