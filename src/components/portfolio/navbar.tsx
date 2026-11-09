"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Shield, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#beranda", label: "Beranda" },
  { href: "#tentang", label: "Tentang" },
  { href: "#keahlian", label: "Keahlian" },
  { href: "#proyek", label: "Proyek" },
  { href: "#pengalaman", label: "Pengalaman" },
  { href: "#kontak", label: "Kontak" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("beranda");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy
  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      {/* Scroll progress */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-primary via-[#ff5a5f] to-primary"
        style={{ scaleX: progress }}
      />

      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <a href="#beranda" className="group flex items-center gap-2.5">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-white">
            <Shield className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <span className="font-display text-xl font-bold tracking-wider">
            AD<span className="text-primary">4</span>M
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  "relative rounded-md px-3.5 py-2 text-sm font-medium tracking-wide transition-colors hover:text-primary",
                  active === link.href.slice(1)
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
                {active === link.href.slice(1) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-primary"
                  />
                )}
              </a>
            </li>
          ))}
          <li className="ml-3">
            <a
              href="#kontak"
              className="inline-flex h-10 items-center rounded-md bg-primary px-5 text-sm font-semibold text-white shadow-[0_0_22px_rgba(230,36,41,0.4)] transition-all hover:shadow-[0_0_34px_rgba(230,36,41,0.6)]"
            >
              Hire Me
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-md border border-border text-foreground lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="space-y-1 px-4 py-4">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-[44px] items-center rounded-md px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
                  >
                    <span className="mr-3 font-mono text-xs text-primary">
                      {link.href.slice(1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#kontak"
                  onClick={() => setOpen(false)}
                  className="flex min-h-[44px] items-center justify-center rounded-md bg-primary px-4 text-sm font-semibold text-white"
                >
                  Hire Me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
