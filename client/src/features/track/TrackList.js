import TrackCard from './TrackCard'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'


const TrackList = () => {
    const tracks = useSelector(state => state.artist.spotlight.tracks)
    
    return (
        <div>
            {tracks && tracks.map(track => track && (
                <TrackCard key={track.id} track={track} />
            ))}
        </div>
    )
}

export default TrackList