import { useEffect } from "react";
import { useCalendar } from "../context/CalendarProvider";
import { DateType } from "../types";
import DateViewComp from "./DateViewComp";
import MonthViewComp from "./MonthViewComp";
import YearViewComp from "./YearViewComp";

function Calendar({
  className,
  initialValue,
  onSelect,
  resetViewType = false,
}: {
  className?: string;
  initialValue?: DateType;
  onSelect: (_data: DateType | undefined) => void;
  resetViewType?: boolean;
}) {
  const [state, dispatch] = useCalendar();

  useEffect(() => {
    if (resetViewType)
      dispatch({ type: "reset_view_type", payload: initialValue });
  }, []);

  if (state.viewType === "date")
    return <DateViewComp className={className} onSelect={onSelect} />;
  if (state.viewType === "month")
    return <MonthViewComp className={className} />;
  return <YearViewComp className={className} />;
}

export default Calendar;
