import { Route, Routes, useNavigate } from 'react-router-dom'
import { clearErrors as clearUserErrors} from './features/user/userSlice'
// import { clearErrors as clearProductionErrors} from './features/production/productionSlice'
import { useDispatch, useSelector } from 'react-redux'
// import {createGlobalStyle} from 'styled-components'
import {useEffect, useCallback } from 'react'
import Home from './components/Home'
import NotFound from './components/NotFound'
import "./App.css"
import { setToken } from './utils/main'
import { Toaster } from 'react-hot-toast';
import ArtistForm from './features/artist/ArtistForm/ArtistForm'
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
import { fetchCurrentUser } from './features/user/userSlice'
import UserLanding from './features/user/userLanding'


function App() {
    const user = useSelector(state => state.user.data)
    const artist = useSelector(state => state.artist.current)
    const dispatch = useDispatch()
    const navigate = useNavigate()

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
            // navigate('/')
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
            <Authentication />
        </>
    )
    return (
        <>
            <NavBar />
            <Routes>
                <Route path='/' element={<Authentication />} />
                <Route path='/artists/:artist_id/' element={<ArtistWrapper artist={artist}/>}>
                    <Route path='home' element={<ArtistDetail/>} />
                    <Route path='tracks' element={<TrackList/>} />
                    <Route path='events' element={<EventList/>} />
                </Route>
                <Route path='/artists' element={<ArtistList />} />
                <Route path='/landing' element={<UserLanding/>} />
                    <Route path='home' element={<ArtistDetail/>} />
                    <Route path='tracks' element={<TrackList/>} />
                    <Route path='events' element={<EventList/>} />
                <Route path='/*' element={<NotFound />} />
            </Routes>
        </>
    )
    }

    export default App