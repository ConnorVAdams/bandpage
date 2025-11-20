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
import YouTube, { YouTubeProps } from 'react-youtube';

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
    { id: '4v816Si_ysM', title: 'Video 1', thumbnail: '', url: '' },
    { id: 'wZkifBDBdZc', title: 'Video 2', thumbnail: '', url: '' },
    { id: 'LIdyyQ5oieY', title: 'Video 3', thumbnail: '', url: '' },
    { id: 'sCDML7q69iI', title: 'Video 4', thumbnail: '', url: '' },
    { id: 'ijr4EHPPuOM', title: 'Video 5', thumbnail: '', url: '' },
  ];

  const track: Track = {
    title: 'Sample Track',
    artist: 'The Band',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  };

  const [currentStartIndex, setCurrentStartIndex] = React.useState(0);
  const [playingAudio, setPlayingAudio] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  // Keep track of YouTube player refs
  const playerRefs = React.useRef<{ [id: string]: any }>({});

  const thumbnailsPerPage = 3;
  const prevPage = () => setCurrentStartIndex((prev) => Math.max(prev - thumbnailsPerPage, 0));
  const nextPage = () =>
    setCurrentStartIndex((prev) =>
      Math.min(prev + thumbnailsPerPage, videos.length - thumbnailsPerPage)
    );

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (playingAudio) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
      // stop all YouTube videos
      Object.values(playerRefs.current).forEach((player) => player.pauseVideo?.());
    }
    setPlayingAudio(!playingAudio);
  };

  const handleYouTubeReady = (event: any, id: string) => {
    playerRefs.current[id] = event.target;
  };

  const handleYouTubePlay = (id: string) => {
    // stop audio if playing
    if (playingAudio && audioRef.current) {
      audioRef.current.pause();
      setPlayingAudio(false);
    }

    // pause all other players
    Object.entries(playerRefs.current).forEach(([key, player]) => {
      if (key !== id) player.pauseVideo?.();
    });
  };

  const currentVideos = videos.slice(currentStartIndex, currentStartIndex + thumbnailsPerPage);

  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', px: 2, backgroundColor: 'transparent' }}>
      <Stack spacing={4} sx={{ width: '100%', maxWidth: 1080, p: 3, backgroundColor: '#f1d3ad', borderRadius: 2 }}>
                <Box sx={{ p: 2, borderRadius: 2, backgroundColor: 'black' }}>
          <Typography
            fontFamily="Futura"
            variant="h4"
            sx={{ color: 'white', textAlign: 'left' }}
          >
            Listen to Our Music
          </Typography>
        </Box>
        {/* Top Box: YouTube Gallery */}
        <Box sx={{ backgroundColor: 'black', borderRadius: 2, p: 2, height: 250, display: 'flex', alignItems: 'center', position: 'relative' }}>
          <IconButton
            onClick={prevPage}
            sx={{ position: 'absolute', left: 16, color: 'white', zIndex: 2 }}
            disabled={currentStartIndex === 0}
          >
            <ArrowBackIosIcon />
          </IconButton>

          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', gap: 2 }}>
            {currentVideos.map((video) => (
              <YouTube
                key={video.id}
                videoId={video.id}
                opts={{ width: 320, height: 180, playerVars: { autoplay: 0 } }}
                onReady={(e) => handleYouTubeReady(e, video.id)}
                onPlay={() => handleYouTubePlay(video.id)}
              />
            ))}
          </Box>

          <IconButton
            onClick={nextPage}
            sx={{ position: 'absolute', right: 16, color: 'white', zIndex: 2 }}
            disabled={currentStartIndex + thumbnailsPerPage >= videos.length}
          >
            <ArrowForwardIosIcon />
          </IconButton>
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
              onClick={toggleAudio}
              sx={{ mt: 1, backgroundColor: '#ee8220', '&:hover': { backgroundColor: '#d66f1a' } }}
            >
              {playingAudio ? 'Pause' : 'Play'}
            </Button>
            <audio ref={audioRef} src={track.audioUrl} />
          </CardContent>
        </AudioCard>
      </Stack>
    </Box>
  );
}
