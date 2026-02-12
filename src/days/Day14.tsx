// src/days/Day14.tsx
import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, X } from "lucide-react"

type Day14Props = {
  onClose?: () => void
}

const CARDS = [
  "Flores que duran un día",
  "Promesas perfectas",
  "Fotos para mostrar",
]

export default function Day14({ onClose }: Day14Props) {
  const [step, setStep] = useState<0 | 1 | 2>(0)
  const [cardIndex, setCardIndex] = useState(0)
  const [isClosing, setIsClosing] = useState(false)

  /* 🧠 DESCARTAR TARJETA */
  const discardCard = useCallback(() => {
    if (cardIndex < CARDS.length - 1) {
      setCardIndex((i) => i + 1)
    } else {
      // pausa emocional antes de pasar al acto 2
      setTimeout(() => {
        setStep(1)
      }, 400)
    }
  }, [cardIndex])

  /* ❌ CERRAR */
  const handleClose = useCallback(() => {
    setIsClosing(true)
    setTimeout(() => {
      onClose?.()
      setStep(0)
      setCardIndex(0)
      setIsClosing(false)
    }, 500)
  }, [onClose])

  /* ⌨️ ATAJOS TECLADO */
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose()
      if (e.key === "Enter" && step === 1) setStep(2)
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [step, handleClose])

  return (
    <AnimatePresence>
      {!isClosing && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#7A1025] px-5 md:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* ❤️ DECORACIÓN FONDO */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1 }}
          >
            <Heart className="absolute left-10 top-10 h-12 w-12 text-white" />
            <Heart className="absolute bottom-16 right-12 h-16 w-16 text-white" />
          </motion.div>

          <motion.div
            className="relative w-full max-w-3xl"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            {/* 🔹 PROGRESO */}
            <div className="mb-8 flex justify-center gap-3 text-xs text-white/60">
              {["I", "II", "III"].map((n, i) => (
                <motion.span
                  key={n}
                  animate={{ opacity: step >= i ? 1 : 0.4 }}
                  className={step >= i ? "text-white" : ""}
                >
                  {n}
                </motion.span>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* 🌸 ACTO 1 */}
              {step === 0 && (
                <motion.div
                  key="act1"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.6 }}
                  className="rounded-[32px] bg-[#FFF7F9] px-6 py-12 md:px-12 md:py-16 text-center shadow-2xl"
                >
                  <p className="mb-10 text-sm uppercase tracking-widest text-[#6B4E57]/70">
                    14 / 20
                  </p>

                  <p className="mb-8 text-2xl font-medium text-[#6B4E57]">
                    Hoy muchos celebran San Valentín con…
                  </p>

                  <motion.div
                    key={cardIndex}
                    initial={{ rotate: -4, opacity: 0, scale: 0.95 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{
                      x: -300,
                      rotate: -12,
                      opacity: 0,
                      scale: 0.9,
                    }}
                    transition={{ duration: 0.45 }}
                    className="mx-auto mb-12 max-w-xs rounded-2xl border border-[#C9184A]/20 bg-white px-6 py-8 shadow-lg"
                  >
                    <p className="text-lg font-medium text-[#C9184A]">
                      {CARDS[cardIndex]}
                    </p>
                  </motion.div>

                  <button
                    onClick={discardCard}
                    className="mx-auto flex items-center gap-2 rounded-full border border-[#C9184A] px-6 py-3 text-sm text-[#C9184A] transition hover:bg-[#C9184A] hover:text-white"
                  >
                    <X size={14} /> Esto no es lo que celebro
                  </button>
                </motion.div>
              )}

              {/* 🌺 ACTO 2 */}
              {step === 1 && (
                <motion.div
                  key="act2"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.6 }}
                  className="rounded-[32px] bg-[#FFF7F9] px-8 py-16 md:px-12 md:py-20 text-center shadow-2xl"
                >
                  <p className="mb-6 text-xl text-[#6B4E57]">
                    Yo celebro a quien se quedó.
                  </p>

                  <p className="mb-14 text-sm uppercase tracking-widest text-[#6B4E57]/60">
                    elección · constancia · amistad
                  </p>

                  <button
                    onClick={() => setStep(2)}
                    className="rounded-full bg-[#C9184A] px-8 py-3 text-sm font-medium text-white shadow-lg"
                  >
                    Seguir
                  </button>
                </motion.div>
              )}

              {/* ❤️ ACTO 3 */}
              {step === 2 && (
                <motion.div
                  key="act3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 1.1 }}
                  className="rounded-[32px] bg-[#FFF7F9] px-8 py-20 md:px-12 md:py-24 text-center shadow-2xl"
                >
                  <p className="mb-6 text-3xl font-semibold uppercase text-[#C9184A]">
                    Si todo volviera a empezar…
                  </p>

                  <p className="mb-16 text-xl text-[#6B4E57]">
                    Te volvería a elegir como mi mejor amiga.
                  </p>

                  <motion.button
                    onClick={handleClose}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 1.8 }}
                    className="mx-auto flex items-center gap-2 rounded-full bg-[#C9184A] px-9 py-3 text-sm font-medium text-white shadow-xl"
                  >
                    <Heart size={16} /> Feliz día de nuestra amistad{" "}
                    <Heart size={16} />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
