import { useEffect } from "react";
import { motion } from "framer-motion";

interface Props {
  onComplete: () => void;
}

export default function IntroPhase({ onComplete }: Props) {

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="intro-phase"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flash" />
      <h1 className="intro-text">26</h1>
    </motion.div>
  );
}
