import Box from '@mui/material/Box';

interface LogoProps {
  imageUrl: string;
}

export default function Logo({ imageUrl }: LogoProps) {
  return (
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
      }}
    />
  );
}
