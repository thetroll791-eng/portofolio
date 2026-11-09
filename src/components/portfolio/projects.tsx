"use client";

import { motion } from "framer-motion";
import { Globe, Github, ExternalLink, Check, Wrench } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { TiltCard } from "./tilt-card";

const FEATURES = [
  "10 tema kece + tema kustom — warna, emoji, efek sendiri",
  "Bisa nambahin foto biar makin personal",
  "Dua bahasa: Indonesia & English",
  "Gratis, tanpa ribet daftar akun",
];

const TAGS = ["Web App", "Frontend", "UI & Animasi", "Netlify"];

export function Projects() {
  return (
    <section id="proyek" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="03 // PROYEK"
          title="Proyek Pilihan"
          subtitle="Satu yang udah beres dan kepake orang — sisanya masih di oven."
        />

        <motion.div
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <TiltCard maxTilt={6}>
            <article className="group relative overflow-hidden rounded-xl border border-border bg-card/80 backdrop-blur transition-colors hover:border-primary/60">
              {/* top accent line */}
              <div
                aria-hidden
                className="h-1 w-full bg-gradient-to-r from-primary via-[#ff5a5f] to-transparent opacity-70 transition-opacity group-hover:opacity-100"
              />

              <div className="relative grid gap-8 p-6 md:grid-cols-5 md:p-8">
                {/* Left: content */}
                <div className="md:col-span-3">
                  <div className="mb-5 flex items-center gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary transition-all duration-300 group-hover:rotate-[8deg] group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_0_26px_rgba(230,36,41,0.5)]">
                      <Globe className="h-7 w-7" aria-hidden />
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="font-display text-2xl font-bold tracking-wide text-foreground">
                          LinkSayang
                        </h3>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-terminal/30 bg-terminal/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-terminal">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute h-full w-full animate-ping-soft rounded-full bg-terminal" />
                            <span className="relative h-1.5 w-1.5 rounded-full bg-terminal" />
                          </span>
                          Live
                        </span>
                      </div>
                      <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                        linksayang.netlify.app
                      </p>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                    Web app buat bikin pesan khusus buat orang tersayang. Tulis
                    pesannya, pilih tema, tambah foto — dapet satu link yang
                    tinggal dikirim ke dia. Kubangun sendiri dari nol sampai
                    live di Netlify, dan masih kurawat sampai sekarang.
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {FEATURES.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-terminal/30 bg-terminal/10">
                          <Check className="h-3 w-3 text-terminal" aria-hidden />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: meta + actions */}
                <div className="flex flex-col justify-between gap-6 rounded-xl border border-border bg-secondary/40 p-5 md:col-span-2">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                      Kategori
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {TAGS.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-border bg-secondary/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <a
                      href="https://linksayang.netlify.app/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary font-semibold text-white shadow-[0_0_26px_rgba(230,36,41,0.4)] transition-all hover:shadow-[0_0_42px_rgba(230,36,41,0.6)]"
                    >
                      Lihat Live
                      <ExternalLink className="h-4 w-4" aria-hidden />
                    </a>
                    <a
                      href="https://github.com/thetroll791-eng"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-border bg-card/60 font-semibold text-foreground transition-all hover:border-primary/60 hover:text-primary"
                    >
                      <Github className="h-4 w-4" aria-hidden />
                      GitHub
                    </a>
                  </div>
                </div>
              </div>

              {/* big watermark number */}
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-7 right-4 select-none font-display text-[110px] font-black leading-none text-secondary-foreground/10"
              >
                01
              </span>
            </article>
          </TiltCard>
        </motion.div>

        {/* next project note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex items-center justify-center gap-2 text-center font-mono text-sm text-muted-foreground"
        >
          <Wrench className="h-4 w-4 text-primary" aria-hidden />
          next_project: masih diracik di localhost — nyusul.
        </motion.p>
      </div>
    </section>
  );
}
