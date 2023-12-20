
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, Button } from 'react-bootstrap'
import { useDispatch } from "react-redux";
import { setSpotify } from "../user/userSlice";
import { getSpotifyRefreshToken } from "../../utils/main";
import toast from 'react-hot-toast'

const SpotifyCallback = () => {
    const spotify = useSelector(sta)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
      if (!token) {
        handleCallback()
      }
    }, [token])

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
          // setTokenInStorage(true)
          navigate('/spotify_prof')
        } else {
          toast('Authorization request failed');
        }
      } catch (error) {
        toast('Error during authorization request:', error);
      }
    };

  // return (
  //   <div>
  //     <h2>Successfully linked Spotify.</h2>
  //     <Button onClick={handleCallback} > OK </Button>
  //   </div>
  // )
}

export default SpotifyCallback