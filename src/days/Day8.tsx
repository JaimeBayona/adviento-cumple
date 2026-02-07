import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, X } from "lucide-react";

type Day8Props = {
  onClose: () => void;
  isPublic?: boolean;
};

export default function Day8({ onClose, isPublic = false }: Day8Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  /* ================================
     📸 Imágenes según modo
  ================================= */
  const IMAGES = isPublic ? PUBLIC_IMAGES : PRIVATE_IMAGES;

  /* ================================
     📱 Viewport real (mobile fix)
  ================================= */
  useEffect(() => {
    const setVH = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`,
      );
    };
    setVH();
    window.addEventListener("resize", setVH);
    return () => window.removeEventListener("resize", setVH);
  }, []);

  /* ================================
     🔒 Bloquear scroll global
  ================================= */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  /* ================================
     🎧 Play / Pause
  ================================= */
  function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    if (navigator.vibrate) navigator.vibrate(15);

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {});
      setIsPlaying(true);
      setUnlocked(true);
    }
  }

  /* ================================
     🎶 Índice activo (optimizado)
  ================================= */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      if (!audio.duration) return;

      const nextIndex = Math.floor(
        (audio.currentTime / audio.duration) * IMAGES.length,
      );

      setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex));
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    return () => audio.removeEventListener("timeupdate", onTimeUpdate);
  }, [IMAGES.length]);

  /* ================================
     🌅 Fade out al cerrar
  ================================= */
  function fadeOutAndClose() {
    const audio = audioRef.current;
    if (!audio) return onClose();

    const fade = setInterval(() => {
      if (audio.volume <= 0.05) {
        audio.pause();
        audio.volume = 1;
        clearInterval(fade);
        onClose();
      } else {
        audio.volume -= 0.05;
      }
    }, 50);
  }

  return (
    <motion.div
      role="dialog"
      className="fixed inset-0 z-50 bg-[#211119] text-[#f5f1ec]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* AUDIO */}
      <audio
        ref={audioRef}
        preload="metadata"
        src="https://qhyhynxpcuovxmnfhndv.supabase.co/storage/v1/object/public/calendar/audios/memories.m4a"
      />

      {/* CERRAR */}
      <button
        aria-label="Cerrar"
        onClick={fadeOutAndClose}
        className="absolute top-6 right-6 z-50 text-white/60 hover:text-white transition"
      >
        <X size={28} />
      </button>

      <AnimatePresence mode="wait">
        {/* 🔒 BLOQUEADO */}
        {!unlocked && (
          <motion.section
            key="locked"
            className="h-[calc(var(--vh)*100)] flex flex-col items-center justify-center text-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-serif mb-6"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
            >
              Día 8
            </motion.h2>

            <p className="text-white/70 mb-10 max-w-sm leading-relaxed">
              Hay recuerdos que solo despiertan cuando suena la canción
              correcta.
            </p>

            <motion.button
              onClick={toggleMusic}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 rounded-full bg-[#e8308c] px-8 py-4 text-white font-medium shadow-lg shadow-[#e8308c]/30"
            >
              <Play />
              Reproducir canción
            </motion.button>
          </motion.section>
        )}

        {/* 🔓 DESBLOQUEADO */}
        {unlocked && (
          <motion.section
            key="unlocked"
            className="h-[calc(var(--vh)*100)] flex flex-col px-6 pt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* CONTROL MÚSICA */}
            <button
              onClick={toggleMusic}
              className="mx-auto mb-6 flex items-center gap-3 rounded-full bg-white/10 backdrop-blur px-6 py-3 text-sm text-white/80 hover:bg-white/20 transition"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              {isPlaying ? "Deja que el recuerdo siga…" : "Vuelve a escuchar"}
            </button>

            <motion.h3
              className="text-2xl md:text-3xl font-serif mb-6 text-center"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
            >
              {isPublic
                ? "Momentos que se pueden compartir ✨"
                : "Fotos que no deberían existir… pero existen 😅"}
            </motion.h3>

            {/* GALERÍA */}
            <div className="flex-1 overflow-y-auto pb-6 scrollbar-thin">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
                {IMAGES.map((src, i) => {
                  const active = i <= activeIndex;

                  return (
                    <motion.div
                      key={i}
                      className="relative overflow-hidden rounded-2xl bg-black aspect-[3/4] md:aspect-[4/5]"
                      initial={false}
                      animate={{ opacity: active ? 1 : 0.45 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      <img
                        src={src}
                        alt="recuerdo"
                        loading="lazy"
                        decoding="async"
                        className={`w-full h-full object-contain bg-black transition-all duration-500 ${
                          active ? "blur-0" : "blur-lg scale-[1.02]"
                        }`}
                      />

                      {!active && (
                        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm pointer-events-none" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {!isPublic && (
              <motion.p
                className="mt-6 mb-6 text-sm text-white/60 text-center max-w-md mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Porque incluso los momentos más inesperados también forman parte
                de lo que te hace única 💖
              </motion.p>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ================================
   🖼️ IMÁGENES
================================ */

const PUBLIC_IMAGES = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1499084732479-de2c02d45fc4",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
];

const PRIVATE_IMAGES = [
  "https://qhyhynxpcuovxmnfhndv.supabase.co/storage/v1/object/public/calendar/MEL/Hks_skl.jpg",
  "https://qhyhynxpcuovxmnfhndv.supabase.co/storage/v1/object/public/calendar/Day8/20200209_150758.jpg",
  "https://qhyhynxpcuovxmnfhndv.supabase.co/storage/v1/object/public/calendar/Day8/IMG_20200918_163502.jpg",
  "https://qhyhynxpcuovxmnfhndv.supabase.co/storage/v1/object/public/calendar/Day8/IMG_20201103_184026_944.jpg",
  "https://qhyhynxpcuovxmnfhndv.supabase.co/storage/v1/object/public/calendar/Day8/IMG_20201103_191208_546.jpg",
  "https://qhyhynxpcuovxmnfhndv.supabase.co/storage/v1/object/public/calendar/Day8/IMG_20201106_160204_126.jpg",
];
