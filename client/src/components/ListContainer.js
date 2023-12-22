import { useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, InputGroup, FormControl, ListGroup } from 'react-bootstrap';
import ArtistCard from '../features/artist/ArtistCard';
import TrackCard from '../features/track/TrackCard';
import EventCard from '../features/event/EventCard';
import NotFound from './NotFound';
import { useEffect, useState } from 'react'
import { fetchAllArtists } from '../features/artist/artistSlice';

const ListContainer = () => {
    const acct = useSelector(state => state.user.data)
    const user = useSelector(state => state.user.data.artist)

    const artists = useSelector(state => state.artist.data)
    const artist = useSelector(state => state.artist.current)
    const path = useLocation().pathname
    const dispatch = useDispatch()
    
    const defaultObj = {
        search: '',
        list: '',
        sort: '',
        state: ''
    }
    
    const [searchObj, setSearchObj] = useState(defaultObj)
    
    let filteredArtists
    
    if (searchObj.search) {
        filteredArtists = artists.filter(artist => {
            // Convert both artist name and search string to lowercase for case-insensitive search
            const artistName = artist.name.toLowerCase();
            const searchTerm = searchObj.search.toLowerCase();
            
            // Check if the artist's name includes the search string
            return artistName.includes(searchTerm)
        })
    }

    useEffect(() => {
        if (path.includes('/artists')) {
            dispatch(fetchAllArtists())
        }
    }, [path])

    const handleSearchChange = ({ target: { name, value }}) => {
        setSearchObj(prevSearchObj => ({
        ...prevSearchObj,
        [name]: value
    }));
    };

    const handleReset = () => {
        setSearchObj(defaultObj)
    }

    const cardComponent = () => {
        if (path.includes('/tracks')) {
            return (
                <>
                {artist.tracks && artist.tracks.map(
                    track => <TrackCard 
                        key={track.id} 
                        track={track}
                        searchObj={defaultObj} />
                )}
                </>
            )

        } else if (path.includes('/events')) {
            return (
                <>
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
                            {
                                !searchObj.search
                                    ? (artists &&
                                        artists.map((artist) => (
                                        <ArtistCard key={artist.id} artist={artist} />
                                        )))
                                    : (filteredArtists &&
                                        filteredArtists.map((artist) => (
                                        <ArtistCard key={artist.id} artist={artist} />
                                        )))
                                }
                </>
            )
            } else {
                // Default component if the path doesn't match any of the above
                return <NotFound />
            }
    }

    const cardDisplay = cardComponent()

    const searchComponent = () => {
        return (
            <form className="search-form">
                <div className="search-list-sort">
                <div className="search-bar">
                    <label htmlFor="search">
                    <strong>Search</strong>
                    </label>
                    <input
                    onChange={(e) => handleSearchChange(e)}
                    id="search"
                    name="search"
                    type="text"
                    placeholder="Search by name"
                    value={searchObj.search}
                    />
                </div>
                <div>
                    <label htmlFor="list">
                    <strong>Lists</strong>
                    </label>
                    <select
                    onChange={(e) => handleSearchChange(e)}
                    id="list"
                    name="list"
                    value={searchObj.list}
                    >
                    <option value="All">All</option>
                    <option value="Cards Collected">Cards Collected</option>
                    <option value="Cards Remaining">Cards Remaining</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="sort">
                    <strong>Sort</strong>
                    </label>
                    <select
                    onChange={(e) => handleSearchChange(e)}
                    id="sort"
                    name="sort"
                    value={searchObj.sort}
                    >
                    <option value="Alphabetically">A-Z</option>
                    <option value="Oldest-Newest">Oldest-Newest</option>
                    <option value="Visitors">Visitors</option>
                    </select>
                </div>
                </div>
                <div id="filters-container" className="filters-container">
                <label htmlFor="filters-container">
                    <strong>Filters</strong>
                </label>
                <button onClick={handleReset}>Reset Filters</button>
                </div>
            </form>
            );
        };

    const searchBox = searchComponent()

    
    
    console.log(filteredArtists)

    return (
        <Container fluid>
        <Row>
            {/* Search, Sort, Filter Utility Box */}
            <Col md={4}>
                {path === '/artists' && searchBox}
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