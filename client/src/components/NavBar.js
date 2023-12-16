import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaCheckCircle, FaReact, FaUser, FaEdit, FaSignOutAlt, FaTrash } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
// import { fetchOneArtist } from '../features/artist/artistSlice';
import { setUser, fetchDeleteUser } from '../features/user/userSlice';
import { convertDateFormat } from '../utils/helpers';

const NavBar = () => {
    const acct = useSelector(state => state.user.data)
    const user = acct ? acct.artist || acct.fan : null


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

    return (
        <Navbar bg="light" expand="lg" id='nav' style={{ flexDirection: 'column'}}>
            <Navbar.Brand>
                <img
                src={process.env.PUBLIC_URL + '/logo.png'}
                alt="Logo"
                width="30"
                height="30"
                className="d-inline-block align-top "
                style={{ borderRadius: '50%' }}
                /> BandPage
            </Navbar.Brand>
            <Container>
            {user ? 
            <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav ">
            <Nav className="me-auto">
                    <FaUser />
                    <NavDropdown title={<img src={user.img} alt="User" style={{ maxWidth: '50px' }} className="user-image" />}>
                    <NavDropdown.Item>
                        {acct.username}
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to={acct.artist ? `/artists/edit/${user.id}` : `/fans/edit/${user.id}`}>
                        <FaEdit/> Edit Profile
                        </NavDropdown.Item>
                    <NavDropdown.Item onClick={handleDelete}>
                        <FaTrash/> Delete Account
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                        <FaSignOutAlt/> Log Out
                    </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link  as={Link} to="/landing">Home</Nav.Link>
                    <Nav.Link as={Link} to="/artists">Explore Artists</Nav.Link>
                    {user.genres ? <Nav.Link as={Link} to={`/artists/${user.id}`}>My Page</Nav.Link> : null}
            </Nav>
            </Navbar.Collapse>
            </>
            :
            null}
            </Container>
    </Navbar>
    );

    }

export default NavBar;