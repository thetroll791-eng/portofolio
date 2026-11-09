"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Trailing red ring + dot cursor for fine-pointer devices (system cursor stays) */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 24, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 24, mass: 0.6 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    // enable asynchronously (rAF) to avoid a sync setState in the effect body
    const id = requestAnimationFrame(() => setEnabled(true));

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      setHovering(
        !!target?.closest("a, button, [role='button'], input, textarea, [data-cursor]")
      );
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("pointermove", move);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
        style={{ x, y }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/70"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: hovering ? 52 : 34,
          height: hovering ? 52 : 34,
          opacity: hovering ? 0.95 : 0.55,
          backgroundColor: hovering ? "rgba(230,36,41,0.08)" : "rgba(230,36,41,0)",
        }}
        transition={{ duration: 0.18 }}
      />
    </>
  );
}
