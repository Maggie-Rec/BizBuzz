/* START & END OF TODAY (00:00:00 to 23:59:59) */
export const todayTimeFilter = [
  new Date(new Date().setUTCHours(0,0,0,0)),
  new Date(new Date().setUTCHours(23,59,59,999))
]

/* SEVEN DAYS AGO TO CURRENT DAY */
export const lastWeekTF = [
  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 7),
  new Date()
];

/* A MONTH AGO TO CURRENT DAY */
export const lastMonthTF = [
  new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate()),
  new Date()
];

/* THREE MONTHS AGO TO CURRENT DAY */
export const lastQuarterTF = [
  new Date(new Date().getFullYear(), new Date().getMonth() - 3, new Date().getDate()),
  new Date()
];

/* A YEAR AGO TO CURRENT DAY */
export const lastYearTF = [
  new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate()),
  new Date()
];