export function monthData(month, year = 1) {
  if (month === 0) return { name: 'December', lastDay: 31 };
  if (month === 1) return { name: 'January', lastDay: 31 };
  if (month === 2) return { name: 'February', lastDay: year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0) ? 29 : 28 };
  if (month === 3) return { name: 'March', lastDay: 31 };
  if (month === 4) return { name: 'April', lastDay: 30 };
  if (month === 5) return { name: 'May', lastDay: 31 };
  if (month === 6) return { name: 'June', lastDay: 30 };
  if (month === 7) return { name: 'July', lastDay: 31 };
  if (month === 8) return { name: 'August', lastDay: 31 };
  if (month === 9) return { name: 'September', lastDay: 30 };
  if (month === 10) return { name: 'October', lastDay: 31 };
  if (month === 11) return { name: 'November', lastDay: 30 };
  if (month === 12) return { name: 'December', lastDay: 31 };
}