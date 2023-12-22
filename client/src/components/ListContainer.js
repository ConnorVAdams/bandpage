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
        
    // const sortArtistsAlphabetically = (artistsArray) => {
    //         const sortedArtists = [...artistsArray]; // Create a copy of the artists array
        
    //         sortedArtists.sort((a, b) => {
    //         const nameA = a.name.toLowerCase();
    //         const nameB = b.name.toLowerCase();
        
    //         if (nameA < nameB) {
    //             return -1;
    //         }
    //         if (nameA > nameB) {
    //             return 1;
    //         }
    //         return 0;
    //         });
        
    //         return sortedArtists;
    //     };
        
    const searchArtistsByName = (artistsArray, searchTerm) => {
        if (!searchTerm) {
        return artistsArray; // Return the original array if searchTerm is empty
        }
    
        const filteredArtists = artistsArray.filter((artist) =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
        return filteredArtists;
    };

    let sortedAndFilteredArtists = artists;

    if (searchObj.search) {
    sortedAndFilteredArtists = searchArtistsByName(sortedAndFilteredArtists, searchObj.search);
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

    const searchComponent = () => {
        return (
            <form style={{ marginRight: 'auto', marginLeft: ' auto' }} className="search-form">
                <div className="search-list-sort">
                <div className="search-bar">
                    <label htmlFor="search">

                    </label>
                    <input
                    onChange={(e) => handleSearchChange(e)}
                    id="search"
                    name="search"
                    type="text"
                    placeholder="Search by name"
                    value={searchObj.search}
                    style={{ marginTop: '10px', minWidth: '250px', borderRadius: '25px'}}
                    />
                </div>
                {/* <div>
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
                </div> */}
                </div>
            </form>
            );
        };

    const searchBox = searchComponent()

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
                            {path === '/artists' && searchBox}
                            {
                                !searchObj.search
                                    ? (artists &&
                                        artists.map((artist) => (
                                        <ArtistCard key={artist.id} artist={artist} />
                                        )))
                                    : (sortedAndFilteredArtists &&
                                        sortedAndFilteredArtists.map((artist) => (
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


    return (
        <Container style= {{ overflow: 'auto' }}fluid>
        <Row>
            {/* Search, Sort, Filter Utility Box */}
            {/* <Col md={4}>
            </Col>
            <Col md={8} style={{ maxHeight: '70vh', overflowY: 'auto' }}> */}
                <ListGroup style= {{ overflow: 'auto' }}>

                    {cardDisplay}
                </ListGroup>
            {/* </Col> */}
        </Row>
        </Container>
    );
};

export default ListContainer;