import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function Footer() {
  const triggerRef = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!triggerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.9,
      }
    )

    observer.observe(triggerRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <footer className="relative w-full overflow-hidden bg-beige px-6 py-20 md:py-32">
      {/* Trigger */}
      <div ref={triggerRef} className="h-px w-full" />

      {visible && (
        <>
          {/* Soft ambient glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-200/25 blur-[120px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="relative mx-auto flex max-w-2xl flex-col items-center text-center"
          >
            {/* Divider */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 160 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mb-12 h-px bg-neutral-400/40"
            />

            {/* Heart */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8 text-pink-500"
            >
              <Heart size={20} strokeWidth={1.5} />
            </motion.div>

            {/* Text */}
            <p className="text-base font-light leading-relaxed tracking-wide text-neutral-700 md:text-lg">
              Este sitio web fue hecho con mucho cariño
            </p>

            <p className="mt-3 text-base font-medium tracking-wide text-neutral-900 md:text-lg">
              por tu mejor amigo
            </p>

            <p className="mt-12 text-xs tracking-wide text-neutral-500 md:text-sm">
              Gracias por estar aquí
            </p>
          </motion.div>
        </>
      )}
    </footer>
  )
}
