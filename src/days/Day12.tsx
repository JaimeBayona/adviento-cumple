import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

const PETALS = [
  "Intuición",
  "Paciencia",
  "Calidez",
  "Determinación",
  "Alegría",
]

export default function Day12({ onClose }: { onClose: () => void }) {
  const [opened, setOpened] = useState(0)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  const radius = 95
  const step = 360 / PETALS.length
  const isComplete = opened >= PETALS.length

  return (
    <motion.section
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-gradient-to-br
        from-[#f6e8ff]
        via-[#eef2ff]
        to-[#e8fff6]
        px-4
      "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* cerrar */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-black/40 hover:text-black"
        aria-label="Cerrar"
      >
        <X />
      </button>

      <div className="w-full max-w-xl text-center">
        <span className="block mb-2 text-xs tracking-widest uppercase text-black/40">
          Día 12
        </span>

        <h1 className="mb-2 text-4xl font-serif text-[#1f1f2a]">
          Lo que florece en ti
        </h1>

        <p className="mb-12 text-sm text-[#1f1f2a]/60">
          Toca la flor. No hay prisa.
        </p>

        {/* FLOR */}
        <div className="relative mx-auto h-[320px] w-[320px]">
          {/* pétalos */}
          <AnimatePresence>
            {PETALS.slice(0, opened).map((text, i) => {
              const angle = i * step - 90
              const rad = (angle * Math.PI) / 180
              const x = Math.cos(rad) * radius
              const y = Math.sin(rad) * radius

              return (
                <motion.div
                  key={text}
                  className="absolute left-1/2 top-1/2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x,
                    y,
                    rotate: angle,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 80,
                    damping: 14,
                  }}
                >
                  <motion.div
                    className="
                      relative
                      h-40 w-20
                      rounded-full
                      bg-white/40
                      backdrop-blur-md
                    "
                    animate={{
                      scaleY: [1, 1.04, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <span
                      className="
                        absolute inset-0
                        flex items-center justify-center
                        text-xs
                        tracking-wide
                        text-[#1f1f2a]/70
                        rotate-90
                        select-none
                      "
                    >
                      {text}
                    </span>
                  </motion.div>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {/* centro */}
          {!isComplete && (
            <motion.button
              onClick={() => setOpened((o) => o + 1)}
              aria-label="Abrir pétalo"
              className="
                absolute left-1/2 top-1/2
                -translate-x-1/2 -translate-y-1/2
                h-14 w-14
                rounded-full
                bg-white
                shadow-[0_0_40px_rgba(160,255,220,0.8)]
              "
              animate={{
                scale: [1, 1.12, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </div>

        {/* FINAL */}
        <AnimatePresence>
          {isComplete && (
            <motion.p
              className="
                mt-14
                text-base
                text-[#1f1f2a]/70
              "
              initial={{ opacity: 0, y: 16 }}
              animate={{
                opacity: 1,
                y: 0,
                textShadow: [
                  "0 0 0px rgba(255,255,255,0)",
                  "0 0 16px rgba(255,255,255,0.6)",
                  "0 0 0px rgba(255,255,255,0)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Esto también eres tú.  
              <br />
              Y aún queda mucho por florecer.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}
