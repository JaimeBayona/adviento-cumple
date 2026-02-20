import {
  useState,
  lazy,
  Suspense,
  useEffect,
  useRef
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./day20.css";

type Phase =
  | "lock"
  | "number"
  | "celebration"
  | "memories"
  | "letter"
  | "epilogue";

interface Props {
  onClose: () => void;
}

const LockScreen = lazy(() => import("./scenes/LockScreen"));
const NumberReveal = lazy(() => import("./scenes/NumberReveal"));
const BalloonsLayer = lazy(() => import("./scenes/BalloonsLayer"));
const MemoriesCarousel = lazy(() => import("./scenes/MemoriesCarousel"));
const FinalContent = lazy(() => import("./scenes/FinalContent"));
const Epilogue = lazy(() => import("./scenes/Epilogue"));

export default function Day20({ onClose }: Props) {
  const [phase, setPhase] = useState<Phase>("lock");

  // ✅ IMPORTANTE: tipo correcto
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 🔒 Bloquear scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  /* =========================
     🎼 AUDIO CONTROL GLOBAL
  ========================== */

  const startCelebrationMusic = () => {
    if (!audioRef.current) return;

    audioRef.current.src = "/audio/seamless.mp3";
    audioRef.current.loop = false; // necesario para duración real
    audioRef.current.volume = 0.4;

    audioRef.current.play().catch(() => {});
  };

  const fadeOutMusic = (callback?: () => void) => {
    if (!audioRef.current) {
      callback?.();
      return;
    }

    let volume = audioRef.current.volume;

    const fade = setInterval(() => {
      if (volume > 0.05) {
        volume -= 0.05;
        audioRef.current!.volume = volume;
      } else {
        clearInterval(fade);
        audioRef.current!.pause();
        callback?.();
      }
    }, 120);
  };

  /* =========================
     🎬 RENDER ESCENAS
  ========================== */

  const renderScene = () => {
    switch (phase) {
      case "lock":
        return (
          <motion.div
            key="lock"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LockScreen onComplete={() => setPhase("number")} />
          </motion.div>
        );

      case "number":
        return (
          <motion.div
            key="number"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <NumberReveal onComplete={() => setPhase("celebration")} />
          </motion.div>
        );

      case "celebration":
        return (
          <motion.div
            key="celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <BalloonsLayer
              onStartMusic={startCelebrationMusic}
              onComplete={() => setPhase("memories")}
            />
          </motion.div>
        );

      case "memories":
        return (
          <motion.div
            key="memories"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MemoriesCarousel
              audioRef={audioRef} // ✅ ahora coincide el tipo
              onComplete={() =>
                fadeOutMusic(() => setPhase("letter"))
              }
            />
          </motion.div>
        );

      case "letter":
        return (
          <motion.div
            key="letter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FinalContent onClose={() => setPhase("epilogue")} />
          </motion.div>
        );

      case "epilogue":
        return (
          <motion.div
            key="epilogue"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Epilogue onFinish={onClose} />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return createPortal(
    <div className="day20-overlay">
      <audio ref={audioRef} />
      <Suspense fallback={null}>
        <AnimatePresence mode="wait">
          {renderScene()}
        </AnimatePresence>
      </Suspense>
    </div>,
    document.body
  );
}
