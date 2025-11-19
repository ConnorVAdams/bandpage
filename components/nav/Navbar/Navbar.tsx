import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Logo from '../../shared/Logo/Logo';

const leftTabs = [
  { label: 'About', path: '/about' },
  { label: 'Calendar', path: '/calendar' },
];
const rightTabs = [
  { label: 'Music', path: '/music' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1, mt: '10vh', mb: 10 }}>
      <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <AppBar position="static" sx={{ backgroundColor: "#f1d3ad", minHeight: 70, justifyContent: 'center', boxShadow: 3, zIndex: 1, width: '100%' }}>
          <Toolbar sx={{ minHeight: 64, display: 'flex', justifyContent: 'center', alignItems: 'center', px: 0 }}>
            <Box sx={{ display: 'flex', gap: 8, justifyContent: 'flex-end', flex: 1, maxWidth: 400 }}>
              {leftTabs.map((page) => (
                <Link key={page.path} href={page.path} passHref legacyBehavior>
                  <Button color="inherit" component="a">
                    {page.label}
                  </Button>
                </Link>
              ))}
            </Box>
            <Box sx={{ width: 400, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }} />
            <Box sx={{ display: 'flex', gap: 8, justifyContent: 'flex-start', flex: 1, maxWidth: 400 }}>
              {rightTabs.map((page) => (
                <Link key={page.path} href={page.path} passHref legacyBehavior>
                  <Button color="inherit" component="a">
                    {page.label}
                  </Button>
                </Link>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <Box sx={{ position: 'absolute', left: '50%', top: '36%', transform: 'translate(-50%, -50%)', zIndex: 2 }}>
          <Logo imageUrl='/images/navbar-logo.png'/>
        </Box>
      </Box>
    </Box>
  );
}
