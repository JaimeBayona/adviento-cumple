import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"

const items = [
  {
    img: "https://qhyhynxpcuovxmnfhndv.supabase.co/storage/v1/object/public/calendar/Day2/496130654_4184144041813487_962940106299540743_n.jpg",
    data: "18 de noviembre de 2014",
    text: "A veces la luz aparece cuando menos la buscas.",
  },
  {
    img: "https://qhyhynxpcuovxmnfhndv.supabase.co/storage/v1/object/public/calendar/Day2/497489797_4184538898440668_705090645828449679_n.jpg",
    data: "5 de diciembre 2014",
    text: "Eres Feoo y Negritoo peroo asi te quieroo tu sabes que te molesto para que no estes tristee y como hermanos estaremos apoyandonos en las buenas y en las malas! Te Quieroo!! Mucho!! Feoo!! :3",
  },
  {
    img: "https://qhyhynxpcuovxmnfhndv.supabase.co/storage/v1/object/public/calendar/Day2/503604589_4207186219509269_3093058921259769037_n.jpg",
    data: "18 de julio 2016",
    text: `A pesar de que tenias las esperanzas en los suelos!!
          Mi salón siguió alentandonos!! ❤
          Y por ellos es que Ganamoooos!! ❤ #NuestroTriCampeonato ❤
          Dejamos todo absolutamente todo en la cancha!!! ❤ 😉 Gracias por siempre creer en nosotras!
          #LasAmoooooMisAmores!!! ❤
          #SomosUnaGranFamilia
          #TriCampeonas ❤ ❤`,
  },
]

export default function Day2({ onClose }: { onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    document.body.style.touchAction = "none"
    return () => {
      document.body.style.overflow = ""
      document.body.style.touchAction = ""
    }
  }, [])

  const toggleMobile = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full h-[100dvh] md:h-[90vh] md:max-w-5xl rounded-none md:rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 text-white/70 hover:text-white"
        >
          <X size={28} />
        </button>

        {/* BACKGROUND */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a237e_0%,_#101622_100%)]" />

        {/* CONTENT */}
        <div
          ref={containerRef}
          className="relative z-10 h-full overflow-y-auto px-8 md:px-20 py-20 md:scrollbar-custom"
        >
          {/* TITLE */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center font-serif italic text-white/80 text-2xl md:text-4xl mb-20"
          >
            Luz en la penumbra
          </motion.h2>

          {/* GRID DE ITEMS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {items.map((item, index) => {
              const isOpen = openIndex === index
              return (
                <div key={index} className="group">
                  {/* IMAGE */}
                  <div
                    onClick={() => toggleMobile(index)}
                    className="cursor-pointer overflow-hidden rounded-xl"
                  >
                    <img
                      src={item.img}
                      alt=""
                      className={`w-full h-56 object-cover transition-all duration-300
                        ${
                          isOpen
                            ? "brightness-100"
                            : "brightness-[0.03] group-hover:brightness-100"
                        }`}
                    />
                  </div>

                  {/* TOOLTIP / TEXTO */}
                  <div className="mt-3">
                    {/* DESKTOP (hover) */}
                    <div
                      className="hidden md:block opacity-0 translate-y-[-8px] transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0"
                    >
                      <div className="bg-white/5 text-left border border-white/10 rounded-xl p-4 text-sm text-white/80">
                        <p className="py-3">{item.data}</p>
                        {item.text}
                      </div>
                    </div>

                    {/* MOBILE (tap) */}
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className="md:hidden bg-white/5 border text-left border-white/10 rounded-xl p-4 text-sm text-white/80"
                      >
                        <p className="py-3">{item.data}</p>
                        {item.text}
                      </motion.div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* FOOT */}
          <div className="mt-20 text-center text-white/40 text-xs tracking-widest">
            DÍA 02 · LUZ EN LA PENUMBRA
          </div>
        </div>
      </motion.div>
    </div>
  )
}