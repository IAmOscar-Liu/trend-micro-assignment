import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useCalendar } from "../context/CalendarProvider";
import cn from "../utils/cn";

const BASE_TD_CLASS = "w-[calc(100%/7)]] whitespace-nowrap";

function YearViewComp({ className }: { className?: string }) {
  const [state, dispatch] = useCalendar();
  const decade = Math.floor(state.year / 10) * 10;
  const calendar = Array(3)
    .fill(null)
    .map((_, row) =>
      Array(4)
        .fill(null)
        .map((__, col) => {
          const displayYear = decade + row * 4 + col - 1;
          return {
            year: displayYear,
            isThisDecade: displayYear >= decade && displayYear < decade + 10,
          };
        }),
    );

  const isThisYear = (_year: number) => state.today.year === _year;
  const isSelectedYear = (_year: number) => state.selectedDate?.year === _year;

  return (
    <div className={cn("inline-block", className)}>
      <h1 className="flex items-center justify-between">
        <ChevronLeftIcon
          className="size-6 cursor-pointer"
          onClick={() => dispatch({ type: "decrement_decade" })}
        />
        <span className="text-xl font-semibold">
          {decade}
          {" - "}
          {decade + 9}
        </span>
        <ChevronRightIcon
          className="size-6 cursor-pointer"
          onClick={() => dispatch({ type: "increment_decade" })}
        />
      </h1>
      <table className="mt-3 w-[280px] border-collapse">
        <tbody>
          {calendar.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((d, dIdx) => (
                <td
                  key={`${rowIdx},${dIdx}`}
                  className={cn(BASE_TD_CLASS, "cursor-pointer", {
                    "pointer-events-none": !d.isThisDecade,
                  })}
                  onClick={() => {
                    if (d.isThisDecade)
                      dispatch({ type: "set_year", payload: d.year });
                  }}
                >
                  <div
                    className={cn("m-2 w-[max-content]", {
                      "text-secondary-disabled": !d.isThisDecade,
                      "text-primary": isThisYear(d.year) && d.isThisDecade,
                      "z-1 relative text-white before:absolute before:left-[50%] before:top-[50%] before:z-[-1] before:h-12 before:w-12 before:translate-x-[-50%] before:translate-y-[-50%] before:rounded-full before:bg-primary before:content-['']":
                        isSelectedYear(d.year) && d.isThisDecade,
                    })}
                  >
                    {d.year}
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

export default YearViewComp;
