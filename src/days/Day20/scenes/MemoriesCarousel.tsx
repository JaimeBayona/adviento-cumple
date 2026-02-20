import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingReactions from "./FloatingReactions";

interface Props {
  onComplete: () => void;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
}

const images = import.meta.glob("/public/memories/*.{jpg,jpeg,png}", {
  eager: true,
  as: "url",
});

const imageList = Object.values(images);

export default function MemoriesCarousel({ onComplete, audioRef }: Props) {
  const [index, setIndex] = useState(0);
  const [photoDuration, setPhotoDuration] = useState(5);
  const FADE_TIME = 5;

  useEffect(() => {
    if (!audioRef.current) return;

    const handleLoaded = () => {
      const duration = audioRef.current!.duration;
      const usableTime = duration - FADE_TIME;

      if (!duration || isNaN(duration)) return;

      const dynamicDuration = usableTime / imageList.length;
      setPhotoDuration(dynamicDuration);
    };

    audioRef.current.addEventListener("loadedmetadata", handleLoaded);

    return () =>
      audioRef.current?.removeEventListener(
        "loadedmetadata",
        handleLoaded
      );
  }, [audioRef]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!audioRef.current) return;

      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;

      if (!duration || isNaN(duration)) return;

      const usableTime = duration - FADE_TIME;

      if (current >= usableTime) {
        onComplete();
        return;
      }

      const newIndex = Math.floor(current / photoDuration);
      setIndex(newIndex % imageList.length);
    }, 300);

    return () => clearInterval(interval);
  }, [audioRef, photoDuration, onComplete]);

  return (
    <div className="memories-container">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={imageList[index]}
          className="memory-image"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.05 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        />
      </AnimatePresence>

      <FloatingReactions audioRef={audioRef} />
    </div>
  );
}
