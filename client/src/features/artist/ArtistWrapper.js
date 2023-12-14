import { useParams, useNavigate, Link, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOneArtist } from './artistSlice'
// import { setEditMode, fetchOneProduction, fetchDeleteProduction } from './productionSlice'
// import styled from 'styled-components'
import NotFound from '../../components/NotFound'
import { toast } from 'react-hot-toast';
import TrackCard from '../track/TrackCard'
import EventCard from '../event/EventCard'
import ArtistCard from './ArtistCard'
import FanCard from '../fan/FanCard'

const ArtistWrapper = ({ children }) => {
    const artist = useSelector(state => state.artist.current)

    const { artist_id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Ask store if current user is artist AND current user id is also equal to artist.id
    // If so, set admin to true

    useEffect(()=>{
        (async () => {
        if (!artist) {
            const {payload} = await dispatch(fetchOneArtist(artist_id))
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

    const {id, name, location, img } = artist 
    return (
        <div id={id}>
            <Link to={`/artists/${id}`}>
                <h1>{name}</h1>
                <img src={img} alt={name} />
            </Link>

                <p>Location: {location}</p>
                
            <Link to={`/artists/${id}/tracks`}>
                    <h2>TracksNavLink</h2>
            </Link>
            <Link to={`/artists/${id}/events`}>
                    <h2>EventsNavLink</h2>
            </Link>
            <Outlet />
            {/* Conditionally render admin CRUD buttons in wrapper */}
        {/* <button onClick={handleEdit} >Edit Production</button>
        <button onClick={handleDelete} >Delete Production</button> */}

        </div>
        )
    }
    
    export default ArtistWrapper