import { useEffect } from "react";
import { motion } from "framer-motion";
import Balloons from "./Balloons";
import Sparkles from "./Sparkles";

interface Props {
  onComplete: () => void;
  onStartMusic: () => void;
}

export default function BalloonsLayer({
  onComplete,
  onStartMusic,
}: Props) {
  useEffect(() => {
    onStartMusic();

    const timer = setTimeout(() => {
      onComplete();
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="celebration-container">
      <Balloons />
      <Sparkles />

      <motion.h1
        className="celebration-title"
        initial={{ y: 120, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 2,
          ease: [0.16, 1, 0.3, 1],
          scale: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <span className="font-[Display]">Feliz</span>
        <span className="font-[Display]">Cumpleaños</span>
        <span className="font-[Display]">Marilyn</span>
      </motion.h1>
    </div>
  );
}
