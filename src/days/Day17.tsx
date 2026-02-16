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
  }
]

export default function Day17({ onClose }: Day17Props) {
  const [index, setIndex] = useState(0)
  const [canClick, setCanClick] = useState(false)
  const [isFinal, setIsFinal] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  // Bloquear scroll
  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = original
    }
  }, [])

  // Delay entre frases
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
      setIsFinal(true)
    }
  }, [canClick, index])

  const closeSoftly = () => {
    if (isClosing) return
    setIsClosing(true)
    setTimeout(() => onClose(), 1000)
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: isClosing ? 0 : 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-50 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 60% 50%, rgba(255,140,40,0.08), transparent 65%),
          #140d07
        `
      }}
    >
      {/* Cerrar */}
      <button
        onClick={onClose}
        className="absolute right-6 top-6 text-white/40 hover:text-white transition z-50"
      >
        <X size={24} />
      </button>

      <div className="h-full w-full flex items-center justify-center px-6 md:px-16 relative">
        <div className="w-full max-w-6xl relative">

          <AnimatePresence mode="wait">

            {/* FRASES */}
            {!isFinal ? (
              <motion.div
                key={`message-${index}`}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -60 }}
                transition={{ duration: 0.9 }}
                className="min-h-[60vh] flex items-center justify-center text-center"
              >
                <p
                  className="leading-tight text-[#f5f1ec] font-light text-[clamp(2rem,6vw,4.5rem)]"
                  style={{ fontFamily: "Reenie, serif" }}
                >
                  {MESSAGES[index].pre}{" "}
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-[#e2a24c]"
                  >
                    {MESSAGES[index].highlight}
                  </motion.span>
                </p>
              </motion.div>
            ) : (
              /* FINAL */
              <motion.div
                key="final"
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: isClosing ? 0 : 1,
                  y: isClosing ? 40 : 0
                }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="min-h-[70vh] flex items-center"
              >
                <div className="text-left w-full max-w-4xl">
                  <p className="text-xs text-white/60 italic mb-5 font-[Manrope]">
                    Incluso en el silencio,
                  </p>

                  <div className="space-y-4">
                    <p
                      className="text-[clamp(3rem,7vw,5.5rem)] text-[#e2a24c] italic leading-none"
                      style={{ fontFamily: "Reenie" }}
                    >
                      puedo seguir
                    </p>

                    <p
                      className="text-[clamp(2.5rem,6vw,4.8rem)] italic text-[#f5f1ec]"
                      style={{ fontFamily: "Reenie, serif" }}
                    >
                      sintiendo tu calma.
                    </p>
                  </div>

                  <p className="mt-14 max-w-xl text-sm text-white/40 leading-relaxed font-[Manrope]">
                    Hay presencias que no necesitan hacerse notar.
                    Permanecen suaves, constantes, incluso cuando todo parece quieto.
                  </p>

                  {/* CONTINUAR FINAL */}
                  <button
                    onClick={closeSoftly}
                    className="mt-16 flex items-center gap-3 text-xs tracking-widest uppercase text-white/30 hover:text-white transition"
                  >
                    <span className="w-12 h-px bg-white/20" />
                    Gracias
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          {/* CONTINUAR FRASES */}
          {!isFinal && (
            <button
              onClick={nextMessage}
              className="
                absolute bottom-12
                left-1/2 -translate-x-1/2
                md:left-16 md:translate-x-0
                flex items-center gap-3
                text-xs tracking-widest uppercase
                text-white/30 hover:text-white
                transition
              "
            >
              <span className="w-12 h-px bg-white/20" />
              continuar
            </button>
          )}

        </div>
      </div>
    </motion.section>
  )
}
