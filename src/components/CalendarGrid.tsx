import { motion } from "framer-motion"
import type { CalendarDay } from "../types/calendar"
import CalendarDayCard from "./CalendarDayCard"
import { getOwnerToken } from "../lib/token"

interface Props {
  days: CalendarDay[]
  today: string
  openedDays: number[]
  onOpen: (day: CalendarDay) => void
  isDateLocked: (unlockDate: string, today: string) => boolean
  isSameDay: (date1: string, date2: string) => boolean
}

export default function CalendarGrid({
  days,
  today,
  openedDays,
  onOpen,
  isDateLocked,
  isSameDay,
}: Props) {
  // 🔧 Detectar modo DEV (no afecta PROD)
  const token =
    typeof window !== "undefined" ? getOwnerToken() : null
  const isDev = token?.endsWith("-dev")

  return (
    <motion.ul className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {days.map((day) => {
        // 🔥 OVERRIDE: en DEV nunca está bloqueado
        const locked = isDev
          ? false
          : isDateLocked(day.unlock_date, today)

        const todayDay = isSameDay(day.unlock_date, today)
        const isOpened = openedDays.includes(day.day_number)

        return (
          <CalendarDayCard
            key={day.id}
            day={day}
            isLocked={locked}
            isToday={todayDay}
            isOpened={isOpened}
            onOpen={onOpen}
          />
        )
      })}
    </motion.ul>
  )
}
