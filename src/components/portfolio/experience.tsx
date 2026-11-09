"use client";

import { motion } from "framer-motion";
import { Briefcase, Award, CalendarDays } from "lucide-react";
import { SectionHeading } from "./section-heading";

const TIMELINE = [
  {
    period: "2025",
    role: "Titik Nol",
    company: "Mulai nyemplung dunia code",
    points: [
      "Berawal dari rasa penasaran: kok website bisa kayak gini?",
      "Belajar HTML, CSS, JavaScript dari internet — pelan tapi nyata",
      "Jadilah halaman pertama, walau waktu itu masih jelek diliat",
    ],
    current: false,
  },
  {
    period: "2025 — Sekarang",
    role: "Belajar Python",
    company: "Jalur mandiri — internet + konsistensi",
    points: [
      "Dasar Python: logika, struktur data, algoritma sederhana",
      "Latihan lewat script kecil-kecilan tiap ada waktu luang",
      "Target berikutnya: otomasi & ngulik sisi security",
    ],
    current: true,
  },
  {
    period: "2026 — Sekarang",
    role: "Web Developer — LinkSayang",
    company: "Proyek pribadi — live di Netlify",
    points: [
      "Bangun sendiri dari nol: konsep, desain, kode, sampai deploy",
      "10 tema siap pake + tema kustom: warna, emoji, efek",
      "Dua bahasa (ID/EN), gratis, tanpa harus daftar akun",
    ],
    current: true,
  },
];

export function Experience() {
  return (
    <section id="pengalaman" className="relative py-24 md:py-32">
      <div aria-hidden className="absolute inset-0 cyber-grid opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="04 // PERJALANAN"
          title="Pengalaman"
          subtitle="Belum panjang, tapi jujur — ini jalannya sampai hari ini."
        />

        <div className="relative mx-auto max-w-3xl">
          {/* animated vertical line */}
          <motion.div
            aria-hidden
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute left-[19px] top-2 h-[calc(100%-16px)] w-[2px] origin-top bg-gradient-to-b from-primary via-primary/40 to-transparent md:left-1/2 md:-translate-x-1/2"
          />

          <div className="space-y-10">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className={`relative flex gap-6 pl-14 md:w-1/2 md:gap-0 ${
                  i % 2 === 0
                    ? "md:pl-0 md:pr-12 md:text-right"
                    : "md:ml-auto md:pl-12"
                }`}
              >
                {/* node dot */}
                <span
                  aria-hidden
                  className={`absolute left-[9px] top-1.5 flex h-6 w-6 items-center justify-center md:top-2 ${
                    i % 2 === 0
                      ? "md:left-auto md:-right-3"
                      : "md:-left-3"
                  }`}
                >
                  {item.current && (
                    <span className="absolute h-full w-full animate-ping-soft rounded-full bg-primary/60" />
                  )}
                  <span
                    className={`relative h-3.5 w-3.5 rounded-full border-2 ${
                      item.current
                        ? "border-primary bg-primary shadow-[0_0_18px_rgba(230,36,41,0.8)]"
                        : "border-primary/60 bg-background"
                    }`}
                  />
                </span>

                <div
                  className={`grow rounded-xl border p-5 backdrop-blur transition-colors hover:border-primary/50 md:p-6 ${
                    item.current
                      ? "border-primary/40 bg-primary/[0.06]"
                      : "border-border bg-card/70"
                  }`}
                >
                  <p
                    className={`flex items-center gap-2 font-mono text-xs text-primary ${
                      i % 2 === 0 ? "md:justify-end" : ""
                    }`}
                  >
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                    {item.period}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-bold tracking-wide">
                    {item.role}
                  </h3>
                  <p
                    className={`mt-1 flex items-center gap-1.5 text-sm font-medium text-muted-foreground ${
                      i % 2 === 0 ? "md:justify-end" : ""
                    }`}
                  >
                    <Briefcase className="h-3.5 w-3.5" aria-hidden />
                    {item.company}
                  </p>
                  <ul
                    className={`mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground ${
                      i % 2 === 0 ? "md:text-right" : ""
                    }`}
                  >
                    {item.points.map((point) => (
                      <li
                        key={point}
                        className={`flex gap-2 ${
                          i % 2 === 0 ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <h3 className="mb-6 flex items-center justify-center gap-2.5 font-display text-base font-bold uppercase tracking-[0.2em] text-muted-foreground">
            <Award className="h-5 w-5 text-primary" aria-hidden />
            Sertifikasi
          </h3>
          <div className="mx-auto max-w-xl rounded-xl border border-dashed border-border bg-card/70 p-8 text-center backdrop-blur">
            <Award className="mx-auto h-7 w-7 text-primary/70" aria-hidden />
            <p className="mt-4 font-display text-lg font-bold tracking-wide text-foreground">
              Belum ada — jujur aja.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Sertifikasi resmi memang belum kepunya. Sekarang fokusnya di
              belajar + bikin proyek nyata duluan. Slot ini kusimpen buat
              nanti — pas udah ada sertifikat yang layang di dinding.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
