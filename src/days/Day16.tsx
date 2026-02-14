import { useState, useRef } from "react"
import { motion } from "framer-motion"

export default function Day16() {
  const [unlocked, setUnlocked] = useState(false)
  const [progress, setProgress] = useState(0)
  const [holding, setHolding] = useState(false)

  const intervalRef = useRef<number | null>(null)

  const startHold = () => {
    if (unlocked) return
    setHolding(true)

    let current = 0

    intervalRef.current = window.setInterval(() => {
      current += 2
      setProgress(current)

      if (current >= 100) {
        clearInterval(intervalRef.current!)
        setUnlocked(true)
        setHolding(false)
      }
    }, 30)
  }

  const cancelHold = () => {
    if (!unlocked) {
      clearInterval(intervalRef.current!)
      setProgress(0)
      setHolding(false)
    }
  }

  return (
    <div className="day16-overlay">
      <svg className="hud">
        <circle cx="50%" cy="50%" r="180" />
        <circle cx="50%" cy="50%" r="260" />
        <circle cx="50%" cy="50%" r="340" />

        {/* cuadrados agregados */}
        <rect x="36%" y="14%" width="380" height="380"/>
      </svg>

      {!unlocked ? (
        <motion.div
          className="card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {/* FRAME SOLO VISUAL */}
          <div
            className={`frame ${holding ? "holding" : ""}`}
            style={{ "--progress": `${progress}%` } as React.CSSProperties}
          >
            <p className="glitch" data-text="make me">
              make me
            </p>

            <div className="line" />
          </div>

          {/* BOTÓN REAL */}
          <div
            className={`hold-text ${holding ? "active" : ""}`}
            onMouseDown={startHold}
            onMouseUp={cancelHold}
            onMouseLeave={cancelHold}
            onTouchStart={startHold}
            onTouchEnd={cancelHold}
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

      <style>{`
        .day16-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: radial-gradient(circle at center, #111 0%, #000 80%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          color: white;
          font-family: Arial, sans-serif;
        }

        .hud {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0.04;
        }

        .hud circle,
        .hud rect {
          stroke: white;
          fill: none;
          stroke-width: 1;
        }

        .card {
          text-align: center;
          width: 90%;
          max-width: 220px;
        }

        .frame {
          position: relative;
          padding: 4rem 2rem;
          background: rgba(255,255,255,0.02);
          transition: transform 0.1s ease;
        }

        /* vibración mientras sostiene */
        .holding {
          animation: shake 0.2s infinite;
        }

        @keyframes shake {
          0% { transform: translate(0); }
          25% { transform: translate(-1px, 1px); }
          50% { transform: translate(1px, -1px); }
          75% { transform: translate(-1px, -1px); }
          100% { transform: translate(0); }
        }

        /* PROGRESS EN BORDE */
        .frame::before {
          content: "";
          position: absolute;
          inset: 0;
          padding: 1.5px;
          background: conic-gradient(
            white var(--progress),
            rgba(255,255,255,0.08) var(--progress)
          );
          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        /* BOTÓN ESTÉTICO */
        .hold-text {
          margin-top: 2rem;
          font-size: 0.75rem;
          letter-spacing: 4px;
          opacity: 0.7;
          display: inline-block;
          padding: 0.5rem 0;
          border-bottom: 3px solid #FFFFFF;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .hold-text.active {
          border-color: white;
          background: rgba(255,255,255,0.05);
        }

        /* GLITCH */
        .glitch {
          position: relative;
          font-size: 2.2rem;
          font-weight: 600;
          letter-spacing: 6px;
          text-transform: uppercase;
          animation: flicker 4s infinite;
        }

        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          opacity: 0.8;
        }

        .glitch::before {
          color: #ff00c8;
          z-index: -1;
          animation: glitchTop 3s infinite steps(2, end);
          clip-path: inset(0 0 50% 0);
        }

        .glitch::after {
          color: #00fff9;
          z-index: -2;
          animation: glitchBottom 3s infinite steps(2, end);
          clip-path: inset(50% 0 0 0);
        }

        @keyframes glitchTop {
          0% { transform: translate(0); }
          5% { transform: translate(-6px, -3px); }
          10% { transform: translate(4px, 2px); }
          15% { transform: translate(-2px, 1px); }
          20% { transform: translate(0); }
          100% { transform: translate(0); }
        }

        @keyframes glitchBottom {
          0% { transform: translate(0); }
          5% { transform: translate(6px, 3px); }
          10% { transform: translate(-4px, -2px); }
          15% { transform: translate(2px, -1px); }
          20% { transform: translate(0); }
          100% { transform: translate(0); }
        }

        @keyframes flicker {
          0%, 18%, 22%, 25%, 53%, 57%, 100% { opacity: 1; }
          20%, 24%, 55% { opacity: 0.3; }
        }

        .line {
          margin: 2rem auto;
          width: 60%;
          height: 1px;
          background: white;
          opacity: 0.4;
        }

        .content {
          text-align: center;
          padding: 2rem;
          max-width: 500px;
        }

        .content p {
          margin-top: 1.5rem;
          opacity: 0.7;
          line-height: 1.6;
        }

        @media (max-width: 480px) {
          .glitch {
            font-size: 1.6rem;
          }
        }
      `}</style>
    </div>
  )
}
