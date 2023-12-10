import { Link } from 'react-router-dom'

function ArtistCard({ artist }) {
    const {id, name, genres, bio, location, img } = artist
    return (
        <div id={id}>
            <div>
            <Link to={`/artists/${id}`}> 
                <h2>{name}</h2>
                <img src={img} alt={name}/>
            </Link>
                <p>{genres}</p>
                <p>{bio}</p>
                <p>{location}</p>
            </div>

        </div>
        )
    }
    
    export default ArtistCard