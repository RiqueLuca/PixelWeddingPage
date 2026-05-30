"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** direction the element rises/slides from */
  from?: "up" | "down" | "left" | "right" | "scale";
};

const offsets = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: 60, y: 0 },
  right: { x: -60, y: 0 },
  scale: { x: 0, y: 0 },
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  from = "up",
}: Props) {
  const reduce = useReducedMotion();
  const o = offsets[from];

  return (
    <motion.div
      className={className}
      initial={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, x: o.x, y: o.y, scale: from === "scale" ? 0.85 : 1 }
      }
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
