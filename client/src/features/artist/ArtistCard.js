import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchOneArtist } from './artistSlice'
import { Card, Button, Row, Col, Image, Container } from 'react-bootstrap';
import { FaPlayCircle, FaCheck, FaTimes, FaPencilAlt, FaTrash, FaCalendar, FaMapMarker, FaMusic } from 'react-icons/fa';
import { convertDateFormat } from '../../utils/helpers'

function ArtistCard({ artist }) {
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

    const num_followers = [...fan_followers, ...artist_followers].length
    const num_followed = followed_artists.length

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const handleClick = () => {
        dispatch(fetchOneArtist(id))
        if (Object.keys(params).length === 0) {
            navigate(`/artists/${id}`, { replace: true })
        }
    }

    return (
        <Card id={id} className="mb-3">
            <Card.Body>
            <Container
                as={Link}
                to={`/artists/${id}`}
                style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                textDecoration: 'none',
                color: 'black'
                }}
            >
                <Container 
                    style={{ width: '200px' }}>
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
                <div className='text-center'>{num_followers} Followers</div>
                <div className='text-center'>{num_followed} Followed</div>
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