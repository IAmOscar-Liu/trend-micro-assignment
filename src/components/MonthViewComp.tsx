import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useCalendar } from "../context/CalendarProvider";
import { MonthType } from "../types";
import cn from "../utils/cn";
import { getMonthString } from "../utils/getMonthString";

const BASE_TD_CLASS = "w-[calc(100%/4)] whitespace-nowrap";

function MonthViewComp({ className }: { className?: string }) {
  const [state, dispatch] = useCalendar();
  const calendar = Array(3)
    .fill(null)
    .map((_, row) =>
      Array(4)
        .fill(null)
        .map((__, col) => ({ month: (row * 4 + col + 1) as MonthType })),
    );

  const isThisMonth = (_month: MonthType) =>
    state.today.year === state.year && state.today.month === _month;

  const isSelectedMonth = (_month: MonthType) =>
    state.selectedDate?.year === state.year &&
    state.selectedDate?.month === _month;

  return (
    <div className={cn("inline-block", className)}>
      <h1 className="flex items-center justify-between">
        <ChevronLeftIcon
          className="size-6 cursor-pointer"
          onClick={() => dispatch({ type: "decrement_year" })}
        />
        <span
          className="cursor-pointer text-xl font-semibold"
          onClick={() => dispatch({ type: "set_view_type", payload: "year" })}
        >
          {state.year}
        </span>
        <ChevronRightIcon
          className="size-6 cursor-pointer"
          onClick={() => dispatch({ type: "increment_year" })}
        />
      </h1>
      <table className="mt-3 w-[280px] border-collapse">
        <tbody>
          {calendar.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((d, dIdx) => (
                <td
                  key={`${rowIdx},${dIdx}`}
                  className={cn(BASE_TD_CLASS, "cursor-pointer")}
                  onClick={() =>
                    dispatch({
                      type: "set_month",
                      payload: d.month,
                    })
                  }
                >
                  <div
                    className={cn("m-2 w-[max-content]", {
                      "text-primary": isThisMonth(d.month),
                      "z-1 relative text-white before:absolute before:left-[50%] before:top-[50%] before:z-[-1] before:h-10 before:w-10 before:translate-x-[-50%] before:translate-y-[-50%] before:rounded-full before:bg-primary before:content-['']":
                        isSelectedMonth(d.month),
                    })}
                  >
                    {getMonthString(d.month, true)}
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

export default MonthViewComp;
