import { Navbar, Container } from 'react-bootstrap';
import NavBar from './NavBar';
import { useSelector } from 'react-redux';

const Header = () => {
  const user = useSelector(state => state.user.data)
  return (
    <header style={{ display: 'flex', height: '70px', backgroundColor: '#141316', padding: '20px', marginTop: '20px' }}>
      <Container className={user.artist || user.fan ? 'invisible' : ''} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: '1' }}>
        <img
          src={process.env.PUBLIC_URL + '/assets/logo.png'}
          alt="Logo"
          width="40px"
          height="40px"
          className="d-inline-block align-top"
          style={{ borderRadius: '50%', marginRight: '10px' }}
        />
        <h1 className='display-8 custom-text' style={{ color: 'white', margin: '0' }}>BandPage</h1>
      </Container>
    </header>
  );
};

export default Header;