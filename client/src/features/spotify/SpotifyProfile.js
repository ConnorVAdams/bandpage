import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Card, Container, Image, Button, Row, Col, ListGroup } from 'react-bootstrap'
import { getSpotifyRefreshToken, getSpotifyToken } from "../../utils/main";
import { useSelector } from "react-redux";
import SpotifyArtistCard from "./SpotifyArtistCard";

const SpotifyProfile = () => {
    const spotify = useSelector(state => state.user.spotify)
    const [ spotProf, setSpotProf ] = useState(null)
    const [ artists, setArtists ] = useState(null)

    const fetchProf = async () => {
        try {
            const response = await fetch('/my_spotify_prof');
            const data = await response.json();
    
            if (response.ok) {
                setSpotProf(data.response);
            } else {
                console.log('Failed to fetch user data.');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    const fetchArtists = async () => {
        try {
            const response = await fetch('/my_top_artists');
            const data = await response.json();
    
            if (response.ok) {
                setArtists(data.response);
            } else {
                console.log('Failed to fetch user data.');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };
    
    useEffect(() => {
        fetchProf()
        fetchArtists()
    }, [])

    if (spotProf && artists) {
        const topFive = artists.items.slice(0,20)
        return (
<>
    <Container style={{ display: 'flex' }}>

        <Card className="mt-4 mb-4 p-3 shadow" style={{ borderRadius: '25px', maxWidth: '500px', margin: '0 auto', backgroundColor: '#6D6466' }}>
            <Card.Body className="text-center">
            <Container style={{ color: 'white '}}>
                <h2 className="mb-4" style={{ color: '#1DB954' }}>My Spotify Profile</h2>
                <h4><strong>ID:</strong> {spotProf.id}</h4>
                <h4><strong>Email:</strong> {spotProf.email}</h4>
                <h4><strong>Country:</strong> {spotProf.country}</h4>
                <h4><strong>Followers:</strong> {spotProf.followers.total}</h4>
            </Container>
            <Button
                href={spotProf.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="d-inline-block p-2 rounded-pill shadow"
                style={{ marginTop: '10px', backgroundColor: '#1DB954', borderColor: '#1DB954' }}
            >
                Visit My Spotify Webpage
            </Button>
            </Card.Body>
        </Card>

        <Col md={8} style={{ maxHeight: '70vh', overflowY: 'auto' }}>
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
                                TOP ARTISTS
                            </h4>
            <ListGroup>
            {artists && topFive.map(artist => artist && (
                <SpotifyArtistCard key={artist.id} artist={artist} />
            ))}
            </ListGroup>
        </Col>

        </Container>
    </>
        );
    }
    };
    
    export default SpotifyProfile;