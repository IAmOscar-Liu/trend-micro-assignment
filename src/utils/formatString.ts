import { DateType } from "../types";

export function formatMonthAndDateValue(value: number) {
  return String(value).padStart(2, "0");
}

export function formatDateString(value: DateType) {
  return `${value.year}-${formatMonthAndDateValue(
    value.month,
  )}-${formatMonthAndDateValue(value.date)}`;
}

export function formatInteger(value: string) {
  return value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
}
