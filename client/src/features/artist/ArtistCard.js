import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchOneArtist } from './artistSlice'
import { Card, Button, Row, Col, Image, Container } from 'react-bootstrap';
import { FaPlayCircle, FaCheck, FaTimes, FaPencilAlt, FaTrash, FaCalendar, FaMapMarker, FaMusic } from 'react-icons/fa';
import { convertDateFormat } from '../../utils/helpers'
import { useSelector } from 'react-redux';
import { setArtist } from './artistSlice';
import { toast } from 'react-hot-toast';

const ArtistCard = ({ artist, admin }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const path = useLocation().pathname
    const user = useSelector(state => state.user.data.artist || state.user.data.fan)
    
    const inUserFollows = user.followed_artists && user.followed_artists.some((userFollow) => userFollow.id === user.id)
    console.log(inUserFollows)

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
    
        // // let num_followed = []
        // // let num_followers = []
    
        // // num_followers = [...fan_followers, ...artist_followers].length
        // // num_followed = followed_artists.length
    
    
    
        const handleClick = () => {
            // try {
                const { payload } = dispatch(fetchOneArtist(id))
                if (typeof payload !== "string") {
                    dispatch(setArtist(payload))
                } else {
                    toast.error(payload)
                }
            // } catch (error) {
            //     console.error('Error fetching artist:', error);
            // }
        };
    
        const handleFollow = () => {
    
        }
    
        return (
            <Card id={id} className="mb-3">
                <Card.Body>
                <Container
                    as={Link}
                    to={`/artists/${id}`}
                    onClick={handleClick}
                    style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    textDecoration: 'none',
                    color: 'black'
                    }}
                >
                    <Container style={{ width: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        src={img}
                        style={{
                        border: '3px solid black',
                        width: '150px',
                        height: '150px',
                        padding: '0',
                        }}
                        roundedCircle
                    />
                    {/* <div className='text-center'>{num_followers} Followers</div>
                    <div className='text-center'>{num_followed} Followed</div> */}
                    {/* {(!admin && path !== '/artists') || inUserFollows ? (
                        <Button
                        variant={inUserFollows ? 'success' : 'danger'}
                        onClick={handleFollow}
                        className="mr-2 mb-2"
                        >
                            {inUserFollows ? 'Following' : 'Follow'}
                        </Button>
                    ) : null} */}
                    </Container>
                    <Container style={{ width: '1000%' }}>
                    <h2>{name}</h2>
                    <Row
                        style={{
                        alignItems: 'center',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '20px'
                        }}
                        
                    >
                        <Col xs={2} md={4}>
                        <h6>
                            <FaCalendar /> Est. {convertDateFormat(created_at)}
                        </h6>
                        </Col>
                        <Col xs={2} md={4}>
                        <h6>
                            <FaMapMarker /> {location}
                        </h6>
                        </Col>
                        <Col xs={2} md={4}>
                        <h6>
                            <FaMusic /> {genres}
                        </h6>
                        </Col>
                    </Row>
                    <Container
                        style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        
                        }}
                    >
                        <Button as={Link} to={`/artists/${id}`}>
                        About
                        </Button>
                        <Button as={Link} to={`/artists/${id}/events`}>
                        Events
                        </Button>
                        <Button as={Link} to={`/artists/${id}/tracks`}>
                        Music
                        </Button>
                    </Container>
                    </Container>
                    </Container>
                </Card.Body>
            </Card>
            )
    }
    
    export default ArtistCard