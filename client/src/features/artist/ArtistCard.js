import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchOneArtist } from './artistSlice'

function ArtistCard({ artist }) {
    const {id, name, genres, bio, location, img } = artist
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const handleClick = () => {
        dispatch(fetchOneArtist(id))
        if (Object.keys(params).length === 0) {
            navigate(`/artists/${id}`, { replace: true })
        }
    }

    return (
        <div id={id}>
            <div>
            <div onClick={handleClick}>
                <h2>{name}</h2>
                <img src={img} alt={name}/>
            </div>
                <p>{genres}</p>
                <p>{bio}</p>
                <p>{location}</p>
            </div>

        </div>
        )
    }
    
    export default ArtistCard