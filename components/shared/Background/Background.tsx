import { useRouter } from 'next/router';
import Box from '@mui/material/Box';

const backgrounds: Record<string, string> = {
  '/': '/bandpage/images/home-bg.jpg',
};

export default function Background() {
  const router = useRouter();
  const currentBackground = '/bandpage/images/default-bg.jpg';

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