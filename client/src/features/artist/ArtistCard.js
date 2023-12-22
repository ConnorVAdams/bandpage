import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchOneArtist } from './artistSlice'
import { Card, Button, Row, Col, Image, Container } from 'react-bootstrap';
import { FaBook, FaCalendar, FaFolderPlus, FaMapMarker, FaMusic, FaPlay, FaUser, FaUserPlus } from 'react-icons/fa';
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
        backgroundColor: 'rgba(109, 100, 102, 0.5)', // Adjust the color and transparency here
        borderRadius: '100px',
        border: 'none',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        margin: 'auto', // Center the card
        marginTop: '10px',
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
            <div style={{ marginLeft: '40px', marginRight: '20px' }}>
                <Image
                src={img}
                style={{
                    border: '3px solid black',
                    width: '150px',
                    height: '150px',
                    padding: '0',
                    borderRadius: '50%'
                }}
                />
            </div>

        <Container style={{ display: 'flex', flexDirection: 'column', padding: '0px'}}>
            <Container className='custom-text' style={{ width: '100%', padding: '0px' }}>
                {/* Name, genres, location, and established date */}
                <div style={{ 
                    marginBottom: 'auto', 
                    marginTop: 'auto',
                    display: 'flex',
                    flexDirection: 'row' }} xs={4} md={8}>
                <h2 style={{ 
                    display: 'inline',
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    marginLeft: '0px'
                }}>{name}</h2>
                </div>
                <div style={{ display: 'flex', marginTop: '4px' }}>
                    <div style={{ marginBottom: 'auto', marginTop: 'auto', width: '30%' }}>
                        <h6>
                            <FaCalendar style={{ color: 'black', marginBottom: '4px', marginTop: 'auto', }} /> Est. {convertDateFormat(created_at)}
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
                    width: '90px', 
                    height: '40px',
                    border: 'none', 
                    cursor: 'pointer', 
                    background: inUserFollows ? '#43CE2B' : '#141416',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                    marginLeft: '5px',
                    marginRight: '5px'
                }} 
                as={Link} 
                to="/artists"
                >
                    Follow
                </Button>
                ) : null}

                <Container style={{ width: '30%', display: 'flex', flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto', padding: '0px' }}>
                    <div style={{ textAlign: 'left' }} className='text-center custom-text'>
                        {num_followers} Followers
                    </div>
                    <div style={{ textAlign: 'left' }} className='text-center custom-text'>
                        {num_followed} Followed
                    </div>
                </Container>
            
                    <Container style={{ textAlign: 'center', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
    <h6
        className={`visible rounded-pill mb-1 mx-8 shadow ${view === 'events' ? 'active-view' : ''}`}
        onClick={() => setView('events')}
        style={{
            borderRadius: '20px',
            cursor: 'pointer',
            backgroundColor: '#FFB120',
            color: 'white',
            padding: '10px',
            width: '40px',
            marginLeft: '5px',
            marginRight: '5px'
        }}
    >
        <FaBook />
    </h6>
    <h6
        className={`visible rounded-pill mb-1 mx-8 shadow ${view === 'followers' ? 'active-view' : ''}`}
        onClick={() => setView('followers')}
        style={{
            borderRadius: '20px',
            cursor: 'pointer',
            backgroundColor: '#FFB120',
            color: 'white',
            padding: '10px',
            width: '40px',
            marginLeft: '5px',
            marginRight: '5px',
            marginBottom: '10px',
        }}
    >
        <FaUserPlus />
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
            width: '40px',
            marginLeft: '5px',
            marginRight: '5px',
            marginBottom: '10px',
        }}
    >
        <FaPlay />
    </h6>
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