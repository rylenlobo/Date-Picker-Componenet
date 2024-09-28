"use client";
import { cn } from "../utils/utils";
import useRepeatOptionStore from "@/store/repeatStore";
import { DAYS_OF_WEEK, DAYS_WEEK_FULL, MONTH_OPTIONS } from "@/helpers/helper";

const RepeatOptionsCustomDropdown = ({ onCancel , onOk  }) => {
  const {
    customRepeatOption: { everyX, option },
    setCustomRepeatOptions,
    addWeekDay,
    weekDays,
    monthCustomOptions: { isEnabled, nth, targetDay },
    updateMonthCustomOptions,
  } = useRepeatOptionStore();

  const handleValueChange = (e) => {
    setCustomRepeatOptions(Number(e.target.value), option);
  };

  const handleUnitChange = (e) => {
    setCustomRepeatOptions(everyX, e.target.value);
  };

  const handleNthChange = (e) => {
    const newNth = Number(e.target.value);
    updateMonthCustomOptions(newNth, targetDay);
  };

  const handleDayChange = (e) => {
    const newDay = e.target.value;
    updateMonthCustomOptions(nth, newDay);
  };

  const handleMonthCustomOptionsToggle = () => {
    updateMonthCustomOptions(nth, targetDay, !isEnabled);
  };

  return (
    <div className="absolute -left-1 flex flex-col items-start justify-center w-72 bg-white shadow-xl rounded-lg p-2">
      <div className="text-sm w-full flex items-center justify-around space-x-2 mb-4">
        Every
        <input
          type="number"
          min={1}
          value={everyX}
          onChange={handleValueChange}
          className="w-20 h-10 p-2 border border-gray-300 rounded-md"
        />
        <select
          value={option}
          onChange={handleUnitChange}
          className="p-2 h-10 border border-gray-300 rounded-md"
        >
          <option value="days">Day</option>
          <option value="weeks">Week</option>
          <option value="months">Month</option>
          <option value="years">Year</option>
        </select>
      </div>
      <div>
        {option === "weeks" && (
          <div className="w-full items-center justify-around flex py-3">
            {DAYS_OF_WEEK.map((day, index) => (
              <button
                onClick={() => {
                  addWeekDay(index);
                }}
                key={day}
                className={cn(
                  "m-1 w-7 h-7 rounded-full transition duration-300 text-xs flex items-center justify-center",
                  {
                    "bg-blue-700 text-white": weekDays.includes(index),
                    "bg-gray-200 text-gray-800 hover:bg-blue-300 hover:text-white":
                      !weekDays.includes(index),
                  }
                )}
              >
                {day}
              </button>
            ))}
          </div>
        )}
        {option === "months" && (
          <div className="w-full flex flex-col items-start gap-1 py-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isEnabled}
                onChange={handleMonthCustomOptionsToggle}
                className="form-checkbox"
              />
              <span>On the</span>
            </label>
            {isEnabled && (
              <div className="w-full flex items-center justify-evenly gap-1">
                <select
                  value={nth}
                  onChange={handleNthChange}
                  className="p-2 w-32 rounded border border-gray-300"
                >
                  {MONTH_OPTIONS.map((option, index) => (
                    <option key={option} value={index + 1}>
                      {option}
                    </option>
                  ))}
                </select>
                <select
                  value={targetDay}
                  onChange={handleDayChange}
                  className="p-2 w-32 rounded border border-gray-300"
                >
                  {DAYS_WEEK_FULL.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="text-sm w-full flex justify-end space-x-2 mt-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          onClick={onOk}
          className="text-sm px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default RepeatOptionsCustomDropdown;