// src/days/Day19.tsx
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

type Day19Props = {
  onClose: () => void
}

const SCENES = [
    "",
  "No es un día cualquiera.",
  "No es solo una fecha.",
  "No es casualidad.",
  "Algo está por pasar.",
  "Y tú no estás lista…",
  "para lo que viene.",
  "MAÑANA"
]

// Ritmo más cinematográfico (más tensión al final)
const DELAYS = [1800, 1500, 1500, 1700, 2000, 2200]

export default function Day19({ onClose }: Day19Props) {
  const [index, setIndex] = useState(0)
  const [glitch, setGlitch] = useState(false)
  const [flash, setFlash] = useState(false)
  const [shake, setShake] = useState(false)
  const [cut, setCut] = useState(false)

  const hitRef = useRef<HTMLAudioElement | null>(null)
  const boomRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    document.body.style.overflow = "hidden"

    // Audio impacto corto
    hitRef.current = new Audio("/audio/trailer-hit.mp3")
    hitRef.current.volume = 0.8

    // Audio final más pesado
    boomRef.current = new Audio("/audio/trailer-boom.mp3")
    boomRef.current.volume = 0.9

    let timeout: number

    const triggerImpact = (final = false) => {
      const audio = final ? boomRef.current : hitRef.current

      if (audio) {
        audio.currentTime = 0
        audio.play().catch(() => {})
      }

      setGlitch(true)
      setFlash(true)
      setShake(true)

      setTimeout(() => setGlitch(false), 180)
      setTimeout(() => setFlash(false), 120)
      setTimeout(() => setShake(false), 300)
    }

    const next = (i: number) => {
      if (i >= SCENES.length - 1) {
        setTimeout(() => {
          triggerImpact(true)
          setCut(true)
        }, 1500)
        return
      }

      timeout = window.setTimeout(() => {
        triggerImpact()
        setIndex((prev) => prev + 1)
        next(i + 1)
      }, DELAYS[i])
    }

    next(0)

    return () => {
      clearTimeout(timeout)
      document.body.style.overflow = ""
      hitRef.current?.pause()
      boomRef.current?.pause()
    }
  }, [])

  return (
    <section className="fixed inset-0 z-50 overflow-hidden bg-black">
      
      {/* Fondo oscuro con leve gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-neutral-900" />

      {/* Flash blanco impacto */}
      {flash && (
        <motion.div
          className="absolute inset-0 bg-white z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Botón cerrar */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 text-white/30 hover:text-white transition"
      >
        <X size={26} />
      </button>

      {/* Contenedor principal */}
      <div
        className={`relative z-20 flex h-full w-full items-center justify-center px-6 transition-transform duration-200 ${
          shake ? "scale-[1.02]" : ""
        }`}
      >
        <AnimatePresence mode="wait">
          {!cut && (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative text-center max-w-3xl"
            >
              {/* Texto principal */}
              <h1 className="text-3xl md:text-6xl font-extrabold text-white tracking-wide leading-tight relative z-10">
                {SCENES[index]}
              </h1>

              {/* Glow sutil */}
              <div className="absolute inset-0 blur-2xl opacity-20 bg-white rounded-full" />

              {/* Glitch layers */}
              {glitch && (
                <>
                  <h1 className="absolute top-0 left-0 w-full text-3xl md:text-6xl font-extrabold text-red-600 translate-x-1 opacity-70">
                    {SCENES[index]}
                  </h1>

                  <h1 className="absolute top-0 left-0 w-full text-3xl md:text-6xl font-extrabold text-cyan-400 -translate-x-1 opacity-70">
                    {SCENES[index]}
                  </h1>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Corte negro abrupto */}
      {cut && (
        <>
          <motion.div
            className="absolute inset-0 bg-black z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />

          {/* Texto final */}
          <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4, duration: 1 }}
  className="absolute inset-0 flex items-center justify-center text-center text-xs md:text-sm tracking-[0.6em] text-white/70 z-50"
>
  20.02.2026
</motion.div>

        </>
      )}
    </section>
  )
}
