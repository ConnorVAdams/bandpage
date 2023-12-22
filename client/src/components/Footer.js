import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()
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
      <Container style= {{ display: 'flex', maxHeight: '100px' }}>
        {/* <Row> */}
          {/* <Col md={6}> */}
            <div>
            <h5 style={{ padding: '0', marginTop: 'auto', marginBottom: 'auto' }} className='custom-text'>© Connor Adams</h5>
            </div>
          {/* </Col> */}
          {/* <Col md={6} className="d-flex justify-content-end"> */}
          <div style={{ display: 'flex', marginLeft: 'auto' }}>
            <h5 style={{ padding: '0', marginTop: '0', marginBottom: 'auto' }} className='custom-text'>Connect: </h5>
            <a href="https://github.com/ConnorVAdams" target="_blank" rel="noopener noreferrer" style={{ height: '35px', padding: '0', display: 'flex', alignItems: 'center', marginLeft: '35px', marginRight: '15px', color: '#FFB120', textDecoration: 'none', fontSize: '1.5rem' }}>GitHub</a>
            <a href="https://www.facebook.com/thepackstrings/" target="_blank" rel="noopener noreferrer" style={{ height: '35px', padding: '0', display: 'flex', alignItems: 'center', marginLeft: '20px', marginRight: '15px', color: '#FFB120', textDecoration: 'none', fontSize: '1.5rem' }}>Facebook</a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{ height: '35px', padding: '0', display: 'flex', alignItems: 'center', marginLeft: '20px', marginRight: '15px', color: '#FFB120', textDecoration: 'none', fontSize: '1.5rem' }}>Instagram</a>
            <a href="https://www.youtube.com/@thepackstrings7902" target="_blank" rel="noopener noreferrer" style={{ height: '35px', padding: '0', display: 'flex', alignItems: 'center', marginLeft: '20px', marginRight: '15px', color: '#FFB120', textDecoration: 'none', fontSize: '1.5rem' }}>YouTube</a>
          </div>
          {/* </Col> */}
        {/* </Row> */}
      </Container>
    </footer>
  );
};

export default Footer;