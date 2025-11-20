// Updated MusicComponent with improved padding, time display, and icon buttons

import React, { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import YouTube from 'react-youtube';
import { YouTubePlayer } from 'react-youtube';

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
  cover?: string;
}

const AudioCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#000',
  color: '#fff',
  borderRadius: 8,
  padding: '20px',
}));

export default function MusicComponent() {
  const videos: Video[] = [
    { id: '4v816Si_ysM', title: 'Video 1', thumbnail: '', url: '' },
    { id: 'wZkifBDBdZc', title: 'Video 2', thumbnail: '', url: '' },
    { id: 'LIdyyQ5oieY', title: 'Video 3', thumbnail: '', url: '' },
    { id: 'sCDML7q69iI', title: 'Video 4', thumbnail: '', url: '' },
    { id: 'ijr4EHPPuOM', title: 'Video 5', thumbnail: '', url: '' },
  ];

  const dummySongs: Track[] = [
    { title: 'Song One', artist: 'The Band', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', cover: 'https://via.placeholder.com/120' },
    { title: 'Song Two', artist: 'The Band', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', cover: 'https://via.placeholder.com/120' },
    { title: 'Song Three', artist: 'The Band', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', cover: 'https://via.placeholder.com/120' },
  ];

  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState<Track>(dummySongs[0]);
  const [playingAudio, setPlayingAudio] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  const playerRefs = useRef<{ [id: string]: YouTubePlayer }>({});
  const [currentYTId, setCurrentYTId] = useState<string | null>(null);

  const thumbnailsPerPage = 3;

  const prevPage = () => setCurrentStartIndex((prev) => Math.max(prev - thumbnailsPerPage, 0));
  const nextPage = () => setCurrentStartIndex((prev) => Math.min(prev + thumbnailsPerPage, videos.length - thumbnailsPerPage));

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => setProgress(audio.currentTime);
    const setDur = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', setDur);
    audio.addEventListener('ended', () => setPlayingAudio(false));

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', setDur);
    };
  }, [currentTrack]);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (playingAudio) {
      audioRef.current.pause();
    } else {
      Object.values(playerRefs.current).forEach((p) => p.pauseVideo?.());
      audioRef.current.play();
    }
    setPlayingAudio(!playingAudio);
  };

  const handleTrackSelect = (track: Track) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setCurrentTrack(track);
    setPlayingAudio(false);
    setProgress(0);
  };

  const formatTime = (sec: number) => {
    if (!sec || isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleYouTubeReady = (event: any, id: string) => {
    playerRefs.current[id] = event.target;
  };

  const handleYouTubePlay = (id: string) => {
    if (playingAudio && audioRef.current) {
      audioRef.current.pause();
      setPlayingAudio(false);
    }

    Object.entries(playerRefs.current).forEach(([key, player]) => {
      if (key !== id) player.pauseVideo?.();
    });

    setCurrentYTId(id);
  };

  const currentVideos = videos.slice(currentStartIndex, currentStartIndex + thumbnailsPerPage);

  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', px: 2, backgroundColor: 'transparent' }}>
      <Stack spacing={4} sx={{ width: '100%', maxWidth: 1080, p: 3, backgroundColor: '#f1d3ad', borderRadius: 2 }}>

        <Box sx={{ p: 2, borderRadius: 2, backgroundColor: 'black' }}>
          <Typography fontFamily="Futura" variant="h4" sx={{ color: 'white', textAlign: 'left' }}>
            Listen to Our Music
          </Typography>
        </Box>

        <Box sx={{ backgroundColor: 'black', borderRadius: 2, p: 2, height: 250, display: 'flex', alignItems: 'center', position: 'relative' }}>
          <IconButton onClick={prevPage} sx={{ position: 'absolute', left: 16, color: 'white', zIndex: 2 }} disabled={currentStartIndex === 0}>
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

          <IconButton onClick={nextPage} sx={{ position: 'absolute', right: 16, color: 'white', zIndex: 2 }} disabled={currentStartIndex + thumbnailsPerPage >= videos.length}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>

        <AudioCard>
          <CardMedia component="img" sx={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 2 }} image={"/images/lonesome-dreams.jpg"} alt={currentTrack.title} />

          <CardContent sx={{ flex: '1 0 auto', pl: 3 }}>
            <Typography variant="h6" fontFamily="Futura">{currentTrack.title}</Typography>
            <Typography variant="subtitle1" color="grey.300" fontFamily="Futura">{currentTrack.artist}</Typography>

            <Slider value={progress} max={duration} onChange={(e, v) => {
              if (audioRef.current) audioRef.current.currentTime = v as number;
              setProgress(v as number);
            }} sx={{ mt: 2 }} />

            <Stack direction="row" alignItems="center" spacing={2}>
              <IconButton onClick={toggleAudio} sx={{ color: '#ee8220' }}>
                {playingAudio ? <PauseCircleFilledIcon sx={{ fontSize: 50 }} /> : <PlayCircleFilledWhiteIcon sx={{ fontSize: 50 }} />}
              </IconButton>
              <Typography>{formatTime(progress)} / {formatTime(duration)}</Typography>
            </Stack>

            <audio ref={audioRef} src={currentTrack.audioUrl} />
          </CardContent>
        </AudioCard>

        <Box sx={{ mt: 3 }}>
          <Stack spacing={1}>
            {dummySongs.map((track) => (
              <Button key={track.title} variant="outlined" onClick={() => handleTrackSelect(track)} sx={{ justifyContent: 'flex-start', backgroundColor: track === currentTrack ? '#ee8220' : '#fff', color: track === currentTrack ? '#fff' : '#000', '&:hover': { backgroundColor: track === currentTrack ? '#d66f1a' : '#f1f1f1' } }}>
                {track.title} — {track.artist}
              </Button>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}