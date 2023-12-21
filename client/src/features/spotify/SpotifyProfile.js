import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Card, Container, Image, Button, Row, Col } from 'react-bootstrap'
import { getSpotifyRefreshToken, getSpotifyToken } from "../../utils/main";
import { useSelector } from "react-redux";

const SpotifyProfile = () => {
    const spotify = useSelector(state => state.user.spotify)
    const [ spotProf, setSpotProf ] = useState(null)
    const [ Artists, setArtists ] = useState(null)

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