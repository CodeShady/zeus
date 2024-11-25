export function formatFancyTimestamp(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();

  // Calculate the difference in days
  const diffInMs = now - date;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  let timeFormat = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);

  let dayFormat;
  if (diffInDays === 0) {
    dayFormat = "Today";
  } else if (diffInDays === 1) {
    dayFormat = "Yesterday";
  } else {
    dayFormat = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(date);
  }

  return `${timeFormat}, ${dayFormat}`;
}