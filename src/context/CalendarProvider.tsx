import { createContext, ReactNode, useContext, useReducer } from "react";
import { Constants } from "../constants";
import { DateType, MonthType, ViewType } from "../types";
import { isValidDate } from "../utils/isValidDate";

// Define the shape of the state
type CalendarState = {
  viewType: ViewType;
  year: number;
  month: MonthType;
  selectedDate: DateType | undefined;
  today: DateType;
};

// Define action types
type CalendarAction =
  | { type: "set_view_type"; payload: ViewType }
  | { type: "reset_view_type"; payload?: DateType | undefined }
  | { type: "set_selected_date"; payload: DateType | undefined }
  | { type: "set_month"; payload: MonthType }
  | { type: "increment_month" }
  | { type: "decrement_month" }
  | { type: "set_year"; payload: number }
  | { type: "increment_year" }
  | { type: "decrement_year" }
  | { type: "increment_decade" }
  | { type: "decrement_decade" };

const calendarReducer = (
  state: CalendarState,
  action: CalendarAction,
): CalendarState => {
  switch (action.type) {
    case "set_view_type":
      return { ...state, viewType: action.payload };
    case "reset_view_type":
      if (action.payload)
        return {
          ...state,
          viewType: "date",
          year: action.payload.year,
          month: action.payload.month,
          selectedDate: action.payload,
        };
      if (state.selectedDate)
        return {
          ...state,
          viewType: "date",
          year: state.selectedDate.year,
          month: state.selectedDate.month,
        };
      return {
        ...state,
        viewType: "date",
        year: state.today.year,
        month: state.today.month,
      };
    case "set_selected_date":
      return { ...state, selectedDate: action.payload };
    case "set_month":
      return { ...state, month: action.payload, viewType: "date" };
    case "increment_month":
      if (state.month === 12)
        return {
          ...state,
          month: 1,
          year: state.year + 1,
        };
      return {
        ...state,
        month: (state.month + 1) as MonthType,
      };
    case "decrement_month":
      if (state.month === 1)
        return {
          ...state,
          month: 12,
          year: state.year - 1,
        };
      return {
        ...state,
        month: (state.month - 1) as MonthType,
      };
    case "set_year":
      return { ...state, year: action.payload, viewType: "month" };
    case "increment_year":
      if (state.year < Constants.maxYear)
        return {
          ...state,
          year: state.year + 1,
        };
      return state;
    case "decrement_year":
      if (state.year > Constants.minYear)
        return {
          ...state,
          year: state.year - 1,
        };
      return state;
    case "increment_decade":
      if (state.year < Constants.maxYear - 9)
        return {
          ...state,
          year: state.year + 10,
        };
      return state;
    case "decrement_decade":
      if (state.year > Constants.minYear + 9)
        return {
          ...state,
          year: state.year - 10,
        };
      return state;
    default:
      return state;
  }
};

const calendarStore = () => {
  const now = new Date();
  const [state, dispatch] = useReducer(calendarReducer, {
    viewType: "date",
    year: now.getFullYear(),
    month: (now.getMonth() + 1) as MonthType,
    selectedDate: undefined,
    today: {
      year: now.getFullYear(),
      month: (now.getMonth() + 1) as MonthType,
      date: now.getDate(),
    },
  });

  const setSelectedDateManually = (_date: DateType) => {
    if (_date.year < Constants.minYear || _date.year > Constants.maxYear)
      return "Date is out of range";
    if (!isValidDate(_date)) return "Invalid date";
    dispatch({ type: "reset_view_type", payload: _date });
    return "";
  };

  return [state, dispatch, { setSelectedDateManually }] as const;
};

const CalendarContext = createContext<ReturnType<typeof calendarStore> | null>(
  null,
);

export function useCalendar() {
  const data = useContext(CalendarContext);
  if (!data)
    throw new Error("useCalendar must be used within a CalendarProvider");
  return data;
}

function CalendarProvider({ children }: { children: ReactNode }) {
  return (
    <CalendarContext.Provider value={calendarStore()}>
      {children}
    </CalendarContext.Provider>
  );
}

export default CalendarProvider;
