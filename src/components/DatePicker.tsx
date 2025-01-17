import { CalendarDaysIcon } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Constants } from "../constants";
import { useCalendar } from "../context/CalendarProvider";
import { DateType, MonthType } from "../types";
import cn from "../utils/cn";
import { formatDateString, formatInteger } from "../utils/formatString";
import Calendar from "./Calendar";

function DatePicker({
  className,
  placeholder = "Select a date",
  initialValue,
  onSelect,
}: {
  className?: string;
  placeholder?: string;
  initialValue?: DateType | undefined;
  onSelect: (_data: DateType | undefined) => void;
}) {
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [state, _, { setSelectedDateManually }] = useCalendar();
  const [inputDate, setInputDate] = useState<string>(
    String(state.selectedDate?.date ?? ""),
  );
  const [inputMonth, setInputMonth] = useState<string>(
    String(state.selectedDate?.month ?? ""),
  );
  const [inputYear, setInputYear] = useState<string>(
    String(state.selectedDate?.year ?? ""),
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (initialValue) handleOnSelect(initialValue);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!calendarRef.current || !formRef.current) return;
      const rect = calendarRef.current.getBoundingClientRect();
      if (
        !(formRef.current && formRef.current.contains(e.target as Element)) &&
        (e.clientX < rect.left ||
          e.clientX > rect.right ||
          e.clientY < rect.top ||
          e.clientY > rect.bottom)
      ) {
        setInputYear(String(state.selectedDate?.year ?? ""));
        setInputMonth(String(state.selectedDate?.month ?? ""));
        setInputDate(String(state.selectedDate?.date ?? ""));
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isCalendarOpen]);

  const handleSubmission = (e: FormEvent) => {
    e.preventDefault();
    if (isCalendarOpen) {
      if (!inputYear || !inputMonth || !inputDate) return;
      const result = setSelectedDateManually({
        year: +inputYear,
        month: +inputMonth as MonthType,
        date: +inputDate,
      });
      setErrorMessage(result);
      if (result) return;
      setIsCalendarOpen(false);
    } else {
      setIsCalendarOpen(true);
    }
  };

  const handleOnSelect = (_date: DateType | undefined) => {
    setIsCalendarOpen(false);
    setInputYear(String(_date?.year ?? ""));
    setInputMonth(String(_date?.month ?? ""));
    setInputDate(String(_date?.date ?? ""));
    onSelect(_date);
  };

  return (
    <div className={cn("relative w-[max-content]", className)}>
      <form
        ref={formRef}
        onSubmit={handleSubmission}
        className={cn(
          "border-gray flex h-10 w-[200px] items-center gap-2 rounded-sm border-[1px] ps-2",
          {
            "border-none ring-2 ring-blue-500": isCalendarOpen,
          },
        )}
      >
        {isCalendarOpen ? (
          <>
            <button disabled={!inputYear || !inputMonth || !inputDate}>
              <CalendarDaysIcon className="size-5 text-blue-500" />
            </button>
            <div className="flex flex-grow items-center">
              <input
                type="number"
                placeholder="YYYY"
                max={Constants.maxYear}
                min={Constants.minYear}
                step={1}
                className="w-[6ch] placeholder:text-xs focus:outline-none"
                value={inputYear}
                onChange={(e) => setInputYear(formatInteger(e.target.value))}
              />
              <span className="px-1">-</span>
              <input
                type="number"
                placeholder="MM"
                max={12}
                min={1}
                step={1}
                className="w-[4ch] placeholder:text-xs focus:outline-none"
                value={inputMonth}
                onChange={(e) => setInputMonth(formatInteger(e.target.value))}
              />
              <span className="px-1">-</span>
              <input
                type="number"
                placeholder="DD"
                max={31}
                min={1}
                step={1}
                className="w-[4ch] placeholder:text-xs focus:outline-none"
                value={inputDate}
                onChange={(e) => setInputDate(formatInteger(e.target.value))}
              />
            </div>
          </>
        ) : (
          <button className="flex flex-grow gap-2 text-start">
            <CalendarDaysIcon className="size-5" />
            {state.selectedDate
              ? formatDateString(state.selectedDate)
              : placeholder}
          </button>
        )}
      </form>
      {isCalendarOpen && errorMessage && (
        <p className="absolute left-[calc(100%+12px)] top-[50%] translate-y-[-50%] whitespace-nowrap text-danger">
          {errorMessage}
        </p>
      )}
      <div
        ref={calendarRef}
        className={cn("top-[calc(100%+3px) absolute left-0", {
          hidden: !isCalendarOpen,
        })}
      >
        <Calendar
          // use key to force Calendar to reset ViewType
          key={
            state.selectedDate
              ? `{${formatDateString(state.selectedDate)},${
                  isCalendarOpen ? "true" : "false"
                }`
              : isCalendarOpen
                ? "true"
                : "false"
          }
          className="border-gray rounded-md border-[1px] px-2 py-2 shadow-sm"
          onSelect={handleOnSelect}
          resetViewType
        />
      </div>
    </div>
  );
}

export default DatePicker;
