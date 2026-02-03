import { motion } from "framer-motion"
import { X } from "lucide-react"

interface DayTemplateProps {
  day: number
  title?: string
  subtitle?: string
  children: React.ReactNode
  onClose: () => void
}

/**
 * DayTemplate
 * -----------------
 * Marco base para TODOS los días.
 * - Mantiene coherencia visual
 * - Permite que cada día sea loco, distinto y creativo por dentro
 * - Maneja animación, fondo y cierre
 */
export default function DayTemplate({
  day,
  title,
  subtitle,
  children,
  onClose,
}: DayTemplateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className="relative w-full max-w-3xl bg-[#F5F1EC] rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* HEADER */}
        <header className="px-8 pt-8 pb-6 border-b border-black/10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs tracking-[0.3em] font-bold text-black/50">
                DÍA {day.toString().padStart(2, "0")}
              </p>
              {title && (
                <h2 className="text-3xl md:text-4xl font-black mt-2">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="mt-2 text-black/60 max-w-xl">
                  {subtitle}
                </p>
              )}
            </div>

            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-black/5 transition"
            >
              <X size={22} />
            </button>
          </div>
        </header>

        {/* CONTENIDO LIBRE */}
        <section className="p-8">{children}</section>
      </motion.div>
    </motion.div>
  )
}
