import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface YouTubeEmbedProps {
  videoId: string;
  height?: number;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId, height = 400 }) => {
  const src = `https://www.youtube.com/embed/${videoId}`;
  return (
    <Box sx={{ position: 'relative', width: '100%', height, borderRadius: 2, overflow: 'hidden' }}>
      <iframe
        src={src}
        title="YouTube video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        width="100%"
        height="100%"
      />
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet tincidunt
            fermentum, erat nulla facilisis dolor, a scelerisque arcu urna nec metus. Praesent id justo
            non quam aliquet laoreet. Curabitur vel nisi sed lacus aliquet luctus a ac lorem.
          </Typography>
        </Box>

        {/* YouTube Embed Section */}
        <Box className="card" sx={{ p: 3, width: '100%', backgroundColor: "black" }}>
          <YouTubeEmbed videoId="5YvtoQgsqnA" height={450} />
        </Box>
      </Stack>
    </Box>
  );
}
