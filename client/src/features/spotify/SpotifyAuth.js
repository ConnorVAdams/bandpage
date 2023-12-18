const SpotifyAuth = () => {
  const handleAuthorize = async () => {
    fetch('/authorize')
    .then(resp => resp.json())
    .then(data => console.log(data))
  };

  return (
    <div>
      <button onClick={handleAuthorize}>Authorize</button>
    </div>
  );
};

export default SpotifyAuth