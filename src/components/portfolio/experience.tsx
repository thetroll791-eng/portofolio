"use client";

import { motion } from "framer-motion";
import { Briefcase, Award, CalendarDays } from "lucide-react";
import { SectionHeading } from "./section-heading";

const TIMELINE = [
  {
    period: "2024 — Sekarang",
    role: "Senior Security Engineer",
    company: "CyberShield Labs",
    points: [
      "Ngelead red team 6 orang buat 40+ engagement pentest",
      "Bangun program bug bounty internal dari nol — sekarang udah 300+ laporan valid",
      "Racik lab simulasi serangan buat latihan engineer baru",
    ],
    current: true,
  },
  {
    period: "2022 — 2024",
    role: "Penetration Tester",
    company: "DigitalFort Indonesia",
    points: [
      "60+ pentest web, mobile & API — kebanyakan klien fintech dan e-commerce",
      "Nemu 45+ kerentanan kritis lewat responsible disclosure",
      "Nulis template laporan pentest yang akhirnya jadi standar kantor",
    ],
    current: false,
  },
  {
    period: "2020 — 2022",
    role: "Security Analyst (SOC)",
    company: "NetGuard Systems",
    points: [
      "Shift monitoring 24/7 buat 20+ infrastruktur klien enterprise",
      "Tangani 30+ insiden keamanan, MTTR di bawah 45 menit",
      "Otomatisasi playbook response pakai Python biar nggak begadang melulu",
    ],
    current: false,
  },
  {
    period: "2019 — 2020",
    role: "Bug Bounty Hunter",
    company: "Freelance — HackerOne & Bugcrowd",
    points: [
      "120+ kerentanan valid di platform bug bounty internasional",
      "Fokusan: IDOR, broken access control, sama SSRF",
      "Masuk hall of fame di beberapa program besar",
    ],
    current: false,
  },
];

const CERTS = [
  { code: "OSCP", name: "Offensive Security Certified Professional" },
  { code: "CEH", name: "Certified Ethical Hacker v12" },
  { code: "SEC+", name: "CompTIA Security+" },
  { code: "eJPT", name: "eLearnSecurity Junior Penetration Tester" },
];

export function Experience() {
  return (
    <section id="pengalaman" className="relative py-24 md:py-32">
      <div aria-hidden className="absolute inset-0 cyber-grid opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="04 // PERJALANAN"
          title="Pengalaman"
          subtitle="Dari shift malem di SOC sampai lead red team. Singkatnya begini jalannya."
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
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {CERTS.map((cert, i) => (
              <motion.div
                key={cert.code}
                initial={{ opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card/70 p-5 text-center backdrop-blur transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_14px_38px_rgba(230,36,41,0.18)]"
              >
                <span className="font-display text-2xl font-black tracking-wider text-primary">
                  {cert.code}
                </span>
                <span className="text-xs leading-snug text-muted-foreground">
                  {cert.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
