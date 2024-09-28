"use client";
import React from "react";
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";
import { MONTHS } from "@/helpers/helper";
import { cn } from "@/utils/utils";

const MonthAndYear = ({
  handleNextDate,
  handleCurrentDate,
  handlePrevDate,
  date,
  disabled
}) => {
  const month = date.getMonth();
  const year = date.getFullYear();

  return (
    <div data-testid="month-and-year" className="flex w-full justify-between items-center px-5 pt-2">
      <p className="tabular-nums text-lg">{`${MONTHS[month]} ${year}`}</p>
      <div className="flex gap-2 items-center cursor-pointer text-gray-500">
        <button
          className={cn("p-2 rounded-md hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200", { "cursor-pointer": !disabled, "cursor-not-allowed": disabled })}
          onClick={handlePrevDate}
          disabled={disabled}
        >
          <ChevronLeft size={10} className="icon-size" />
        </button>
        <button
          className="p-2 rounded-md hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
          onClick={handleCurrentDate}
        >
          <Circle size={10} className="icon-size" />
        </button>
        <button
          className="p-2 rounded-md hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
          onClick={handleNextDate}
        >
          <ChevronRight size={10} className="icon-size" />
        </button>
      </div>
    </div>
  );
};

export default MonthAndYear;