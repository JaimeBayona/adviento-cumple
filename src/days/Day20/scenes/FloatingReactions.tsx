import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const EMOJIS = ["💖", "✨", "🎀", "🫶", "💫", "🎉", "🎊"];

type Reaction = {
  id: number;
  emoji: string;
  x: number;
  drift: number;
};

interface Props {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
}

export default function FloatingReactions({ audioRef }: Props) {
  const [reactions, setReactions] = useState<Reaction[]>([]);

  const lastSpawnRef = useRef<number>(0);
  const nextDelayRef = useRef<number>(1000);
  const animationRef = useRef<number | null>(null);

  const MAX_ON_SCREEN = 6; // ultra seguro para mobile

  useEffect(() => {
    const spawnReaction = () => {
      setReactions((prev) => {
        if (prev.length >= MAX_ON_SCREEN) return prev;

        return [
          ...prev,
          {
            id: Date.now() + Math.random(),
            emoji:
              EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
            x: 10 + Math.random() * 60,
            drift: -30 + Math.random() * 60, // movimiento lateral
          },
        ];
      });
    };

    const loop = () => {
      if (!audioRef.current) {
        animationRef.current = requestAnimationFrame(loop);
        return;
      }

      const now = performance.now();

      if (now - lastSpawnRef.current > nextDelayRef.current) {
        spawnReaction();
        lastSpawnRef.current = now;

        // ritmo orgánico natural
        nextDelayRef.current =
          800 + Math.random() * 1200; // 0.8s – 2s
      }

      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [audioRef]);

  const remove = (id: number) =>
    setReactions((prev) => prev.filter((r) => r.id !== id));

  return (
    <div className="reactions-container">
      {reactions.map((r) => (
        <motion.div
          key={r.id}
          className="reaction"
          initial={{
            y: 0,
            opacity: 0,
            scale: 0.8,
            x: 0,
            rotate: -15 + Math.random() * 30,
          }}
          animate={{
            y: -450,
            opacity: 1,
            scale: 1.1,
            x: r.drift, // movimiento lateral suave
          }}
          transition={{
            duration: 3.8,
            ease: "easeOut",
          }}
          onAnimationComplete={() => remove(r.id)}
          style={{ right: `${r.x}px` }}
        >
          {r.emoji}
        </motion.div>
      ))}
    </div>
  );
}
