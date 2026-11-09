"use client";

import { motion } from "framer-motion";
import { Crosshair, MapPin, Radar, ShieldCheck, Zap } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { TiltCard } from "./tilt-card";

const TERMINAL_LINES = [
  { cmd: "whoami", out: "ad4m — cybersecurity developer & security researcher" },
  {
    cmd: "cat misi.txt",
    out: "Melindungi dunia digital dengan menemukan kerentanan sebelum orang jahat menemukannya.",
  },
  {
    cmd: "cat gaya-kerja.md",
    out: "Pikiran penyerang, pertahanan pembangun. Setiap baris kode saya tulis dengan asumsi seseorang akan mencoba meretaknya.",
  },
  {
    cmd: "uptime --karier",
    out: "5+ tahun di garis depan keamanan siber: pentest, incident response, dan riset kerentanan.",
  },
];

const FACTS = [
  {
    icon: Crosshair,
    title: "Fokus Utama",
    value: "Offensive Security & AppSec",
  },
  {
    icon: MapPin,
    title: "Basis Operasi",
    value: "Indonesia — Remote Worldwide",
  },
  {
    icon: Zap,
    title: "Prinsip",
    value: "Break it first, fix it better",
  },
  {
    icon: ShieldCheck,
    title: "Status",
    value: "Tersedia untuk proyek & kolaborasi",
  },
];

export function About() {
  return (
    <section id="tentang" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="01 // TENTANG"
          title="Di Balik Topeng"
          subtitle="Kekuatan besar datang dengan tanggung jawab besar — termasuk menjaga sistem tetap aman."
        />

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 8 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <TiltCard maxTilt={4} glare={false}>
              <div className="overflow-hidden rounded-xl border border-border bg-[#0a0a10] shadow-2xl">
                {/* title bar */}
                <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                  <span className="ml-3 font-mono text-xs text-muted-foreground">
                    ad4m@spider-lab: ~/portofolio
                  </span>
                </div>
                {/* body */}
                <div className="space-y-5 p-5 font-mono text-sm leading-relaxed md:p-7">
                  {TERMINAL_LINES.map((line, i) => (
                    <motion.div
                      key={line.cmd}
                      initial={{ opacity: 0, x: -14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: 0.25 + i * 0.28 }}
                    >
                      <p className="flex flex-wrap items-baseline gap-2">
                        <span className="text-primary">ad4m@lab</span>
                        <span className="text-muted-foreground">:</span>
                        <span className="text-terminal">~</span>
                        <span className="text-muted-foreground">$</span>
                        <span className="text-foreground">{line.cmd}</span>
                      </p>
                      <p className="mt-1.5 pl-6 text-muted-foreground">
                        <span className="mr-2 text-terminal">»</span>
                        {line.out}
                      </p>
                    </motion.div>
                  ))}
                  <p className="flex items-center gap-2 pl-0">
                    <span className="text-primary">ad4m@lab</span>
                    <span className="text-muted-foreground">:</span>
                    <span className="text-terminal">~</span>
                    <span className="text-muted-foreground">$</span>
                    <span className="animate-caret inline-block h-4 w-2 bg-terminal" />
                  </p>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Fact cards */}
          <div className="grid content-start gap-4 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
            {FACTS.map((fact, i) => (
              <motion.div
                key={fact.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
              >
                <TiltCard maxTilt={8}>
                  <div className="group flex items-center gap-4 rounded-xl border border-border bg-card/70 p-5 backdrop-blur transition-colors hover:border-primary/50">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-white">
                      <fact.icon className="h-6 w-6" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                        {fact.title}
                      </p>
                      <p className="mt-1 truncate font-semibold text-foreground">
                        {fact.value}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* decorative radar quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-14 flex items-center justify-center gap-4 text-center"
        >
          <Radar className="h-5 w-5 shrink-0 animate-spin-slow text-primary/60" aria-hidden />
          <p className="max-w-2xl font-mono text-sm italic text-muted-foreground md:text-base">
            &ldquo;Dunia bisa jadi tempat yang menakutkan. Bukan karena orang yang
            jahat, tapi karena orang baik yang memilih untuk tidak
            memperjuangkannya.&rdquo;
          </p>
          <Radar className="h-5 w-5 shrink-0 animate-spin-slower text-primary/60" aria-hidden />
        </motion.div>
      </div>
    </section>
  );
}
