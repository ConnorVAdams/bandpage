import { useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, InputGroup, FormControl, ListGroup } from 'react-bootstrap';
import ArtistCard from '../features/artist/ArtistCard';
import TrackCard from '../features/track/TrackCard';
import EventCard from '../features/event/EventCard';
import NotFound from './NotFound';
import { useEffect } from 'react'
import { fetchAllArtists } from '../features/artist/artistSlice';

const ListContainer = () => {
    const acct = useSelector(state => state.user.data)
    const user = useSelector(state => state.user.data.artist)

    const artists = useSelector(state => state.artist.data)
    const artist = useSelector(state => state.artist.current)
    const path = useLocation().pathname
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (path.includes('/artists')) {
            dispatch(fetchAllArtists())
        }
    }, [path])

    const cardComponent = () => {
        if (path.includes('/tracks')) {
            return (
                <>
                <h4 
                        className='visible rounded-pill mb-1 mx-8'
                        style={{
                            backgroundColor: '#FFB120',
                            color: 'white',
                            padding: '10px',
                            width: '18vw',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: '1vh',
                            marginBottom: '1vh',
                            textAlign: 'center'
                            }}>
                                TRACKS
                            </h4>
                {artist.tracks && artist.tracks.map(
                    track => <TrackCard 
                        key={track.id} 
                        track={track} />
                )}
                </>
            )

        } else if (path.includes('/events')) {
            return (
                <>
                <h4 
                        className='visible rounded-pill mb-1 mx-8'
                        style={{
                            backgroundColor: '#FFB120',
                            color: 'white',
                            padding: '10px',
                            width: '18vw',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: '1vh',
                            marginBottom: '1vh',
                            textAlign: 'center'
                            }}>
                                EVENTS
                            </h4>
                {artist.upcoming_events && artist.upcoming_events.map(
                    event => <EventCard 
                        key={event.id} 
                        event={event} />
                )}
                </>
            )
        } else if (path.includes('/artists') && artists) {
            return (
                <>
                    <h4 
                        className='visible rounded-pill mb-1 mx-8'
                        style={{
                            backgroundColor: '#FFB120',
                            color: 'white',
                            padding: '10px',
                            width: '18vw',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: '1vh',
                            marginBottom: '1vh',
                            textAlign: 'center'
                            }}>
                                EXPLORE ARTISTS
                            </h4>
                    {artists && artists.map(
                        artist => <ArtistCard 
                            key={artist.id} 
                            artist={artist} />
                    )}
                </>
            )
            } else {
                // Default component if the path doesn't match any of the above
                return <NotFound />
            }
    }

    const cardDisplay = cardComponent()

    return (
        <Container fluid>
        <Row>
            {/* Search, Sort, Filter Utility Box */}
            <Col md={4}>
            <InputGroup className="mb-3">
                {/* <FormControl
                placeholder="Search..."
                aria-label="Search"
                aria-describedby="basic-addon2"
                value={searchData}
                onChange={handleSearch}
                /> */}
                {/* Add other utility components for sort/filter as needed */}
            </InputGroup>
            </Col>

            <Col md={8} style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <ListGroup>
                    {cardDisplay}
                </ListGroup>
            </Col>
        </Row>
        </Container>
    );
};

export default ListContainer;