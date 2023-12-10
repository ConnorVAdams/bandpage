import EventCard from './EventCard'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchAllEvents } from './eventSlice'

const EventWrapper = () => {
    const events = useSelector(state => state.event.data)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllEvents())
    }, [])
    console.log(events)

    return (
        <div>
            <h1>All Events</h1>
            {events && events.map(
                event => <EventCard 
                    key={event.id} 
                    event={event} />
            )}
        </div>
    )
}

export default EventWrapper