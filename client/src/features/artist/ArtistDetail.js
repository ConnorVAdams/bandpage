import  { useParams, useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOneArtist } from './artistSlice'
import NotFound from '../../components/NotFound'
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom'
import TrackCard from '../track/TrackCard'
import EventCard from '../event/EventCard'
import ArtistCard from './ArtistCard'
import FanCard from '../fan/FanCard'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useAdmin } from './adminContext';


const ArtistDetail = () => {
    const artist = useSelector(state => state.artist.current)
    const admin = useAdmin()

    if (artist) {
        const {id, bio, tracks, upcoming_events } = artist 
        
        const topTrack = tracks.reduce((maxTrack, currentTrack) => {
            return currentTrack.likes > maxTrack.likes ? currentTrack : maxTrack;
            }, tracks[0])
        
            const nextEvent = upcoming_events[0]

        return (
            <Container>
                <Container>
                    <p>{bio}</p>
                </Container>
                <Container>
                    <h3>Top Track</h3>
                    {topTrack ?
                    <TrackCard 
                    key={topTrack.id} 
                    track={topTrack}
                    admin={admin}/>
                    :
                    'No tracks liked yet!'}
                </Container>

                <Container>
                    <h3>Next Event</h3>
                    {nextEvent ?
                        <EventCard 
                        key={nextEvent.id} 
                        event={nextEvent} 
                        admin={admin}/>
                        :
                        'No events scheduled yet!'}
                </Container>

            </Container>

            )
        }
    }
    
    export default ArtistDetail