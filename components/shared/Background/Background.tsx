import { useRouter } from 'next/router';
import Box from '@mui/material/Box';

const backgrounds: Record<string, string> = {
  '/': '/images/home-bg.jpg',
//   '/about': '/images/about-bg.jpg',
//   '/calendar': '/images/calendar-bg.jpg',
//   '/music': '/images/music-bg.jpg',
//   '/contact': '/images/contact-bg.jpg',
};

export default function Background() {
  const router = useRouter();
  const currentBackground = '/images/default-bg.jpg';

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        backgroundImage: `url(${currentBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 80%',
      }}
    />
  );
}