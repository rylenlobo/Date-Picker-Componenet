import { create } from "zustand";
import { DAYS_WEEK_FULL } from "@/helpers/helper";

const useRepeatOptionStore = create((set) => ({
  repeatOption: "",
  setRepeat: (option) => set({ repeatOption: option }),

  customRepeatOption: {
    everyX: 1,
    option: "days"
  },
  setCustomRepeatOptions: (customEvery, customOption) => {
    console.log(customEvery, customOption);
    set((state) => ({
      customRepeatOption: {
        ...state.customRepeatOption,
        everyX: customEvery,
        option: customOption
      }
    }));
  },

  weekDays: [new Date().getDay()],
  addWeekDay: (day) =>
    set((state) => {
      if (state.weekDays.includes(day)) {
        return { weekDays: state.weekDays.filter((d) => d !== day) };
      } else {
        return { weekDays: [...state.weekDays, day] };
      }
    }),

  monthCustomOptions: {
    isEnabled: false,
    nth: 1,
    targetDay: DAYS_WEEK_FULL[new Date().getDay()]
  },
  updateMonthCustomOptions: (newNth, newDay, newIsEnabled = true) =>
    set((state) => ({
      monthCustomOptions: {
        ...state.monthCustomOptions,
        nth: newNth,
        targetDay: newDay,
        isEnabled: newIsEnabled
      }
    })),

  resetRepeat: () => set({ repeatOption: null }),
  resetcustomRepeatOption: () =>
    set((state) => ({
      customRepeatOption: {
        ...state.customRepeatOption,
        everyX: 1,
        option: "days"
      }
    }))
}));

export default useRepeatOptionStore;
