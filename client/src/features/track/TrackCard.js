import { Link } from 'react-router-dom'

function TrackCard({ track }) {
    const {id, name, audio, artist_name } = track

    return (
        <>
            <div id={id}>
                <div>
                    <h2>{name}</h2>
                <Link to={`/artists/${id}`}> 
                    <p>{artist_name}</p>
                </Link>
                    <p>{audio}</p>
                </div>
            </div>
        </>
        )
    }
    
    export default TrackCard