import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "./day20.css";

export default function Day20() {
  const [unlocked, setUnlocked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [holding, setHolding] = useState(false);

  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const duration = 1500;

  // Para el grain dinámico optimizado con rAF
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const animationFrame = useRef<number | null>(null);

  const updateMousePos = (e: MouseEvent) => {
    if (animationFrame.current) return;
    animationFrame.current = requestAnimationFrame(() => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
      animationFrame.current = null;
    });
  };

  const startHold = () => {
    if (unlocked) return;
    setHolding(true);
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const percent = Math.min((elapsed / duration) * 100, 100);

      setProgress(percent);

      if (percent < 100) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setUnlocked(true);
        setHolding(false);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
  };

  const cancelHold = () => {
    if (!unlocked && frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      setProgress(0);
      setHolding(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePos);
    return () => {
      window.removeEventListener("mousemove", updateMousePos);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  return (
    <div className="day16-overlay">
      {/* GEOMETRÍA CENTRAL */}
      <svg
        className="hud"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid meet"
      >
        <circle cx="500" cy="500" r="300" />
        <circle cx="500" cy="500" r="400" />
        <circle cx="500" cy="500" r="500" />
        <circle cx="500" cy="500" r="510" />
        <circle cx="500" cy="500" r="600" />

        <rect x="250" y="250" width="500" height="500" />
        <rect x="250" y="250" width="500" height="500" transform="rotate(45 500 500)" />
        <rect x="250" y="250" width="500" height="500" transform="rotate(70 500 500)" />
        <rect x="250" y="250" width="500" height="500" transform="rotate(20 500 500)" />
      </svg>

      {/* GRAIN dinámico */}
      <div
        className="grain"
        style={{
          transform: `translate(${mousePos.x * 30 - 15}px, ${mousePos.y * 30 - 15}px)`,
        }}
      />

      {/* SCANLINES */}
      <div className="scanlines" />

      {!unlocked ? (
        <motion.div
          className="card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div
            className={`frame ${holding ? "holding" : ""}`}
            style={{ "--progress": `${progress}%` } as React.CSSProperties}
          >
            <p className="glitch text-left font-[Oswald] mb-1.5" data-text="FEB">
              FEB
            </p>
            <p className="glitch text-left font-[Oswald]" data-text="2026">
              2000
            </p>

            <div className="glitch line" />
          </div>

          <div
            className={`hold-text ${holding ? "active" : ""}`}
            onPointerDown={startHold}
            onPointerUp={cancelHold}
            onPointerLeave={cancelHold}
          >
            CLICK & HOLD
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="glitch" data-text="Unlocked">
            Unlocked
          </h2>
          <p>
            Hoy quiero recordarte que incluso en los días más oscuros,
            sigues siendo luz ✨
          </p>
        </motion.div>
      )}
    </div>
  );
}
