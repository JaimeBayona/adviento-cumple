import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

type Day17Props = {
  onClose: () => void
}

const MESSAGES = [
  {
    pre: "Que admiro la manera en que sostienes todo, incluso cuando estás",
    highlight: "agotada."
  },
  {
    pre: "Que eres más fuerte de lo que tú misma",
    highlight: "crees."
  },
  {
    pre: "Que no siempre sabes lo bien que lo estás",
    highlight: "haciendo."
  },
  {
    pre: "Que tu presencia calma más de lo que",
    highlight: "imaginas."
  },
  {
    pre: "Que mereces descanso",
    highlight: "sin culpa."
  }
]

export default function Day17({ onClose }: Day17Props) {
  const [index, setIndex] = useState(0)
  const [canClick, setCanClick] = useState(false)
  const [closing, setClosing] = useState(false)

  // Bloquear scroll
  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = original
    }
  }, [])

  // Micro delay entre mensajes
  useEffect(() => {
    setCanClick(false)
    const t = setTimeout(() => setCanClick(true), 700)
    return () => clearTimeout(t)
  }, [index])

  const nextMessage = useCallback(() => {
    if (!canClick) return

    if (index < MESSAGES.length - 1) {
      setIndex((prev) => prev + 1)
    } else {
      // Cierre suave
      setClosing(true)
      setTimeout(() => {
        onClose()
      }, 900)
    }
  }, [canClick, index, onClose])

  return (
    <AnimatePresence>
      {!closing && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          onClick={nextMessage}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden cursor-pointer"
          style={{
            background: `
              radial-gradient(circle at 50% 40%, rgba(255,160,60,0.08), transparent 60%),
              #1a120b
            `
          }}
        >
          {/* Cerrar */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className="absolute right-5 top-5 md:right-8 md:top-8 text-white/40 hover:text-white transition"
            aria-label="Cerrar"
          >
            <X size={26} />
          </button>

          {/* Texto */}
          <div className="relative w-full max-w-5xl px-6 md:px-12 text-center">

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -60 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                className="flex items-center justify-center min-h-[55vh]"
              >
                <p
                  className="
                    leading-tight
                    text-[#f5f1ec]
                    font-light
                    text-[clamp(2rem,6vw,4.5rem)]
                  "
                  style={{ fontFamily: "Reenie, serif" }}
                >
                  {MESSAGES[index].pre}{" "}
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, ease: "easeOut" }}
                    className="text-[#e2a24c]"
                    style={{ fontFamily: "Reenie" }}
                  >
                    {MESSAGES[index].highlight}
                  </motion.span>
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Indicador inferior */}
            {index < MESSAGES.length && (
              <div
                className="
                  absolute bottom-10 md:bottom-0 left-1/2 -translate-x-1/2
                  flex items-center gap-3
                  text-white/25
                  text-1xl
                  tracking-widest
                  uppercase
                  pointer-events-none
                  font-[Reenie]
                "
              >
                <span className="w-10 h-px bg-white/20" />
                continuar
              </div>
            )}

          </div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
