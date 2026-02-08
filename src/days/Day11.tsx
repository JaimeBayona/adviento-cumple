// src/days/Day11.tsx
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

type Fragment = {
  id: string
  text: string
}

const FRAGMENTS = [
  { id: "a", text: "cuando el mundo se movía rápido," },
  { id: "b", text: "elegiste seguir a tu ritmo," },
  { id: "c", text: "con más fuerza de la que creías," },
  { id: "d", text: "y eso también es valentía." },
]

export default function Day11({ onClose }: { onClose: () => void }) {
  const [placed, setPlaced] = useState<Fragment[]>([])
  const [available, setAvailable] = useState<Fragment[]>(FRAGMENTS)
  const [finished, setFinished] = useState(false)

  // 🔒 bloquear scroll global
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  function placeFragment(fragment: Fragment) {
    if (finished) return

    setPlaced((prev) => [...prev, fragment])
    setAvailable((prev) => prev.filter((f) => f.id !== fragment.id))

    if (placed.length + 1 === FRAGMENTS.length) {
      setTimeout(() => setFinished(true), 600)
    }
  }

  return (
    <motion.section
      className="
        fixed inset-0 z-50
        bg-gradient-to-br from-[#0b0a0f] via-[#140f1f] to-[#0b0a0f]
        text-[#f5f1ec]
      "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* cierre */}
      <button
        onClick={onClose}
        className="
          absolute top-6 right-6
          h-10 w-10
          flex items-center justify-center
          rounded-full
          border border-white/10
          text-white/50
          hover:text-white
          hover:border-white/30
          transition
        "
      >
        <X size={18} />
      </button>

      <AnimatePresence mode="wait">
        {/* ===== ARMADO ===== */}
        {!finished && (
          <motion.div
            key="build"
            className="
              h-full
              flex flex-col
              items-center
              justify-center
              px-6
              text-center
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* header */}
            <div className="mb-10">
              <span className="block mb-3 text-xs tracking-[0.25em] uppercase text-[#b983ff]">
                Día 11
              </span>

              <h1 className="text-3xl md:text-4xl font-serif">
                Reconstruye el mensaje
              </h1>

              <p className="mt-4 text-sm text-white/50 max-w-md">
                No hay orden correcto. Solo el que tenga sentido para ti.
              </p>
            </div>

            {/* zona de montaje */}
            <div
              className="
                w-full max-w-2xl
                min-h-[140px]
                mb-10
                rounded-3xl
                border border-[#6b4eff]/30
                bg-gradient-to-br from-[#1a102a]/80 to-[#120c1d]/80
                p-8
                flex items-center justify-center
                text-center
                shadow-[0_0_60px_-15px_rgba(155,98,255,0.25)]
              "
            >
              {placed.length === 0 ? (
                <div className="text-white/30">
                  <div className="mb-2 text-xs tracking-widest uppercase">
                    Zona de montaje
                  </div>
                  <div className="text-sm">
                    Arrastra los fragmentos aquí
                  </div>
                </div>
              ) : (
                <motion.p
                  className="
                    text-lg md:text-xl
                    leading-relaxed
                    font-light
                  "
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {placed.map((f) => f.text).join(" ")}
                </motion.p>
              )}
            </div>

            {/* fragmentos */}
            <div className="flex flex-wrap justify-center gap-4 max-w-2xl">
              {available.map((f) => (
                <motion.button
                  key={f.id}
                  onClick={() => placeFragment(f)}
                  className="
                    rounded-full
                    px-6 py-2.5
                    text-sm
                    border
                    border-[#6b4eff]/40
                    bg-[#2a1645]/60
                    text-[#f5f1ec]
                    hover:bg-[#3a1e66]
                    hover:border-[#b983ff]
                    transition
                  "
                  whileTap={{ scale: 0.94 }}
                >
                  {f.text}
                </motion.button>
              ))}
            </div>

            {/* hint */}
            <p className="mt-10 text-xs tracking-wide text-white/30">
              Mantén presionado para mover
            </p>
          </motion.div>
        )}

        {/* ===== FINAL ===== */}
        {finished && (
          <motion.div
            key="final"
            className="
              h-full
              flex flex-col
              items-center
              justify-center
              px-6
              text-center
            "
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="mb-6 text-xs tracking-[0.25em] uppercase text-white/40">
              Día 11
            </span>

            <motion.p
              className="
                max-w-3xl
                text-2xl md:text-4xl
                font-serif
                leading-snug
              "
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              {placed.map((f) => f.text).join(" ")}
            </motion.p>

            <motion.p
              className="mt-10 text-sm text-white/40 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Un mensaje construido por tu corazón.
            </motion.p>

            <button
              onClick={onClose}
              className="
                mt-16
                rounded-full
                px-8 py-3
                text-sm
                border border-white/15
                text-white/60
                hover:text-white
                hover:border-white/40
                transition
              "
            >
              Continuar el viaje
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}
