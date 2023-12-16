import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { fetchOneArtist } from '../features/artist/artistSlice';
import { setUser } from '../features/user/userSlice';

const NavBar = () => {
    const user = useSelector(state => state.user.data)
    console.log(user)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(fetchOneArtist(user.artist.id))
            navigate(`/artists/${user.artist.id}`, { replace: true })
    }

    const handleLogout = () => {
        localStorage.clear()
        dispatch(setUser(null))
    }

    if (user.artist || user.fan) return (
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand href="#home">BandPage</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/landing">Home</Nav.Link>
                <Nav.Link as={Link} to="/artists">Explore Artists</Nav.Link>
                <Nav.Link as={Link} to={`/artists/${user.artist.id}`}>My Page</Nav.Link>
                {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                    Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                    Separated link
                </NavDropdown.Item>
                </NavDropdown> */}
            <Button variant="outline-danger" onClick={handleLogout}>
                Logout
            </Button>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
    }

export default NavBar;