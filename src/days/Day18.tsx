import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

type Day18Props = {
  onClose: () => void
}

type Word = {
  id: number
  label: string
  message: string
}

const WORDS: Word[] = [
  {
    id: 1,
    label: "Madre",
    message:
      "Das más de lo que dices, sostienes más de lo que muestras y amas incluso cuando nadie ve el esfuerzo."
  },
  {
    id: 2,
    label: "Mujer",
    message:
      "Te eliges incluso cuando dudas, incluso cuando el mundo intenta decirte quién deberías ser."
  },
  {
    id: 3,
    label: "Fuerte",
    message:
      "Sigues adelante incluso cansada, incluso rota, incluso cuando nadie entiende lo que cargas por dentro."
  },
  {
    id: 4,
    label: "Sensible",
    message:
      "Sientes sin miedo, con la valentía de quien sabe que la profundidad también es una forma de poder."
  },
  {
    id: 5,
    label: "Valiente",
    message:
      "Avanzas aunque tiemble todo, aunque el camino sea incierto y el corazón lata con dudas."
  },
  {
    id: 6,
    label: "Real",
    message:
      "No finges para encajar, no te reduces para gustar, y eso — precisamente eso — es tu fuerza."
  },
]


export default function Day18({ onClose }: Day18Props) {
  const [activeWord, setActiveWord] = useState<Word | null>(null)
  const [showMeaning, setShowMeaning] = useState(false)

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 640

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  /* ─────────────── PARTICULAS (ligeras) ─────────────── */
  const particles = useMemo(() => {
    const count = isMobile ? 20 : 36

    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1 + 0.3,
      duration: 25 + Math.random() * 20,
      opacity: Math.random() * 0.2 + 0.1,
    }))
  }, [isMobile])

  /* ─────────────── POSICIONES ESTABLES ─────────────── */
  const wordPositions = useMemo(() => {
    const radius = isMobile ? 105 : 260

    return WORDS.map((_, index) => {
      const angle = (index / WORDS.length) * Math.PI * 2
      const depth = Math.random() * 0.4 + 0.6

      return {
        x: Math.cos(angle) * radius * depth,
        y: Math.sin(angle) * radius * depth,
        scale: 0.9 + depth * 0.3,
        opacity: 0.5 + depth * 0.4,
        blur: isMobile ? 0 : (1 - depth) * 1.2,
        fontSize: isMobile
          ? `${1 + depth * 0.35}rem`
          : `${1.2 + depth * 0.6}rem`,
      }
    })
  }, [isMobile])

  function selectWord(word: Word) {
    setShowMeaning(false)
    setActiveWord(word)
  }

  function closeWord() {
    setShowMeaning(false)
    setTimeout(() => setActiveWord(null), 300)
  }

  return (
    <section className="fixed inset-0 z-50 overflow-hidden text-[#f5f1ec] font-[Newsreader-italic] italic">
      {/* Fondo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, #3a145f 0%, #14081f 60%, #050208 100%)",
        }}
      />

      {/* Partículas */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{ y: ["0%", "-100%"] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Cerrar */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-50 rounded-full border border-white/20 p-2 text-white/60 hover:text-white transition"
      >
        <X size={18} />
      </button>

      {/* Palabras distribuidas */}
      {!activeWord &&
        WORDS.map((word, index) => {
          const pos = wordPositions[index]

          return (
            <motion.button
              key={word.id}
              onClick={() => selectWord(word)}
              className="absolute select-none tracking-wide whitespace-nowrap"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: pos.fontSize,
                filter: `blur(${pos.blur}px)`,
              }}
              initial={{
                x: pos.x,
                y: pos.y,
                opacity: pos.opacity,
                scale: pos.scale,
              }}
              animate={{
                x: pos.x,
                y: pos.y,
                opacity: pos.opacity,
                scale: pos.scale,
              }}
              transition={{ duration: 0.6 }}
            >
              {word.label}
            </motion.button>
          )
        })}

      {/* Palabra central */}
      <AnimatePresence>
        {activeWord && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeWord}
          >
            <motion.h1
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: isMobile ? 1.6 : 2.2, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              onAnimationComplete={() => setShowMeaning(true)}
              className="text-4xl sm:text-6xl md:text-7xl mb-5"
            >
              {activeWord.label}
            </motion.h1>

            <AnimatePresence>
              {showMeaning && (
                <motion.p
                  className="mt-6 max-w-sm sm:max-w-md text-base sm:text-lg text-white/70"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {activeWord.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mensaje permanente */}
      <div className=" absolute bottom-10 w-full text-center text-white/50 text-sm sm:text-base px-6">
        No tienes que elegir una sola versión.
        <br />
        <span className="italic text-white/70">Eres todas.</span>
      </div>
    </section>
  )
}
