// src/days/Day9.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

const TRUTHS = [
  "Tu fuerza aparece incluso cuando dudas de ti misma.",
  "Tienes una forma única de cuidar, incluso cuando no tienes noción de hacerlo.",
  "Tu risa contagia más de lo que imaginas.",
  "Eres hogar, incluso en silencio.",
  "Sigues adelante, aun cuando nadie aplaude.",
];

const FINAL_TEXT =
  "Esto es lo que nadie ve cuando el mundo se queda en silencio. " +
  "Las veces que dudas, las veces que sigues igual, las veces que te sostienes sola. " +
  "No porque seas invencible, sino porque eres real. " +
  "Y aun así… sigues aquí. " +
  "Y yo sí lo veo 💖.";

export default function Day9({ onClose }: { onClose: () => void }) {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [typedText, setTypedText] = useState("");

  // 🔒 Bloquear scroll
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // ✍️ Efecto máquina de escribir en el final
  useEffect(() => {
    if (current !== TRUTHS.length) return;

    let i = 0;
    setTypedText("");

    const interval = setInterval(() => {
      setTypedText(FINAL_TEXT.slice(0, i + 1));
      i++;

      if (i >= FINAL_TEXT.length) {
        clearInterval(interval);
      }
    }, 65); // ← más lento y más elegante

    return () => clearInterval(interval);
  }, [current]);

  const next = () => setCurrent((c) => Math.min(c + 1, TRUTHS.length));
  const prev = () => setCurrent((c) => Math.max(c - 1, 0));

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#f5f1ec]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* ❌ CERRAR */}
      <button
        onClick={onClose}
        className="
          fixed top-4 right-4 sm:top-6 sm:right-6
          z-[60]
          w-10 h-10
          flex items-center justify-center
          rounded-full
          text-black/60 hover:text-black
          hover:bg-black/5
          transition
        "
      >
        <X size={35} />
      </button>

      {/* CONTENIDO */}
      <div className="h-full flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          {!started ? (
            /* INTRO */
            <motion.div
              key="intro"
              className="text-center max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <h1 className="font-serif text-3xl sm:text-5xl text-red-600 mb-6">
                Lo que nadie ve
              </h1>

              <p className="text-black/60 text-sm sm:text-base leading-relaxed mb-10">
                Hay rincones del alma que solo se revelan en el silencio.
                Fragmentos de historias, suspiros guardados y la belleza de lo
                que permanece oculto a simple vista.
              </p>

              <button
                onClick={() => setStarted(true)}
                className="
                  rounded-full
                  border border-red-500
                  px-8 py-3
                  text-sm tracking-widest
                  text-red-600
                  hover:bg-red-50
                  transition
                "
              >
                QUIERO VERLAS
              </button>
            </motion.div>
          ) : (
            /* SLIDER */
            <motion.div
              key="slider"
              className="w-full flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {current < TRUTHS.length ? (
                <>
                  {/* CARD */}
                  <motion.div
                    key={current}
                    className="
                      relative
                      bg-white
                      w-full max-w-sm
                      rounded-2xl
                      shadow-xl
                      px-6 py-10 sm:px-8 sm:py-12
                      text-center
                    "
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-red-500 rounded-t-2xl" />

                    <div className="text-red-500 text-xs tracking-widest mb-6">
                      {String(current + 1).padStart(2, "0")} /{" "}
                      {String(TRUTHS.length).padStart(2, "0")}
                    </div>

                    <p
                      className="
                      font-serif
                      italic
                      text-lg sm:text-xl
                      leading-relaxed
                      text-black
                      mb-10
                    "
                    >
                      “{TRUTHS[current]}”
                    </p>

                    <div className="flex items-center justify-center gap-4 text-[10px] tracking-widest text-black/40">
                      <span className="h-px w-10 bg-black/20" />
                      REVELADO
                      <span className="h-px w-10 bg-black/20" />
                    </div>
                  </motion.div>

                  <p className="mt-8 text-sm italic text-black/50 text-center">
                    Tu silencio es una historia que solo tú puedes contar.
                  </p>

                  <div className="flex items-center justify-between w-full max-w-sm mt-6 px-2">
                    <button
                      onClick={prev}
                      disabled={current === 0}
                      className="text-xs tracking-widest text-black/40 hover:text-black disabled:opacity-20"
                    >
                      ANTERIOR
                    </button>

                    <button
                      onClick={next}
                      className="text-xs tracking-widest text-black/40 hover:text-black"
                    >
                      SIGUIENTE
                    </button>
                  </div>
                </>
              ) : (
                /* FINAL */
                <motion.div
                  key="end"
                  className="text-rigth max-w-sm px-6"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <motion.p
                    className="text-lg sm:text-xl text-black/80 mb-8 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {typedText}
                    {/* cursor */}
                    <span className="inline-block w-[2px] h-5 bg-black/30 ml-1 animate-pulse" />
                  </motion.p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
