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
import { Button, Container, Nav, Navbar, Image, Row, Col, Text } from 'react-bootstrap'
import { FaCalendar, FaMapMarker, FaMusic } from 'react-icons/fa';


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

    // const handleEdit = () => {
    //     dispatch(setEditMode(true))
    //     history.push(`/productions/edit/${production.id}`)
    // }

    const { id, name, location, img, genres, followed_artists, artist_followers, fan_followers } = artist 
    const num_followers = [...fan_followers, ...artist_followers].length
    const num_followed = followed_artists.length
    
    return (
        <>
            <Container id='user-nav' style={{flexDirection: 'column'}}>
                <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <Container style={{width: '200px'}}> 
                        <Image src={img} style={{ border: '3px solid black', width: '150px', height: '150px', padding: '0' }} roundedCircle />
                        <div className='text-center'>{num_followers} Followers</div>
                        <div className='text-center'>{num_followed} Followed</div>
                    </Container>    
                    <Container style={{ width: '1000%', border: '3px solid black'}}>
                    <h2>{name}</h2>

                    <Row style={{ alignItems: 'center', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        <Col xs={2} md={4}>
                        <h6><FaCalendar/> Est. {convertDateFormat(artist.created_at)}</h6>
                        </Col>
                        <Col xs={2} md={4}>
                        <h6><FaMapMarker/> {location}</h6>
                        </Col>
                        <Col xs={2} md={4}>
                        <h6><FaMusic/> {genres}</h6>
                        </Col>
                    </Row>
                    </Container>

                </Container>
            </Container>
            <Container style={{ display: 'flex', justifyContent: 'space-evenly'}}>
                <Button as={Link} to={`/artists/${id}`}>About</Button>
                <Button as={Link} to={`/artists/${id}/events`}>Events</Button>
                <Button as={Link} to={`/artists/${id}/tracks`}>Music</Button>
            </Container>
                <Outlet />
        </>
        )
    }
    
    export default ArtistWrapper