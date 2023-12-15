import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { fetchOneArtist } from '../features/artist/artistSlice';
import { setUser } from '../features/user/userSlice';

const NavBar = () => {
    const user = useSelector(state => state.user.data)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(fetchOneArtist(user.artist.id))
            navigate(`/artists/${user.artist.id}`, { replace: true })
    }

    const handleLogout = () => {
        localStorage.clear()
        dispatch(setUser(null))
        navigate('/')
        // TODO How?
    }

    if (user) return (
        <>
            <span><Link to={'/landing'}>Landing</Link></span>
            {user.artist ? <span><h4 onClick={handleClick}>My Artist Page</h4></span>: null }
            <span><Link to={'/artists'}>All Artists</Link></span>
            <br/>
            <button onClick={handleLogout}>Logout</button>
        </> 
    );
    }

export default NavBar;