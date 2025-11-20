import React from 'react';
import getUserTimeZone from './getUserTimeZone';

interface CalendarEmbedProps {
  calendarId: string;
  height?: number;
}

const CalendarEmbed: React.FC<CalendarEmbedProps> = ({ calendarId, height = 600 }) => {
  const timeZone = typeof window !== 'undefined' ? getUserTimeZone() : 'UTC';
  const src = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(calendarId)}&ctz=${encodeURIComponent(timeZone)}`;
  return (
    <div style={{ width: '100%', maxWidth: 900, margin: '0 auto' }}>
      <iframe
        src={src}
        style={{ border: 0, width: '100%', height, minHeight: 400 }}
        frameBorder="0"
        scrolling="no"
        title="Google Calendar Embed"
      />
    </div>
  );
};

export default CalendarEmbed;
