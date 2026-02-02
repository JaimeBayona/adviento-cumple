import { motion } from "framer-motion"
import type { CalendarDay } from "../types/calendar"
import CalendarDayCard from "./CalendarDayCard"

interface Props {
  days: CalendarDay[]
  today: string
  openedDays: number[]
  onOpen: (day: CalendarDay) => void
  isDateLocked: (unlockDate: string, today: string) => boolean
  isSameDay: (date1: string, date2: string) => boolean

  // 🧪 DEV: forzar comportamiento real por fecha
  respectDates?: boolean
}

export default function CalendarGrid({
  days,
  today,
  openedDays,
  onOpen,
  isDateLocked,
  isSameDay,
  respectDates = false,
}: Props) {
  return (
    <motion.ul className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {days.map((day) => {
        const lockedByDate = isDateLocked(day.unlock_date, today)
        const todayDay = isSameDay(day.unlock_date, today)

        // 🔒 VISUAL REAL: si se respetan fechas y está bloqueado
        const isLocked = respectDates ? lockedByDate : false

        // 🔒 VISUAL REAL: aunque esté abierto en DEV, se ve cerrado
        const isOpened =
          respectDates && lockedByDate
            ? false
            : openedDays.includes(day.day_number)

        return (
          <CalendarDayCard
            key={day.id}
            day={day}
            isLocked={isLocked}
            isToday={todayDay}
            isOpened={isOpened}
            onOpen={onOpen}
          />
        )
      })}
    </motion.ul>
  )
}
