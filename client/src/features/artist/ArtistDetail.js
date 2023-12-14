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
    const artist = useSelector(state => state.artist.current)

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
        const {id, name, genres, bio, location, img, tracks, upcoming_events, fan_followers, artist_followers, followed_artists, favorited_tracks, events_attended, events_attending } = artist 
        return (
                <div id={id} className='wrapper'>
                    <h2>Followers:</h2>
                    <div>
                        {fan_followers && fan_followers.map(fan => fan && (
                            <FanCard key={fan.id} fan={fan} />
                        ))}
                        {artist_followers && artist_followers.map(artist => artist && (
                            <ArtistCard key={`follower ${artist.id}`} artist={artist} />
                        ))}
                    </div>
                    <h2>Followed Artists:</h2>
                    <div>
                        {followed_artists && followed_artists.map(artist => artist && (
                            <ArtistCard key={`followed ${artist.id}`} artist={artist} />
                        ))}
                    </div>
                    <h2>Top Five Tracks:</h2>
                    <div>
                        {favorited_tracks && favorited_tracks.map(track => track && (
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