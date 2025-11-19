import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Logo from '../../shared/Logo/Logo';
import useMediaQuery from '@mui/material/useMediaQuery';
import ResponsiveMenu from './ResponsiveMenu';

const leftTabs = [
  { label: 'About', path: '/about' },
  { label: 'Calendar', path: '/calendar' },
];
const rightTabs = [
  { label: 'Music', path: '/music' },
  { label: 'Contact', path: '/contact' },
];

const navButtonStyles = {
  fontSize: '1.5rem',
  textTransform: 'uppercase',
  transition: 'filter 0.3s cubic-bezier(.25,.8,.25,1)',
  filter: 'drop-shadow(0 0 0 rgba(0,0,0,0))',
  '&:hover': {
    filter: 'drop-shadow(0 4px 12px rgba(124,58,237,0.25)) drop-shadow(0 1px 2px rgba(0,0,0,0.10))',
  },
  color: '#341f04',
  fontFamily: 'Futura',
};

export default function Navbar() {
  const isMobile = useMediaQuery('(max-width:1200px)');
  return (
    <Box sx={{ flexGrow: 1, mt: '10vh', mb: 10 }}>
      <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <AppBar position="static" sx={{ backgroundColor: "#f1d3ad", minHeight: 70, justifyContent: 'center', boxShadow: 3, zIndex: 1, width: '100%' }}>
          <Toolbar sx={{ minHeight: 64, display: 'flex', justifyContent: 'center', alignItems: 'center', px: 0 }}>
            {isMobile ? (
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <ResponsiveMenu />
              </Box>
            ) : (
              <>
                <Box sx={{ display: 'flex', gap: 16, justifyContent: 'flex-end', flex: 1, maxWidth: 400, marginRight: '3rem' }}>
                  {leftTabs.map((page) => (
                    <Link key={page.path} href={page.path} passHref legacyBehavior>
                      <Button color="inherit" component="a" sx={navButtonStyles}>
                        {page.label}
                      </Button>
                    </Link>
                  ))}
                </Box>
                <Box sx={{ width: 400, display: 'flex', justifyContent: 'center', pointerEvents: 'none', margin: '0 2rem' }} />
                <Box sx={{ display: 'flex', gap: 16, justifyContent: 'flex-start', flex: 1, maxWidth: 400, marginLeft: '3rem' }}>
                  {rightTabs.map((page) => (
                    <Link key={page.path} href={page.path} passHref legacyBehavior>
                      <Button color="inherit" component="a" sx={navButtonStyles}>
                        {page.label}
                      </Button>
                    </Link>
                  ))}
                </Box>
              </>
            )}
          </Toolbar>
        </AppBar>
        {!isMobile && (
          <Box sx={{ position: 'absolute', left: '50%', top: '36%', transform: 'translate(-50%, -50%)', zIndex: 2 }}>
            <Logo imageUrl='/images/navbar-logo.png'/>
          </Box>
        )}
      </Box>
    </Box>
  );
}
