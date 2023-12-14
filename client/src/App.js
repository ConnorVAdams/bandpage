import { Route, Routes } from 'react-router-dom'
// import { clearErrors as clearUserErrors} from './features/user/userSlice'
// import { clearErrors as clearProductionErrors} from './features/production/productionSlice'
import { useDispatch, useSelector } from 'react-redux'
// import {createGlobalStyle} from 'styled-components'
import {useEffect, useCallback } from 'react'
import Home from './components/Home'
// import Authentication from './features/user/Authentication'
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
import ArtistLanding from './features/artist/ArtistLanding'
import FanLanding from './features/fan/FanLanding'
import ArtistList from './features/artist/ArtistList'
import EventList from './features/event/EventList'
import TrackList from './features/track/TrackList'
import NavBar from './components/NavBar'
import Authentication from './features/user/Authentication'
import Landing from './components/Home'


function App() {
    const user = useSelector(state => state.user.data)
    // const userErrors = useSelector(state => state.user.errors)
    // const productionErrors = useSelector(state => state.production.errors)
    // const errors = [...userErrors, ...productionErrors]
    // const clearErrorsAction = useCallback(() => {
    //     dispatch(clearUserErrors(""))
    //     dispatch(clearProductionErrors(""))
    // }, [dispatch, clearUserErrors, clearProductionErrors]);

    // useEffect(() => {
    //     (async () => {
    //     if (!user) {
    //         const action = await dispatch(fetchCurrentUser())
    //         if (typeof action.payload !== "string") {
    //         if (action.payload.flag === "refresh") {
    //             setToken(action.payload.jwt_token)
    //         }
    //         dispatch(fetchAllProductions())
    //         }
    //     }
    //     })()
    // }, [user])



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
                <Route path='/artists/:artist_id/events' element={<ArtistWrapper />}>
                    <Route index element={<EventList />} />
                </Route>
                <Route path='/artists/:artist_id/tracks' element={<ArtistWrapper />}>
                    <Route index element={<TrackList />} />
                </Route>
                <Route path='/artists/:artist_id/' element={<ArtistWrapper />}>
                    <Route path='' element={<ArtistDetail/>} />
                </Route>
                <Route path='/artists' element={<ArtistList />} />
                <Route path='/landing' element={user.artist ? <ArtistLanding /> : <FanLanding />} />
                <Route path='/*' element={<NotFound />} />
            </Routes>
        </>
    )
    }

    export default App