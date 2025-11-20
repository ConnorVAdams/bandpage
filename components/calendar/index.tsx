import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CalendarEmbed from './CalendarEmbed';
import GoogleCalendarEvents from './GoogleCalendarEvents';
import { Typography } from '@mui/material';

export default function CalendarComponent() {
  const GOOGLE_CLIENT_ID = "374516236080-bpmbht4ci4luu8r8of6d2ibpl5g55p1u.apps.googleusercontent.com"
  const GOOGLE_CLIENT_SECRET = "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"
  const GOOGLE_API_KEY = "AIzaSyDKRk7UpyIppxMksNr0FcKoVp-wUFuUYt4"

  async function fetchCalendarEvents() {
  const calendarId = "48636ab3da6e7b90dbbfde8ac83bf050ad92a886d5ebf6ee51f908e677121326@group.calendar.google.com";

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${GOOGLE_API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("Google Calendar Events:", data);
  } catch (error) {
    console.error("Error fetching Google Calendar events:", error);
  }
}

fetchCalendarEvents();

  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', mt: -14}}>
      <Stack spacing={4} sx={{ width: '100%', maxWidth: 900 }}>
        <Box className="card" sx={{ p: 3, width: '100%' }}>
          <Typography fontFamily="Futura" variant="h4" component="h1" gutterBottom>Upcoming Events</Typography>
          {/* <CalendarEmbed calendarId="2cf3e546991abc11ed8a3da80d7518d2c00ed1ea890e2a316c6af8d763b01299@group.calendar.google.com" height={600} /> */}
        </Box>
      </Stack>
    </Box>
  );
}