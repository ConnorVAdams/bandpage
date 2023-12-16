import { useLocation } from 'react-router-dom';
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
    const artists = useSelector(state => state.artist.data)
    const path = useLocation().pathname
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (path.includes('/artists')) {
            dispatch(fetchAllArtists())
        }
    }, [path])

    const cardComponent = () => {
        if (path.includes('/artists')) {
            return (
                <>
                    {artists && artists.map(
                        artist => <ArtistCard 
                            key={artist.id} 
                            artist={artist} />
                    )}
                </>
            )
            } else if (path.includes('/tracks')) {
                <>
                {acct.artist.tracks && acct.artist.tracks.map(
                    track => <TrackCard 
                        key={track.id} 
                        track={track} />
                )}
            </>

            } else if (path.includes('/events')) {
                <>
                {acct.artist.events && acct.artist.events.map(
                    event => <EventCard 
                        key={event.id} 
                        event={event} />
                )}
            </>
            } else {
                // Default component if the path doesn't match any of the above
                return <NotFound />
            }
    }

    return (
        <Container fluid>
        <h1>EXPLORE ARTISTS</h1>
        <Row>
            {/* Left 1/3: Search, Sort, Filter Utility Box */}
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

            {/* Right 2/3: Container to Hold List Items */}
            <Col md={8}>
            <ListGroup>
                {cardComponent()}
            </ListGroup>
            </Col>
        </Row>
        </Container>
    );
};

export default ListContainer;