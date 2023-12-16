import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { fetchOneArtist } from '../features/artist/artistSlice';
import { setUser, fetchDeleteUser } from '../features/user/userSlice';

const NavBar = () => {
    const user = useSelector(state => state.user.data.artist || state.user.data.fan)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // const handleClick = () => {
    //     dispatch(fetchOneArtist(user.artist.id))
    //         navigate(`/artists/${user.artist.id}`, { replace: true })
    // }

    const handleDelete = async () => {
        dispatch(fetchDeleteUser(user.id))
    }
    
    const handleLogout = () => {
        localStorage.clear()
        dispatch(setUser(null))
    }

    if (user) return (
    <Navbar expand="lg" className="bg-body-tertiary ">
        <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav ">
            <Nav className="me-auto">
                <NavDropdown title={<img src={user.img} alt="User" style={{ maxWidth: '50px' }} className="user-image" />}>
                <NavDropdown.Item as={Link} to={user.artist ? '/artists/edit' : '/fans/edit'}>
                    Edit Profile
                    </NavDropdown.Item>
                <NavDropdown.Item onClick={handleDelete}>
                    Delete Account
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                    Log Out
                </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link  as={Link} to="/landing">Home</Nav.Link>
                <Nav.Link as={Link} to="/artists">Explore Artists</Nav.Link>
                {user.genres ? <Nav.Link as={Link} to={`/artists/${user.id}`}>My Page</Nav.Link> : null}
                <Navbar.Brand  as={Link} to={'/landing'} >BandPage</Navbar.Brand>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
    }

export default NavBar;