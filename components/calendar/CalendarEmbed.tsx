import React from 'react';

interface CalendarEmbedProps {
  calendarId: string;
  height?: number;
}

const CalendarEmbed: React.FC<CalendarEmbedProps> = ({ calendarId, height = 600 }) => {
  const src = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(calendarId)}&ctz=America%2FNew_York`;
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
