import { useState } from 'react'

const SpotifyAuth = () => {
  const [url, setUrl] = useState(null)

  const handleAuthorize = async () => {
    try {
      const response = await fetch('/authorize', {
        method: 'GET',
        // You can include headers or other options if needed
      });

      // Check if the request was successful (status code 200-299)
      if (response.ok) {
        // Extract the 'location' header from the response
        const locationHeader = response.headers.get('location');

        // Update the 'url' state with the extracted URL
        setUrl(locationHeader);

        // Open a new tab with the extracted URL
        if (locationHeader) {
          window.open(locationHeader, '_blank');
        }

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

  console.log(url)

  return (
    <div>
      <button onClick={handleAuthorize}>Authorize</button>
    </div>
  );
};

export default SpotifyAuth