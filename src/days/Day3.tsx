import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, X } from "lucide-react"

const imgPlayer = "https://qhyhynxpcuovxmnfhndv.supabase.co/storage/v1/object/public/calendar/Day3/mlj.jpg"

const lyrics = [
  {
    time: 4.76,
    es: "Buenos días, te vas, nos vemos por la tarde.",
    en: "Good morning, you're leaving I'll see you in the evening",
  },
  {
    time: 12.76,
    es: "Mi mejor amiga, hasta el final. Mi media naranja, sin fingir",
    en: "My best friend, till the end My better half, no pretend",
  },
  {
    time: 18.96,
    es: "Nuestro idioma es sagrado. Gente baja, intenta resolverlo.",
    en: "Our language is sacred Low people, try to solve it",
  },
  {
    time: 26.76,
    es: "Nuevas aventuras en el camino. Tú y yo juntos",
    en: "New adventures on the way You and me together",
  },
  {
    time: 34.76,
    es: "Enfréntate al mundo para siempre. Conozco todos tus secretos.",
    en: "Take on the world forever I know all your secrets",
  },
  {
    time: 41.0,
    es: "Y te prometo que los guardaré. Estaré allí cuando",
    en: "And I promise you I'm gonna keep them I'll be there when you",
  },
  {
    time: 47.64,
    es: "Se sienten desorientados. Tú y yo, oh sí, somos perfectos",
    en: "Are feeling clueless You and me, oh yeah, we're seamless",
  },
  {
    time: 57.96,
    es: "Espera, oh, oh, oh, oh, sí. Espera, oh, oh, oh, oh, oh",
    en: "Whoa, oh, oh, oh, oh, yeah Whoa, oh, oh, oh, oh, oh",
  },
  {
    time: 65.96,
    es: "Somos torpes, pero tenemos mucha suerte de tenerte siempre para atraparme.",
    en: "We're clumsy, but so lucky That I always have you to catch me",
  },
  {
    time: 72.2,
    es: "Somos socios en el crimen. Estás atrapado conmigo toda tu vida.",
    en: "We're partners in crime You're stuck with me your whole life",
  },
  {
    time: 78.44,
    es: "Tan diferente, fuera de nuestras mentes. De un planeta",
    en: "So different, out of our minds From a planet",
  },
  {
    time: 82.92,
    es: "Es difícil de encontrar. Cada segundo, cada día",
    en: "It's hard to find Every second, every day",
  },
  {
    time: 90.36,
    es: "Tú y yo juntos conquistaremos el mundo para siempre.",
    en: "You and me together Take on the world forever",
  },
  {
    time: 96.76,
    es: "Conozco todos tus secretos y te prometo que los guardaré.",
    en: "I know all your secrets And I promise you I'm gonna keep them",
  },
  {
    time: 103.0,
    es: "Estaré ahí cuando te sientas despistado",
    en: "I'll be there when you Are feeling clueless",
  },
  {
    time: 109.16,
    es: "Tú y yo, oh sí, somos perfectos, estás a mi lado",
    en: "You and me, oh yeah, we're seamless You're right by my side",
  },
  {
    time: 116.76,
    es: "Siempre que te necesito. A través de los momentos más difíciles",
    en: "Whenever I need you Through the hardest times",
  },
  {
    time: 123.16,
    es: "Estaré ahí para ti al amanecer cuando la luna se haya ido",
    en: "I'll be there for you at the crack of dawn When the moon is gone",
  },
  {
    time: 127.72,
    es: "No será difícil de encontrar porque tú y yo, oh sí, somos perfectos",
    en: "It won't be hard to find 'Cause you and me, oh yeah, we're seamless",
  },
  {
    time: 138.36,
    es: "Espera, oh, oh, oh, oh, sí. Espera, oh, oh, oh, sí",
    en: "Whoa, oh, oh, oh, oh, yeah Whoa, oh, oh, oh, yeah",
  },
  {
    time: 146.36,
    es: "Tú y yo juntos conquistaremos el mundo para siempre.",
    en: "You and me together Take on the world forever",
  },
  {
    time: 152.84,
    es: "Conozco todos tus secretos y te prometo que los guardaré.",
    en: "I know all your secrets And I promise you I'm gonna keep them",
  },
  {
    time: 159.08,
    es: "Estaré ahí cuando te sientas despistado",
    en: "I'll be there when you are feeling clueless",
  },
  {
    time: 165.36,
    es: "Tú y yo, oh sí, somos perfectos",
    en: "You and me, oh yeah, we're seamless",
  },
]

