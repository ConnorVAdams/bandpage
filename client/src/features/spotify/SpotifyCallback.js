import { useNavigate } from "react-router-dom";

const SpotifyCallback = () => {
    const navigate = useNavigate()

  const handleCallback = async () => {
    navigate('/landing')
  };

  return (
    <div>
      <h2>Successfully loaded Spotify profile.</h2>
      <button onClick={handleCallback}>OK</button>
    </div>
  )
}

export default SpotifyCallback