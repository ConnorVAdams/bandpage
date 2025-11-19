import React, { useEffect, useState } from 'react';

interface GoogleEvent {
  id: string;
  summary: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
  location?: string;
  description?: string;
}

interface GoogleCalendarEventsProps {
  calendarId: string;
  apiKey: string;
  maxResults?: number;
}

const GoogleCalendarEvents: React.FC<GoogleCalendarEventsProps> = ({ 
    calendarId, 
    apiKey, 
    maxResults = 10 
}) => {
  const [events, setEvents] = useState<GoogleEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const timeMin = new Date().toISOString();
        const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&timeMin=${timeMin}&singleEvents=true&orderBy=startTime&maxResults=${maxResults}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch events');
        const data = await res.json();
        setEvents(data.items || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [maxResults]);

  if (loading) return <div>Loading events...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Upcoming Events</h2>
      {events.length === 0 ? (
        <p>No upcoming events found.</p>
      ) : (
        <ul>
          {events.map(event => (
            <li key={event.id} style={{ marginBottom: 16 }}>
              <strong>{event.summary}</strong><br />
              {event.start.dateTime || event.start.date} - {event.end.dateTime || event.end.date}<br />
              {event.location && <span>Location: {event.location}<br /></span>}
              {event.description && <span>Description: {event.description}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GoogleCalendarEvents;
