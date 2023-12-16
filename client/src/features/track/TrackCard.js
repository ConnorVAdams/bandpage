import { Link, useParams } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { FaPlayCircle } from 'react-icons/fa';
import { FaCheck, FaTimes, FaTrash, FaPencilAlt } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const TrackCard = ({ track, userTracks, admin }) => {

    const { id, name, audio, artist_name } = track

    const isLiked = userTracks.some((userEvent) => userEvent.id === id)

    const handleClick = () => {

    }

    console.log(admin)

    return (
        
    <Card id={id} className="mb-3">
        <Card.Body>
            <Row className="justify-content-between">
            <Col xs="auto">
                <FaPlayCircle size={50} />
            </Col>
            <Col>
                <Card.Title>{name}</Card.Title>
            </Col>
            <Col className='ml-auto'>
            <Button
                variant={isLiked ? 'success' : 'danger'}
                onClick={handleClick}
                className="mr-2 mb-2"
                >
            {isLiked ? <FaCheck /> : <FaTimes />} {isLiked ? 'Liked' : 'Like'}
            </Button>
            {admin ? 
                <>
                <FaPencilAlt/> <FaTrash/>
                </> 
                : 
                null}
            </Col>
            </Row>
        </Card.Body>
        </Card>
    );
}

export default TrackCard