"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  index,
  title,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-3 md:mb-16",
        align === "center" && "items-center text-center"
      )}
    >
      <motion.span
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="font-mono text-sm tracking-[0.3em] text-primary"
      >
        {"//"} {index}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.08 }}
        className="font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl md:text-5xl"
      >
        {title}
        <span className="text-primary">.</span>
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={cn(
          "h-[3px] w-20 origin-left bg-gradient-to-r from-primary to-transparent",
          align === "center" && "origin-center from-primary via-primary/60"
        )}
      />
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="max-w-2xl text-base text-muted-foreground md:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
