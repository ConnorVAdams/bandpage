import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
<footer style={{
      height: '70px',
      backgroundColor: '#141316',
      padding: '20px',
      marginBottom: '20px',
      position: 'fixed',
      bottom: 0,
      width: '100%',
    }}>
      <Container>
        <Row>
          <Col md={6}>
            <div>
              <p className='custom-text'>© Connor Adams</p>
            </div>
          </Col>
          <Col md={6} className="d-flex justify-content-end">
            <div>
              <h5 className='custom-text'>Connect:
                <a href="https://github.com/ConnorVAdams" target="_blank" rel="noopener noreferrer" style={{ color: 'blue', marginLeft: '15px', marginRight: '15px' }}>GitHub</a>
                <a href="https://www.facebook.com/thepackstrings/" target="_blank" rel="noopener noreferrer" style={{ color: 'blue', marginLeft: '15px', marginRight: '15px' }}>Facebook</a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'blue', marginLeft: '15px', marginRight: '15px' }}>Instagram</a>
                <a href="https://www.youtube.com/@thepackstrings7902" target="_blank" rel="noopener noreferrer" style={{ color: 'blue', marginLeft: '15px', marginRight: '15px' }}>YouTube</a>
              </h5>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;