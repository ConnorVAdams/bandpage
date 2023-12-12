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

const ArtistWrapper = () => {
    const artist = useSelector(state => state.artist.spotlight)
    const { artist_id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(()=>{
        (async () => {
        if (!artist) {
            const {payload} = await dispatch(fetchOneArtist(artist_id))
            if (typeof payload !== "string") {
            toast.success(`Artist ${payload.title} loaded!`)
            } else {
            toast.error(payload)
            history.push("/")
            }
        }
        })()
    },[artist, artist_id])


    if (!artist) {
        return <NotFound />
    }

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

    const {id, name, location, img } = artist 
    return (
        <div id={id}>
            <Link to={`/artists/${id}`}>
                <h1>{name}</h1>
            </Link>
            <div className='wrapper'>
                <img src={img} alt={name} />
                <p>Location: {location}</p>
            </div>
            <Link to={`/artists/${id}/tracks`}>
                    <h2>TracksNavLink</h2>
            </Link>
            <Link to={`/artists/${id}/events`}>
                    <h2>EventsNavLink</h2>
            </Link>
        {/* <button onClick={handleEdit} >Edit Production</button>
        <button onClick={handleDelete} >Delete Production</button> */}

        </div>
        )
    }
    
    export default ArtistWrapper