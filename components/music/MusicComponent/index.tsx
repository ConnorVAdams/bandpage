import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';
import { YouTubeEmbed } from '../../home/HomeComponent';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
}

interface Track {
  title: string;
  artist: string;
  audioUrl: string;
}

const AudioCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#000',
  color: '#fff',
  borderRadius: 8,
}));

export default function MusicComponent() {
  const videos: Video[] = [
    { id: '4v816Si_ysM', title: 'Sample Video 1', thumbnail: '', url: '' },
    { id: 'wZkifBDBdZc', title: 'Sample Video 2', thumbnail: '', url: '' },
    { id: 'LIdyyQ5oieY', title: 'Sample Video 3', thumbnail: '', url: '' },
    { id: 'sCDML7q69iI', title: 'Sample Video 4', thumbnail: '', url: '' },
    { id: 'ijr4EHPPuOM', title: 'Sample Video 5', thumbnail: '', url: '' },
  ];

  const track: Track = {
    title: 'Sample Track',
    artist: 'The Band',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  };

  const [currentStartIndex, setCurrentStartIndex] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const thumbnailsPerPage = 3;

  const prevPage = () =>
    setCurrentStartIndex((prev) => Math.max(prev - thumbnailsPerPage, 0));
  const nextPage = () =>
    setCurrentStartIndex((prev) =>
      Math.min(prev + thumbnailsPerPage, videos.length - thumbnailsPerPage)
    );

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const currentVideos = videos.slice(
    currentStartIndex,
    currentStartIndex + thumbnailsPerPage
  );

  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', px: 2, backgroundColor: 'transparent' }}>
      <Stack spacing={4} sx={{ width: '100%', maxWidth: 1200, p: 3, backgroundColor: '#f1d3ad', borderRadius: 2 }}>
        {/* Top Box: YouTube Thumbnail Gallery */}
<Box
  sx={{
    backgroundColor: 'black',
    borderRadius: 2,
    p: 2,
    height: 220,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', // space for arrows and videos
    position: 'relative',
  }}
>
  {/* Left Arrow */}
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <IconButton
      onClick={prevPage}
      sx={{ color: 'white' }}
      disabled={currentStartIndex === 0}
    >
      <ArrowBackIosIcon />
    </IconButton>
  </Box>

  {/* Videos */}
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      flex: 1, // take remaining space
      overflow: 'hidden',
      gap: 2,
    }}
  >
    {currentVideos.map((video) => (
      <YouTubeEmbed key={video.id} videoId={video.id} height={200} />
    ))}
  </Box>

  {/* Right Arrow */}
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <IconButton
      onClick={nextPage}
      sx={{ color: 'white' }}
      disabled={currentStartIndex + thumbnailsPerPage >= videos.length}
    >
      <ArrowForwardIosIcon />
    </IconButton>
  </Box>
</Box>
        {/* Bottom Box: Audio Track */}
        <AudioCard>
          <CardMedia
            component="img"
            sx={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 2 }}
            image="https://via.placeholder.com/120x120.png?text=Album+Art"
            alt={track.title}
          />
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h6" fontFamily="Futura">
              {track.title}
            </Typography>
            <Typography variant="subtitle1" color="grey.300" component="div" fontFamily="Futura">
              {track.artist}
            </Typography>
            <Button
              variant="contained"
              onClick={togglePlay}
              sx={{ mt: 1, backgroundColor: '#ee8220', '&:hover': { backgroundColor: '#d66f1a' } }}
            >
              {playing ? 'Pause' : 'Play'}
            </Button>
            <audio ref={audioRef} src={track.audioUrl} />
          </CardContent>
        </AudioCard>
      </Stack>
    </Box>
  );
}
