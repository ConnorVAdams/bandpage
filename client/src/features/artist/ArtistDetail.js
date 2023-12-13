import  { useParams, useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOneArtist } from './artistSlice'
// import { setEditMode, fetchOneProduction, fetchDeleteProduction } from './productionSlice'
// import styled from 'styled-components'
import NotFound from '../../components/NotFound'
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom'
import TrackCard from '../track/TrackCard'
import EventCard from '../event/EventCard'
import ArtistCard from './ArtistCard'
import FanCard from '../fan/FanCard'

const ArtistDetail = () => {
    const artist = useSelector(state => state.artist.display)

    // const handleDelete = async () => {
    //     const {type, meta, payload} = await dispatch(fetchDeleteProduction(prod_id))
    //     if (meta.requestStatus === "fulfilled" && type === "production/fetchDeleteProduction/fulfilled") {
    //         toast.success(`Production ${production.title} deleted!`)
    //         history.push("/")
    //     } else {
    //         toast.error(payload)
    //     }
    // }

    // const handleEdit = () => {
    //     dispatch(setEditMode(true))
    //     history.push(`/productions/edit/${production.id}`)
    // }
    if (artist) {
        const {id, name, genres, bio, location, img, tracks, upcoming_events, rand_five_followers, top_five_artists, top_five_tracks, events_attending } = artist 
        return (
                <div id={id} className='wrapper'>
                    <h2>Followers:</h2>
                    <div>
                        {rand_five_followers && rand_five_followers.map(fan => fan && (
                            <FanCard key={fan.id} fan={fan} />
                        ))}
                    </div>
                    <h2>Followed Artists:</h2>
                    <div>
                        {top_five_artists && top_five_artists.map(artist => artist && (
                            <ArtistCard key={artist.id} artist={artist} />
                        ))}
                    </div>
                    <h2>Top Five Tracks:</h2>
                    <div>
                        {top_five_tracks && top_five_tracks.map(track => track && (
                            <TrackCard key={track.id} track={track} />
                        ))}
                    </div>
                    <h2>Upcoming Events:</h2>
                    <div>
                        {upcoming_events && upcoming_events.map(event => event && (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                </div>
            // {/* <button onClick={handleEdit} >Edit Production</button>
            // <button onClick={handleDelete} >Delete Production</button> */}
            )
        }
    }
    
    export default ArtistDetail