import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { fetchOneArtist } from '../features/artist/artistSlice';

const NavBar = () => {
    const currentUser = useSelector(state => state.user.data)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(fetchOneArtist(currentUser.artist.id))
        // if (Object.keys(params).length === 0) {
            navigate(`/artists/${currentUser.artist.id}/home`, { replace: true })
        // }
    }

    return (
        <>
            <span><Link to={'/landing'}>Landing</Link></span>
            {currentUser.artist ? <span><h4 onClick={handleClick}>My Artist Page</h4></span>: null }
            <span><Link to={'/artists'}>All Artists</Link></span>
        </>
    );
    }

export default NavBar;