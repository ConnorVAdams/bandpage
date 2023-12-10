import {Link} from 'react-router-dom'

function ArtistCard({ artist }) {
    const {title, budget, genre, image, id} = artist
    return (
        <div id={id}>
            <Link to={`/artists/${id}`}> 
            <div>
                <h2>{title}</h2>
                <p>{genre}</p>
                <p>$ {budget}</p>
            </div>
            <img src={image} alt={title}/>
            </Link>
        </div>
        )
    }
    
    export default ArtistCard