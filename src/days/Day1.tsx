import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { X } from "lucide-react"

export default function Day1({ onClose }: { onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Bloquear scroll del body mientras el modal está abierto
  useEffect(() => {
    document.body.style.overflow = "hidden"
    document.body.style.touchAction = "none"
    return () => {
      document.body.style.overflow = ""
      document.body.style.touchAction = ""
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full h-[100dvh] md:h-[90vh] md:max-w-5xl rounded-none md:rounded-2xl overflow-hidden shadow-2xl bg-white"
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 text-gray-600 hover:text-black"
        >
          <X size={28} />
        </button>

        {/* CONTENT */}
        <div
          ref={containerRef}
          className="relative z-10 h-full overflow-y-auto"
        >
          <div className="flex flex-col md:flex-row h-full">
            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full md:w-1/2 bg-[#f3e8ff]"
            >
              <img
                src="https://qhyhynxpcuovxmnfhndv.supabase.co/storage/v1/object/public/calendar/Day1/ml_01.jpg"
                alt="Día 1"
                className="w-full h-auto md:h-full object-contain md:object-cover"
              />
            </motion.div>

            {/* TEXT CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
              className="w-full md:w-1/2 flex flex-col"
            >
              {/* HEADER */}
              <div className="bg-[#E9D5FF] px-8 py-6">
                <p className="text-xs tracking-widest uppercase text-[#8C4CE6]/60">
                  01 / 20 — El comienzo
                </p>
                <h2 className="text-[#8C4CE6] text-4xl font-bold mt-1">
                  Marilyn
                </h2>
                <p className="text-[#8C4CE6]/70 text-sm uppercase tracking-widest">
                  Febrero 1, 2026
                </p>
              </div>

              {/* BODY */}
              <div className="flex-1 px-8 py-6 font-[PlayfairDisplay] italic md:text-2xl overflow-y-auto text-gray-700 space-y-5">
                <p>
                  Bienvenida al primer día de este calendario.  
                  Hoy comienza una pequeña cuenta regresiva hecha con cariño,
                  recuerdos y detalles pensados solo para ti.
                </p>

                <p>
                  Gracias por estar aquí desde el inicio ✨
                </p>

                <p className="text-right text-sm text-gray-500">
                  Con mucho amor 💛
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}