import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Card, Button, Row, Col, Image, Container } from 'react-bootstrap';
import { FaBook, FaCalendar, FaFolderPlus, FaMapMarker, FaMusic, FaPlay, FaScroll, FaUser, FaUserPlus } from 'react-icons/fa';
import { convertDateFormat } from '../../utils/helpers'
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { fetchDeleteLike, fetchPostLike } from '../like/likeSlice';
import { fetchCurrentUser } from '../user/userSlice';
import { useEffect, useState } from 'react';

const SpotifyArtistCard = ({ artist }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loc = useLocation()
    const path = useLocation().pathname
    const user = useSelector(state => state.user.data.artist || state.user.data.fan)
    const acct = useSelector(state => state.user.data)
    const admin = user.id === artist.id
    const [ view, setView ] = useState()

    const defaultValues = {
        likeable_type: 'artist',
        likeable_id: null,
        liker_type: null,
        artist_id: null,
        fan_id: null,
    }

    const [ likeValues, setLikeValues ] = useState(defaultValues)
    
    useEffect(() => {
        if (artist && user) {
            const newValues = {
                likeable_type: 'artist',
                likeable_id: id,
                liker_type: !user.artist ? 'artist' : 'fan',
                // artist_id: acct.artist || acct.artist.id,
                // fan_id: acct.fan || acct.fan.id,
                ...(user
                    ? { 
                        artist_id: user.id,
                        fan_id: null
                        }
                    : {                         
                        artist_id: null ,
                        fan_id: user.id
                    }),
                };
            setLikeValues(newValues)
        }
    }, [])

        const { 
            id, 
            name, 
            location, 
            images, 
            genres, 
            followers, 
            popularity,
            external_urls,
            fan_followers,
            followed_artists,
            created_at
        } = artist 

    const inUserFollows = user.followed_artists.some(artist => artist.id === id);

        const handleClick = () => {
            try {
                // const { payload } = dispatch(fetchOneArtist(id))
                // if (typeof payload !== "string") {
                //     dispatch(setArtist(payload))
                // } else {
                //     toast.error(payload)
                // }
            } catch (error) {
                console.error('Error fetching artist:', error);
            }
        };

        // debugger

        return (
    <Card id={id} 
    style={{
        width: '90%',
        height: '17vh',
        backgroundColor: 'rgba(109, 100, 102, 0.5)', // Adjust the color and transparency here
        borderRadius: '100px',
        border: 'none',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        margin: 'auto', // Center the card
        marginTop: '20px',
        marginBottom: '10px',
        boxShadow: '0 0 10px 10px rgba(109, 100, 102, 0.5)', // Apply a fuzzy border effect
        }}
        className="mb-3">
        <Card.Body style={{ backgroundColor: 'transparent' }}>
            {/* Gray oblong pill shape */}
            <div
            className="gray-pill-shape"
            style={{
                width: '98%',
                backgroundColor: '#6D6466',
                borderRadius: '100px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: '10px',
                paddingBottom: '10px',
                position: 'relative',
                margin: 'auto',
                marginTop: '5px',
                marginBottom: '5px'
            }}
            >
            {/* Left margin for the image */}
            <Link to={external_urls.spotify} target='_blank' style={{ marginLeft: '40px', marginRight: '20px' }}>
            <Image
                src={images[0].url}
                style={{
                    border: !inUserFollows ? '5px solid black' : '5px solid #43CE2B',
                    width: '150px',
                    height: '150px',
                    padding: '0',
                    borderRadius: '50%'
                }}
            />
            </Link>

        <Container style={{ display: 'flex', flexDirection: 'column', padding: '0px'}}>
            <Container className='custom-text' style={{ width: '100%', padding: '0px' }}>
                {/* Name, genres, location, and established date */}
                <div style={{ 
                    marginBottom: 'auto', 
                    marginTop: 'auto',
                    display: 'flex',
                    justifyContent: 'left',
                    flexDirection: 'row' }} xs={4} md={8}>
                <Link to={`/artists/${id}`}>
                <h2 style={{ 
                    display: 'inline',
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    marginRight: '0px',
                    
                }}>{name}</h2>
                </Link>
                </div>
    {(loc.pathname === '/landing') ? null :
        <>
            <div style={{ 
            display: 'flex', 
            marginTop: '4px'
            }}>
                <div style={{ marginBottom: 'auto', marginTop: 'auto', width: '50%' }} >
                    <h6>
                        <FaMusic style={{ color: 'black', marginBottom: '4px' }} /> {genres[0]}
                    </h6>
                </div>
            </div>
        </>}

            </Container>

            {/* Stats and follow button */}
            <Container style={{ 
                display: 'flex', 
                padding: '0px' 
            }}>

            <Container 
                style ={{                     
                    marginTop: '10px',
                    marginBottom: 'auto',
                    padding: '0px'
                }}>
                <div 
                style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    padding: '0px',
                    flexDirection: (loc.pathname === '/landing') ? 'column' : 'row'
                }}>

                {(loc.pathname === '/landing') ? null :
                    <>
                <Container style={{ width: '40%', display: 'flex', flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto', padding: '10px' }}>
                    <div style={{ textAlign: 'left' }} className='text-center custom-text'>
                        {followers.total} Followers
                    </div>
                    <div style={{ textAlign: 'left' }} className='text-center custom-text'>
                        {popularity} % Rating
                    </div>
                </Container>
        </>}
            
            <Container style={{ marginTop: 'auto', marginBottom: 'auto', textAlign: 'center', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: (loc.pathname === '/landing') ? '0px' : '10px' }}>
                <Link to={`/artists/${id}`} className={`visible rounded-pill mb-1 mx-8 shadow ${view === 'events' ? 'active-view' : ''}`} style={{ borderRadius: '20px', cursor: 'pointer', backgroundColor: '#FFB120', color: 'white', padding: '10px', marginLeft: (loc.pathname === '/landing') ? '0px' : '10px', marginRight: '5px', width: /\d/.test(loc.pathname) ? '100px' : '45px' }}>
                    {/\d/.test(loc.pathname) ? 'About' : <FaBook />}
                </Link>
                <Link to={`/artists/${id}/events`} className={`visible rounded-pill mb-1 mx-8 shadow ${view === 'followers' ? 'active-view' : ''}`} style={{ borderRadius: '20px', cursor: 'pointer', backgroundColor: '#FFB120', color: 'white', padding: '10px', marginLeft: '5px', marginRight: '5px', marginBottom: '10px', width: /\d/.test(loc.pathname) ? '100px' : '45px' }}>
                    {/\d/.test(loc.pathname) ? 'Events' : <FaCalendar />}
                </Link>
                <Link to={`/artists/${id}/tracks`} className={`visible rounded-pill mb-1 mx-8 shadow ${view === 'tracks' ? 'active-view' : ''}`} style={{ borderRadius: '20px', cursor: 'pointer', backgroundColor: '#FFB120', color: 'white', padding: '10px', marginLeft: '5px', marginRight: '5px', marginBottom: '10px', width: /\d/.test(loc.pathname) ? '100px' : '45px' }}>
                    {/\d/.test(loc.pathname) ? 'Tracks' : <FaPlay />}
                </Link>
            </Container>

                </div>
            </Container>

            </Container>

            </Container>
            </div>
        </Card.Body>
        </Card>
            )
    }
    
    export default SpotifyArtistCard