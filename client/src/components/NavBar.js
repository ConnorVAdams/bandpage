import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/modal'
import Image from 'react-bootstrap/Image'
import { Row, Col } from 'react-bootstrap'
import { FaEdit, FaSignOutAlt, FaSpotify, FaTrash } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { setUser, fetchDeleteUser, setSpotify } from '../features/user/userSlice';
import { toast } from 'react-hot-toast'
import { fetchOneArtist } from '../features/artist/artistSlice'
import { setArtist } from '../features/artist/artistSlice';
import { setSpotifyToken, setToken } from '../utils/main';
import { useState } from 'react';

const NavBar = () => {
    const acct = useSelector(state => state.user.data)
    const user = acct ? acct.artist || acct.fan : null
    const spotify = useSelector(state => state.user.spotify)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleMyPage = async () => {
        if (user) {
            try {
                const { payload } = await dispatch(fetchOneArtist(user.id))
                if (typeof payload !== "string") {
                    dispatch(setArtist(payload))
                    navigate(`artists/${user.id}`)
                } else {
                    toast.error(payload)
                }
            } catch (error) {
                console.error('Error fetching artist:', error);
            }
        }
    }

    const handleDelete = async () => {
        dispatch(fetchDeleteUser(acct.id))
        setShow(false)
    }
    
    const handleLogout = () => {
        localStorage.clear()
        setToken(null)
        dispatch(setArtist(null))
        dispatch(setUser(null))
        setSpotifyToken(null)
        dispatch(setSpotify(false))
    }

    const handleAuthorize = async () => {
        try {
        const response = await fetch('/authorize');
        if (response.ok) {
            const locationHeader = response.headers.get('location');
            if (locationHeader) {
            window.location.href = locationHeader;
            }
        } else {
            toast('Access request failed.');
            navigate('/landing')
        }
        } catch (error) {
        toast('Error during access:', error);
        navigate('/landing')
        }
    };


    return (
      (!user || (!user.artist && !user.fan)) ? null : (
        <div>
          <Navbar bg="light" expand="lg" id='main-nav' style={{ marginTop: '10px', flexDirection: 'column', height: '30%' }}>
            <Container id='user-nav' className="w-100">
              {user ? (
                <>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Container>
                      <Nav className="me-auto">
                        <NavDropdown title={<Image roundedCircle src={user.img} alt="User" style={{ width: '55px', height: '55px', marginLeft: '15px', marginRight: '15px' }} className="user-image" />}>
                          <NavDropdown.Item>
                            {acct.username}
                          </NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item as={Link} to={acct.artist ? `/artists/edit/${user.id}` : `/fans/edit/${user.id}`}>
                            <FaEdit /> Edit Profile
                          </NavDropdown.Item>
                          {!spotify ?
                            <NavDropdown.Item onClick={handleAuthorize}>
                              <FaSpotify /> Link Spotify Profile
                            </NavDropdown.Item>
                            :
                            null
                          }
                          <NavDropdown.Item onClick={handleShow}>
                            <FaTrash /> Delete Account
                          </NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item onClick={handleLogout}>
                            <FaSignOutAlt /> Log Out
                          </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/landing" style={{ height: '35px', marginTop: 'auto', marginBottom: 'auto', marginLeft: '15px', marginRight: '15px' }}>Home</Nav.Link>
                        {user.genres ? <Nav.Link onClick={handleMyPage} style={{ height: '35px', marginTop: 'auto', marginBottom: 'auto', marginLeft: '15px', marginRight: '15px' }}>My Page</Nav.Link> : null}
                        {spotify ? <Nav.Link as={Link} to="/spotify_prof" style={{ height: '35px', marginTop: 'auto', marginBottom: 'auto', marginLeft: '15px', marginRight: '15px' }}>My Spotify Page</Nav.Link> : null}
                      </Nav>
                    </Container>
    
                    <Nav className="ms-auto">
                      <Button as={Link} to="/artists">Explore Artists</Button>
                    </Nav>
                  </Navbar.Collapse>
                </>
              ) : null}
            </Container>
          </Navbar>
    
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete your account? This cannot be undone!</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleDelete}>
                Delete
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )
    );
    }

export default NavBar;