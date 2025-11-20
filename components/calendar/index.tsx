import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RoomIcon from '@mui/icons-material/Room';

interface EventItem {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
}

const STATE_ABBREVIATIONS: Record<string, string> = {
  Montana: 'MT',
  Idaho: "MT"
};

export default function CalendarComponent() {
  const GOOGLE_API_KEY = "AIzaSyDKRk7UpyIppxMksNr0FcKoVp-wUFuUYt4";
  const CALENDAR_ID = "48636ab3da6e7b90dbbfde8ac83bf050ad92a886d5ebf6ee51f908e677121326@group.calendar.google.com";
  const EVENTS_PER_PAGE = 5;

  const [events, setEvents] = React.useState<EventItem[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    async function fetchCalendarEvents() {
      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
        CALENDAR_ID
      )}/events?key=${GOOGLE_API_KEY}&singleEvents=true&orderBy=startTime`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        const mapped: EventItem[] = (data.items || []).map((ev: any) => {
          const start = ev.start.dateTime || ev.start.date;
          const end = ev.end?.dateTime;

          const date = new Date(start).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          });

          let time = "";
          if (ev.start.dateTime && ev.end?.dateTime) {
            const s = new Date(ev.start.dateTime);
            const e = new Date(ev.end.dateTime);
            time = `${s.toLocaleTimeString(undefined, {
              hour: "numeric",
              minute: "2-digit",
            })} – ${e.toLocaleTimeString(undefined, {
              hour: "numeric",
              minute: "2-digit",
            })}`;
          }

          return {
            id: ev.id,
            title: ev.summary,
            date,
            time,
            location: ev.location,
            description: ev.description,
          };
        });

        setEvents(mapped);
      } catch (error) {
        console.error("Error fetching Google Calendar events:", error);
      }
    }

    fetchCalendarEvents();
  }, []);

  // Filter events based on search query
  const filteredEvents = events.filter((ev) => {
    const query = searchQuery.toLowerCase();

    // Check title
    if (ev.title.toLowerCase().includes(query)) return true;

    // Check abbreviations (Montana → MT)
    for (const [full, abbr] of Object.entries(STATE_ABBREVIATIONS)) {
      if (
        query.includes(full.toLowerCase()) &&
        ev.title.toLowerCase().includes(abbr.toLowerCase())
      ) {
        return true;
      }
    }

    return false;
  });

  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);
  const eventsToDisplay = filteredEvents.slice(
    (currentPage - 1) * EVENTS_PER_PAGE,
    currentPage * EVENTS_PER_PAGE
  );

  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        px: 2,
        py: 4,
      }}
    >
      <Stack spacing={4} sx={{ width: '100%', maxWidth: 900 }}>
        <Box className="card" sx={{ p: 3, width: '100%' }}>
          <Typography fontFamily="Futura" variant="h4" component="h1" gutterBottom>
            Upcoming Events
          </Typography>

          {/* Search input */}
          <TextField
            fullWidth
            placeholder="Search events by title..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // reset to first page on search
            }}
            sx={{ mb: 3 }}
          />

          <Stack spacing={3}>
            {eventsToDisplay.map((ev) => (
              <Box
                key={ev.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 1,
                  gap: 2,
                  alignItems: 'stretch',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 100,
                    flexShrink: 0,
                  }}
                >
                  <EventNoteIcon sx={{ fontSize: 40 }} />
                  <Typography variant="h6">{ev.date}</Typography>
                  {ev.time && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                      <AccessTimeIcon fontSize="small" />
                      <Typography variant="body2">{ev.time}</Typography>
                    </Box>
                  )}
                </Box>

                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Typography variant="h6" gutterBottom>{ev.title}</Typography>
                  {ev.location && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: ev.description ? 1 : 0 }}>
                      <RoomIcon fontSize="small" />
                      <Typography variant="body2">{ev.location}</Typography>
                    </Box>
                  )}
                  {ev.description && (
                    <Typography variant="body2" sx={{ mt: 1 }}>{ev.description}</Typography>
                  )}
                </Box>
              </Box>
            ))}
          </Stack>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
              <Button
                variant="outlined"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </Button>
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                Page {currentPage} of {totalPages}
              </Typography>
              <Button
                variant="outlined"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              >
                Next
              </Button>
            </Box>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
