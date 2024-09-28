"use client";
import useMiniCalendarStore from "@/store/miniCalendarStore";

import useRepeatOptionStore from "@/store/repeatStore";
import Calendar from "./Calendar"; // Import the reusable Calendar component
import MonthAndYear from "./MonthAndYear";
import RepeatEndCalendarStore from "../store/repeatEndCalendarStore"

const MiniCalendar = () => {
  const {
    calendarDates,
    handleNextDate,
    handlePrevDate,
    handleCurrentDate,
    setSelected,
    dateSelected,
    date
  } = useMiniCalendarStore();
  const { customRepeatOption, repeatOption, weekDays, monthCustomOptions } =
    useRepeatOptionStore();
  
  const {endRepeatDate,setDate} = RepeatEndCalendarStore()

  const handleDateClick = (type, date, month, year) => {
    setSelected(Number(date), month, year);
    setDate(new Date(year,month,date))
    if (type === "prev") {
      handlePrevDate();
    } else if (type === "next") {
      handleNextDate();
    }
  };

  const isRepeatSet = (date, day, month, year) => {
    const inputDate = new Date(year, month, date);

    if (endRepeatDate && inputDate > endRepeatDate) {
      return false;
    }

    switch (repeatOption) {
      case "daily":
        return inputDate >= dateSelected;

      case "weekly":
        return dateSelected.getDay() === day && inputDate >= dateSelected;

      case "monthly":
        return (
          Number(date) === dateSelected.getDate() && inputDate >= dateSelected
        );

      case "yearly":
        return (
          Number(date) === dateSelected.getDate() &&
          month === dateSelected.getMonth() &&
          inputDate >= dateSelected
        );

      default:
        return false;
    }
  };

  const isCustomRepeatSet = (date, day, month, year) => {
    const inputDate = new Date(year, month, date);
    inputDate.setHours(0, 0, 0, 0); // Normalize to midnight

    const normalizedDateSelected = new Date(dateSelected);
    normalizedDateSelected.setHours(0, 0, 0, 0); // Normalize to midnight

    if (endRepeatDate && inputDate > endRepeatDate) {
      return false;
    }

    const diffInMs = inputDate.getTime() - normalizedDateSelected.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const X = customRepeatOption.everyX;
    const { isEnabled, nth, targetDay } = monthCustomOptions;

    switch (customRepeatOption.option) {
      case "days":
        return diffInDays >= 0 && diffInDays % X === 0;

      case "weeks": {
        const diffInWeeks = Math.floor(diffInDays / 7);
        const isDayInSelectedWeek = weekDays.includes(inputDate.getDay());
        return diffInDays >= 0 && diffInWeeks % X === 0 && isDayInSelectedWeek;
      }

      case "months": {
        if (!isEnabled) {
          const totalMonths =
            (year - normalizedDateSelected.getFullYear()) * 12 +
            (month - normalizedDateSelected.getMonth());
          const daysInMonth = new Date(year, month + 1, 0).getDate();
          const isDayValid =
            date <= daysInMonth && date === normalizedDateSelected.getDate();
          return totalMonths >= 0 && totalMonths % X === 0 && isDayValid;
        }

        const targetDayIndex = [
          "sunday",
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
        ].indexOf(targetDay.toLowerCase());
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const firstOccurrenceDate =
          1 + ((targetDayIndex - firstDayOfMonth + 7) % 7);
        const nthOccurrenceDate = firstOccurrenceDate + (nth - 1) * 7;
        const isNthDayMatch = date === nthOccurrenceDate;
        const totalMonths =
          (year - normalizedDateSelected.getFullYear()) * 12 +
          (month - normalizedDateSelected.getMonth());
        const isDateAfterOrEqualToDateSelected =
          new Date(year, month, nthOccurrenceDate) >= normalizedDateSelected;

        return (
          totalMonths >= 0 &&
          totalMonths % X === 0 &&
          isNthDayMatch &&
          isDateAfterOrEqualToDateSelected
        );
      }

      case "years": {
        const diffInYears = year - normalizedDateSelected.getFullYear();
        const isSameMonthAndDay =
          month === normalizedDateSelected.getMonth() &&
          date === normalizedDateSelected.getDate();
        return diffInYears >= 0 && diffInYears % X === 0 && isSameMonthAndDay;
      }

      default:
        return false;
    }
  };

  const isSelected = (givenDate) =>
    givenDate.toDateString() === dateSelected.toDateString();
  

  return (
    <div data-testid="mini-calendar">
      <MonthAndYear
        handleCurrentDate={handleCurrentDate}
        handleNextDate={handleNextDate}
        handlePrevDate={handlePrevDate}
        date={date}
      />
      <Calendar
        calendarDates={calendarDates}
        isSelected={isSelected}
        handleDateClick={handleDateClick}
        isRepeat={isRepeatSet}
        isCustomRepeat={isCustomRepeatSet}
        repeatOption={repeatOption}
      />
    </div>
  );
};

export default MiniCalendar;