export default function Day3({ onClose }: { onClose: () => void }) {
  const audioRef = useRef<HTMLAudioElement>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentLine, setCurrentLine] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  /* AUDIO SYNC */
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTimeUpdate = () => {
      if (!isPlaying) return

      const time = audio.currentTime
      setProgress(time)
      setDuration(audio.duration || 0)

      const index = lyrics.findIndex(
        (line, i) =>
          time >= line.time &&
          (i === lyrics.length - 1 || time < lyrics[i + 1].time)
      )
      if (index !== -1) setCurrentLine(index)
    }

    const onEnded = () => {
      setIsPlaying(false)
      setProgress(0)
      setCurrentLine(null)
      audio.currentTime = 0
    }

    audio.addEventListener("timeupdate", onTimeUpdate)
    audio.addEventListener("ended", onEnded)

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate)
      audio.removeEventListener("ended", onEnded)
    }
  }, [isPlaying])

  /* LOCK SCROLL */
  useEffect(() => {
    document.body.style.overflow = "hidden"
    document.body.style.touchAction = "none"

    return () => {
      document.body.style.overflow = ""
      document.body.style.touchAction = ""
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      if (audio.currentTime === audio.duration) {
        audio.currentTime = 0
      }
      audio.play()
      setIsPlaying(true)
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = e.currentTarget
    const rect = bar.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    if (audioRef.current) {
      audioRef.current.currentTime = percent * duration
    }
  }

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00"
    const m = Math.floor(time / 60)
    const s = Math.floor(time % 60)
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <audio ref={audioRef} preload="metadata">
          <source src="/audio/seamless.mp3" type="audio/mpeg" />
        </audio>

        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="
            relative w-full h-full
            md:h-auto md:max-w-3xl
            bg-gradient-to-b from-[#14081f] to-black
            md:rounded-3xl
            text-white
            px-6 py-8 md:p-10
            flex flex-col
          "
        >
          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white"
          >
            <X size={28} />
          </button>

          {/* HEADER */}
          <p className="text-xs tracking-widest text-white/40 mb-4">
            03 - 20
          </p>

          <h2 className="text-2xl md:text-4xl text-center font-light mb-4">
            Inquebrantables
          </h2>

          {/* PLAYER */}
          <div className="bg-[#7f13ec]/10 border border-[#7f13ec]/20 rounded-xl p-5">
            {/* MOBILE */}
            <div className="flex flex-col gap-4 md:hidden">
              <img
                src= {imgPlayer}
                className="w-full h-48 rounded-xl object-cover"
                alt=""
              />

              <p className="text-sm text-white/80 text-center">
                Una amistad que no necesita arreglos.
              </p>

              <div onClick={seek} className="h-2 bg-white/10 rounded-full">
                <div
                  style={{ width: `${(progress / duration) * 100 || 0}%` }}
                  className="h-full bg-[#7f13ec] rounded-full"
                />
              </div>

              <div className="flex justify-between text-xs text-white/40">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>

              <div className="flex justify-center pt-2">
                <button
                  onClick={togglePlay}
                  className="w-14 h-14 rounded-full border border-[#D4AF37] flex items-center justify-center"
                >
                  {isPlaying ? <Pause color="#D4AF37" /> : <Play color="#D4AF37" />}
                </button>
              </div>
            </div>

            {/* DESKTOP */}
            <div className="hidden md:grid grid-cols-[auto_1fr_auto] gap-6 items-center">
              <img
                src={imgPlayer}
                className="w-40 h-40 rounded-xl object-cover"
                alt=""
              />

              <div className="flex flex-col gap-3">
                <p className="text-sm text-white/80">
                  Una amistad que no necesita arreglos.
                </p>

                <div onClick={seek} className="h-2 bg-white/10 rounded-full">
                  <div
                    style={{ width: `${(progress / duration) * 100 || 0}%` }}
                    className="h-full bg-[#7f13ec] rounded-full"
                  />
                </div>

                <div className="flex justify-between gap-4 text-xs text-white/40">
                  <span>{formatTime(progress)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <button
                onClick={togglePlay}
                className="w-14 h-14 rounded-full border border-[#7f13ec] flex items-center justify-center"
              >
                {isPlaying ? <Pause /> : <Play />}
              </button>
            </div>
          </div>

          {/* LYRIC */}
          <div className="mt-10 h-14 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {isPlaying && currentLine !== null && (
                <motion.p
                  key={currentLine}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center text-lg md:text-xl font-light"
                >
                  <p className="text-lg md:text-xl font-light">
                    {lyrics[currentLine].es}
                  </p>
                  <p className="text-sm md:text-base text-white/40 mt-1">
                    {lyrics[currentLine].en}
                  </p>
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
