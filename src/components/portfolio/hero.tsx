"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Bug,
  Fingerprint,
  Terminal,
} from "lucide-react";
import { TiltCard } from "./tilt-card";

const Scene3D = dynamic(() => import("./scene3d"), { ssr: false });

const ROLES = [
  "Cybersecurity Developer",
  "Penetration Tester",
  "Security Researcher",
  "Bug Bounty Hunter",
];

const SOCIALS = [
  { icon: Github, href: "https://github.com", label: "GitHub AD4M" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn AD4M" },
  { icon: Twitter, href: "https://x.com", label: "X / Twitter AD4M" },
  { icon: Mail, href: "mailto:ad4m@cyberdev.id", label: "Email AD4M" },
];

/* ---------- typewriter ---------- */
function useTypewriter(words: string[], typeMs = 75, deleteMs = 38, pauseMs = 1700) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex % words.length];
    let timer: number;

    if (!deleting && text === word) {
      timer = window.setTimeout(() => setDeleting(true), pauseMs);
    } else if (deleting && text === "") {
      // deferred (async) on purpose: avoid sync setState cascades in the effect body
      timer = window.setTimeout(() => {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }, 60);
    } else {
      timer = window.setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? deleteMs : typeMs
      );
    }
    return () => window.clearTimeout(timer);
  }, [text, deleting, wordIndex, words, typeMs, deleteMs, pauseMs]);

  return text;
}

/* ---------- animated counter ---------- */
function Counter({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsub = mv.on("change", (v) => setDisplay(Math.round(v)));
    return unsub;
  }, [mv]);

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, value, { duration: 1.8, ease: "easeOut" });
      return () => controls.stop();
    }
  }, [inView, mv, value]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1 sm:items-start">
      <span className="font-display text-3xl font-bold text-foreground sm:text-4xl">
        {display}
        <span className="text-primary">{suffix}</span>
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export function Hero() {
  const typed = useTypewriter(ROLES);

  return (
    <section
      id="beranda"
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      {/* 3D background */}
      <Scene3D />
      {/* grid + vignette overlays */}
      <div aria-hidden className="pointer-events-none absolute inset-0 cyber-grid opacity-70" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_35%,#07070b_88%)]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        {/* ===== Left: identity ===== */}
        <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-xs tracking-[0.2em] text-primary"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping-soft rounded-full bg-primary" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            {"//"} HELLO_WORLD — SYSTEM ONLINE
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-display text-6xl font-black uppercase leading-none tracking-wider sm:text-7xl xl:text-8xl"
          >
            <span className="glitch" data-text="AD4M">
              AD<span className="text-primary text-glow-red">4</span>M
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.22 }}
            className="mt-5 flex h-9 items-center font-mono text-lg text-muted-foreground sm:text-xl"
          >
            <span className="mr-2 text-terminal">&gt;</span>
            <span className="text-foreground">
              {typed}
              <span className="animate-caret ml-0.5 inline-block h-5 w-[2px] translate-y-1 bg-primary" />
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.34 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Saya membangun dan meretas sistem untuk membuat internet menjadi tempat
            yang lebih aman. Spesialis di keamanan aplikasi web, jaringan, dan
            pengembangan tools security — dengan ketelitian seekor laba-laba
            menjaga jaringannya.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.46 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4 sm:justify-start"
          >
            <a
              href="#proyek"
              className="group inline-flex h-12 items-center gap-2 rounded-md bg-primary px-7 font-semibold text-white shadow-[0_0_28px_rgba(230,36,41,0.45)] transition-all hover:shadow-[0_0_44px_rgba(230,36,41,0.65)]"
            >
              Lihat Proyek
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#kontak"
              className="inline-flex h-12 items-center gap-2 rounded-md border border-border bg-card/60 px-7 font-semibold text-foreground backdrop-blur transition-all hover:border-primary/60 hover:text-primary"
            >
              <Terminal className="h-4 w-4" />
              Hubungi Saya
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-9 flex items-center gap-3"
          >
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-md border border-border text-muted-foreground transition-all hover:-translate-y-1 hover:border-primary/60 hover:text-primary hover:shadow-[0_8px_24px_rgba(230,36,41,0.25)]"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* ===== Right: Spider-Man photo in 3D comic card ===== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.86, rotateY: -14 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 flex justify-center lg:order-2"
        >
          <div className="perspective-1200 relative">
            {/* rotating dashed rings */}
            <div
              aria-hidden
              className="absolute -inset-10 animate-spin-slow rounded-full border-2 border-dashed border-primary/25 sm:-inset-14"
            />
            <div
              aria-hidden
              className="absolute -inset-5 animate-spin-slower rounded-full border border-primary/15 sm:-inset-8"
            />
            {/* glow blob */}
            <div
              aria-hidden
              className="absolute inset-8 rounded-full bg-primary/25 blur-[70px]"
            />

            <TiltCard maxTilt={14} className="w-[270px] sm:w-[330px]">
              {/* comic-style offset frame */}
              <div className="relative rounded-xl border-[3px] border-primary bg-[#0d0d14] p-2.5 shadow-[10px_10px_0_rgba(230,36,41,0.85)]">
                <div className="halftone absolute inset-2.5 rounded-lg opacity-40" />
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src="/ad4m-spidey.jpg"
                    alt="Potret AD4M — Spider-Man, developer keamanan siber"
                    width={1200}
                    height={1200}
                    priority
                    className="h-auto w-full object-cover"
                    sizes="(max-width: 640px) 270px, 330px"
                  />
                  {/* bottom info bar */}
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/90 to-transparent px-4 pb-3 pt-8">
                    <div>
                      <p className="font-display text-sm font-bold tracking-widest text-white">
                        AD4M
                      </p>
                      <p className="font-mono text-[10px] tracking-wider text-terminal">
                        sec_dev // lvl.99
                      </p>
                    </div>
                    <Bug className="h-5 w-5 text-primary" aria-hidden />
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* floating badges */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-6 top-8 flex items-center gap-2 rounded-lg border border-border bg-card/90 px-3.5 py-2 shadow-xl backdrop-blur sm:-left-12"
            >
              <Fingerprint className="h-4 w-4 text-primary" aria-hidden />
              <span className="font-mono text-xs font-medium text-foreground">
                Ethical Hacker
              </span>
            </motion.div>
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="absolute -right-4 bottom-16 flex items-center gap-2 rounded-lg border border-border bg-card/90 px-3.5 py-2 shadow-xl backdrop-blur sm:-right-10"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping-soft rounded-full bg-terminal" />
                <span className="relative h-2 w-2 rounded-full bg-terminal" />
              </span>
              <span className="font-mono text-xs font-medium text-foreground">
                Open to Work
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ===== Stats bar ===== */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.75 }}
        className="relative z-10 mx-auto mb-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-2 gap-6 rounded-xl border border-border bg-card/60 px-6 py-6 backdrop-blur-md sm:grid-cols-4 sm:gap-4">
          <Counter value={5} suffix="+" label="Tahun Pengalaman" />
          <Counter value={120} suffix="+" label="Kerentanan Ditemukan" />
          <Counter value={40} suffix="+" label="Proyek Selesai" />
          <Counter value={15} suffix="+" label="CTF Dimenangkan" />
        </div>
      </motion.div>

      {/* scroll hint */}
      <motion.a
        href="#tentang"
        aria-label="Gulir ke bagian tentang"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-primary md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">scroll</span>
        <ChevronDown className="h-5 w-5 animate-scroll-hint" />
      </motion.a>
    </section>
  );
}
