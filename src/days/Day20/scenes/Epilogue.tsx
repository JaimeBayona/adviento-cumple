import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";

interface Props {
  onFinish: () => void;
}

export default function Epilogue({ onFinish }: Props) {

  const messages = [
    `Desde el día 1… hasta el 20.

Gracias por ser mi mejor amiga.
Feliz cumpleaños, Marilyn.`,

    `No fue solo un proyecto.
Fue una forma de decirte gracias.

Gracias por ser mi mejor amiga.
Feliz 26.`,

    `Gracias por existir.
Gracias por seguir aquí.
Gracias por ser mi mejor amiga.

Feliz cumpleaños.`,

    `Hoy el mundo celebra tu cumpleaños…
yo celebro tenerte como mejor amiga.

Desde el día 1 hasta el 20.`,

    `Si volviera a empezar,
te elegiría otra vez como mi mejor amiga.

Feliz cumpleaños, Marilyn.`
  ];

  // 🎲 Elegir una al azar cada vez
  const randomMessage = useMemo(() => {
    return messages[Math.floor(Math.random() * messages.length)];
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="epilogue-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <motion.p
        className="epilogue-text"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 2 }}
        style={{ whiteSpace: "pre-line" }}
      >
        {randomMessage}
      </motion.p>
    </motion.div>
  );
}
