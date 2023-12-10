import { Route, Switch } from 'react-router-dom'
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
import ArtistCard from './features/artist/ArtistCard'
import EventCard from './features/event/EventCard'
import FanCard from './features/fan/FanCard'
import TrackCard from './features/track/TrackCard'
import ArtistDetail from './features/artist/ArtistDetail'


function App() {
    const user = useSelector(state => state.user.data)
    const userErrors = useSelector(state => state.user.errors)
    const productionErrors = useSelector(state => state.production.errors)
    const dispatch = useDispatch()
    const errors = [...userErrors, ...productionErrors]
    const clearErrorsAction = useCallback(() => {
        dispatch(clearUserErrors(""))
        dispatch(clearProductionErrors(""))
    }, [dispatch, clearUserErrors, clearProductionErrors]);

    useEffect(() => {
        (async () => {
        if (!user) {
            const action = await dispatch(fetchCurrentUser())
            if (typeof action.payload !== "string") {
            if (action.payload.flag === "refresh") {
                setToken(action.payload.jwt_token)
            }
            dispatch(fetchAllProductions())
            }
        }
        })()
    }, [user])

    useEffect(() => {
        if (errors.length) {
        clearErrorsAction()
        // const timeout = setTimeout(clearErrorsAction, 3000)
        // return () => {
        //   clearTimeout(timeout)
        // };
        }
    }, [errors, clearErrorsAction]);

    if(!user) return (
        <>
        {/* <GlobalStyle />
        <Navigation/> */}
        <Toaster />
        <Authentication />
        </>
    )
    return (
        <>
        {/* <GlobalStyle /> */}
        {/* <Navigation /> */}
        <Toaster />
        <Switch>
            <Route exact path='/'>
                <ArtistForm />
            </Route>
            <Route exact path='/landing'>
                <ArtistCard />
                <FanCard />
                <EventCard />
                <TrackCard />
            </Route>
            <Route exact path='/artists'>
                <ArtistCard/>
            </Route>
            <Route  path='/artists/:artist_id'>
                <ArtistCard />
                <FanCard />
                <EventCard />
                <TrackCard />
                <ArtistDetail />
            </Route>
            <Route  path='/artists/:artist_id/tracks'>
                <TrackCard />
            </Route>
            <Route  path='/artists/:artist_id/events'>
                <EventCard />
            </Route>
            <Route>
                {/* <NotFound /> */}
            </Route>
        </Switch>
        </>
    )
    }

    export default App

    // const GlobalStyle = createGlobalStyle`
    //     body{
    //     background-color: black; 
    //     color:white;
    //     }
    //     `