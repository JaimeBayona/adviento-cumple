// src/days/Day13.tsx
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, ArrowRight, ArrowLeft, Sparkles } from "lucide-react"

type Day13Props = {
  onClose?: () => void
}

const PAGES = [
  {
    chapter: "CAPÍTULO UNO",
    titleMain: "La Amiga",
    titleAccent: "Incondicional",
    body: `Hay personas que llegan a nuestra vida para quedarse.
No solo en las risas, sino también cuando el silencio pesa.

Tu lealtad ha sido ancla, refugio y hogar.
Gracias por estar incluso cuando no supe pedir ayuda.`,
    image:
      "https://qhyhynxpcuovxmnfhndv.supabase.co/storage/v1/object/public/calendar/photos/531563.jpeg",
  },
  {
    chapter: "CAPÍTULO DOS",
    titleMain: "La Mujer",
    titleAccent: "Soñadora",
    body: `Tus ojos no solo ven el mundo como es,
sino como podría llegar a ser.

En cada sueño tuyo hay una semilla de luz
que inspira a todos a mirar más alto.`,
    image:
      "https://qhyhynxpcuovxmnfhndv.supabase.co/storage/v1/object/public/calendar/photos/654987.jpeg",
  },
  {
    chapter: "CAPÍTULO FINAL",
    titleMain: "La Fuerza",
    titleAccent: "de Mamá",
    body: `Tu fortaleza no hace ruido.
Es la constancia silenciosa de quien ama sin medida.

Eres prueba viva de que la ternura
también puede ser invencible.`,
    image:
      "https://qhyhynxpcuovxmnfhndv.supabase.co/storage/v1/object/public/calendar/photos/3215.jpeg",
  },
]

export default function Day13({ onClose }: Day13Props) {
  const [index, setIndex] = useState(0)
  const [isClosing, setIsClosing] = useState(false)

  const page = PAGES[index]

  function next() {
    if (index < PAGES.length - 1) setIndex((i) => i + 1)
  }

  function prev() {
    if (index > 0) setIndex((i) => i - 1)
  }

  function handleClose() {
    setIsClosing(true)
    setTimeout(() => {
      onClose?.()
    }, 500)
  }

  return (
    <AnimatePresence>
      {!isClosing && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white px-4 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="relative w-full max-w-5xl"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            {/* INDICADOR */}
            <div className="mb-6 flex justify-center gap-2">
              {PAGES.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 w-8 rounded-full transition ${
                    i === index ? "bg-pink-500" : "bg-pink-200"
                  }`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
                className="
                  grid grid-cols-1
                  overflow-hidden rounded-3xl bg-white shadow-xl
                  md:grid-cols-2
                  md:max-h-[520px]
                "
              >
                {/* IMAGEN */}
                <div className="relative h-64 md:aspect-[4/5] md:h-auto">
                  <motion.img
                    key={page.image}
                    src={page.image}
                    alt=""
                    className="h-full w-full object-cover"
                    initial={{ scale: 1.08, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{
                      objectPosition: index === 0 ? "center 20%" : "center",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* TEXTO */}
                <div className="flex flex-col px-8 py-10 text-center md:text-left md:overflow-y-auto md:max-h-[520px]">
                  <span className="mb-2 text-xs tracking-widest text-pink-500">
                    {page.chapter}
                  </span>

                  <h2 className="text-3xl font-semibold text-gray-900 md:text-4xl">
                    {page.titleMain}{" "}
                    <span className="text-pink-500 italic">
                      {page.titleAccent}
                    </span>
                  </h2>

                  <p className="mt-6 whitespace-pre-line text-gray-600">
                    {page.body}
                  </p>

                  {/* CTA */}
                  <div className="mt-8 flex items-center justify-center gap-4 md:justify-start">
                    {index > 0 && (
                      <button
                        onClick={prev}
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800"
                      >
                        <ArrowLeft size={16} /> Anterior
                      </button>
                    )}

                    {index < PAGES.length - 1 ? (
                      <button
                        onClick={next}
                        className="flex items-center gap-2 rounded-full bg-pink-500 px-6 py-3 text-sm font-medium text-white shadow hover:bg-pink-600"
                      >
                        Siguiente versión <ArrowRight size={16} />
                      </button>
                    ) : (
                      <motion.button
                        onClick={handleClose}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{ scale: [1, 1.04, 1] }}
                        transition={{ repeat: Infinity, duration: 1.8 }}
                        className="flex items-center gap-2 rounded-full bg-pink-600 px-7 py-3 text-sm font-medium text-white shadow-lg"
                      >
                        <Heart size={16} /> Gracias por existir
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* FOOTER */}
            <div className="mt-6 text-center text-xs text-gray-400">
              Hecho con amor para alguien excepcional{" "}
              <Sparkles className="inline h-3 w-3 text-pink-400" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
