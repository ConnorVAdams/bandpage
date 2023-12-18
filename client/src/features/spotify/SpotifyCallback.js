import { useNavigate } from "react-router-dom";

const SpotifyCallback = () => {
    const navigate = useNavigate()

    const handleCallback = async () => {

      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');
      // debugger

      try {
        const response = await fetch('/callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            "code": `${code}`, 
            "state": `${state}` }),
        });
    
        const data = await response.json();
        console.log(data);
    
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

  return (
    <div>
      <h2>Successfully loaded Spotify profile.</h2>
      <button onClick={handleCallback}>OK</button>
    </div>
  )
}

export default SpotifyCallback