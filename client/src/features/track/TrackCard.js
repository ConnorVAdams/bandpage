import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { FaPlayCircle, FaRecordVinyl, FaUser } from 'react-icons/fa';
import { FaCheck, FaTimes, FaTrash, FaPencilAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import { fetchPostLike, fetchDeleteLike } from '../like/likeSlice';
import { fetchCurrentUser } from '../user/userSlice';
import { Link } from 'react-router-dom';

const TrackCard = ({ track }) => {
    const { id, name, audio, artist_name, artist_id } = track
    const [ likeValues, setLikeValues ] = useState(
        {
            likeable_type: 'track',
            likeable_id: null,
            liker_type: null,
            artist_id: null,
            fan_id: null,
        }
    )
    
    const dispatch = useDispatch()

    const acct = useSelector(state => state.user.data)
    const user = useSelector(state => state.user.data.artist || state.user.data.fan)

    const admin = user.id === track.artist_id

    const inUserTracks = user.favorited_tracks.some(track => track.id === id);

    useEffect(() => {
        if (track && user) {
            const newValues = {
                likeable_type: 'track',
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

    const handleClick = async () => {
        // debugger
        if (inUserTracks) {
            const track = user.favorited_tracks.find(track => track.id === id)
            const like_id = track.likes.find(like => acct.artist ? like.artist_id : like.fan_id).id
            const resp = await dispatch(fetchDeleteLike(like_id));
            
            if (resp) {
                dispatch(fetchCurrentUser())
            }
        } else {
            const resp = await dispatch(fetchPostLike(likeValues));
            if (resp.payload === 201) {
                dispatch(fetchCurrentUser())
            }
        }
    };

    return (

        <Card id={id} className="gray-pill-shape" style={{ width: '80%', backgroundColor: '#6D6466', borderRadius: '100px', display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'relative', margin: 'auto', marginTop: '10px', marginBottom: '10px' }} >
            <Card.Body style={{ backgroundColor: 'transparent' }}>
                {/* Gray oblong pill shape */}
                <div className="gray-pill-shape" style={{ width: '100%', backgroundColor: '#6D6466', borderRadius: '100px', display: 'flex', flexDirection: 'row', alignItems: 'center', paddingTop: '10px', paddingBottom: '10px', position: 'relative', margin: 'auto', marginTop: '5px', marginBottom: '5px' }}>
                    {/* Left margin for the icon */}
                    <div style={{ marginLeft: '40px', marginRight: '20px' }}>
                        <FaPlayCircle size={80} />
                    </div>
        
                    <Container style={{ display: 'flex', flexDirection: 'column', padding: '0px', width: '100%' }}>
                        <Container className='custom-text' style={{ width: '100%', padding: '0px' }}>
                            {/* Title and Artist */}
                            <div style={{ marginBottom: 'auto', marginTop: 'auto', display: 'flex', flexDirection: 'column' }} xs={4} md={8}>
                                <h4 style={{ color: 'white', display: 'inline', marginTop: 'auto', marginBottom: 'auto', marginLeft: '0px' }}><FaRecordVinyl style={{ color: 'black', marginRight: '5px'}} />{name}</h4>
                                
                                <h6 as={Link} to={`/artists/${artist_id}`} style={{ color: 'white' }}><FaUser style={{ color: 'black', marginLeft: '9px', marginRight: '4px' }} /> {artist_name}</h6>
                            </div>
                        </Container>
        
                        {/* Event details */}
                        <Container style={{ display: 'flex', padding: '0px' }}>
                            <Container style={{ marginTop: '10px', marginBottom: 'auto', padding: '0px' }}>
                                <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '0px' }}>
                                    <Button variant={inUserTracks ? 'success' : 'danger'} onClick={handleClick} className="d-inline-block p-2 rounded-pill shadow" style={{ width: '120px', height: '40px', border: 'none', cursor: 'pointer', background: inUserTracks ? '#43CE2B' : '#141416', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', marginLeft: '5px', marginRight: '5px', marginTop: 'auto', marginBottom: 'auto' }}>
                                    {!inUserTracks ? 'Like' : 'Liked'} {inUserTracks ? <FaCheck /> : null }
                                    </Button>
                                </div>
                            </Container>
                        </Container>
                    </Container>
                </div>
            </Card.Body>
        </Card>
    );
}

export default TrackCard