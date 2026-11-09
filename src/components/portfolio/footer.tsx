"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ArrowUp, Github, Mail } from "lucide-react";

const FOOTER_LINKS = [
  { href: "#beranda", label: "Beranda" },
  { href: "#tentang", label: "Tentang" },
  { href: "#keahlian", label: "Keahlian" },
  { href: "#proyek", label: "Proyek" },
  { href: "#pengalaman", label: "Pengalaman" },
  { href: "#kontak", label: "Kontak" },
];

const SOCIALS = [
  { icon: Github, href: "https://github.com/thetroll791-eng", label: "GitHub AD4M: thetroll791-eng" },
  { icon: Mail, href: "mailto:thetroll791@gmail.com", label: "Email AD4M: thetroll791@gmail.com" },
];

export function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <footer className="relative mt-auto border-t border-border bg-[#08080d]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
            <div className="flex flex-col items-center gap-2 md:items-start">
              <a href="#beranda" className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-primary">
                  <Shield className="h-5 w-5" strokeWidth={2.2} />
                </span>
                <span className="font-display text-lg font-bold tracking-wider">
                  AD<span className="text-primary">4</span>M
                </span>
              </a>
              <p className="font-mono text-xs text-muted-foreground">
                Nggak ada sistem yang 100% aman — tapi setidaknya yang kubangun
                nggak gampang dibobol.
              </p>
            </div>

            <nav aria-label="Navigasi footer">
              <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-md border border-border text-muted-foreground transition-all hover:-translate-y-1 hover:border-primary/60 hover:text-primary"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 font-mono text-xs text-muted-foreground md:flex-row">
            <p>© 2026 AD4M — dibikin sendiri dari nol, tanpa template.</p>
            <p>
              Dirakit dengan <span className="text-primary">Next.js</span> +{" "}
              <span className="text-terminal">Three.js</span> — dan sedikit cairan
              laba-laba.
            </p>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.a
            href="#beranda"
            aria-label="Kembali ke atas"
            initial={{ opacity: 0, scale: 0.6, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 14 }}
            className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-primary/50 bg-background/90 text-primary shadow-[0_0_24px_rgba(230,36,41,0.35)] backdrop-blur transition-all hover:bg-primary hover:text-white"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}
