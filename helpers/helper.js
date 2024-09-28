export const NO_OF_WEEKS = 6;
export const DAYS_OF_WEEK = ["S", "M", "T", "W", "T", "F", "S"];

export const DAYS_WEEK_FULL = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export const MONTH_OPTIONS = [
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "last"
];

const CURRENT_DATE = new Date();
const CURRENT_MONTH = CURRENT_DATE.getMonth();
const CURRENT_YEAR = CURRENT_DATE.getFullYear();

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

export const updateDate = (date, increment) => {
  const newDate = new Date(date);
  let newMonth = newDate.getMonth() + increment;
  let newYear = newDate.getFullYear();

  if (newMonth > 11) {
    newMonth = 0;
    newYear += 1;
  } else if (newMonth < 0) {
    newMonth = 11;
    newYear -= 1;
  }

  newDate.setMonth(newMonth);
  newDate.setFullYear(newYear);
  return newDate;
};

export const getMonthFirstDay = (month, year) => {
  return new Date(year, month, 1).getDay();
};

export const getMonthDays = (month, year) => {
  const months30 = [3, 5, 8, 10];
  const leapYear = year % 4 === 0;

  return month === 1
    ? leapYear
      ? 29
      : 28
    : months30.includes(month)
    ? 30
    : 31;
};

export const generateCalendarDates = (
  month = CURRENT_MONTH,
  year = CURRENT_YEAR
) => {
  const monthDays = getMonthDays(month, year);
  const monthFirstDay = getMonthFirstDay(month, year);

  const daysFromPrevMonth = monthFirstDay;
  const daysFromNextMonth = NO_OF_WEEKS * 7 - (daysFromPrevMonth + monthDays);

  const prevMonth = month === 0 ? 11 : month - 1;
  const nextMonth = month === 11 ? 0 : month + 1;

  const prevYear = month === 0 ? year - 1 : year;
  const nextYear = month === 11 ? year + 1 : year;

  const prevMonthDays = getMonthDays(prevMonth, prevYear);

  const prevMonthDates = [...new Array(daysFromPrevMonth)].map((n, index) => {
    const date = index + 1 + (prevMonthDays - daysFromPrevMonth);
    const day = new Date(prevYear, prevMonth, date).getDay();
    return {
      date,
      day,
      type: "prev",
      month: prevMonth,
      year: prevYear
    };
  });

  const thisMonthDates = [...new Array(monthDays)].map((n, index) => {
    const date = index + 1;
    const day = new Date(year, month, date).getDay();
    return { date, day, type: "current", month, year };
  });

  const nextMonthDates = [...new Array(daysFromNextMonth)].map((n, index) => {
    const date = index + 1;
    const day = new Date(nextYear, nextMonth, date).getDay();
    return {
      date,
      day,
      type: "next",
      month: nextMonth,
      year: nextYear
    };
  });

  return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates];
};
