import React, { useRef, useState, useEffect } from 'react';
import {
  Box, Stack, Typography, IconButton, LinearProgress, Divider
} from "@mui/material";
import {
  PlayArrow, Pause, SkipNext, SkipPrevious, VolumeUp, GraphicEq
} from "@mui/icons-material";
import { motion } from 'framer-motion';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import YouTube, { YouTubePlayer } from 'react-youtube';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
}

interface Track {
  title: string;
  artist: string;
  url: string;
  duration: string;
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
  {
    title: "Up Til Dawn",
    artist: "The Pack Strings",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: "3:42",
    cover: "/images/lonesome-dreams.jpg",
  },
  {
    title: "Set in Stone",
    artist: "The Pack Strings",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: "4:12",
    cover: "/images/lonesome-dreams.jpg",
  },
  {
    title: "Like a Pine",
    artist: "The Pack Strings",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    duration: "3:18",
    cover: "/images/lonesome-dreams.jpg",
  },
  {
    title: "Mehoopany",
    artist: "The Pack Strings",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    duration: "5:02",
    cover: "/images/lonesome-dreams.jpg",
  },
  {
    title: "The Serpent",
    artist: "The Pack Strings",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    duration: "4:26",
    cover: "/images/lonesome-dreams.jpg",
  },
  {
    title: "Ithaca",
    artist: "The Pack Strings",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    duration: "3:57",
    cover: "/images/lonesome-dreams.jpg",
  },
  {
    title: "How Come the Mountains",
    artist: "The Pack Strings",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    duration: "4:45",
    cover: "/images/lonesome-dreams.jpg",
  },
];
  // ----------------------
  // AUDIO PLAYER LOGIC
  // ----------------------

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const currentTrack = dummySongs[currentTrackIndex];

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Track time formatting
  const formatTime = (sec: number) => {
    if (!sec || isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Update time & duration
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setProgress(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", () => nextTrack());

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  // Switching tracks auto-plays
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = currentTrack.url;
    audio.currentTime = 0;

    if (isPlaying) {
      audio.play();
    }
  }, [currentTrackIndex]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      // Stop YouTube if playing
      Object.values(playerRefs.current).forEach((p) => p.pauseVideo?.());
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () =>
    setCurrentTrackIndex((i) => (i + 1) % dummySongs.length);

  const previousTrack = () =>
    setCurrentTrackIndex((i) => (i - 1 + dummySongs.length) % dummySongs.length);

  const handleTrackSelect = (track: Track) => {
    const index = dummySongs.indexOf(track);
    setCurrentTrackIndex(index);

    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    setIsPlaying(false);
    setProgress(0);
  };

  // ----------------------
  // YOUTUBE PLAYER LOGIC
  // ----------------------

  const playerRefs = useRef<{ [id: string]: YouTubePlayer }>({});

  const handleYouTubeReady = (event: any, id: string) => {
    playerRefs.current[id] = event.target;
  };

  const handleYouTubePlay = (id: string) => {
    // stop audio
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }

    // stop other YT players
    Object.entries(playerRefs.current).forEach(([key, player]) => {
      if (key !== id) player.pauseVideo?.();
    });
  };

  // ----------------------
  // YOUTUBE PAGINATION
  // ----------------------

  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const thumbnailsPerPage = 3;

  const prevPage = () =>
    setCurrentStartIndex((i) => Math.max(i - thumbnailsPerPage, 0));

  const nextPage = () =>
    setCurrentStartIndex((i) =>
      Math.min(i + thumbnailsPerPage, videos.length - thumbnailsPerPage)
    );

  const currentVideos = videos.slice(
    currentStartIndex,
    currentStartIndex + thumbnailsPerPage
  );

  // ----------------------
  // RENDER
  // ----------------------

  return (
    <Box sx={{ width: "100vw", minHeight: "100vh", display: "flex", justifyContent: "center", px: 2 }}>
      <Stack spacing={4} sx={{ width: "100%", maxWidth: 1080, p: 3, backgroundColor: "#f1d3ad", borderRadius: 2 }}>

        {/* Title */}
        <Box sx={{ p: 2, borderRadius: 2, backgroundColor: "black" }}>
          <Typography fontFamily="Futura" variant="h4" sx={{ color: "white" }}>
            Listen to Our Music
          </Typography>
        </Box>

        {/* YouTube gallery */}
        <Box sx={{ backgroundColor: "black", p: 2, height: 250, display: "flex", alignItems: "center", position: "relative", borderRadius: 2 }}>
          <IconButton onClick={prevPage} sx={{ position: "absolute", left: 16, color: "white" }} disabled={currentStartIndex === 0}>
            <ArrowBackIosIcon />
          </IconButton>

          <Box sx={{ display: "flex", gap: 2, width: "100%", justifyContent: "center" }}>
            {currentVideos.map((video) => (
              <YouTube
                key={video.id}
                videoId={video.id}
                opts={{ width: 320, height: 180 }}
                onReady={(e) => handleYouTubeReady(e, video.id)}
                onPlay={() => handleYouTubePlay(video.id)}
              />
            ))}
          </Box>

          <IconButton
            onClick={nextPage}
            sx={{ position: "absolute", right: 16, color: "white" }}
            disabled={currentStartIndex + thumbnailsPerPage >= videos.length}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: "black" }} />

        {/* AUDIO PLAYER */}
        <Box sx={{ backgroundColor: "#000", color: "#fff", p: 3, borderRadius: 4 }}>
          {/* Track info */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ width: 90, height: 90, borderRadius: 2, overflow: "hidden" }}>
              <img src={currentTrack.cover} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </Box>

            <Box>
              <Typography fontFamily="Futura" fontSize={20} fontWeight={600}>
                {currentTrack.title}
              </Typography>
              <Typography fontFamily="Futura" fontSize={16} sx={{ opacity: 0.8 }}>
                {currentTrack.artist}
              </Typography>
            </Box>
          </Stack>

          {/* Progress bar */}
          <Box sx={{ mt: 2 }}>
            <LinearProgress
              variant="determinate"
              value={duration ? (progress / duration) * 100 : 0}
              sx={{
                height: 6,
                borderRadius: 3,
                "& .MuiLinearProgress-bar": { backgroundColor: "#ee8220" },
              }}
            />

            <Stack direction="row" justifyContent="space-between" mt={0.5}>
              <Typography fontSize={12}>{formatTime(progress)}</Typography>
              <Typography fontSize={12}>{currentTrack.duration}</Typography>
            </Stack>
          </Box>

          {/* Controls */}
          <Stack direction="row" justifyContent="center" spacing={3} mt={2}>
            <IconButton onClick={previousTrack} sx={{ color: "#fff" }}>
              <SkipPrevious fontSize="large" />
            </IconButton>

            <IconButton
              onClick={togglePlay}
              sx={{
                backgroundColor: "#ee8220",
                color: "#fff",
                "&:hover": { backgroundColor: "#d46f18" },
              }}
            >
              {isPlaying ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
            </IconButton>

            <IconButton onClick={nextTrack} sx={{ color: "#fff" }}>
              <SkipNext fontSize="large" />
            </IconButton>

            <VolumeUp sx={{ color: "#fff" }} />
          </Stack>
        </Box>

        {/* PLAYLIST */}
        <Box sx={{ maxHeight: 300, overflowY: "auto", pr: 1 }}>
          <Stack spacing={1}>
            {dummySongs.map((track, index) => {
              const isActive = index === currentTrackIndex;

              return (
                <motion.div key={track.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Box
                    onClick={() => handleTrackSelect(track)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      px: 2,
                      py: 1.5,
                      backgroundColor: isActive ? "#ee8220" : "#000",
                      color: "#fff",
                      borderRadius: 2,
                      cursor: "pointer",
                      border: "1px solid #222",
                      "&:hover": {
                        backgroundColor: isActive ? "#d46f18" : "#111",
                      },
                    }}
                  >
                    <Box sx={{ width: 60, height: 60, borderRadius: 1.5, overflow: "hidden", mr: 2 }}>
                      <img src={track.cover} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </Box>

                    <Box sx={{ flexGrow: 1 }}>
<Typography 
  color={isActive ? "white" : "rgba(255,255,255,0.7)"} 
  fontFamily="Futura" 
  fontSize={16}
>
  {track.title}
</Typography>
<Typography 
  color={isActive ? "white" : "rgba(255,255,255,0.7)"} 
  fontFamily="Futura" 
  fontSize={16}
>                        {track.artist}
                      </Typography>
                    </Box>

<Typography 
  color={isActive ? "white" : "rgba(255,255,255,0.7)"} 
  fontFamily="Futura" 
  fontSize={16}
>
  {track.duration}</Typography>

                  </Box>
                </motion.div>
              );
            })}
          </Stack>
        </Box>

        {/* Hidden audio element */}
        <audio ref={audioRef} src={currentTrack.url} />

      </Stack>
    </Box>
  );
}
