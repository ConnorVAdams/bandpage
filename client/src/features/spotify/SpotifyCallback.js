
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
      if (!user.spotify) { // if user has been authorized but not yet given tokens
        debugger
        try {
            const response = await fetch('/callback')
            if (response.ok) {
              debugger
            } else {
              debugger
            }
          } 
          catch (error) {
            console.log(error)
          }
      }
    }  

    useEffect(() => {
      handleCallback()
    }, [user])
    
    // try {
    //   const response = await fetch('/callback')
    //   if (response.ok) {
    //     debugger
    //   } else {
    //     debugger
    //   }
    // } 
    // catch (error) {
    //   console.log(error)
    // }
    // const handleCallback = async () => {
      // debugger


    //   const urlParams = new URLSearchParams(window.location.search);
    //   const code = urlParams.get('code');
    //   const state = urlParams.get('state');

    //   debugger

    //   try {
    //     const response = await fetch('/get_spotify_token', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ 
    //         "code": `${code}`, 
    //         "state": `${state}` }),
    //     });
    
    //     if (response.ok) {
    //       // debugger
    //       if (!user.spotify) {
    //         dispatch(setSpotify(true))
    //       } else {
    //         navigate('/spotify_prof')
    //       }
    //     } else {
    //       toast('Authorization request failed');
    //     }
    //   } catch (error) {
    //     toast('Error during authorization request:', error);
    //   }
    // };
    
    // handleCallback()
    // }
}

export default SpotifyCallback