// src/days/Day10.tsx
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { X } from "lucide-react"

type Scene = {
  title: string
  text: string
}

const SCENES: Scene[] = [
  {
    title: "Cuando nadie te exige",
    text: "No corres. No explicas. No te disculpas por descansar.",
  },
  {
    title: "Cuando nadie espera nada",
    text: "Respiras sin miedo a fallar. Te permites ser suficiente.",
  },
  {
    title: "Cuando solo eres tú",
    text: "No un rol. No una versión. Solo tú, completa.",
  },
]

export default function Day10({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"intro" | "scene" | "final">("intro")
  const [index, setIndex] = useState(0)

  // 🔒 Bloquear scroll global
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  function nextScene() {
    if (index < SCENES.length - 1) {
      setIndex((i) => i + 1)
    } else {
      setStep("final")
    }
  }

  return (
    <motion.section
      className="fixed inset-0 z-50 bg-[#1C1F24] text-[#F4F2EE]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* ❌ Cerrar */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/50 hover:text-white transition"
      >
        <X size={35}/>
      </button>

      <AnimatePresence mode="wait">
        {/* ================= INTRO ================= */}
        {step === "intro" && (
          <motion.div
            key="intro"
            className="h-full flex flex-col items-center justify-center px-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <motion.p
              className="text-sm tracking-widest uppercase text-[#7A9CC6] mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Día 10
            </motion.p>

            <h1 className="text-3xl md:text-5xl font-serif mb-6">
              Si nadie mirara
            </h1>

            <button
              onClick={() => setStep("scene")}
              className="
                rounded-full
                bg-[#7A9CC6]
                px-10
                py-3
                text-sm
                font-medium
                text-[#1C1F24]
                hover:bg-[#6A8BB3]
                hover:scale-105
                transition
              "
            >
              Estoy lista
            </button>
          </motion.div>
        )}

        {/* ================= SCENES ================= */}
        {step === "scene" && (
          <motion.div
            key={`scene-${index}`}
            className="h-full flex flex-col items-center justify-center px-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.h2
              className="text-2xl md:text-4xl font-serif mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              {SCENES[index].title}
            </motion.h2>

            <motion.p
              className="max-w-md text-[#F4F2EE]/65 mb-16 leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {SCENES[index].text}
            </motion.p>

            <button
              onClick={nextScene}
              className="text-sm uppercase tracking-widest text-[#7A9CC6] hover:opacity-80 transition"
            >
              continuar
            </button>
          </motion.div>
        )}

        {/* ================= FINAL ================= */}
        {step === "final" && (
          <motion.div
            key="final"
            className="h-full flex flex-col items-center justify-center px-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.p
              className="max-w-lg text-2xl md:text-3xl font-serif leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              Y aun así…
              <br />
              eliges darlo todo.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}
