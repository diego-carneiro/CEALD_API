import dayjs from "dayjs";

export function isWithinOperatingHours(): boolean {
  const now = dayjs();
  const hour = now.hour();

  return hour >= 12 && hour < 20;
}
