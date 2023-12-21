import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { Card, Container, Image, Button, Row, Col } from 'react-bootstrap'
import { getSpotifyRefreshToken, getSpotifyToken } from "../../utils/main";

const SpotifyProfile = () => {
    const [spotProf, setSpotProf ] = useState(null)

    const fetchProf = async () => {
        const response = fetch('/my_spotify_prof')
        if (response.ok) {
            debugger
        } else {
            debugger
        }
    }
    
    useEffect(() => {
        fetchProf()
    }, [])

    if (spotProf) {
        return (
            <Card className="mt-4 mb-4 p-3 shadow" style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#f8f9fa' }}>
                <Card.Body className="text-center">
                    <Container>
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
                    className="mt-4"
                    style={{ backgroundColor: '#1DB954', borderColor: '#1DB954' }}
                    >
                    Visit My Spotify Webpage
                    </Button>
                </Card.Body>
                </Card>
        );
    }
    };
    
    export default SpotifyProfile;