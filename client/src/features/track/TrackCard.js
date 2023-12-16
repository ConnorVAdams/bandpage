import { Link, useParams } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { FaPlayCircle } from 'react-icons/fa';
import { FaCheck, FaTimes, FaTrash, FaPencilAlt } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';

const TrackCard = ({ track, admin }) => {
    const { id, name, audio, artist_name } = track

    const inUserTracks = useSelector(state => {
        const userTracks = state.user.data.artist.favorited_tracks || state.user.data.fan.favorited_tracks
        return userTracks && userTracks.some((userTrack) => userTrack.id === id)
    })

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
                variant={inUserTracks ? 'success' : 'danger'}
                onClick={handleClick}
                className="mr-2 mb-2"
                >
            {inUserTracks ? <FaCheck /> : <FaTimes />} {inUserTracks ? 'Liked' : 'Like'}
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