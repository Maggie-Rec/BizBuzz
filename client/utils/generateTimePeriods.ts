import { DateTime } from 'luxon';

export function generateTimePeriods({ start, end, unit }) {
  if (unit === 'year') {
    return createYears({ start: start, number: end.year - start.year + 1 });
  } else if (unit === 'quarter') {
    let number = DateTime.fromObject(end).diff(DateTime.fromObject(start), 'months').values.months / 3;
    const result = createQuarters({ start, number });
    return result;
  } else if (unit === 'month') {
    let number = DateTime.fromObject(end).diff(DateTime.fromObject(start), 'months').values.months;
    const result = createMonths({ start, number });
    return result;
  } else if (unit === 'week') {
    let number = DateTime.fromObject(end).diff(DateTime.fromObject(start), 'weeks').values.weeks;
    return createWeeks({ start, number });
  } else if (unit === 'day') {
    let number = DateTime.fromObject(end).diff(DateTime.fromObject(start), 'days').values.days;
    return createDays({ start, number });
  }
}
function monthData(month, year = 1) {
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
function createLastOfMonth({ month, year }) {
  const last = new Date(`${monthData(month).lastDay} ${monthData(month).name} ${year} 23:59:59.999`);
  return last;
}
function createFirstOfMonth({ month, year }) {
  const first = new Date(`1 ${monthData(month).name} ${year} 0:00:00.000`);
  return first;
}
function createYears({ start, number }) {
  let [yearStarts, yearEnds] = [[], []];
  for (let i = 0; i < number; i++) {
    yearStarts.push(new Date(`31 December ${start.year + i - 1} 23:59:59.999`));
    yearEnds.push(new Date(`1 January ${start.year + i + 1} 00:00:00.000`));
  }
  return { startDates: yearStarts, endDates: yearEnds };
}
function createQuarters({ start, number }) {
  let [quarterStarts, quarterEnds] = [[], []];
  for (let i = 0; i < 3 * number; i += 3) {
    quarterStarts.push(createLastOfMonth({ month: (start.month + i) % 12 - 1, year: Math.floor(start.year + (start.month + i - 1) / 12) }));
    quarterEnds.push(createFirstOfMonth({ month: (start.month + i + 3) % 12, year: Math.floor(start.year + (start.month + i + 3) / 12) }));
  }
  return { startDates: quarterStarts, endDates: quarterEnds };
}
function createMonths({ start, number }) {
  let [monthStarts, monthEnds] = [[], []];
  for (let i = 0; i < number; i += 1) {
    monthStarts.push(createLastOfMonth({ month: (start.month + i - 1) % 12, year: Math.floor(start.year + (start.month + i) / 12) }));
    monthEnds.push(createFirstOfMonth({ month: (start.month + i + 1) % 12, year: Math.floor(start.year + (start.month + i + 1) / 12) }));
  }
  return { startDates: monthStarts, endDates: monthEnds };
}
function createWeeks({ start, number }) {
  let [weekStarts, weekEnds] = [[], []];
  let obj = { ...start };
  obj.hour = obj.minute = 0;
  let currentDay = DateTime.fromObject(obj);
  for (let i = 0; i < number; i += 1) {
    weekStarts.push(currentDay.minus({ milliseconds: 1 }));
    weekEnds.push(currentDay.plus({ days: 7 }));
    currentDay = currentDay.plus({ days: 7 });
  }
  return { startDates: weekStarts, endDates: weekEnds };
}
function createDays({ start, number }) {
  let [dayStarts, dayEnds] = [[], []];
  let obj = { ...start };
  obj.hour = obj.minute = 0;
  let currentDay = DateTime.fromObject(obj);
  for (let i = 0; i < number; i++) {
    dayStarts.push(currentDay.minus({ milliseconds: 1 }));
    dayEnds.push(currentDay.plus({ days: 1 }));
    currentDay = currentDay.plus({ days: 1 });
  }
  return { startDates: dayStarts, endDates: dayEnds };
}