import { DateTime } from 'luxon';

export function generateTimePeriods({ start, end, unit }) {
  if (unit === 'year') {
    return createYears(start.year, end.year - start.year + 1);
  } else if (unit === 'quarter') {
    return createQuarters(start, 4 * (end.year - start.year) + (end.month - start.month) / 3);
  } else if (unit === 'month') {
    return createMonths(start, DateTime.fromObject(end).diff(DateTime.fromObject(start)).months);
  } else if (unit === 'week') {
    return createWeeks(start, DateTime.fromObject(end).diff(DateTime.fromObject(start)).weeks);
  } else if (unit === 'day') {
    return createDays(start, DateTime.fromObject(end).diff(DateTime.fromObject(start)).days);
  }
}
function monthData(month, year = 1) {
  if (month === 0) return { name: 'January', lastDay: 31 };
  if (month === 1) return { name: 'February', lastDay: year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0) ? 29 : 28 };
  if (month === 2) return { name: 'March', lastDay: 31 };
  if (month === 3) return { name: 'April', lastDay: 30 };
  if (month === 4) return { name: 'May', lastDay: 31 };
  if (month === 5) return { name: 'June', lastDay: 30 };
  if (month === 6) return { name: 'July', lastDay: 31 };
  if (month === 7) return { name: 'August', lastDay: 31 };
  if (month === 8) return { name: 'September', lastDay: 30 };
  if (month === 9) return { name: 'October', lastDay: 31 };
  if (month === 10) return { name: 'November', lastDay: 30 };
  if (month === 11) return { name: 'December', lastDay: 31 };
}
function createLastOfMonth(month, year) {
  return new Date(`${monthData(month).lastDay} ${monthData(month).name} ${year} 23:59:59.999`).toISOString();
}
function createFirstOfMonth(month, year) {
  return new Date(`1 ${monthData(month).name} ${year} 0:00:00.000`).toISOString();
}
function createYears(start, number) {
  let [yearStarts, yearEnds] = [[], []];
  for (let i = 0; i < number; i++) {
    yearStarts.push(new Date(`31 December ${start.year + i - 1} 23:59:59.999`).toISOString());
    yearEnds.push(new Date(`1 January ${start.year + i + 1} 23:59:59.999`).toISOString());
  }
  return { startDates: yearStarts, endDates: yearEnds };
}
function createQuarters(start, number) {
  let [quarterStarts, quarterEnds] = [[], []];
  for (let i = 0; i < 3 * number; i += 3) {
    quarterStarts.push(createLastOfMonth((start.month + i) % 12 - 1, Math.floor(start.year + (start.month + i - 1) / 12)));
    quarterEnds.push(createFirstOfMonth((start.Month + i + 3) % 12, Math.floor(start.year + (start.month + i + 3) / 12)));
  }
  return { startDates: quarterStarts, endDates: quarterEnds };
}
function createMonths(start, number) {
  let [monthStarts, monthEnds] = [[], []];
  for (let i = 0; i < number; i += 1) {
    monthStarts.push(createLastOfMonth((start.month + i - 1), Math.floor(start.year + (start.month + i) / 12)))
    monthStarts.push(createLastOfMonth((start.month + i + 1) % 12, Math.floor(start.year + (start.month + i + 1) / 12)))
  }
  return { startDates: monthStarts, endDates: monthEnds };
}
function createWeeks(start, number) {
  let [weekStarts, weekEnds] = [[], []];
  let obj = { ...start };
  obj.hour = obj.minute = 0;
  let currentDay = DateTime.fromObject(obj);
  for (let i = 0; i < number; i += 1) {
    weekStarts.push(currentDay.minus({ milliseconds: 1 }).toISO());
    weekEnds.push(currentDay.plus({ days: 7 }).toISO());
    currentDay = currentDay.plus({ days: 7 });
  }
  return { startDates: weekStarts, endDates: weekEnds };
}
function createDays(start, number) {
  let [dayStarts, dayEnds] = [[], []];
  let obj = { ...start };
  obj.hour = obj.minute = 0;
  let currentDay = DateTime.fromObject(obj);
  for (let i = 0; i < number; i++) {
    dayStarts.push(currentDay.minus({ milliseconds: 1 }).toISO());
    dayEnds.push(currentDay.plus({ days: 1 }).toISO());
    currentDay = currentDay.plus({ days: 1 });
  }
  return { startDates: dayStarts, endDates: dayEnds };
}