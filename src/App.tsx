import { useState } from "react";
import Calendar from "./components/Calendar";
import { useCalendar } from "./context/CalendarProvider";
import { DateType } from "./types";
import cn from "./utils/cn";
import { formatDateString } from "./utils/formatString";
import DatePicker from "./components/DatePicker";

const getButtonClass = (disabled: boolean) =>
  cn(
    "rounded-full bg-primary px-3 py-1 text-lg text-white hover:bg-primary-hover shadow-sm",
    {
      "pointer-events-none bg-primary-disabled": disabled,
    },
  );

function App() {
  const [state] = useCalendar();
  const [compType, setCompType] = useState<"calendar" | "datePicker">(
    "calendar",
  );

  const onSelect = (_date: DateType | undefined) => {
    // Do whatever you want here.
    console.log(`You selected ${_date ? formatDateString(_date) : "null"}`);
  };

  return (
    <div>
      <h1 className="flex items-center justify-center bg-primary px-10 py-6 text-2xl font-semibold text-white">
        Calendar and Date Picker
      </h1>
      <main className="flex flex-col px-6 py-4">
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold capitalize">{compType}</p>
          <p className="mt-3 text-lg font-semibold text-primary">
            Selected date:{" "}
            {state.selectedDate ? formatDateString(state.selectedDate) : "null"}
          </p>
        </div>
        <div className="mt-3 flex gap-2">
          <button
            className={getButtonClass(compType === "calendar")}
            onClick={() => setCompType("calendar")}
          >
            Calendar
          </button>
          <button
            className={getButtonClass(compType === "datePicker")}
            onClick={() => setCompType("datePicker")}
          >
            Date Picker
          </button>
        </div>
        <div className="py-2">
          {compType === "calendar" ? (
            <Calendar
              className="border-gray mt-2 rounded-md border-[1px] px-2 py-2 shadow-sm"
              onSelect={onSelect}
            />
          ) : (
            <DatePicker
              className="mt-2"
              placeholder="Select a date"
              onSelect={onSelect}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
