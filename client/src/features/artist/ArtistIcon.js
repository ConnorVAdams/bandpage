import { Link } from 'react-router-dom'

function ArtistIcon({ artist }) {
    const {id, name, genres, bio, location, img } = artist
    return (
        <div id={id}>
            <div>
            <Link to={`/artists/${id}`}> 
                <h2>{name}</h2>
                <img src={img} alt={name}/>
            </Link>
            </div>

        </div>
        )
    }
    
    export default ArtistIcon