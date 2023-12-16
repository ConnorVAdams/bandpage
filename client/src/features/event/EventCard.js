import { Link } from 'react-router-dom'
import { formatDateTime } from '../../utils/helpers'
import { Card, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { FaCheck, FaTimes } from 'react-icons/fa'

const EventCard = ({ event }) => {
    const {id, date_time, venue, artist_name, artist_id } = event
    const datetime = formatDateTime(date_time)
    
    const inUserEvents = useSelector(state => {
        const userEvents = state.user.data.artist.events_attending || state.user.data.fan.events_attending
        return userEvents && userEvents.some((userEvent) => userEvent.id === id)
    })

    const handleClick = () => {

    }

    return (
        <Card id={id} className="mb-3">
            <Card.Body>
            <Link to={`/artists/${artist_id}`}>
                <Card.Title>{artist_name}</Card.Title>
            </Link>
            <Card.Text>{venue}</Card.Text>
            <Card.Text>Date: {datetime.date}</Card.Text>
            <Card.Text>Time: {datetime.time}</Card.Text>
            <Button
                variant={inUserEvents ? 'success' : 'danger'}
                onClick={handleClick}
                className="mr-2"
                >
                Attending {inUserEvents ? <FaCheck /> : <FaTimes />}
            </Button>
            </Card.Body>
        </Card>
        )
    }
    
    export default EventCard