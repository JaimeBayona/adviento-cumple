import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef, useMemo } from "react"
import { X } from "lucide-react"
import "../index.css"

const phrases = [
  "Gracias por estar incluso cuando no sabías qué decir.",
  "Gracias por el apoyo silencioso.",
  "Gracias por quedarte cuando otros se fueron.",
  "Gracias por hacerme reír en días difíciles.",
  "Gracias por no pedir explicaciones.",
  "Gracias por entender mis silencios.",
  "Gracias por acompañar sin invadir.",
  "Gracias por los recuerdos que no se olvidan.",
  "Gracias por hacer ligero lo pesado.",
  "Gracias por escuchar sin juzgar.",
  "Gracias por la paciencia infinita.",
  "Gracias por compartir risas pequeñas.",
  "Gracias por sostener sin atar.",
  "Gracias por simplemente estar."
]

export default function Day4({ onClose }: { onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    document.body.style.touchAction = "none"

    return () => {
      document.body.style.overflow = ""
      document.body.style.touchAction = ""
    }
  }, [])

  const { scrollYProgress } = useScroll({
    container: containerRef
  })

  const dotY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  /* offsets internos y seguros */
  const horizontalOffsets = useMemo(() => {
    return phrases.map(() => Math.random() * 64 - 32) // -32px a +32px
  }, [])

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="
          relative
          w-full h-[100dvh]
          md:h-[90vh] md:max-w-5xl
          rounded-none md:rounded-2xl
          overflow-hidden
          shadow-2xl
        "
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          onWheel={(e) => e.stopPropagation()}
          className="absolute top-4 right-4 z-50 text-white/70 hover:text-white"
        >
          <X size={28} />
        </button>

        {/* BACKGROUND */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1f7a3a_0%,_#0b2e1a_100%)]" />

        {/* CONTENT */}
        <div
          ref={containerRef}
          className="
            relative z-10 h-full overflow-y-auto px-8 md:px-20 py-20
            md:scrollbar-custom
          "
        >
          {/* TITLE */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="
            text-center
            tracking-[0.15em] font-newsreader italic
          text-white/80 text-2xl md:text-4xl mb-20"
          >
            Los hilos de nuestro tiempo…
          </motion.h2>

          <div className="relative flex gap-10">
            {/* LINE */}
            <div className="relative w-6 flex justify-center shrink-0">
              <div className="absolute top-0 bottom-0 w-[0.2em] bg-[#ee8c2b]/20" />
              <motion.div
                style={{ top: dotY }}
                className="absolute w-2.5 h-2.5 rounded-full bg-[#ee8c2b] shadow-[0_0_8px_#ee8c2b]"
              />
            </div>

            {/* TEXT COLUMN */}
            <div className="flex-1 pb-40">
              {/* 🔹 MARCO CENTRAL */}
              <div className="mx-auto max-w-[520px] space-y-24">
                {phrases.map((text, index) => {
                  const isInitiallyVisible = index < 3

                  return (
                    <motion.div
                      key={index}
                      initial={
                        isInitiallyVisible
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 20 }
                      }
                      whileInView={
                        isInitiallyVisible
                          ? undefined
                          : { opacity: 1, y: 0 }
                      }
                      viewport={
                        isInitiallyVisible
                          ? undefined
                          : { once: true, margin: "-120px" }
                      }
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      {/* desplazamiento SOLO dentro del marco */}
                      <motion.p
                        style={{ x: horizontalOffsets[index] }}
                        className="
                          text-white text-1.9xl md:text-2xl
                          font-light leading-relaxed font-inter md:tracking-[0.15em]
                          tracking-[0.02em]
                        "
                      >
                        {text}
                      </motion.p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* FOOT */}
          <div className="mt-32 text-center text-white/40 text-xs tracking-widest">
            DÍA 04 · GRATITUD
          </div>
        </div>
      </motion.div>
    </div>
  )
}
