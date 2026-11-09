"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
}

/** Interactive 3D tilt card with pointer-tracked glare highlight */
export function TiltCard({
  children,
  className,
  maxTilt = 10,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [maxTilt, -maxTilt]), {
    stiffness: 180,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-maxTilt, maxTilt]), {
    stiffness: 180,
    damping: 22,
  });

  const glareX = useTransform(x, (v) => `${v * 100}%`);
  const glareY = useTransform(y, (v) => `${v * 100}%`);
  const glareOpacity = useTransform(
    [x, y],
    ([lx, ly]: number[]) =>
      Math.abs(lx - 0.5) < 0.06 && Math.abs(ly - 0.5) < 0.06 ? 0 : 1
  );

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  const glareStyle = {
    opacity: glareOpacity,
    "--glare-x": glareX,
    "--glare-y": glareY,
  } as unknown as MotionStyle;

  return (
    <div className="perspective-1200">
      <motion.div
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.02 }}
        transition={{ scale: { duration: 0.25 } }}
        className={cn("relative will-change-transform", className)}
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden
            className="tilt-glare pointer-events-none absolute inset-0 rounded-[inherit]"
            style={glareStyle}
          />
        )}
      </motion.div>
    </div>
  );
}
