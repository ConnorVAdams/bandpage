import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'

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
      <Container style= {{ display: 'flex', maxHeight: '100px' }}>
        {/* <Row> */}
          {/* <Col md={6}> */}
            <div>
            <h5 style={{ padding: '0', marginTop: 'auto', marginBottom: 'auto' }} className='custom-text'>© Connor Adams</h5>
            </div>
          {/* </Col> */}
          {/* <Col md={6} className="d-flex justify-content-end"> */}
            <div style={{ display: 'flex', marginLeft: 'auto'}}>
              <h5 style={{ padding: '0', marginTop: '0', marginBottom: 'auto' }} className='custom-text'>Connect: </h5>
              <h4 as={Link} to="https://github.com/ConnorVAdams" style={{ height: '35px', padding: '0', display: 'flex', alignItems: 'center', marginLeft: '35px', marginRight: '15px', color: '#FFB120' }}>GitHub</h4>
              <h4 as={Link} to="https://www.facebook.com/thepackstrings/" style={{ height: '35px', padding: '0', display: 'flex', alignItems: 'center', marginLeft: '20px', marginRight: '15px', color: '#FFB120' }}>Facebook</h4>
              <h4 as={Link} to="https://www.instagram.com" style={{ height: '35px', padding: '0', display: 'flex', alignItems: 'center', marginLeft: '20px', marginRight: '15px', color: '#FFB120' }}>Instagram</h4>
              <h4 as={Link} to="https://www.youtube.com/@thepackstrings7902" style={{ height: '35px', padding: '0', display: 'flex', alignItems: 'center', marginLeft: '20px', marginRight: '15px', color: '#FFB120' }}>YouTube</h4>
            </div>
          {/* </Col> */}
        {/* </Row> */}
      </Container>
    </footer>
  );
};

export default Footer;