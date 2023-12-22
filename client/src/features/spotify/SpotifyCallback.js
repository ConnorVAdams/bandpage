
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Image, Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { setSpotify } from "../user/userSlice";
import { getSpotifyRefreshToken } from "../../utils/main";
import toast from 'react-hot-toast'

const SpotifyCallback = () => {
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleAuth = async () => {
      const response = await fetch('/callback')

      // The program never steps back into this component until the access tokens are inbound. this line divides those two discrete steps
      if (response.ok) {
        const data = await response.json()
        dispatch(setSpotify(data))
        toast.success('Spotify authorization successful.')
        navigate('/landing')
      } else {
        // toast('Spotify authorization failed.')
      }
    }

    useEffect(() => {
      if (!user.spotify) { // if user has been authorized but not granted access token
        handleAuth() 
      }
    })
}

export default SpotifyCallback