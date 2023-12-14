import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

const NavBar = () => {
    const currentUser = useSelector(state => state.user.data)

    return (
        <>
            <span><Link to={'/landing'}>Landing</Link></span>
            {currentUser.artist ? <span><Link to={`/artists/${currentUser.artist.id}/home`}>My Artist Page</Link></span>: null }
            <span><Link to={'/artists'}>All Artists</Link></span>
        </>
    );
    }

export default NavBar;