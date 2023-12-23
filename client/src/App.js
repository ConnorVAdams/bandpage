import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { clearErrors as clearUserErrors, setSpotify} from './features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import {useEffect} from 'react'
import NotFound from './components/NotFound'
import "./App.css"
import { getSpotifyExp, getSpotifyRefreshToken, getSpotifyToken, setToken } from './utils/main'
import { Toaster } from 'react-hot-toast';
import ProfileForm from './features/user/ProfileForm'
import ArtistDetail from './features/artist/ArtistDetail'
import ArtistWrapper from './features/artist/ArtistWrapper'
import EventList from './features/event/EventList'
import TrackList from './features/track/TrackList'
import { Row, Col } from 'react-bootstrap'
import NavBar from './components/NavBar'
import Authentication from './features/user/Authentication'
import { fetchCurrentUser, setAdmin } from './features/user/userSlice'
import UserLanding from './features/user/userLanding'
import ListContainer from './components/ListContainer'
import { useLocation } from 'react-router-dom'
import { setArtist } from './features/artist/artistSlice'
import SpotifyCallback from './features/spotify/SpotifyCallback'
import SpotifyProfile from './features/spotify/SpotifyProfile'
import { Navbar } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
    const user = useSelector(state => state.user.data)
    const artist = useSelector(state => state.artist.current)
    const admin = useSelector(state => state.user.admin)
    const spotify = useSelector(state => state.user.spotify)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loc = useLocation()
    const path = useLocation().pathname
    const params = useParams()
    
    useEffect(() => {
        (async () => {
        if (!user) {
            const action = await dispatch(fetchCurrentUser())
            if (typeof action.payload !== "string") {
                if (action.payload.flag === "refresh") {
                    setToken(action.payload.jwt_token)
                }
                navigate('/')
            }
        }
        })()
    }, [user])

    const handleSpotifyRefresh = async () => {
        const response = await fetch('/refresh_spotify')
        if (response.ok) {
            console.log('Spotify tokens refreshed.')
        } else {
            console.log('Failed to refresh Spotify tokens.')
        }
    }

    // useEffect(() => {
    //     setTimeout(() => {
    //         dispatch(setSpotify(0))
    //         handleSpotifyRefresh()
    //     }, spotify.expires_in)
    // })
    
    // useEffect(() => {
    //     if (user && user.artist && artist && user.artist.id === artist.id) {
    //         dispatch(setAdmin(false))
    //     } else if (user && user.artist && artist) {
    //         dispatch(setAdmin(true))
    //     } else if (user) {
    //         // console.log('fan')
    //     } else {
    //         // console.log('no user')
    //     }
    // }, [artist])

    useEffect(() => {
        if (!/\d/.test(path)) {
            dispatch(setArtist(null))
        }
    }, [path])



    // const userErrors = useSelector(state => state.user.errors)
    // const artistErrors = useSelector(state => state.artist.errors)
    // const errors = [...userErrors, ...artistErrors]
    // const clearErrorsAction = useCallback(() => {
    //     dispatch(clearUserErrors(""))
    //     dispatch(clearArtistErrors(""))
    // }, [dispatch, clearUserErrors, clearProductionErrors]);



    // useEffect(() => {
    //     if (errors.length) {
    //     clearErrorsAction()
    //     }
    // }, [errors, clearErrorsAction]);
    
    const handleCode = () => {

    }

    const handleCallback = () => {
        return <SpotifyCallback loc={loc} handleCode={this.handleCode} />
    }

    if(!user) return (
        <>
        <Toaster />
        {/* <div style={{ marginRight: 'auto', marginLeft: 'auto', maxHeight: '90vh', maxWidth: '1200px'}}> */}
            <Header />
            <Authentication />
            <Footer />
            <h1>deploy test</h1>
        {/* </div> */}
        </>
    )

    return (
        <>
        
            <Toaster />
            <Header />
            <NavBar />
        {/* <div className="vh-100 d-flex flex-column" style={{ marginRight: 'auto', marginLeft: 'auto', maxWidth: '1200px'}}> */}

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
                        <Route path='edit/:id' element={<ProfileForm />} />
                    </Route>

                    <Route path='/landing/'>
                        <Route index element={<UserLanding />} />
                        {/* <Route path='tracks' element={<TrackList />} />
                        <Route path='events' element={<EventList />} /> */}
                    </Route>

                    {/* <Route path='/authorize' element={<SpotifyAuth />} /> */}
                    <Route path='/callback' element={<SpotifyCallback />} />
                    <Route path='/spotify_prof' element={<SpotifyProfile />} />

                    
                    <Route path='/*' element={<NotFound />} />
                </Routes>
        {/* </div> */}
                <Footer />
        </>
    )
    }

    export default App