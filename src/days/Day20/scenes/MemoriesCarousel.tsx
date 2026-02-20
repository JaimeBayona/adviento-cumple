import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import FloatingReactions from "./FloatingReactions"


interface Props {
  audioRef: React.RefObject<HTMLAudioElement | null>
  onComplete?: () => void
}

const TOTAL_AUDIO_SECONDS = 186
const FADE_SECONDS = 5
const USABLE_TIME = TOTAL_AUDIO_SECONDS - FADE_SECONDS

export default function MemoriesCarousel({ audioRef, onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [transitionType, setTransitionType] = useState(0)

  const photos = useMemo(() => {
    const context = import.meta.glob("/public/memories/*.{jpg,jpeg,png,webp}", {
      eager: true,
      as: "url",
    })

    return Object.values(context)
  }, [])

  const totalPhotos = photos.length

  // Duración real por foto
  const secondsPerPhoto = USABLE_TIME / totalPhotos
  const intervalMs = secondsPerPhoto * 1000

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // 🎬 Transiciones diferentes
  const transitions = [
    {
      initial: { opacity: 0, scale: 1.1 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
    },
    {
      initial: { opacity: 0, x: 100 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -100 },
    },
    {
      initial: { opacity: 0, rotate: -2, scale: 1.05 },
      animate: { opacity: 1, rotate: 0, scale: 1 },
      exit: { opacity: 0, rotate: 2, scale: 0.95 },
    },
    {
      initial: { opacity: 0, y: 80 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -80 },
    },
  ]

  // 🎵 Control fade audio
  useEffect(() => {
    if (!audioRef.current) return

    const audio = audioRef.current

    const handleTimeUpdate = () => {
      if (audio.currentTime >= TOTAL_AUDIO_SECONDS - FADE_SECONDS) {
        const remaining =
          TOTAL_AUDIO_SECONDS - audio.currentTime

        const volume = Math.max(remaining / FADE_SECONDS, 0)
        audio.volume = volume
      }
    }

    audio.addEventListener("timeupdate", handleTimeUpdate)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
    }
  }, [audioRef])

  // 🎬 Cambio de fotos
  useEffect(() => {
    if (totalPhotos === 0) return

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev + 1 >= totalPhotos) {
          clearInterval(intervalRef.current!)
          setTimeout(() => onComplete?.(), FADE_SECONDS * 1000)
          return prev
        }

        setTransitionType(Math.floor(Math.random() * transitions.length))
        return prev + 1
      })
    }, intervalMs)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [totalPhotos, intervalMs, transitions.length, onComplete])

  if (!photos.length) return null

  return (
    <div className="memories-container">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={photos[currentIndex]}
          className="memory-image"
          initial={transitions[transitionType].initial}
          animate={transitions[transitionType].animate}
          exit={transitions[transitionType].exit}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </AnimatePresence>

      {/* 🔥 REACCIONES */}
    <FloatingReactions audioRef={audioRef} />
    </div>
  )
}
