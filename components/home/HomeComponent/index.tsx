import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import YouTube from 'react-youtube';

export interface YouTubeEmbedProps {
  videoId: string;
  height?: number;
  width?: number;
}

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId, height = 400, width = 711 }) => {
  const opts = {
    height,
    width,
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: width,
        margin: '0 auto',
        borderRadius: 2,
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <YouTube videoId={videoId} opts={opts} />
    </Box>
  );
};

export default function HomeComponent() {
  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <Stack spacing={4} sx={{ width: '100%', maxWidth: 900, backgroundColor: '#f1d3ad', borderRadius: 2, p: 3 }}>
        <Box className="card" sx={{ p: 3, width: '100%', backgroundColor: "black" }}>
          <Typography fontFamily="Futura" variant="body1">
An Americana string band hailing from Missoula MT, The Pack Strings deliver lively performances full of catchy originals and creative cover tunes. Check out our latest relase below!
          </Typography>
        </Box>

        {/* YouTube Embed Section */}
        <Box className="card" sx={{ p: 3, width: '100%', backgroundColor: "black" }}>
          <YouTube videoId="5YvtoQgsqnA" opts={{ width: 800, height: 400 }} />
        </Box>
      </Stack>
    </Box>
  );
}
