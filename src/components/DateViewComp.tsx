import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useCalendar } from "../context/CalendarProvider";
import { DateType } from "../types";
import cn from "../utils/cn";
import { getMonthString } from "../utils/getMonthString";
import { initCalendar } from "../utils/initCalendar";

const BASE_TD_CLASS = "whitespace-nowrap w-[calc(100%/4)]";
const WEEKDAY_SHORT = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function DateViewComp({
  className,
  onSelect,
}: {
  className?: string;
  onSelect: (value: DateType | undefined) => void;
}) {
  const [state, dispatch] = useCalendar();
  const calendar = initCalendar(state.year, state.month);

  const isToday = (_date: number) =>
    state.today.year === state.year &&
    state.today.month === state.month &&
    state.today.date === _date;

  const isSelectedDate = (_date: number) =>
    state.selectedDate?.year === state.year &&
    state.selectedDate?.month === state.month &&
    state.selectedDate?.date === _date;

  const onSelectDate = (_date: DateType) => {
    if (
      _date.year === state.selectedDate?.year &&
      _date.month === state.selectedDate?.month &&
      _date.date === state.selectedDate?.date
    ) {
      dispatch({ type: "set_selected_date", payload: undefined });
      onSelect(undefined);
      return;
    }
    dispatch({ type: "set_selected_date", payload: _date });
    onSelect(_date);
  };

  return (
    <div className={cn("inline-block", className)}>
      <h1 className="flex items-center justify-between">
        <ChevronLeftIcon
          className="size-6 cursor-pointer"
          onClick={() => dispatch({ type: "decrement_month" })}
        />

        <span
          className="cursor-pointer text-xl font-semibold"
          onClick={() => dispatch({ type: "set_view_type", payload: "month" })}
        >
          {getMonthString(state.month, true)} {state.year}
        </span>
        <ChevronRightIcon
          className="size-6 cursor-pointer"
          onClick={() => dispatch({ type: "increment_month" })}
        />
      </h1>
      <table className="mt-2 w-[280px] border-collapse">
        <thead>
          <tr>
            {WEEKDAY_SHORT.map((day) => (
              <th key={day} className={BASE_TD_CLASS}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendar.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((d, dIdx) => (
                <td
                  key={`${rowIdx},${dIdx}`}
                  className={cn(BASE_TD_CLASS, "cursor-pointer", {
                    "pointer-events-none": !d.isThisMonth,
                  })}
                  onClick={() => {
                    if (d.isThisMonth)
                      onSelectDate({
                        year: state.year,
                        month: state.month,
                        date: d.date,
                      });
                  }}
                >
                  <div
                    className={cn("mx-2 my-1 w-[max-content]", {
                      "text-secondary-disabled": !d.isThisMonth,
                      "text-primary": isToday(d.date) && d.isThisMonth,
                      "z-1 relative text-white before:absolute before:left-[50%] before:top-[50%] before:z-[-1] before:h-7 before:w-7 before:translate-x-[-50%] before:translate-y-[-50%] before:rounded-full before:bg-primary before:content-['']":
                        isSelectedDate(d.date) && d.isThisMonth,
                    })}
                  >
                    {d.date}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DateViewComp;
