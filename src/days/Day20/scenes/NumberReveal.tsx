import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onComplete?: () => void;
}

export default function NumberReveal({ onComplete }: Props) {
  const [number, setNumber] = useState<25 | 26>(25);
  const [glitching, setGlitching] = useState(false);
  const [impact, setImpact] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ✨ Partículas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 40 : 80;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.3 + 0.1,
    }));

    let animationFrame: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < 0) p.y = canvas.height;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.35)";
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // 🎬 Secuencia
  useEffect(() => {
    const timer1 = setTimeout(() => setGlitching(true), 2200);

    const timer2 = setTimeout(() => {
      setNumber(26);
      setGlitching(false);
      setImpact(true);
    }, 2700);

    const timer3 = setTimeout(() => onComplete?.(), 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="number-container">

      <canvas ref={canvasRef} className="particles" />

      {/* 💥 Flash */}
      {impact && <div className="flash-impact" />}

      {/* 🌊 Shockwave */}
      {impact && <div className="shockwave" />}

      <AnimatePresence mode="wait">
        <motion.h1
          key={number}
          className={`number-text 
            ${glitching ? "glitching" : ""} 
            ${number === 26 ? "final-aura" : ""}`}
          initial={{ opacity: 0, scale: 0.6, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.4, filter: "blur(15px)" }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {number}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}
