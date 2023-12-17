import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { clearErrors as clearUserErrors} from './features/user/userSlice'
// import { clearErrors as clearProductionErrors} from './features/production/productionSlice'
import { useDispatch, useSelector } from 'react-redux'
// import {createGlobalStyle} from 'styled-components'
import {useEffect, useState } from 'react'
import NotFound from './components/NotFound'
import "./App.css"
import { setToken } from './utils/main'
import { Toaster } from 'react-hot-toast';
import ProfileForm from './features/user/ProfileForm'
import EventCard from './features/event/EventCard'
import FanCard from './features/fan/FanCard'
import TrackCard from './features/track/TrackCard'
import ArtistDetail from './features/artist/ArtistDetail'
import ArtistWrapper from './features/artist/ArtistWrapper'
import ArtistLanding from './features/user/userLanding'
import ArtistList from './features/artist/ArtistList'
import EventList from './features/event/EventList'
import TrackList from './features/track/TrackList'
import NavBar from './components/NavBar'
import Authentication from './features/user/Authentication'
import { fetchCurrentUser, setAdmin } from './features/user/userSlice'
import UserLanding from './features/user/userLanding'
import ListContainer from './components/ListContainer'
import { useLocation } from 'react-router-dom'
import { fetchOneArtist, setArtist } from './features/artist/artistSlice'

const App = () => {
    const user = useSelector(state => state.user.data)
    const artist = useSelector(state => state.artist.current)
    const admin = useSelector(state => state.user.admin)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loc = useLocation()
    const path = useLocation().pathname
    const params = useParams()

    useEffect(() => {
        if ((user && artist) && (user.artist.id === artist.id)) {
            dispatch(setAdmin(true))
        } else {
            dispatch(setAdmin(false))
        }
    }, [artist])

    useEffect(() => {
        if (!/\d/.test(path)) {
            dispatch(setArtist(null))
        }
    }, [path])

    useEffect(() => {

    }, [])

    // const userErrors = useSelector(state => state.user.errors)
    // const artistErrors = useSelector(state => state.artist.errors)
    // const errors = [...userErrors, ...artistErrors]
    // const clearErrorsAction = useCallback(() => {
    //     dispatch(clearUserErrors(""))
    //     dispatch(clearArtistErrors(""))
    // }, [dispatch, clearUserErrors, clearProductionErrors]);

    useEffect(() => {
        (async () => {
        if (!user) {
            const action = await dispatch(fetchCurrentUser())
            if (typeof action.payload !== "string") {
                if (action.payload.flag === "refresh") {
                    setToken(action.payload.jwt_token)
                }
            navigate('/landing')
            }
        }
        })()
    }, [user])


    // useEffect(() => {
    //     if (errors.length) {
    //     clearErrorsAction()
    //     // const timeout = setTimeout(clearErrorsAction, 3000)
    //     // return () => {
    //     //   clearTimeout(timeout)
    //     // };
    //     }
    // }, [errors, clearErrorsAction]);
    
    if(!user) return (
        <>
            <Toaster />
            <NavBar />
            <Authentication />
        </>
    )

    return (
        <>
            <Toaster />
            <NavBar />
            <Routes>

                <Route path='/artists/'>
                    <Route index element={<ListContainer />} />
                    <Route path='new' element={<ProfileForm />} />
                    <Route path='edit/:id' element={<ProfileForm />} />
                    <Route path=':artist_id/' element={<ArtistWrapper />}>
                        <Route index element={<ArtistDetail />} />
                        <Route path='tracks' element={<ListContainer />} />
                        <Route path='events' element={<ListContainer />} />
                    </Route>
                </Route>

                <Route path='/fans/'>
                    <Route path='new' element={<ProfileForm />} />
                </Route>

                <Route path='/landing/'>
                    <Route index element={<UserLanding />} />
                    <Route path='tracks' element={<TrackList />} />
                    <Route path='events' element={<EventList />} />
                </Route>


                <Route path='/*' element={<NotFound />} />
            </Routes>
        </>
    )
    }

    export default App