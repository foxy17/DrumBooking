/**
 * Format a date string to display format (e.g., "12th May")
 */
export const formatPreviousClassDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });

  // Add ordinal suffix to day
  const suffix = getDaySuffix(day);
  return `${day}${suffix} ${month}`;
};

/**
 * Get the appropriate suffix for a day number (st, nd, rd, th)
 */
export const getDaySuffix = (day: number) => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};
