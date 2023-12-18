import {useState } from "react";
import { useNavigate} from "react-router-dom";
import { Button } from 'react-bootstrap'

const SpotifyCallback = () => {
  // const [ tokenInStorage, setTokenInStorage ] = useState(false)
    const navigate = useNavigate()

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
        localStorage.setItem('spotify_access_token', data.access_token);
        localStorage.setItem('spotify_refresh_token', data.refresh_token);
        localStorage.setItem('spotify_exp', data.expires_in);

        if (response.ok) {
          // setTokenInStorage(true)
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