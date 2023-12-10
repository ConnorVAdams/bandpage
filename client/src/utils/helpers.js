function formatDateTime(datetimeString) {
        const dateTime = new Date(datetimeString);
    
        const options = {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        };
    
        const datePart = dateTime.toLocaleDateString('en-US', options);
        const timePart = dateTime.toLocaleTimeString('en-US', options);
    
        const [date, time] = datePart.split(',').concat(timePart.split(','));
    
        return {
        date: date.trim(),
        time: time.trim(),
        };
    }

export { formatDateTime }