import { motion } from "framer-motion";
import { memo } from "react";

const colors = [
  "#f8c8dc",
  "#e0bbff",
  "#bde0fe",
  "#ffd6a5",
];

function Balloons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 18 }).map((_, i) => {
        const left = Math.random() * 100;
        const duration = 10 + Math.random() * 6;
        const delay = Math.random() * 6;
        const size = 45 + Math.random() * 25;
        const color = colors[i % colors.length];

        return (
          <motion.div
            key={i}
            className="absolute bottom-[-120px]"
            style={{ left: `${left}%` }}
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: "-130vh",
              x: [0, 10, -10, 0],
              opacity: 0.95,
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div
              className="relative mx-auto"
              style={{
                width: size * 0.75,
                height: size,
                backgroundColor: color,
                borderRadius: "50% 50% 45% 45%",
                boxShadow: "0 0 25px rgba(255,255,255,0.2)",
              }}
            >
              <div className="absolute top-2 left-3 w-3 h-6 bg-white/30 rounded-full" />
            </div>

            <motion.div
              className="mx-auto mt-1 w-[1px] bg-white/40"
              initial={{ height: 25 }}
              animate={{ height: 40 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

export default memo(Balloons);
