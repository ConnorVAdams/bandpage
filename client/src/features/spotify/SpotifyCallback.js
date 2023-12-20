
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

    const handleCallback = async () => {

      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');

      try {
        const response = await fetch('/get_spotify_token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            "code": `${code}`, 
            "state": `${state}` }),
        });
    
        if (response.ok) {
          debugger
          dispatch(setSpotify(true))
          navigate('/spotify_prof')
        } else {
            toast('Authorization request failed');
        }
      } catch (error) {
        toast('Error during authorization request:', error);
      }
    };

      if (!user.spotify) {
        handleCallback()
      }
}

export default SpotifyCallback