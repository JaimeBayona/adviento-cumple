import { motion, AnimatePresence } from "framer-motion"

interface InfoModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function InfoModal({
  isOpen,
  onClose,
  children,
}: InfoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 10, opacity: 0 }}
            className="
              w-full
              max-w-sm
              bg-white
              rounded-2xl
              p-6
              text-center
              shadow-xl
            "
          >
            <p className="text-sm text-black/80">{children}</p>

            <button
              onClick={onClose}
              className="mt-6 w-full rounded-xl bg-black py-2 text-white font-semibold"
            >
              Entendido
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
