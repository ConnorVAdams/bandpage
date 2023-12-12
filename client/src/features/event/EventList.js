import EventCard from './EventCard'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'


const EventList = () => {
    const events = useSelector(state => state.artist.spotlight.events)
        return (
            <div>
                {events && events.map(event => event && (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        )
}

export default EventList