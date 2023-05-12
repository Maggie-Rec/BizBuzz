export default function getThisPeriod(periodString) {
  if (periodString === "this_week") {
    let start = new Date();
    while (start.getDay() !== 1) {
      start.setDate(start.getDate() - 1);
    };
    let end = new Date();
    while (end.getDay() !== 1) {
      end.setDate(end.getDate() + 1);
    };
    return [setTimeTo00andISO(start), setTimeTo00andISO(end)];
  } else if (periodString === "this_month") {
    let start = new Date();
    start.setDate(1);
    let end = new Date();
    end.setMonth(end.getMonth() + 1);
    end.setDate(1);
    return [setTimeTo00andISO(start), setTimeTo00andISO(end)];
  } else if (periodString === "this_quarter") {
    let start = new Date();
    while ((start.getMonth() + 1) % 3 !== 0) {
      start.setMonth(start.getMonth() - 1);
    };
    start.setDate(1);
    let end = new Date();
    do {
      start.setMonth(start.getMonth() + 1);
    } while ((start.getMonth() + 1) % 3 !== 0);
    end.setDate(1);
    return [setTimeTo00andISO(start), setTimeTo00andISO(end)];
  } else if (periodString === "this_year") {
    let start = new Date();
    start.setMonth(0);
    start.setDate(1);
    let end = new Date();
    end.setFullYear(end.getFullYear() + 1);
    end.setMonth(0);
    end.setDate(1)
    return [setTimeTo00andISO(start), setTimeTo00andISO(end)];
  } else {
    return undefined;
  }
}

function setTimeTo00andISO(dateObj) {
  dateObj.setHours(0);
  dateObj.setMinutes(0);
  dateObj.setSeconds(0);
  dateObj.setMilliseconds(0);
  return dateObj.toISOString();
}