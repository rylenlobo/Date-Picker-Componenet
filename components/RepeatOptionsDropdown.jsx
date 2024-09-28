"use client";
import { ChevronRight } from "lucide-react";
import { cn, capitalizeFirstLetter } from "../utils/utils";

const RepeatOptionsDropdown = ({
  options = [],
  repeatOption = "",
  handleOptionClick = () => {},
}) => {
  return (
    <div className="absolute -top-52 left-0 z-50 flex flex-col items-start justify-center w-full bg-white shadow-xl rounded-lg p-1">
      {options.map((option) => (
        <div
          key={option}
          className={cn(
            "text-sm w-full rounded-md px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center transition-colors duration-200",
            { "text-blue-500": repeatOption === option }
          )}
          onClick={() => handleOptionClick(option)}
        >
          {capitalizeFirstLetter(option)}
          {option === "custom" && <ChevronRight size={16} />}
        </div>
      ))}
    </div>
  );
};

export default RepeatOptionsDropdown;