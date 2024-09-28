"use client";
import React from "react";
import useRepeatEndCalendarStore from "../store/repeatEndCalendarStore";
import Calendar from "./Calendar";
import MonthAndYear from "./MonthAndYear";

const RepeatEndCalendar = ({handleRepeatEndClick}) => {
  const {
    calendarDates,
    handleNextDate,
    handlePrevDate,
    handleCurrentDate,
    setEndRepeat,
    endRepeatDate,
    date,
  } = useRepeatEndCalendarStore();
  const today = new Date();

  const handleDateClick = (type, date, month, year) => {
    setEndRepeat(year, month, date);
    if (type === "prev") {
      handlePrevDate();
    } else if (type === "next") {
      handleNextDate();
    }
    handleRepeatEndClick()
  };

  const isSelected = (givenDate) =>
    endRepeatDate && givenDate.toDateString() === endRepeatDate.toDateString();
  const isDisabled = (givenDate) => givenDate < today;

  const disablePrevButton = today.getMonth() === date.getMonth();

  return (
    <div className=" bg-white absolute top-7 w-72 -left-1 flex flex-col justify-center items-center shadow-lg rounded-lg p-4">
      <MonthAndYear
        handlePrevDate={handlePrevDate}
        handleCurrentDate={handleCurrentDate}
        handleNextDate={handleNextDate}
        disabled={disablePrevButton}
        date={date}
      />
      <Calendar
        calendarDates={calendarDates}
        isSelected={isSelected}
        handleDateClick={handleDateClick}
        isDisabled={isDisabled}
      />
    </div>
  );
};

export default RepeatEndCalendar;