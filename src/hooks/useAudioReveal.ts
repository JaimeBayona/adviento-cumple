// reservado para futuras animaciones con audio
import { useEffect, useState, type RefObject } from "react"

export function useAudioReveal(
  audioRef: RefObject<HTMLAudioElement | null>,
  totalImages: number
) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [visibleCount, setVisibleCount] = useState(0)

  function toggle() {
    const audio = audioRef.current
    if (!audio) return

    if (navigator.vibrate) navigator.vibrate(15)

    if (audio.paused) {
      audio.play()
      setIsPlaying(true)
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const update = () => {
      if (!audio.duration) return

      const progress = audio.currentTime / audio.duration
      setVisibleCount(
        Math.min(Math.ceil(progress * totalImages), totalImages)
      )
    }

    audio.addEventListener("timeupdate", update)
    return () => audio.removeEventListener("timeupdate", update)
  }, [totalImages])

  return { isPlaying, visibleCount, toggle }
}
