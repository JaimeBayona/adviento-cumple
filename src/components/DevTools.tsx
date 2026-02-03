// src/components/DevTools.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Wrench, X } from "lucide-react";

interface Props {
  respectDates: boolean;
  setRespectDates: (v: boolean) => void;
  onReset: () => void;
  onOpenAll: () => void;
}

export default function DevTools({
  respectDates,
  setRespectDates,
  onReset,
  onOpenAll,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // cerrar al clickear fuera
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={ref} className="fixed bottom-4 right-4 z-50">
      {/* BOTÓN FLOTANTE */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="
        w-12 h-12
        rounded-full
        bg-black text-white
        flex items-center justify-center
        shadow-xl
        hover:scale-105
        transition
    "
      >
        {open ? <X size={18} /> : <Wrench size={18} />}
      </button>

      {/* TOOLTIP */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="
            absolute bottom-16 right-0
            w-56
            rounded-2xl
            bg-black text-white
            p-4
            space-y-2
            shadow-2xl
        "
          >
            <p className="text-[10px] font-black tracking-widest opacity-60">
              DEV MODE
            </p>

            <button
              onClick={onReset}
              className="w-full text-left px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm"
            >
              Resetear días
            </button>

            <button
              onClick={onOpenAll}
              className="w-full text-left px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm"
            >
              Abrir todos
            </button>

            <button
              onClick={() => setRespectDates(!respectDates)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                respectDates
                  ? "bg-white text-black"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              Respetar fechas: {respectDates ? "ON" : "OFF"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
