import React, { useRef, useState, useEffect } from 'react';
import {
  Box, Stack, Typography, IconButton, LinearProgress, Divider, Slider
} from "@mui/material";
import {
  PlayArrow, Pause, SkipNext, SkipPrevious, VolumeUp
} from "@mui/icons-material";
import { motion } from 'framer-motion';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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

export default function MusicComponent() {
  const videos: Video[] = [
    { id: '4v816Si_ysM', title: 'Video 1', thumbnail: '', url: '' },
    { id: 'wZkifBDBdZc', title: 'Video 2', thumbnail: '', url: '' },
    { id: 'LIdyyQ5oieY', title: 'Video 3', thumbnail: '', url: '' },
    { id: 'sCDML7q69iI', title: 'Video 4', thumbnail: '', url: '' },
    { id: 'ijr4EHPPuOM', title: 'Video 5', thumbnail: '', url: '' },
  ];

  const dummySongs: Track[] = [
    { title: "Up Til Dawn", artist: "Connor Adams", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", duration: "3:42", cover: "/images/lonesome-dreams.jpg" },
    { title: "Set in Stone", artist: "Chad Pickett", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", duration: "4:12", cover: "/images/lonesome-dreams.jpg" },
    { title: "Like a Pine", artist: "Chad Pickett", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", duration: "3:18", cover: "/images/lonesome-dreams.jpg" },
    { title: "Mehoopany", artist: "Chad Pickett", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", duration: "5:02", cover: "/images/lonesome-dreams.jpg" },
    { title: "The Serpent", artist: "Connor Adams", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", duration: "4:26", cover: "/images/lonesome-dreams.jpg" },
    { title: "Ithaca", artist: "Connor Adams", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", duration: "3:57", cover: "/images/lonesome-dreams.jpg" },
    { title: "How Come the Mountains", artist: "Connor Adams", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", duration: "4:45", cover: "/images/lonesome-dreams.jpg" },
  ];

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const currentTrack = dummySongs[currentTrackIndex];
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
    const [volume, setVolume] = useState(100); // default volume 100%
  
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = volume / 100;
  }, [volume]);

  const playerRefs = useRef<{ [id: string]: YouTubePlayer }>({});

  const formatTime = (sec: number) => {
    if (!sec || isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      if (!isSeeking) setProgress(audio.currentTime);
    };
    const updateDuration = () => setDuration(audio.duration);
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", nextTrack);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", nextTrack);
    };
  }, [isSeeking]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = currentTrack.url;
    audio.currentTime = 0;
    if (isPlaying) audio.play();
  }, [currentTrackIndex]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.pause();
    else {
      Object.values(playerRefs.current).forEach(p => p.pauseVideo?.());
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => setCurrentTrackIndex(i => (i + 1) % dummySongs.length);
  const previousTrack = () => setCurrentTrackIndex(i => (i - 1 + dummySongs.length) % dummySongs.length);

  const handleTrackSelect = (track: Track) => {
    const index = dummySongs.indexOf(track);
    setCurrentTrackIndex(index);
    const audio = audioRef.current;
    if (audio) { audio.pause(); audio.currentTime = 0; }
    setIsPlaying(false);
    setProgress(0);
  };

  const handleSeek = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setProgress(value);
  };

  const handleYouTubeReady = (event: any, id: string) => { playerRefs.current[id] = event.target; };
  const handleYouTubePlay = (id: string) => {
    const audio = audioRef.current;
    if (audio) { audio.pause(); setIsPlaying(false); }
    Object.entries(playerRefs.current).forEach(([key, player]) => { if (key !== id) player.pauseVideo?.(); });
  };

  // YouTube pagination
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const thumbnailsPerPage = 3;
  const prevPage = () => setCurrentStartIndex(i => Math.max(i - thumbnailsPerPage, 0));
  const nextPage = () => setCurrentStartIndex(i => Math.min(i + thumbnailsPerPage, videos.length - thumbnailsPerPage));
  const currentVideos = videos.slice(currentStartIndex, currentStartIndex + thumbnailsPerPage);

  return (
    <Box sx={{ width: "100vw", minHeight: "100vh", display: "flex", justifyContent: "center", px: 2 }}>
      <Stack spacing={4} sx={{ width: "100%", maxWidth: 1080, p: 3, backgroundColor: "#f1d3ad", borderRadius: 2 }}>
        {/* Title */}
        <Box sx={{ p: 2, borderRadius: 2, backgroundColor: "black" }}>
          <Typography fontFamily="Futura" variant="h4" sx={{ color: "white" }}>Listen to Our Music</Typography>
        </Box>

{/* YouTube gallery */}
<Box
  sx={{
    backgroundColor: "black",
    p: 2,
    height: 250,
    display: "flex",
    alignItems: "center",
    borderRadius: 2,
  }}
>
  {/* Left chevron */}
  <IconButton
    onClick={prevPage}
    sx={{ color: "white", mr: 1 }}
    disabled={currentStartIndex === 0}
  >
    <ArrowBackIosIcon />
  </IconButton>

  {/* Video thumbnails */}
  <Box
    sx={{
      display: "flex",
      gap: 2,
      flexGrow: 1,
      justifyContent: "center",
      overflow: "hidden",
    }}
  >
    {currentVideos.map((video) => (
      <YouTube
        key={video.id}
        videoId={video.id}
        opts={{ width: 290, height: 230 }}
        onReady={(e) => handleYouTubeReady(e, video.id)}
        onPlay={() => handleYouTubePlay(video.id)}
      />
    ))}
  </Box>

  {/* Right chevron */}
  <IconButton
    onClick={nextPage}
    sx={{ color: "white", ml: 1 }}
    disabled={currentStartIndex + thumbnailsPerPage >= videos.length}
  >
    <ArrowForwardIosIcon />
  </IconButton>
</Box>
        <Divider sx={{ borderColor: "black" }} />

{/* AUDIO PLAYER */}
<Box sx={{ backgroundColor: "#000", color: "#fff", p: 3, borderRadius: 4 }}>
  {/* Top Row: Track Info + Volume */}
  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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

    {/* Volume Slider */}
    <Box sx={{ display: "flex", alignItems: "center", minWidth: 200, mr: 1.5
     }}>
      <VolumeUp sx={{ color: "#fff" }} />
      <Slider
        min={0}
        max={100}
        value={volume}
        onChange={(_, value) => setVolume(value as number)}
        sx={{ color: "#ee8220", ml: 1 }}
      />
    </Box>
  </Box>

  {/* Seek slider */}
  <Stack direction="row" alignItems="center" spacing={2} mt={2}>
    <Typography fontSize={12}>{formatTime(progress)}</Typography>
    <Slider
      min={0}
      max={duration || 100}
      value={progress}
      onChange={(_, value) => handleSeek(value as number)}
      sx={{ color: "#ee8220" }}
    />
    <Typography fontSize={12}>{currentTrack.duration}</Typography>
  </Stack>

  {/* Centered Controls */}
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
  </Stack>
</Box>

        {/* Playlist */}
        <Box sx={{ maxHeight: 300, overflowY: "auto", pr: 1 }}>
          <Stack spacing={1}>
            {dummySongs.map((track, index) => {
              const isActive = index === currentTrackIndex;
              return (
                <motion.div key={track.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Box onClick={() => handleTrackSelect(track)} sx={{
                    display: "flex", alignItems: "center", px: 2, py: 1.5, backgroundColor: isActive ? "#ee8220" : "#000",
                    color: "#fff", borderRadius: 2, cursor: "pointer", border: "1px solid #222",
                    "&:hover": { backgroundColor: isActive ? "#d46f18" : "#111" }
                  }}>
                    <Box sx={{ width: 60, height: 60, borderRadius: 1.5, overflow: "hidden", mr: 2 }}>
                      <img src={track.cover} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                             <Typography fontFamily="Futura" fontSize={16} fontWeight={600}>
          {track.title}
        </Typography>
        <Typography fontFamily="Futura" fontSize={12} sx={{ opacity: 0.8 }}>
          {track.artist}
        </Typography>
                    </Box>
                    <Typography color={isActive ? "white" : "rgba(255,255,255,0.7)"} fontFamily="Futura" fontSize={16}>{track.duration}</Typography>
                  </Box>
                </motion.div>
              );
            })}
          </Stack>
        </Box>

        <audio ref={audioRef} src={currentTrack.url} />
      </Stack>
    </Box>
  );
}
