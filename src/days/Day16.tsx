// src/days/Day16.tsx
import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

type Day16Props = {
  onClose: () => void
}

type Fragment = {
  id: number
  word: string
  message: string
}

const FRAGMENTS: Fragment[] = [
  { id: 1, word: "Responsabilidad", message: "Sostener sin que nadie lo pida." },
  { id: 2, word: "Amor", message: "Dar incluso cuando estás cansada." },
  { id: 3, word: "Miedo", message: "Seguir adelante aun con él." },
  { id: 4, word: "Fuerza", message: "No la que grita, la que permanece." },
  { id: 5, word: "Esperanza", message: "Creer incluso en silencio." }
]

const DESKTOP_POSITIONS = [
  { x: -120, y: -40 },
  { x: 120, y: -80 },
  { x: -150, y: 90 },
  { x: 140, y: 120 },
  { x: 0, y: -130 }
]

export default function Day16({ onClose }: Day16Props) {
  const [revealed, setRevealed] = useState<number[]>([])
  const [activeMessage, setActiveMessage] = useState<string | null>(null)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  const handleReveal = useCallback((frag: Fragment) => {
    setRevealed((prev) =>
      prev.includes(frag.id) ? prev : [...prev, frag.id]
    )
    setActiveMessage(frag.message)
  }, [])

  const completed = revealed.length === FRAGMENTS.length

  return (
    <section className="fixed inset-0 z-50 bg-[#0b0f1a] overflow-y-auto">

      {/* ❌ Cerrar */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-50 text-white/60 hover:text-white transition"
      >
        <X size={26} />
      </button>

      {/* CONTENEDOR CENTRAL */}
      <div className="mx-auto flex min-h-screen w-full max-w-[500px] flex-col items-center px-6 pt-24 pb-32 text-center">

        <span className="mb-3 text-xs tracking-[0.4em] uppercase text-violet-400">
          Día 16
        </span>

        <h1 className="mb-14 text-3xl md:text-4xl font-light text-[#f5f1ec]">
          El peso de lo invisible
        </h1>

        {/* 📱 MOBILE + TABLET */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          {FRAGMENTS.map((frag) => {
            const isRevealed = revealed.includes(frag.id)

            return (
              <motion.button
                key={frag.id}
                onClick={() => handleReveal(frag)}
                className="w-full rounded-full border border-violet-400/30 bg-white/5 px-4 py-3 text-sm text-[#f5f1ec] backdrop-blur-md truncate"
                animate={
                  isRevealed
                    ? { opacity: 0.4 }
                    : { y: [0, -2, 0] }
                }
                transition={
                  isRevealed
                    ? { duration: 0.3 }
                    : { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }
              >
                {frag.word}
              </motion.button>
            )
          })}
        </div>

        {/* 💬 MENSAJE MOBILE */}
        <AnimatePresence>
          {activeMessage && !completed && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="md:hidden mt-12 w-full"
            >
              <div className="rounded-xl bg-white/5 px-6 py-4 backdrop-blur-md border border-violet-400/20">
                <p className="text-lg text-[#f5f1ec]/90">
                  {activeMessage}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🖥️ DESKTOP */}
        <div className="relative hidden md:flex h-[420px] w-full overflow-hidden items-center justify-center">
          {FRAGMENTS.map((frag, i) => {
            const isRevealed = revealed.includes(frag.id)
            const pos = DESKTOP_POSITIONS[i]

            return (
              <motion.button
                key={frag.id}
                onClick={() => handleReveal(frag)}
                className="absolute left-1/2 top-1/2 rounded-full border border-violet-400/30 bg-white/5 px-5 py-2 text-sm text-[#f5f1ec] backdrop-blur-md whitespace-nowrap"
                style={{ transform: "translate(-50%, -50%)" }}
                initial={pos}
                animate={
                  isRevealed
                    ? { opacity: 0.35 }
                    : { y: [pos.y, pos.y - 4, pos.y] }
                }
                transition={
                  isRevealed
                    ? { duration: 0.3 }
                    : { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }
              >
                {frag.word}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* 💬 MENSAJE DESKTOP */}
      <AnimatePresence>
        {activeMessage && !completed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none hidden md:flex fixed inset-0 z-40 items-center justify-center px-6"
          >
            <div className="max-w-md rounded-xl bg-black/60 px-6 py-4 backdrop-blur-md">
              <p className="text-lg text-[#f5f1ec]/90">
                {activeMessage}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌒 FINAL */}
      <AnimatePresence>
        {completed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="pointer-events-none fixed inset-0 flex items-center justify-center text-center text-violet-400 text-2xl md:text-3xl font-light"
          >
            Y aun así,
            <br />
            sigues avanzando.
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}
