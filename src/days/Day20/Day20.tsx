import { useState, lazy, Suspense, useEffect } from "react";
import { createPortal } from "react-dom";
import "./day20.css";

type Phase = "lock" | "number";

const LockScreen = lazy(() => import("./scenes/LockScreen"));
const NumberReveal = lazy(() => import("./scenes/NumberReveal"));

export default function Day20() {
  const [phase, setPhase] = useState<Phase>("lock");

  // 🔒 Bloquea scroll mientras Day20 está activo
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const renderScene = () => {
    switch (phase) {
      case "lock":
        return <LockScreen onComplete={() => setPhase("number")} />;
      case "number":
        return <NumberReveal />;
      default:
        return null;
    }
  };

  return createPortal(
    <div className="day20-overlay">
      <Suspense fallback={null}>
        {renderScene()}
      </Suspense>
    </div>,
    document.body
  );
}
