import { memo, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { LockKeyhole, Gift, Check } from "lucide-react";
import type { CalendarDay } from "../types/calendar";

interface Props {
  day: CalendarDay;
  isLocked: boolean;
  isToday: boolean;
  isOpened: boolean;
  onOpen: (day: CalendarDay) => void;
}

const GIFT_CLOSED =
  "https://qhyhynxpcuovxmnfhndv.supabase.co/storage/v1/object/public/calendar/MEL/r3.png";

const GIFT_OPEN =
  "https://qhyhynxpcuovxmnfhndv.supabase.co/storage/v1/object/public/calendar/MEL/r3-sm-o.png";

const CalendarDayCard = memo(function CalendarDayCard({
  day,
  isLocked,
  isToday,
  isOpened,
  onOpen,
}: Props) {
  /**
   * 💓 Animación SOLO para HOY
   */
  const shouldHeartbeat = useMemo(
    () => isToday && !isLocked && !isOpened,
    [isToday, isLocked, isOpened],
  );

  /**
   * ⚡ Preload SOLO cuando es HOY
   */
  useEffect(() => {
    if (!isToday) return;

    const img1 = new Image();
    img1.src = GIFT_CLOSED;

    const img2 = new Image();
    img2.src = GIFT_OPEN;
  }, [isToday]);

  /**
   * 🎨 Clases memorizadas
   */
  const bgClasses = useMemo(() => {
    if (isLocked) return "bg-neutral-900 text-white/60";
    if (isToday) return "bg-[#C9B6F2] text-white";
    if (!isOpened) return "bg-[#A9CF9E] text-white";
    return "bg-neutral-800 text-white/60";
  }, [isLocked, isToday, isOpened]);

  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: shouldHeartbeat ? [1, 1.04, 1] : 1,
      }}
      transition={{
        opacity: { duration: 0.3 },
        y: { duration: 0.3 },
        scale: shouldHeartbeat
          ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0.15 },
      }}
      onClick={() => onOpen(day)}
      className={`
        relative
        aspect-square
        rounded-3xl
        overflow-hidden
        flex
        items-center
        justify-center
        select-none
        cursor-pointer
        transition-colors
        ${bgClasses}
      `}
    >
      {/* 🔒 BLOQUEADO */}
      {isLocked && (
        <div className="relative flex items-center justify-center">
          <span className="absolute text-6xl sm:text-7xl md:text-8xl font-black opacity-10">
            {day.day_number.toString().padStart(2, "0")}
          </span>
          <LockKeyhole size={30} />
        </div>
      )}

      {/* 🎁 HOY */}
      {isToday && !isLocked && (
        <>
          <span className="absolute bottom-3 right-3 text-3xl sm:text-6xl md:text-7xl font-black opacity-20">
            {day.day_number.toString().padStart(2, "0")}
          </span>

          <img
            src={isOpened ? GIFT_OPEN : GIFT_CLOSED}
            alt="Regalo"
            loading="eager"
            className="w-16 h-16 sm:w-30 sm:h-30 object-contain z-10"
          />
        </>
      )}

      {/* 🟢 DESBLOQUEADO · NO ABIERTO */}
      {!isLocked && !isToday && !isOpened && (
        <>
          <span className="absolute bottom-3 right-3 text-3xl sm:text-6xl md:text-7xl font-black opacity-20">
            {day.day_number.toString().padStart(2, "0")}
          </span>

          <span className="absolute inset-3 rounded-2xl border border-dashed border-white/40" />

          <Gift size={34} className="opacity-80" />
        </>
      )}

      {/* ⚫ PASADO · ABIERTO */}
      {!isLocked && !isToday && isOpened && (
        <>
          <span className="absolute bottom-3 right-3 text-3xl sm:text-6xl md:text-7xl font-black opacity-15">
            {day.day_number.toString().padStart(2, "0")}
          </span>

          <Check size={28} className="opacity-60" />
        </>
      )}
    </motion.li>
  );
});

export default CalendarDayCard;
