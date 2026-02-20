import { useState, useRef, useEffect } from "react";
import "./LockScreen.css";

interface Props {
  onComplete: () => void;
}

export default function LockScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [holding, setHolding] = useState(false);
  const [visible, setVisible] = useState(false);

  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const duration = 1500;

  useEffect(() => {
    setVisible(true);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const startHold = () => {
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
        setHolding(false);
        onComplete();
      }
    };

    frameRef.current = requestAnimationFrame(animate);
  };

  const cancelHold = () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    setProgress(0);
    setHolding(false);
  };

  return (
    <div className={`lock-container ${visible ? "enter" : ""}`}>
      <svg
        className="hud"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid meet"
      >
        <circle cx="500" cy="500" r="300" />
        <circle cx="500" cy="500" r="400" />
        <circle cx="500" cy="500" r="410" />
        <circle cx="500" cy="500" r="460" />
        <circle cx="500" cy="500" r="500" />
        <circle cx="500" cy="500" r="510" />
        <rect x="250" y="250" width="500" height="500" />
        <rect x="300" y="300" width="400" height="400" />
        <line x1={100} y1={500} x2={900} y2={500} transform="rotate(45 500 500)" />
        <line x1={100} y1={500} x2={900} y2={500} transform="rotate(-45 500 500)" />
      </svg>

      <div
        className={`frame ${holding ? "holding" : ""}`}
        style={{ "--progress": `${progress}%` } as React.CSSProperties}
      >
        <p className="glitch" data-text="FEB">
          FEB
        </p>
        <p className="glitch" data-text="2000">
          2000
        </p>
      </div>

      <div
        className="hold-text"
        onPointerDown={startHold}
        onPointerUp={cancelHold}
        onPointerLeave={cancelHold}
      >
        PRESIONA Y MANTEN
      </div>
    </div>
  );
}
