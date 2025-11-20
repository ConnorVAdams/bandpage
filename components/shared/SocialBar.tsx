import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';

const socials = [
  { href: 'https://youtube.com/channel/UCm7v7gA1OWTGG8A50GxOg8A', icon: <YouTubeIcon fontSize="large" />, label: 'YouTube' },
  { href: 'https://www.facebook.com/thepackstrings', icon: <FacebookIcon fontSize="large" />, label: 'Facebook' },
  { href: 'https://instagram.com/thepackstrings', icon: <InstagramIcon fontSize="large" />, label: 'Instagram' },
  { href: 'mailto:your@email.com', icon: <EmailIcon fontSize="large" />, label: 'Email' },
];

export default function SocialBar() {
  return (
    <Box
      sx={{
        width: '100vw',
        bgcolor: '#0b1220',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        py: 1,
        zIndex: 1300,
        boxShadow: 3,
        gap: 2,
        backgroundColor: "#f1d3ad",
        mt: 5
      }}
    >
      {socials.map((social) => (
        <IconButton
          key={social.label}
          component="a"
          href={social.href}
          target={social.href.startsWith('mailto:') ? undefined : "_blank"}
          rel={social.href.startsWith('mailto:') ? undefined : "noopener noreferrer"}
          aria-label={social.label}
          sx={{
            color: '#341f04',
            mx: 2,
            fontSize: '1.5rem',
            transition: 'filter 0.3s cubic-bezier(.25,.8,.25,1)',
            filter: 'drop-shadow(0 0 0 rgba(0,0,0,0))',
            '&:hover': {
              filter: 'drop-shadow(0 4px 12px rgba(124,58,237,0.25)) drop-shadow(0 1px 2px rgba(0,0,0,0.10))',
              color: '#b2322f',
            },
          }}
        >
          {social.icon}
        </IconButton>
      ))}
    </Box>
  );
}
