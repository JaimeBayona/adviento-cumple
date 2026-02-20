import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onComplete?: () => void;
}

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
};

export default function NumberReveal({ onComplete }: Props) {
  const [number, setNumber] = useState<25 | 26>(25);
  const [impact, setImpact] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const explosionParticles = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationFrame: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      explosionParticles.current.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.life / 60})`;
        ctx.fill();

        if (p.life <= 0) {
          explosionParticles.current.splice(i, 1);
        }
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const triggerExplosion = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const count = window.innerWidth < 768 ? 60 : 120;

    explosionParticles.current = Array.from({ length: count }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;

      return {
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 60,
      };
    });
  };

  useEffect(() => {
    const t1 = setTimeout(() => {
      setNumber(26);
      setImpact(true);
      triggerExplosion();
    }, 2500);

    const t2 = setTimeout(() => onComplete?.(), 5500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <div className="number-container">
      <canvas ref={canvasRef} className="particles" />

      <AnimatePresence mode="wait">
        <motion.h1
          key={number}
          className="number-text final-aura"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: impact ? 1.2 : 1 }}
          transition={{ duration: 1 }}
        >
          {number}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}
