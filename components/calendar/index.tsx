import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CalendarEmbed from './CalendarEmbed';
import GoogleCalendarEvents from './GoogleCalendarEvents';

export default function CalendarComponent() {
  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: -14}}>
      <Stack spacing={4} sx={{ width: '100%', maxWidth: 900 }}>
        <Box className="card" sx={{ p: 3, width: '100%' }}>
          <h1>Upcoming Events</h1>
          <CalendarEmbed calendarId="2cf3e546991abc11ed8a3da80d7518d2c00ed1ea890e2a316c6af8d763b01299@group.calendar.google.com" height={600} />
        </Box>
      </Stack>
    </Box>
  );
}