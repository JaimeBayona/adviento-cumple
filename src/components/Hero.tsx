import { motion, useReducedMotion } from "framer-motion"

export default function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.header
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="
    relative
    h-[100svh]
    overflow-hidden
    flex
    items-center
    pt-20 sm:pt-0
    pb-24 sm:pb-0
  "
>
  {/* Equilibrio visual */}
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/[0.025]" />

  {/* Número fantasma */}
  <div
    className="
      pointer-events-none
      absolute
      top-16 sm:top-4
      left-0
      text-[120px] sm:text-[200px] md:text-[280px]
      font-black
      text-black/[0.03]
      leading-none
      select-none
    "
  >
    20
  </div>

  {/* Contenido */}
  <div className="relative z-10 px-6 max-w-5xl">
    <p className="text-primary text-[9px] sm:text-[10px] font-black uppercase tracking-[0.55em] mb-6 sm:mb-8">
      MARILYN · MM
    </p>

    <motion.h1
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="
        font-black uppercase leading-[0.95]
        text-[clamp(2rem,7vw,4.5rem)]
        max-w-[95%] sm:max-w-3xl
      "
    >
      Una espera
      <br />
      que también
      <br />
      se celebra
    </motion.h1>

    <p className="mt-5 sm:mt-8 max-w-sm sm:max-w-md text-[13px] sm:text-sm text-black/65 leading-relaxed">
      Veinte días pensados uno a uno.  
      Algunos son suaves, otros intensos,  
      pero todos existen por una razón.
    </p>
  </div>

  {/* Flecha */}
  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-black/40">
    <span className="text-[9px] uppercase tracking-[0.35em]">
      Scrollea
    </span>
    <motion.div
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      className="text-base"
    >
      ↓
    </motion.div>
  </div>
</motion.header>

  )
}
