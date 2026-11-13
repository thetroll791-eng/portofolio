"use client";

import { useEffect, useRef } from "react";

/** Subtle binary/hex digital rain rendered behind the whole page */
export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let raf = 0;
    let columns: number[] = [];
    const fontSize = 14;
    const chars = "01010101ABCDEF#$%&*+-<>/\\=；アカサタナハマヤラワ";

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = new Array(Math.floor(canvas.width / fontSize))
        .fill(0)
        .map(() => Math.floor(Math.random() * -60));
    };
    resize();
    window.addEventListener("resize", resize);

    let last = 0;
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (now - last < 66) return; // ~15fps: enough for rain, easy on CPU
      last = now;

      ctx.fillStyle = "rgba(7, 7, 11, 0.16)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px var(--font-terminal), monospace`;

      for (let i = 0; i < columns.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = columns[i] * fontSize;

        // occasional red glyph (spider accent), mostly dim green
        if (Math.random() > 0.975) {
          ctx.fillStyle = "rgba(230, 36, 41, 0.55)";
        } else {
          ctx.fillStyle = "rgba(58, 255, 140, 0.32)";
        }
        ctx.fillText(ch, x, y);

        if (y > canvas.height && Math.random() > 0.976) columns[i] = 0;
        columns[i]++;
      }
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-[0.10]"
    />
  );
}
