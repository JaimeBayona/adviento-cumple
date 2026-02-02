import { motion } from "framer-motion";
import type { CalendarDay } from "../types/calendar";
import { LockKeyhole } from "lucide-react";

interface Props {
  day: CalendarDay;
  isLocked: boolean;
  isToday: boolean;
  isOpened: boolean;
  onOpen: (day: CalendarDay) => void;
}

export default function CalendarDayCard({
  day,
  isLocked,
  isToday,
  isOpened,
  onOpen,
}: Props) {
  /**
   * 💓 Palpita SOLO si:
   * - no está bloqueado
   * - no está abierto
   */
  const shouldHeartbeat = !isLocked && !isOpened;

  /**
   * 🎨 Colores por estado
   */
  const bgClasses = () => {
    // 🔒 Futuro bloqueado
    if (isLocked) {
      return "bg-neutral-900 text-white/60";
    }

    // 🔥 HOY (siempre destacado)
    if (isToday) {
      return `
        bg-[#C6B7D8]
        text-black
        shadow-[0_8px_30px_rgba(0,0,0,0.18)]
        ring-2
        ring-black/20
      `;
    }

    // 🟣 Pasado no abierto
    if (!isOpened) {
      return "bg-[#B7CBB2] text-black";
    }

    // ⚪ Abierto (pasado)
    return "bg-[#4A4A4A] text-white/70";
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: shouldHeartbeat ? [1, 1.045, 1] : 1,
      }}
      transition={{
        opacity: { duration: 0.4 },
        y: { duration: 0.4 },
        scale: shouldHeartbeat
          ? {
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }
          : { duration: 0.2 },
      }}
      onClick={() => onOpen(day)}
      className={`
        aspect-square
        flex
        flex-col
        items-center
        justify-center
        rounded-2xl
        cursor-pointer
        select-none
        transition-all
        ${bgClasses()}
      `}
    >
      {isLocked ? (
        <div className="relative flex items-center justify-center">
          {/* Número grande y difuminado detrás */}
          <span className="absolute text-6xl md:text-8xl font-black opacity-10">
            {day.day_number.toString().padStart(2, "0")}
          </span>

          {/* Candado encima */}
          <span className="relative">
            <LockKeyhole size={30} />
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {/* Número normal */}
          <span className="text-3xl md:text-5xl font-black">
            {day.day_number.toString().padStart(2, "0")}
          </span>

          {/* Texto HOY solo si corresponde */}
          {isToday && (
            <span className="mt-2 text-[11px] font-bold tracking-widest">
              HOY
            </span>
          )}
        </div>
      )}
    </motion.li>
  );
}
