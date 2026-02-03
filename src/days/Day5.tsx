import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import {
  X,
  Play,
  Hourglass,
  Sparkles,
  Infinity as InfinityIcon,
  Heart,
} from "lucide-react"

export default function Day5({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<0 | 1 | 2>(0)
  const [revealed, setRevealed] = useState<number[]>([])

  const moments = [
    {
      label: "EL PRIMER MENSAJE",
      text: `"Hola, ¿cómo estás?" — El inicio de todo.`,
      icon: Play,
    },
    {
      label: "EL SILENCIO",
      text: "El día que no hablamos.",
      icon: Hourglass,
    },
    {
      label: "LA RISA",
      text: "La risa inesperada.",
      icon: Sparkles,
    },
    {
      label: "HOY",
      text: "Y todo lo que somos ahora.",
      icon: InfinityIcon,
    },
  ]

  function reveal(index: number) {
    const alreadyRevealed = revealed.includes(index)

    if (!alreadyRevealed) {
      setRevealed((r) => [...r, index])
    }

    // Solo la primera vez que se revela el infinito
    if (index === moments.length - 1 && !alreadyRevealed) {
      setTimeout(() => setStep(2), 2000)
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* CONTENEDOR */}
      <motion.div
        className="
          relative
          w-full
          h-full
          md:h-auto
          md:max-w-[720px]
          bg-[#F9F6F1]
          md:rounded-3xl
          p-6
          md:p-10
          overflow-hidden
        "
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {/* CERRAR */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-black/50 hover:text-[#534CE7] transition"
        >
          <X />
        </button>

        <AnimatePresence mode="wait">
          {/* ================= STEP 0 ================= */}
          {step === 0 && (
            <motion.div
              key="intro"
              className="h-full flex flex-col items-center justify-center text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setStep(1)}
            >
              <motion.div
                className="text-[#534CE7] mb-6"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Heart size={56} fill="currentColor" />
              </motion.div>

              <p className="text-black/60 text-xs tracking-widest">
                TOCA PARA COMENZAR
              </p>
            </motion.div>
          )}

          {/* ================= STEP 1 ================= */}
          {step === 1 && (
            <motion.div
              key="timeline"
              className="h-full flex flex-col justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* TITULO */}
              <div className="text-center mb-10">
                <h2 className="text-xl font-semibold">
                  <span className="text-[#534CE7]">El viaje</span>
                </h2>
                <p className="text-sm text-black/50 mt-2">
                  Momentos que definieron nuestro camino.
                </p>
              </div>

              {/* LINEA */}
              <motion.div
                className="h-px bg-black/20 mb-10 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1 }}
              />

              {/* MOMENTOS */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {moments.map((m, i) => {
                  const Icon = m.icon
                  const isActive = revealed.includes(i)

                  return (
                    <button
                      key={i}
                      onClick={() => reveal(i)}
                      className="flex flex-col items-center text-center gap-3"
                    >
                      {/* ICONO */}
                      <motion.div
                        className={`w-10 h-10 flex items-center justify-center transition ${
                          isActive ? "text-[#534CE7]" : "text-black/70"
                        }`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.15 }}
                      >
                        <Icon size={45} />
                      </motion.div>

                      {/* TEXTO */}
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            delay: i === moments.length - 1 ? 0.25 : 0,
                          }}
                        >
                          <p className="text-xs font-semibold">{m.label}</p>
                          <p className="text-[11px] text-black/50 mt-1">
                            {m.text}
                          </p>
                        </motion.div>
                      )}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* ================= STEP 2 ================= */}
          {step === 2 && (
            <motion.div
              key="final"
              className="h-full flex flex-col items-center justify-center text-center"
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            >
              <p className="text-xs tracking-widest text-black/50 mb-4">
                PARA GUARDARLO SIEMPRE
              </p>

              <p className="text-2xl md:text-3xl font-serif leading-relaxed max-w-md">
                No todo fue perfecto,
                <br />
                pero todo fue real.
                <br />
                <strong>Y eso lo hace nuestro.</strong>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
