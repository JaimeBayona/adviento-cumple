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
          className="
            fixed inset-0 z-60
            flex items-center justify-center
            bg-black/50 backdrop-blur-sm
            px-4
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 28, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 28, opacity: 0, scale: 0.97 }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
            className="
              w-full
              max-w-sm
              rounded-3xl
              bg-white
              px-6 py-7 sm:px-8 sm:py-8
              shadow-[0_20px_50px_rgba(0,0,0,0.25)]
            "
          >
            {/* CONTENIDO LIBRE DESDE HOME */}
            <div className="text-center text-sm sm:text-base text-black/80 leading-relaxed">
              {children}
            </div>

            {/* BOTÓN */}
            <button
              onClick={onClose}
              className="
                mt-7
                w-full
                rounded-xl
                bg-black
                py-3
                text-white
                font-semibold
                transition
                hover:bg-black/90
                active:scale-[0.98]
              "
            >
              Entendido
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
