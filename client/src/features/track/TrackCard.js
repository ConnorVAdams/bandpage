import { Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { FaPlayCircle } from 'react-icons/fa';
import { FaCheck, FaTimes } from 'react-icons/fa'

const TrackCard = ({ track }) => {
    const { id, name, audio, artist_name } = track;

    let liked

    const handleClick = () => {

    }

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
                variant={liked ? 'success' : 'danger'}
                onClick={handleClick}
                className="mr-2 mb-2"
                >
            {liked ? <FaCheck /> : <FaTimes />} {liked ? 'Liked' : 'Like'}
            </Button>
            </Col>
            </Row>
        </Card.Body>
        </Card>
    );
}

export default TrackCard