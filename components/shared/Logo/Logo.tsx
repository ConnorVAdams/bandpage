import Box from '@mui/material/Box';
import Link from 'next/link';

interface LogoProps {
  imageUrl: string;
}

export default function Logo({ imageUrl }: LogoProps) {
  return (
    <Link href="/" style={{ display: 'inline-block' }}>
      <Box
        component="img"
        src={imageUrl}
        alt="Logo"
        sx={{
          width: 325,
          // height: 400,
          objectFit: 'contain',
          position: 'relative',
          zIndex: 2,
          transition: 'filter 0.3s cubic-bezier(.25,.8,.25,1)',
          filter: 'drop-shadow(0 0 0 #341f04)',
          cursor: 'pointer',
          '&:hover': {
            filter: 'drop-shadow(0 4px 12px #341f04) drop-shadow(0 1px 2px #341f04)',
          },
        }}
      />
    </Link>
  );
}
