import ArtistCard from './ArtistCard'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchAllArtists } from './artistSlice'

const ArtistList = () => {
    const artists = useSelector(state => state.artist.data)
    const artist = useSelector(state => state.artist.current)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllArtists())
    }, [])

    return (
        <div>
            <h1>All Artists</h1>
            {artists && artists.map(
                artist => <ArtistCard 
                    key={artist.id} 
                    artist={artist} />
            )}
        </div>
    )
}

export default ArtistList