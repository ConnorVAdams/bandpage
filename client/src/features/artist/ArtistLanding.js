import { useDispatch, useSelector } from 'react-redux'

const ArtistLanding = () => {
    const artistUser = useSelector(state => state.user.data.artist)
    // { }
    return(
        <h1>ArtistLanding</h1> 
    )
}

export default ArtistLanding