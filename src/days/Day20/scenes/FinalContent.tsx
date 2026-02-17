import { motion } from "framer-motion";

export default function FinalContent() {
  return (
    <motion.div
      className="final-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1>Feliz Cumpleaños ✨</h1>
      <p>
        Hoy no celebramos solo un número.
        Celebramos todo lo que eres.
      </p>
    </motion.div>
  );
}
