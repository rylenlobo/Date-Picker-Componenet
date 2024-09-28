"use client";
import { cn } from "@/utils/utils";
import { DAYS_OF_WEEK } from "@/helpers/helper";

const Calendar = ({
  calendarDates,
  isSelected,
  handleDateClick,
  isRepeat = () => false,
  isCustomRepeat = () => false,
  isDisabled = () => false,
  repeatOption = "",
}) => {
  const today = new Date();

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="grid grid-cols-7 gap-2 mt-3 px-2">
        {DAYS_OF_WEEK.map((day, index) => (
          <div
            key={index}
            className="flex justify-center items-center text-xs w-8 h-8 text-gray-400"
          >
            {day}
          </div>
        ))}

        {calendarDates.map(({ date, day, type, month, year }, index) => {
          const givenDate = new Date(year, month, date);
          const isToday = givenDate.toDateString() === today.toDateString();
          const isDateSelected = isSelected(givenDate);
          const isRepeatSet =
            isRepeat(date, day, month, year) ||
            (isCustomRepeat(date, day, month, year) &&
              repeatOption === "custom");
          const isDateDisabled = isDisabled && isDisabled(givenDate);

          return (
            <div
              key={index}
              onClick={() =>
                !isDateDisabled && handleDateClick(type, date, month, year)
              }
              className={cn(
                "w-7 h-7 flex justify-center items-center rounded-full text-xs transition-colors duration-200 cursor-pointer",
                {
                  "bg-blue-700 text-white": isDateSelected,
                  "bg-green-500 text-white": isRepeatSet,
                  "bg-blue-300 text-blue-700": isToday,
                  "text-gray-400":
                    (type === "next" || type === "prev") && !isRepeatSet,
                  "text-white":
                    (type === "next" || type === "prev") && isRepeatSet,
                  "cursor-not-allowed text-gray-400": isDateDisabled,
                }
              )}
            >
              {date}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;