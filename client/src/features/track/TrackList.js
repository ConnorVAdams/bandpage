import TrackCard from './TrackCard'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'


const TrackList = () => {
    const tracks = useSelector(state => state.artist.current.tracks)
    
    // TODO Why does this find events = null on refresh when artist refresh works fine?
    return (
        <div>
            {tracks && tracks.map(track => track && (
                <TrackCard key={track.id} track={track} />
            ))}
        </div>
    )
}

export default TrackList