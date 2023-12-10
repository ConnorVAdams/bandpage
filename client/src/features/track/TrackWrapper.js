import TrackCard from './TrackCard'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchAllTracks } from './trackSlice'


const TrackWrapper = () => {
    const tracks = useSelector(state => state.track.data)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllTracks())
    }, [])

    return (
        <div>
            {tracks && tracks.map(track => track && (
                <TrackCard key={track.id} track={track} />
            ))}
        </div>
    )
}

export default TrackWrapper