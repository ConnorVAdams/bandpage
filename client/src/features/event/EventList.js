import EventCard from './EventCard'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'


const EventList = () => {
    const events = useSelector(state => state.artist.current.upcoming_events)
        
    // TODO Why does this find events = null on refresh when artist refresh works fine?
        return (
            <div>
                {events && events.map(event => event && (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        )
}

export default EventList