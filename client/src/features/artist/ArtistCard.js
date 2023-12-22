import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchOneArtist } from './artistSlice'
import { Card, Button, Row, Col, Image, Container } from 'react-bootstrap';
import { FaBook, FaCalendar, FaFolderPlus, FaMapMarker, FaMusic, FaPlay, FaScroll, FaUser, FaUserPlus } from 'react-icons/fa';
import { convertDateFormat } from '../../utils/helpers'
import { useSelector } from 'react-redux';
import { setArtist } from './artistSlice';
import { toast } from 'react-hot-toast';
import { fetchDeleteLike, fetchPostLike } from '../like/likeSlice';
import { fetchCurrentUser } from '../user/userSlice';
import { useEffect, useState } from 'react';

const ArtistCard = ({ artist }) => {
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
            img, 
            genres, 
            artist_followers, 
            fan_followers,
            followed_artists,
            created_at
        } = artist 

    const inUserFollows = user.followed_artists.some(artist => artist.id === id);

    const num_followers = fan_followers && artist_followers && [...fan_followers, ...artist_followers].length
    const num_followed = followed_artists && followed_artists.length

        const handleClick = () => {
            try {
                const { payload } = dispatch(fetchOneArtist(id))
                if (typeof payload !== "string") {
                    dispatch(setArtist(payload))
                } else {
                    toast.error(payload)
                }
            } catch (error) {
                console.error('Error fetching artist:', error);
            }
        };
    
        const handleFollow = async () => {
            // console.log('likeid toplevel', like_id)
            
            if (inUserFollows) {
                const like_id = user.likes.find(like => like.likeable_id === id).id
                // const artist_id = user.followed_artists.find(artist => artist.id === id).id    
                const resp = await dispatch(fetchDeleteLike(like_id));
                if (resp) {
                    dispatch(fetchCurrentUser())
                }
            } else {
                const resp = await dispatch(fetchPostLike(likeValues));
                if (resp.payload === 201) {
                    // console.log('likeid post', like_id)
                    dispatch(fetchCurrentUser())
                }
            }
            navigate(path)
        }

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
            <Link to={`/artists/${id}`} style={{ marginLeft: '40px', marginRight: '20px' }}>
            <Image
                src={img}
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
                    flexDirection: 'row' }} xs={4} md={8}>
                <Link to={`/artists/${id}`}>
                <h2 style={{ 
                    display: 'inline',
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    marginRight: '0px'
                }}>{name}</h2>
                </Link>
                </div>
                <div style={{ display: 'flex', marginTop: '4px' }}>
                    <div style={{ marginBottom: 'auto', marginTop: 'auto', width: '30%' }}>
                        <h6 >
                            <FaScroll style={{ color: 'black', marginBottom: '4px', marginTop: 'auto', }}/> Est. {convertDateFormat(created_at)}
                        </h6> 
                    </div>
                <div style={{ marginBottom: 'auto', marginTop: 'auto', width: '40%' }} >
                    <h6>
                    <FaMapMarker style={{ color: 'black', marginBottom: '4px' }} /> {location}
                    </h6>
                </div>
                <div style={{ marginBottom: 'auto', marginTop: 'auto', width: '25%' }} >
                    <h6>
                    <FaMusic style={{ color: 'black', marginBottom: '4px' }} /> {genres}
                    </h6>
                </div>
                </div>
            </Container>

            {/* Stats and follow button */}
            <Container style={{ 
                display: 'flex', 
                padding: '0px' 
            }}>
            <Container style ={{                     
                    marginTop: '10px',
                    marginBottom: 'auto',
                    padding: '0px'
                }}>
                <div 
                style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    padding: '0px'
                }}>
                    

            {/* Follow button */}
            {(!admin && path !== '/artists') || inUserFollows ? (
                <Button 
                onClick={handleFollow}
                className="d-inline-block p-2 rounded-pill shadow" 
                style={{ 
                    width: '160px', 
                    height: '40px',
                    border: 'none', 
                    cursor: 'pointer', 
                    background: inUserFollows ? '#43CE2B' : '#141416',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                    marginLeft: '5px',
                    marginRight: '5px',
                    marginTop: 'auto',
                    marginBottom: 'auto'
                }} 
                as={Link} 
                to="/artists"
                >
                    {!inUserFollows ? 'Follow' : 'Followed'}
                </Button>
                ) : null}

                <Container style={{ width: '40%', display: 'flex', flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto', padding: '10px' }}>
                    <div style={{ textAlign: 'left' }} className='text-center custom-text'>
                        {num_followers} Followers
                    </div>
                    <div style={{ textAlign: 'left' }} className='text-center custom-text'>
                        {num_followed} Followed
                    </div>
                </Container>
            
            <Container style={{ marginTop: 'auto', marginBottom: 'auto', textAlign: 'center', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <Link to={`/artists/${id}`} className={`visible rounded-pill mb-1 mx-8 shadow ${view === 'events' ? 'active-view' : ''}`} style={{ borderRadius: '20px', cursor: 'pointer', backgroundColor: '#FFB120', color: 'white', padding: '10px', marginLeft: '5px', marginRight: '5px', width: /\d/.test(loc.pathname) ? '100px' : '45px' }}>
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
    
    export default ArtistCard