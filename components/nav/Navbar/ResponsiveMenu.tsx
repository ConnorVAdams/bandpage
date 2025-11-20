import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

const navLinks = [
  { label: 'About', path: '/about' },
  { label: 'Calendar', path: '/calendar' },
  { label: 'Blog', path: '/blog' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Music', path: '/music' },
  { label: 'Contact', path: '/contact' },
];

export default function ResponsiveMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleClick}
        sx={{ ml: 2 }}
      >
        <MenuIcon fontSize="inherit" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {navLinks.map((link) => (
          <MenuItem key={link.path} onClick={handleClose}>
            <Link href={link.path} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              {link.label}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
