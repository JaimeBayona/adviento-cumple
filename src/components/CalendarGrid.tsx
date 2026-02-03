import { motion } from "framer-motion";
import type { CalendarDay } from "../types/calendar";
import CalendarDayCard from "./CalendarDayCard";

interface Props {
  days: CalendarDay[];
  today: string;
  openedDays: number[];
  onOpen: (day: CalendarDay) => void;
  isDateLocked: (unlockDate: string, today: string) => boolean;
  isSameDay: (date1: string, date2: string) => boolean;

  // DEV
  respectDates: boolean;
  isDev: boolean;
}

export default function CalendarGrid({
  days,
  today,
  openedDays,
  onOpen,
  isDateLocked,
  isSameDay,
  respectDates,
  isDev,
}: Props) {
  return (
    <motion.ul className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {days.map((day) => {
        const lockedByDate = isDateLocked(day.unlock_date, today);
        const isToday = isSameDay(day.unlock_date, today);

        /**
         * 🔐 REGLA FINAL
         */
        const isLocked =
          !isDev || respectDates
            ? lockedByDate
            : false;

        /**
         * ⚠️ IMPORTANTE:
         * Un día bloqueado JAMÁS puede verse como abierto
         */
        const isOpened =
          !isLocked && openedDays.includes(day.day_number);

        return (
          <CalendarDayCard
            key={day.id}
            day={day}
            isLocked={isLocked}
            isToday={isToday}
            isOpened={isOpened}
            onOpen={onOpen}
          />
        );
      })}
    </motion.ul>
  );
}
