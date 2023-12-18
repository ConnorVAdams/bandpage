import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SpotifyCallback = () => {
  const [ tokenInStorage, setTokenInStorage ] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
      console.log(localStorage.spotify_token)
    })

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
        localStorage.setItem('spotify_token', data.access_token);
        setTokenInStorage(true)
        if (response.ok) {
          const locationHeader = response.headers.get('location');
          if (locationHeader) {
            // Redirect the current tab to the Spotify authorization URL
            window.location.href = locationHeader;
          }
        } else {
          console.error('Authorization request failed');
        }
      } catch (error) {
        console.error('Error during authorization request:', error);
      }
    };

  const handleSpotifyProf = () => {
    navigate('/spotify_prof')
  }

  return (
    <div>
      <h2>Successfully loaded Spotify profile.</h2>
      {localStorage.spotify_token ? <button onClick={handleSpotifyProf}>Prof</button> : <button onClick={handleCallback}>OK</button> }
    </div>
  )
}

export default SpotifyCallback