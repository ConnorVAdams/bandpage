import { Card, Button, Row, Col, Image, Container } from 'react-bootstrap';

const SpotifyArtistCard = ({artist}) => {
    const { id, external_urls, genres, images, name, popularity } = artist

        return (
            <Card id={id} className="mb-3">
            <Card.Body>
                <Container style={{ width: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <a href={external_urls.spotify} target="_blank" rel="noopener noreferrer">
                    <Image
                    src={images[0].url}
                    style={{
                        border: '3px solid black',
                        width: '150px',
                        height: '150px',
                        padding: '0',
                    }}
                    roundedCircle
                    />
                </a>
                </Container>
                <h2>{name}</h2>
            </Card.Body>
            </Card>
        );
}

export default SpotifyArtistCard
