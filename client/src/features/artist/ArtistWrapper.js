import ArtistCard from './ArtistCard'
import { useSelector } from 'react-redux'

const ArtistWrapper = () => {
    const artists = useSelector(state => state.artist.data)

    console.log(artists)

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

export default ArtistWrapper