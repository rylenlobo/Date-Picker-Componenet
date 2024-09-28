"use client";
import React, { useState } from "react";
import { ChevronRight, Repeat, X } from "lucide-react";
import { cn } from "@/utils/utils";
import useRepeatOptionStore from "@/store/repeatStore";
import RepeatOptionsDropdown from "../components/RepeatOptionsDropdown";
import RepeatOptionsCustomDropdown from "../components/RepeatOptionsCustomDropdown";
import RepeatEndCalendar from "../components/RepeatEndCalendar";
import useRepeatEndCalendarStore from "@/store/repeatEndCalendarStore";

const RepeatOptions = () => {
  const options = ["daily", "weekly", "monthly", "yearly", "custom"];
  const {
    repeatOption,
    setRepeat,
    customRepeatOption: { everyX, option },
    setCustomRepeatOptions,
    resetcustomRepeatOption,
    resetRepeat,
  } = useRepeatOptionStore();
  const { endRepeatDate, resetEndDate } = useRepeatEndCalendarStore();

  const [isOpen, setIsOpen] = useState(false);
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [isRepeatEndOpen, setIsRepeatEndOpen] = useState(false);

  const handleOptionClick = (option) => {
    if (option === "custom") {
      setIsCustomOpen(true);
      setIsOpen(false);
      setRepeat(option);
    } else {
      setRepeat(option);
      setIsOpen(false);
    }
  };

  const handleCustomOptionClick = () => {
    setCustomRepeatOptions(everyX, option);
    setIsCustomOpen(false);
  };

  const toggleRepeatOptionList = () => {
    setIsOpen(!isOpen);
  };

  const handleCancel = () => {
    setIsCustomOpen(false);
    resetRepeat();
    resetcustomRepeatOption();
  };

  const handleRepeatEndClick = () => {
    setIsRepeatEndOpen(!isRepeatEndOpen);
  };

  const handleResetOption = () => {
    resetEndDate();
    resetcustomRepeatOption();
    resetRepeat();
     setIsRepeatEndOpen(!isRepeatEndOpen);
  };

  const handleResetEndDate = () => {
    resetEndDate();
  };

  return (
    <div data-testid="repeat-options" className="flex flex-col space-y-2 mt-5 relative">
      <div
        onClick={toggleRepeatOptionList}
        className={cn(
          "flex items-center justify-between p-1 rounded-md cursor-pointer hover:bg-gray-200 transition-colors duration-200",
          { "text-blue-500": repeatOption }
        )}
      >
        <div className="w-60 flex items-center space-x-2 px-3 py-1">
          <Repeat size={15} />
          <span className="text-sm">
            {repeatOption
              ? `${repeatOption.charAt(0).toUpperCase() + repeatOption.slice(1)}`
              : "Repeat"}
          </span>
        </div>
        {repeatOption ? (
          <X
            className="text-gray-400"
            size={15}
            onClick={(e) => {
              e.stopPropagation();
              handleResetOption();
            }}
          />
        ) : (
          <ChevronRight className="text-gray-400" size={15} />
        )}
      </div>
      {isOpen && (
        <RepeatOptionsDropdown
          options={options}
          repeatOption={repeatOption}
          handleOptionClick={handleOptionClick}
        />
      )}
      {isCustomOpen && (
        <RepeatOptionsCustomDropdown
          onCancel={handleCancel}
          onOk={handleCustomOptionClick}
        />
      )}
      {repeatOption && (
        <div
          onClick={handleRepeatEndClick}
          className={cn(
            "flex items-center justify-between p-1 rounded-md cursor-pointer hover:bg-gray-200 transition-colors duration-200",
            { "text-blue-500": endRepeatDate }
          )}
        >
          <div className="w-60 flex items-center space-x-2 px-3 py-1">
            <Repeat size={15} />
            <span className="text-sm">
              {endRepeatDate
                ? `Until ${endRepeatDate.toLocaleDateString()}`
                : "Repeat Ends"}
            </span>
          </div>
          {repeatOption && endRepeatDate ? (
            <X
              className="text-gray-400"
              size={15}
              onClick={(e) => {
                e.stopPropagation();
                handleResetEndDate();
              }}
            />
          ) : (
            <ChevronRight className="text-gray-400" size={15} />
          )}
        </div>
      )}
            {isRepeatEndOpen && repeatOption && repeatOption !== 'custom' && (
          <RepeatEndCalendar handleRepeatEndClick={handleRepeatEndClick} />
      )}
    </div>
  );
};

export default RepeatOptions;