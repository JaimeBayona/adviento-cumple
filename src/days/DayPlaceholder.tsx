import { motion } from "framer-motion"

export default function DayPlaceholder({
  day,
  onClose,
}: {
  day: number
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
    >
      <div className="bg-[#F5F1EC] rounded-3xl p-10 max-w-md text-center">
        <h2 className="text-2xl font-black mb-4">
          Día {day}
        </h2>

        <p className="text-black/60 mb-8">
          Este contenido aún se está preparando ✨
        </p>

        <button
          onClick={onClose}
          className="px-6 py-3 rounded-xl bg-black text-white font-semibold"
        >
          Cerrar
        </button>
      </div>
    </motion.div>
  )
}
