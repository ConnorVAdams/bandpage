import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/modal'
import Image from 'react-bootstrap/Image'
import { Row, Col } from 'react-bootstrap'
import { FaEdit, FaSignOutAlt, FaSpotify, FaTrash } from 'react-icons/fa';
import { useNavigate, Link, useLocation } from 'react-router-dom'
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
    const loc = useLocation()

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
<div style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', marginTop: '10px', marginBottom: '10px', maxWidth: '95vw', borderRadius: '20px', margin: '0 auto', width: '95vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <Navbar bg="light" expand="lg" id='main-nav' style={{ marginTop: '10px', marginBottom: '10px', borderRadius: '20px', width: '90vw', paddingTop: '0', paddingBottom: '0' }}>
    <Container id='user-nav' style={{ height: '60px', marginLeft: '0'}}>
      {user ? (
        <>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" >
            <Container >
              <Nav className="me-auto">
                <NavDropdown className="d-inline-block rounded-pill" title={<Image roundedCircle src={user.img} alt="User" style={{ border: '2px solid #FFB120', width: '40px', height: '40px', marginLeft: '5px', marginRight: '5px' }} className="user-image shadow" />}>
                  <NavDropdown.Item style={{ textShadow: 'none', color: 'black'}} >
                    {acct.username}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item style={{ color: 'black', textShadow: 'none' }} as={Link} to={acct.artist ? `/artists/edit/${user.id}` : `/fans/edit/${user.id}`}>
                    <FaEdit /> Edit Profile
                  </NavDropdown.Item>
                  {!spotify ?
                    <NavDropdown.Item style={{ textShadow: 'none', color: 'black'}} onClick={handleAuthorize}>
                      <FaSpotify /> Link Spotify Profile
                    </NavDropdown.Item>
                    :
                    null
                  }
                  <NavDropdown.Item style={{ textShadow: 'none', color: 'black'}} onClick={handleShow}>
                    <FaTrash /> Delete Account
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item style={{ textShadow: 'none', color: 'black'}} onClick={handleLogout}>
                    <FaSignOutAlt /> Log Out
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link className="d-inline-block rounded-pill shadow" as={Link} to="/landing" style={{ cursor: 'pointer', background: '#FFB120', paddingLeft: '10px', paddingRight: '10px', height: '40px', display: 'flex', alignItems: 'center', margin: 'auto 0', marginLeft: '10px', color: 'white' }}>Home</Nav.Link>
                {user.genres ? <Nav.Link className="d-inline-block rounded-pill shadow" onClick={handleMyPage} style={{ cursor: 'pointer', background: '#FFB120', paddingLeft: '10px', paddingRight: '10px', height: '40px', display: 'flex', alignItems: 'center', margin: 'auto 0', marginLeft: '15px', marginRight: '15px', color: 'white' }}>My Page</Nav.Link> : null}
                {spotify ? <Nav.Link className="d-inline-block rounded-pill shadow" as={Link} to="/spotify_prof" style={{ cursor: 'pointer', background: '#FFB120', paddingLeft: '10px', paddingRight: '10px', height: '40px', display: 'flex', alignItems: 'center', margin: 'auto 0', marginLeft: '0px', marginRight: '15px', color: 'white' }}>My Spotify</Nav.Link> : null}
              </Nav>
            </Container>


          </Navbar.Collapse>
        </>
      ) : null}
    </Container>
      <Button className="d-inline-block p-2 rounded-pill shadow" style={{ width: '150px', border: 'none', cursor: 'pointer', background: '#141416', marginRight: '40px'}} as={Link} to="/artists">Explore Artists</Button>
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
    }

export default NavBar;