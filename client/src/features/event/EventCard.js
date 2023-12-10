import { Link } from 'react-router-dom'
import { formatDateTime } from '../../utils/helpers'

function EventCard({ event }) {
    const {id, date_time, venue, artist_name, artist_id } = event
    const datetime = formatDateTime(date_time)
    
    return (
        <div id={id}>
            <div>
            <Link to={`/artists/${artist_id}`}> 
                <h2>{artist_name}</h2>
            </Link>
                <p>{venue}</p>
                <p>{datetime.date}</p>
                <p>{datetime.time}</p>
            </div>
        </div>
        )
    }
    
    export default EventCard