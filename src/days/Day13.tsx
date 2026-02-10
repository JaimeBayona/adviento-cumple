import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

type Version = {
  title: string
  text: string
}

const VERSIONS: Version[] = [
  {
    title: "La que cuida",
    text: "La que aprendió a ser hogar, incluso cuando estaba cansada. La que ama sin manual.",
  },
  {
    title: "La amiga",
    text: "La que escucha, la que se queda, la que hace reír cuando nadie más sabe cómo.",
  },
  {
    title: "La fuerte",
    text: "La que siguió aun con miedo. La que no siempre pudo, pero nunca se rindió.",
  },
  {
    title: "La soñadora",
    text: "La que imagina futuros mejores. La que cree, incluso cuando el mundo pesa.",
  },
  {
    title: "La que casi nadie ve",
    text: "La que siente profundo. La que guarda silencios. La que merece más de lo que pide.",
  },
]

export default function Day13({ onClose }: { onClose: () => void }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  function next() {
    if (index < VERSIONS.length - 1) {
      setIndex((i) => i + 1)
    }
  }

  const isEnd = index === VERSIONS.length - 1

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#f5f1ec] to-[#e9d8c3] px-6">
      {/* Cerrar */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full p-2 text-[#211119]/60 hover:bg-black/5"
      >
        <X />
      </button>

      <div className="relative w-full max-w-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-3xl bg-white p-10 text-center shadow-xl"
          >
            <h2 className="mb-6 text-3xl font-serif text-[#211119]">
              {VERSIONS[index].title}
            </h2>

            <p className="mb-10 text-lg leading-relaxed text-[#211119]/80">
              {VERSIONS[index].text}
            </p>

            {!isEnd ? (
              <button
                onClick={next}
                className="rounded-full bg-[#e8308c] px-8 py-3 text-white transition hover:scale-105"
              >
                Ver otra versión
              </button>
            ) : (
              <p className="mt-6 text-lg font-medium text-[#e8308c]">
                Todas viven en ti.  
                Y todas importan.
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Indicador */}
        <div className="mt-6 flex justify-center gap-2">
          {VERSIONS.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${
                i === index ? "bg-[#e8308c]" : "bg-[#211119]/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
