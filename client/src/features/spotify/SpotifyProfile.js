import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Card, Container, Image, Button, Row, Col } from 'react-bootstrap'
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
        const topFive = artists.items.slice(0,5)
        return (
    <>
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

        <h5>My Liked Artists</h5>
            <div id={'liked-artists'}>
                {artists && topFive.map(artist => artist && (
                    <SpotifyArtistCard key={artist.id} artist={artist} />
                ))}
            </div>

        {/* <Container className="mt-4 mb-4 p-3 shadow" style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#f8f9fa' }}>
            <h2 className="mb-4" style={{ color: '#1DB954', textAlign: 'center' }}>Top 10 Artists</h2>
            {artists && artists.map(artist => (
            <Card key={artist.id} className="mb-4">
                <Card.Img variant="top" src={artist.images[0].url} alt={artist.name} />
                <Card.Body>
                <Card.Title>{artist.name}</Card.Title>
                <Card.Text>
                    Followers: {artist.followers.total}<br />
                    Genres: {artist.genres.join(', ')}
                </Card.Text>
                <Button href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer" variant="primary">
                    View Profile
                </Button>
                </Card.Body>
            </Card>
            ))}
        </Container> */}
        </>
        );
    }
    };
    
    export default SpotifyProfile;