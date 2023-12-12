import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <>
            <span><Link to={'/artists'}>All Artists</Link></span>
            <span><Link to={'/landing'}>Landing</Link></span>
        </>
    );
    }

export default NavBar;