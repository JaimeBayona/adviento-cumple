// src/days/Day7.tsx
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const TRUTHS = [
  {
    id: 1,
    text: "Tu forma de escuchar me hace sentir comprendido sin necesidad de muchas palabras.",
  },
  {
    id: 2,
    text: "Tu amistad es uno de los regalos más bonitos que la vida me ha dado.",
  },
  {
    id: 3,
    text: "Tienes un corazón capaz de cambiar el mundo.",
  },
]

export default function Day7({ onClose }: { onClose?: () => void }) {
  // 👇 empezamos en la intro
  const [index, setIndex] = useState(-1)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  const isIntro = index === -1
  const isEnd = index >= TRUTHS.length

  function next() {
    setIndex((prev) => prev + 1)
  }

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF7F2] px-6">
      <AnimatePresence mode="wait">
        {/* INTRO */}
        {isIntro && (
          <motion.div
            key="intro"
            className="w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_rgba(0,0,0,0.08)]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Imagen izquierda */}
              <div className="relative h-64 md:h-full">
                <img
                  src="https://qhyhynxpcuovxmnfhndv.supabase.co/storage/v1/object/public/calendar/MEL/548.jpg"
                  alt="Intro día 7"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>

              {/* Texto derecha */}
              <div className="flex flex-col items-center justify-center px-8 py-16 text-center">
                <h1 className="select-none max-w-md font-[Oswald] text-2xl md:text-4xl font-black leading-tight text-[#1F1F1F]">
                  Hoy quiero regalarte tres verdades que salen directo del
                  corazón…
                </h1>

                <button
                  onClick={next}
                  className="
                    mt-12
                    select-none
                    rounded-2xl
                    border border-[#E84D8A]/30
                    px-8 py-3
                    text-sm
                    font-medium
                    text-[#E84D8A]
                    transition
                    hover:bg-[#E84D8A]
                    hover:text-white
                    active:scale-95
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#E84D8A]/40
                  "
                >
                  Pulsa para continuar
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* VERDADES */}
        {!isIntro && !isEnd && (
          <motion.div
            key={TRUTHS[index].id}
            className="w-full max-w-3xl rounded-3xl bg-white px-10 py-20 text-center shadow-[0_30px_80px_rgba(0,0,0,0.08)]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="mb-6 block select-none text-xs uppercase tracking-[0.3em] text-[#E84D8A]">
              · Verdad {index + 1} de 3 ·
            </span>

            <h1 className="mx-auto max-w-2xl select-none font-serif text-3xl md:text-4xl leading-tight text-[#1F1F1F]">
              {TRUTHS[index].text}
            </h1>

            <button
              onClick={next}
              className="
                mt-12
                select-none
                rounded-full
                bg-[#E84D8A]
                px-8 py-3
                text-sm
                font-medium
                text-white
                transition
                hover:scale-105
                active:scale-95
                focus:outline-none
                focus:ring-2
                focus:ring-[#E84D8A]/40
              "
            >
              Continuar →
            </button>
          </motion.div>
        )}

        {/* FINAL */}
        {isEnd && (
          <motion.div
            key="end"
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 text-xs tracking-widest text-black/40">
              DÍA SIETE
            </span>

            <h2 className="mb-6 font-serif text-4xl text-[#1F1F1F]">
              Nunca lo olvides
            </h2>

            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-[#E84D8A]/10">
              <span className="text-2xl text-[#E84D8A]">♥</span>
            </div>

            <p className="text-xs tracking-widest text-black/40">
              FIN DE LA SECUENCIA
            </p>

            {onClose && (
              <button
                onClick={onClose}
                className="mt-10 rounded-full bg-[#E84D8A] px-8 py-3 text-sm font-medium text-white transition hover:scale-105"
              >
                Volver
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
