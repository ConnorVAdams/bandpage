import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function ContactComponent() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace this with your actual email sending logic
    console.log('Booking Request:', { name, email, message });
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        px: 2,
        backgroundColor: 'transparent',
      }}
    >
      <Stack
        spacing={4}
        sx={{
          width: '100%',
          maxWidth: 900,
          backgroundColor: '#f1d3ad',
          borderRadius: 2,
          p: 3,
        }}
      >
        <Box sx={{ p: 2, borderRadius: 2, backgroundColor: 'black' }}>
          <Typography
            fontFamily="Futura"
            variant="h4"
            sx={{ color: 'white', textAlign: 'left' }}
          >
            Contact the Band
          </Typography>
        </Box>

        <Box sx={{ backgroundColor: 'black', borderRadius: 2, p: 3 }}>
          <Typography
            sx={{ color: 'white', fontFamily: 'Futura', mb: 2 }}
          >
            Interested in booking the band for your event? We’d love to hear from you! 
            Please fill out the form below with your details and a brief description 
            of your event, and we’ll get back to you as soon as possible.
          </Typography>

          {submitted && (
            <Typography
              sx={{ color: '#ee8220', fontFamily: 'Futura', mb: 2 }}
            >
              Thanks! Your booking request has been sent.
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Your Name"
                variant="outlined"
                fullWidth
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ backgroundColor: 'white', borderRadius: 1 }}
              />
              <TextField
                label="Your Email"
                type="email"
                variant="outlined"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ backgroundColor: 'white', borderRadius: 1 }}
              />
              <TextField
                label="Message"
                variant="outlined"
                fullWidth
                required
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{ backgroundColor: 'white', borderRadius: 1 }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#ee8220',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#d66f1a' },
                  alignSelf: 'flex-start',
                  mt: 1,
                }}
              >
                Send Booking Request
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Box>
  );
}
