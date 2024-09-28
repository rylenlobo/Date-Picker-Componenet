import { create } from "zustand";
import { updateDate, generateCalendarDates } from "../helpers/helper";

const useMiniCalendarStore = create((set) => ({
  date: new Date(),
  calendarDates: generateCalendarDates(),
  dateSelected: new Date(),

  setSelected: (date, month, year) => {
    set((state) => {
      const dateSelected = new Date(year, month, date); // month is 0-indexed
      return {
        ...state,
        dateSelected
      };
    });
  },

  handlePrevDate: () =>
    set((state) => {
      const newDate = updateDate(state.date, -1);
      return {
        date: newDate,
        calendarDates: generateCalendarDates(
          newDate.getMonth(),
          newDate.getFullYear()
        )
      };
    }),

  handleCurrentDate: () =>
    set(() => {
      const newDate = new Date();
      return {
        date: newDate,
        calendarDates: generateCalendarDates(
          newDate.getMonth(),
          newDate.getFullYear()
        )
      };
    }),

  handleNextDate: () =>
    set((state) => {
      const newDate = updateDate(state.date, 1);
      return {
        date: newDate,
        calendarDates: generateCalendarDates(
          newDate.getMonth(),
          newDate.getFullYear()
        )
      };
    })
}));

export default useMiniCalendarStore;
