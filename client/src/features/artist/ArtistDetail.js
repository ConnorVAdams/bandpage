import { useSelector } from 'react-redux'
import NotFound from '../../components/NotFound'
import TrackCard from '../track/TrackCard'
import EventCard from '../event/EventCard'
import { Container } from 'react-bootstrap';


const ArtistDetail = () => {
    const artist = useSelector(state => state.artist.current)
    

    if (artist) {
        const {id, bio, tracks, upcoming_events } = artist 
        
        const topTrack = tracks.reduce((maxTrack, currentTrack) => {
            return currentTrack.likes > maxTrack.likes ? currentTrack : maxTrack;
            }, tracks[0])
        
            const nextEvent = upcoming_events[0]

        return (
            <div id={id}>
            <Container>
                
                <Container className='custom-text' style={{ padding: '10px', paddingLeft: '15px', paddingRight: '15px', borderRadius: '35px', backgroundColor: '#6D6466' }}>
                    <h6 style={{ marginLeft: '15px', marginRight: '15px' }}>{bio}</h6>
                </Container>

                <Container style={{ display: 'flex' }}>

                <Container style={{
                    padding: '10px',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    flexDirection: 'column',
                }}>
                    <h4 style={{
                        marginTop: '0px',
                        width: '175px',
                        color: '#CFCD67',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        textAlign: 'center',
                        backgroundColor: '#585052'
                    }} className="d-inline-block p-2 rounded-pill shadow" >Top Track</h4>
                    {topTrack ?
                    <TrackCard 
                    key={topTrack.id} 
                    track={topTrack}/>
                    :
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        marginTop: '50px'
                        }}>
                        <h5 style={{ textAlign: 'center' }} className='custom-text mb-4'>No liked tracks yet!</h5>
                    </div>  }
                </Container>

                <Container style={{
                    padding: '10px',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    flexDirection: 'column'
                }}>
                <h4 style={{
                        width: '175px',
                        color: '#CFCD67',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        textAlign: 'center',
                        backgroundColor: '#585052'
                    }} className="d-inline-block p-2 rounded-pill shadow" >Next Event</h4>
                    {nextEvent ?
                        <EventCard 
                        key={nextEvent.id} 
                        event={nextEvent} />
                        :
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            marginTop: '50px'
                            }}>
                            <h5 style={{ textAlign: 'center' }} className='custom-text mb-4'>No events yet!</h5>
                        </div>  }
                </Container>
                </Container>

            </Container>
            </div>

            )
        }
    }
    
    export default ArtistDetail