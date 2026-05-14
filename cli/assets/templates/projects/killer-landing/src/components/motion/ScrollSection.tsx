"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerChildren } from "./variants";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function ScrollSection({ children, className = "", id }: Props) {
  const reduced = useReducedMotion();
  return (
    <motion.section
      id={id}
      className={className}
      initial={reduced ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerChildren}
    >
      {children}
    </motion.section>
  );
}

export function ScrollItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
