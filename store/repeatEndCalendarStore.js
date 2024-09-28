import { create } from "zustand";
import { generateCalendarDates, updateDate } from "../helpers/helper";

const useRepeatEndCalendarStore = create((set) => ({
  date: new Date(),
  calendarDates: generateCalendarDates(),
  endRepeatDate: null,

  isRepeatEndOpen: false,
  setIsRepeatEndOpen: (isOpen) => set({ isRepeatEndOpen: isOpen }),

  setEndRepeat: (year, month, date) => {
    const dateSelected = new Date(year, month, date);
    set((state) => ({
      ...state,
      endRepeatDate: dateSelected
    }));
  },

  resetEndDate: () => {
    set({ endRepeatDate: null });
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

export default useRepeatEndCalendarStore;
