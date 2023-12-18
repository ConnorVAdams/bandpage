
const SpotifyCallback = () => {

  const handleCallback = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5555/callback', {
        method: 'GET',
        // You can include headers or other options if needed
      });
      console.log(response)
      // Check if the request was successful (status code 200-299)
      if (response.ok) {
        debugger
        // Handle the successful response here
        console.log('Authorization request successful');
      } else {
        // Handle errors for non-2xx status codes
        console.error('Authorization request failed');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error during authorization request:', error);
    }
  };

  return (
    <div>
      <button onClick={handleCallback}>Callback</button>
    </div>
  )
}

export default SpotifyCallback