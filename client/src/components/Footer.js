import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer style={{ height: '70px', backgroundColor: '#141316', padding: '20px', marginBottom: '20px' }}>
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
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '15px', marginRight: '15px' }}>Facebook</a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '15px', marginRight: '15px' }}>Twitter</a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '15px', marginRight: '15px' }}>Instagram</a>
              </h5>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;