"use client";
import { motion, useScroll, useSpring } from "motion/react";

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });
  return <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent" style={{ scaleX: x }} />;
}
