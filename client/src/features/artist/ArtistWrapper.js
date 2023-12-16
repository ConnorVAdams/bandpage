import { useParams, useNavigate, useLocation, Link, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOneArtist } from './artistSlice'
import { convertDateFormat } from '../../utils/helpers'
// import { setEditMode, fetchOneProduction, fetchDeleteProduction } from './productionSlice'
// import styled from 'styled-components'
import NotFound from '../../components/NotFound'
import { toast } from 'react-hot-toast';
import TrackCard from '../track/TrackCard'
import EventCard from '../event/EventCard'
import ArtistCard from './ArtistCard'
import FanCard from '../fan/FanCard'

const ArtistWrapper = () => {
    const artist = useSelector(state => state.artist.current)
    const user = useSelector(state => state.user.data)
    const loc = useLocation()

    const { artist_id } = useParams()
    const { pathname } = loc
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        (async () => {
        if (!artist) {
            const {payload} = await dispatch(fetchOneArtist(artist_id || user.artist.id))
            if (typeof payload !== "string") {
            toast.success(`Artist ${payload.title} loaded!`)
            } else {
            toast.error(payload)
            navigate("/")
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

    const { id, name, location, img, genres, bio } = artist 
    return (
        <div id={id}>
            <Link to={`/artists/${id}`}>
                <h1>{name}</h1>
                <img src={img} alt={name} />
                <h2>Est. {convertDateFormat(artist.created_at)}</h2>
            </Link>
                {pathname.includes('artists') ? 
                    <>
                        <p>Location: {location}</p>
                        <p>Genres: {genres}</p>
                        <p>Bio: {bio}</p>
                    </> 
                    :
                    null}
                
            <Link to={`/artists/${id}/tracks`}>
                    <h2>Tracks</h2>
            </Link>
            <Link to={`/artists/${id}/events`}>
                    <h2>Events</h2>
            </Link>
            <Outlet />
            {/* Conditionally render admin CRUD buttons in wrapper */}
        {/* <button onClick={handleEdit} >Edit Production</button>
        <button onClick={handleDelete} >Delete Production</button> */}

        </div>
        )
    }
    
    export default ArtistWrapper