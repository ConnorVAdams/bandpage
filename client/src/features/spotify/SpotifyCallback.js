
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
    const loc = useLocation()

    const handleAuth = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');
      const response = await fetch('/callback')
      
      if (response.ok) {
        dispatch(setSpotify(true))
        toast.success('Spotify authorization successful.')
        navigate('/landing')
      }
    }

    useEffect(() => {
      if (!user.spotify) { // if user has been authorized but not granted access token
        handleAuth() 
      }
    })
}

export default SpotifyCallback