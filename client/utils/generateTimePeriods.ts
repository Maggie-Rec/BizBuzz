import { DateTime } from "luxon";
import { monthData } from "./monthData";

export function generateTimePeriods({ start, end, unit }) {
  if (unit === "year") {
    return createYears({ start: start, number: end.year - start.year + 1 });
  } else if (unit === "quarter") {
    let number =
      DateTime.fromObject(end).diff(DateTime.fromObject(start), "months").values
        .months / 3;
    const result = createQuarters({ start, number });
    return result;
  } else if (unit === "month") {
    let number = DateTime.fromObject(end).diff(
      DateTime.fromObject(start),
      "months"
    ).values.months;
    const result = createMonths({ start, number });
    return result;
  } else if (unit === "week") {
    // console.log({ start, end });
    // console.log(DateTime.fromObject(start));
    // console.log(DateTime.fromObject(end).diff(DateTime.fromObject(start), 'weeks'));
    // console.log(DateTime.fromObject(end).diff(DateTime.fromObject(start), 'weeks').values.weeks);
    let number = DateTime.fromObject(end).diff(
      DateTime.fromObject(start),
      "weeks"
    ).values.weeks;
    return createWeeks({ start, number });
  } else if (unit === "day") {
    let number = DateTime.fromObject(end).diff(
      DateTime.fromObject(start),
      "days"
    ).values.days;
    return createDays({ start, number });
  }
}
function createLastOfMonth({ month, year }) {
  // console.log('Error handlling utils/GTP line 38:', month, year);
  const last = new Date(
    `${monthData(month).lastDay} ${monthData(month).name} ${year} 23:59:59.999`
  );
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
  // console.log('Error handlling utils/GTP line 56:', start, number);
  for (let i = 0; i < 3 * number; i += 3) {
    quarterStarts.push(
      createLastOfMonth({
        month: (start.month + i - 1) % 12,
        year: Math.floor(start.year + (start.month + i - 2) / 12),
      })
    );
    quarterEnds.push(
      createFirstOfMonth({
        month: (start.month + i + 3) % 12,
        year: Math.floor(start.year + (start.month + i + 3) / 12),
      })
    );
  }
  return { startDates: quarterStarts, endDates: quarterEnds };
}
function createMonths({ start, number }) {
  let [monthStarts, monthEnds] = [[], []];
  for (let i = 0; i < number; i += 1) {
    monthStarts.push(
      createLastOfMonth({
        month: (start.month + i - 1) % 12,
        year: Math.floor(start.year + (start.month + i - 2) / 12),
      })
    );
    monthEnds.push(
      createFirstOfMonth({
        month: (start.month + i + 1) % 12,
        year: Math.floor(start.year + (start.month + i + 1) / 12),
      })
    );
  }
  return { startDates: monthStarts, endDates: monthEnds };
}
function createWeeks({ start, number }) {
  let [weekStarts, weekEnds] = [[], []];
  let obj = { ...start };
  obj.hour = obj.minute = 0;
  let currentDay = DateTime.fromObject(obj);
  for (let i = 0; i < number; i += 1) {
    weekStarts.push(currentDay.minus({ milliseconds: 1 }).toJSDate());
    weekEnds.push(currentDay.plus({ days: 7 }).toJSDate());
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
    dayStarts.push(currentDay.minus({ milliseconds: 1 }).toJSDate());
    dayEnds.push(currentDay.plus({ days: 1 }).toJSDate());
    currentDay = currentDay.plus({ days: 1 });
  }
  return { startDates: dayStarts, endDates: dayEnds };
}
