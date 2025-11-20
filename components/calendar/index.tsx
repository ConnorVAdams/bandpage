import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RoomIcon from '@mui/icons-material/Room';
import { Divider } from '@mui/material';

interface EventItem {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
}

const STATE_ABBREVIATIONS: Record<string, string> = {
  Idaho: "ID",
  Montana: "MT",
  Wyoming: "WY",
};

export default function CalendarComponent() {
  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const CALENDAR_ID = "48636ab3da6e7b90dbbfde8ac83bf050ad92a886d5ebf6ee51f908e677121326@group.calendar.google.com";

  const [events, setEvents] = React.useState<EventItem[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedStates, setSelectedStates] = React.useState<string[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const eventsPerPage = 5;

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

  // Filter + search
  const filteredEvents = events.filter((ev) => {
    const stateMatch =
      selectedStates.length === 0 ||
      selectedStates.some((state) =>
        ev.title.toLowerCase().includes(STATE_ABBREVIATIONS[state].toLowerCase())
      );

    const searchMatch = ev.title.toLowerCase().includes(searchQuery.toLowerCase());

    return stateMatch && searchMatch;
  });

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  const toggleState = (state: string) => {
    if (selectedStates.includes(state)) {
      setSelectedStates(selectedStates.filter((s) => s !== state));
    } else {
      setSelectedStates([...selectedStates, state]);
    }
    setCurrentPage(1);
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
        backgroundColor: 'transparent', // outermost transparent
      }}
    >
      <Stack spacing={4} sx={{ width: '100%', maxWidth: 1080, backgroundColor: '#f1d3ad', borderRadius: 2, p: 3 }}>


      <Box sx={{ p: 2, borderRadius: 2, backgroundColor: 'black' }}>
  {/* Title */}
  <Typography fontFamily="Futura" variant="h4" component="h1" sx={{ mb: 1 }}>
    Upcoming Events
  </Typography>

  {/* Divider with color */}
  <Divider sx={{ borderColor: "white", mb: 2 }} />

  <TextField
    fullWidth
    placeholder="Search events by title or location..."
    value={searchQuery}
    onChange={(e) => {
      setSearchQuery(e.target.value);
      setCurrentPage(1);
    }}
    variant="outlined"
    InputProps={{
      sx: {
        color: 'white', // text color
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'white', // border color
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'white',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'white',
        },
      },
    }}
    inputProps={{ style: { color: 'white' } }}
  />

  {/* State filter buttons */}
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-start', mt: 2 }}>
    <Typography variant="caption" sx={{ textAlign: 'center', color: 'white' }}>
      Show events in...
    </Typography>
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
      {Object.keys(STATE_ABBREVIATIONS).map((state) => (
        <Button
          key={state}
          variant={selectedStates.includes(state) ? 'contained' : 'outlined'}
          onClick={() => toggleState(state)}
          sx={{
            backgroundColor: selectedStates.includes(state) ? '#ee8220' : 'transparent',
            color: selectedStates.includes(state) ? '#fff' : '#ee8220',
            borderColor: '#ee8220',
            '&:hover': {
              backgroundColor: selectedStates.includes(state)
                ? '#d66f1a'
                : 'rgba(238,130,32,0.1)',
            },
          }}
        >
          {state}
        </Button>
      ))}

      <Button
        variant="outlined"
        color="error"
        onClick={() => setSelectedStates([])}
      >
        Reset
      </Button>
    </Box>
  </Box>
</Box>
{/* Events List */}
<Stack spacing={3}>
  {paginatedEvents.map((ev) => (
    <Box
      key={ev.id}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        p: 2,
        borderRadius: 3,
        gap: 2,
        alignItems: 'flex-start',
        backgroundColor: 'black', // each item black
      }}
    >
      {/* Left side: icon + date/time */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: 175,          // FIXED width
          flexShrink: 0, 
          mt: 1       // prevent shrinking
        }}
      >
        <EventNoteIcon sx={{ fontSize: 40, color: '#d66f1a' }} />
        <Typography variant="h6" sx={{ color: '#d66f1a' }}>{ev.date}</Typography>
        {ev.time && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccessTimeIcon fontSize="small" sx={{ color: '#d66f1a' }} />
            <Typography variant="body2" sx={{ color: '#d66f1a', textAlign: 'center', minWidth: 50 }}>
              {ev.time}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Right side: event details */}
      <Box sx={{ flex: 1, mt: 1}}>

      <Box sx={{ flex: 1, height: '100%', backgroundColor: 'white', p: 2, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ color: 'black' }}>
          {ev.title}
        </Typography>
      </Box>
        {ev.location && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
            <RoomIcon fontSize="small" sx={{ color: 'red' }} />
            <Typography variant="body2" sx={{ color: '#d66f1a' }}>{ev.location}</Typography>
          </Box>
        )}
        {ev.description && (
          <Typography variant="body2" sx={{ mt: 1, color: '#f1d3ad' }}>
            {ev.description}
          </Typography>
        )}
    </Box>
        </Box>
  ))}
</Stack>


        {/* Pagination Controls */}
        {Math.ceil(filteredEvents.length / eventsPerPage) > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
            <Button
              variant="contained"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              sx={{ backgroundColor: '#d66f1a'}}
            >
              Prev
            </Button>
            <Typography sx={{ display: 'flex', alignItems: 'center', px: 1, color: "black" }}>
              Page {currentPage} of {Math.ceil(filteredEvents.length / eventsPerPage)}
            </Typography>
            <Button
              variant="contained"
              disabled={currentPage === Math.ceil(filteredEvents.length / eventsPerPage)}
              onClick={() => setCurrentPage(currentPage + 1)}
              sx={{ backgroundColor: '#d66f1a'}}
            >
              Next
            </Button>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
