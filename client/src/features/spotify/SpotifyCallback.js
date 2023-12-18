import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, Button } from 'react-bootstrap'

const SpotifyCallback = () => {
  const [ tokenInStorage, setTokenInStorage ] = useState(false)
    const navigate = useNavigate()

    // useEffect(() => {
    //   if (!tokenInStorage)
    //   handleCallback()
    // })

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
    
        const data = await response.json();
        localStorage.setItem('spotify_token', JSON.stringify(data));
        if (response.ok) {
          // debugger
          setTokenInStorage(true)
          navigate('/spotify_prof')
        } else {
          console.error('Authorization request failed');
        }
      } catch (error) {
        console.error('Error during authorization request:', error);
      }
    };



  return (
    <div>
      <h2>Successfully linked Spotify.</h2>
      <Button onClick={handleCallback} > OK </Button>
    </div>
  )
}

export default SpotifyCallback