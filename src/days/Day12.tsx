import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

type Day12Props = {
  onClose: () => void;
};

const PETALS = 12;
const COLORS = ["#D89C13", "#FFD115"];

/* 🌸 PÉTALO */
function PetalSVG({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 100 160" className="w-14 h-24 md:w-20 md:h-28">
      <path
        d="M50 0
           C80 30, 100 70, 50 160
           C0 70, 20 30, 50 0Z"
        fill={color}
      />
    </svg>
  );
}

/* 🍃 HOJA */
function LeafSVG({ side }: { side: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 100 60"
      className={`w-10 h-8 ${side === "left" ? "-scale-x-100" : ""}`}
    >
      <path
        d="M0 30 C30 0, 70 0, 100 30 C70 60, 30 60, 0 30Z"
        fill="#4CAF50"
      />
    </svg>
  );
}

/* 🌱 TALLO + HOJAS (MISMO CONTENEDOR) */
function StemWithLeaves({
  active,
  grown,
}: {
  active: boolean;
  grown: boolean;
}) {
  return (
    <motion.div
      className="absolute left-1/2 bottom-0 -translate-x-1/2 flex items-end justify-center"
      initial={{ height: 0 }}
      animate={{ height: active ? "54%" : 0 }}
      transition={{ duration: 1.8, ease: "easeInOut" }}
      style={{ width: 40 }}
    >
      <div className="relative w-[9px] h-full bg-gradient-to-t from-[#1f6b3a] via-[#3c9b5f] to-[#5fbf7a] rounded-full">

        {/* 🍃 HOJA IZQUIERDA */}
        <AnimatePresence>
          {grown && (
            <motion.div
              className="absolute left-[-35px] top-[35%] md:top-[50%]"
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: -20 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.6 }}
            >
              <LeafSVG side="left" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🍃 HOJA DERECHA */}
        <AnimatePresence>
          {grown && (
            <motion.div
              className="absolute right-[-35px] top-[55%] md:top-[70%]"
              initial={{ scale: 0, rotate: 30 }}
              animate={{ scale: 1, rotate: 20 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <LeafSVG side="right" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Day12({ onClose }: Day12Props) {
  const [active, setActive] = useState(false);
  const [grown, setGrown] = useState(false);
  const [finished, setFinished] = useState(false);

  function handleClick() {
    if (active) return;
    setActive(true);
    setTimeout(() => setGrown(true), 1800);
    setTimeout(() => setFinished(true), 3200);
  }

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#f5f0ff] via-[#eefcf5] to-[#fdf2f2] overflow-hidden">

      {/* ❌ CERRAR */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-[100] text-black/50 hover:text-black"
      >
        <X size={28} />
      </button>

      {/* 🌱 TALLO + HOJAS */}
      <StemWithLeaves active={active} grown={grown} />

      <div className="relative w-full h-full flex flex-col items-center justify-center">

        {/* TEXTO */}
        <div className="absolute top-[12%] text-center px-4">
          <p className="text-xs tracking-widest text-black/40 mb-2">DÍA 12</p>
          <h1 className="text-2xl md:text-3xl font-serif mb-2">
            Lo que florece en ti
          </h1>
          <p className="text-sm text-black/50">
            Toca el centro. Despacio.
          </p>
        </div>

        {/* 🌸 FLOR */}
        <div className="relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] flex items-center justify-center">

          {/* PÉTALOS */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          >
            {Array.from({ length: PETALS }).map((_, i) => {
              const angle = (360 / PETALS) * i;
              const rad = (angle * Math.PI) / 180;
              const radius =
                typeof window !== "undefined" && window.innerWidth < 640
                  ? 60
                  : 70;

              return (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  initial={{ scale: 0 }}
                  animate={{
                    scale: grown ? 1 : 0,
                    x: Math.cos(rad) * radius,
                    y: Math.sin(rad) * radius,
                    rotate: angle + 90,
                  }}
                  transition={{
                    delay: i * 0.12,
                    type: "spring",
                    stiffness: 120,
                    damping: 14,
                  }}
                >
                  <PetalSVG color={COLORS[i % COLORS.length]} />
                </motion.div>
              );
            })}
          </motion.div>

          {/* 🌻 CENTRO */}
          <motion.div
            onClick={handleClick}
            className="z-20 w-16 h-16 md:w-20 md:h-20 rounded-full cursor-pointer"
            animate={{
              background: grown
                ? `
                  radial-gradient(circle,
                    #f6e7b2 0%,
                    #d2a24c 40%,
                    #8b5a2b 70%,
                    #5c3a1a 100%)
                `
                : `
                  radial-gradient(circle,
                    #e0e7ff 0%,
                    #c7d2fe 100%)
                `,
              scale: active ? [1, 1.15, 1] : 1,
            }}
            transition={{ duration: 1.6 }}
          />
        </div>

        {/* ✨ FINAL */}
        <AnimatePresence>
          {finished && (
            <motion.p
              className="absolute bottom-[18%] text-center px-6 text-lg md:text-xl font-serif"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Siempre hubo algo hermoso creciendo en ti.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
