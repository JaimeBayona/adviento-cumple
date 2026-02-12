import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { Headphones } from "lucide-react";

type Day15Props = {
  onClose: () => void;
};

export default function Day15({ onClose }: Day15Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const longPressRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [showIntro, setShowIntro] = useState(true);
  const [pulse, setPulse] = useState(false);
  const [glow, setGlow] = useState(2);
  const [messageIndex, setMessageIndex] = useState(0);
  const [easterEgg, setEasterEgg] = useState(false);

  const messages = [
    "Listen to the heartbeat",
    "Each touch has a rhythm",
    "Not just a sound",
    "It’s presence",
    "Stay with it",
  ];

  useEffect(() => {
    const audio = new Audio("/audio/heartbeat.mp3");
    audio.preload = "auto";
    audio.volume = 0.9;
    audioRef.current = audio;

    const timer = setTimeout(() => setShowIntro(false), 2600);

    return () => {
      clearTimeout(timer);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  function playHeartbeat() {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    audio.play().catch(() => {});

    setPulse(true);
    setTimeout(() => setPulse(false), 220);
  }

  function handleClick() {
    playHeartbeat();
    setGlow((g) => Math.min(g + 2, 28));
    setMessageIndex((i) => (i + 1) % messages.length);
  }

  function startLongPress() {
    longPressRef.current = setTimeout(() => {
      setEasterEgg(true);
    }, 1500);
  }

  function stopLongPress() {
    if (longPressRef.current) {
      clearTimeout(longPressRef.current);
      longPressRef.current = null;
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      {/* INTRO AUDÍFONOS */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="absolute inset-0 z-30 flex items-center justify-center bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center gap-6"
            >
              {/* CÍRCULO CON PUNTOS */}
              <div className="relative flex items-center justify-center">
                <motion.div className="absolute w-24 h-24 md:w-28 md:h-28 rounded-full" />

                {[...Array(12)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-white/60"
                    style={{
                      transform: `rotate(${i * 30}deg) translateY(-38px)`,
                    }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}

                <Headphones
                  size={30}
                  strokeWidth={2}
                  className="text-white/80"
                />
              </div>

              <p className="text-[10px] text-center mt-10 md:text-xs tracking-[0.35em] uppercase text-white/60">
                Use headphones for the best experience
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EXPERIENCIA */}
      {!showIntro && (
        <>
          <motion.div
            className="absolute inset-0"
            animate={{
              background: pulse
                ? "radial-gradient(circle at center, #5c0a1a 0%, #000 70%)"
                : "radial-gradient(circle at center, #120000 0%, #000 70%)",
            }}
            transition={{ duration: 0.25 }}
          />

          <div className="relative z-10 flex h-full flex-col items-center justify-center gap-8 px-6 text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={messageIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-white/90 text-base md:text-xl font-light max-w-md"
              >
                {messages[messageIndex]}
              </motion.p>
            </AnimatePresence>

            <motion.div
              onClick={handleClick}
              onMouseDown={startLongPress}
              onMouseUp={stopLongPress}
              onMouseLeave={stopLongPress}
              onTouchStart={startLongPress}
              onTouchEnd={stopLongPress}
              animate={{ scale: pulse ? 1.18 : 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 14 }}
              style={{
                filter: `drop-shadow(0 0 ${glow}px rgba(255,70,90,0.9))`,
              }}
              className="text-6xl md:text-8xl cursor-pointer select-none"
            >
              ❤️
            </motion.div>

            <button
              onClick={onClose}
              className="text-white/40 hover:text-white text-xs"
            >
              Close
            </button>
          </div>

          {/* EASTER EGG */}
          <AnimatePresence>
            {easterEgg && (
              <motion.div
                className="absolute inset-0 bg-black/90 flex items-center justify-center z-20 px-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setEasterEgg(false)}
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="text-white text-lg md:text-3xl font-light text-center"
                >
                  💌
                  <br />
                  This heartbeat
                  <br />
                  exists for you
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>,
    document.body,
  );
}
