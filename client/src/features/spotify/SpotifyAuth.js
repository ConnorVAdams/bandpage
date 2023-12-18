const SpotifyAuth = () => {
  const handleAuthorize = () => {
    fetch('/authorize')
    window.open('https://accounts.spotify.com/en/login?continue=https%3A%2F%2Faccounts.spotify.com%2Fauthorize%3Fscope%3Duser-read-private%2Buser-read-email%26response_type%3Dcode%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A4000%252Fcallback%26state%3D-njVxkbIT0L6Rsm8k_ctzA%26client_id%3Dc7a80c9b38f94f0da27d90b428318214', '_blank')
  };

  return (
    <div>
      <button onClick={handleAuthorize}>Authorize</button>
    </div>
  );
};

export default SpotifyAuth