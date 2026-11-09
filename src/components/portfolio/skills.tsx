"use client";

import { motion } from "framer-motion";
import {
  Swords,
  ShieldHalf,
  Code2,
  Wrench,
} from "lucide-react";
import { SectionHeading } from "./section-heading";
import { TiltCard } from "./tilt-card";

const CATEGORIES = [
  {
    icon: Swords,
    title: "Offensive Security",
    accent: "Serangan terencana, eksekusi presisi",
    skills: [
      { name: "Web App Penetration Testing", level: 95 },
      { name: "Network Penetration Testing", level: 90 },
      { name: "Exploit Development", level: 85 },
      { name: "Social Engineering", level: 78 },
    ],
  },
  {
    icon: ShieldHalf,
    title: "Defensive Security",
    accent: "Deteksi dini, respons cepat",
    skills: [
      { name: "SIEM & Security Monitoring", level: 90 },
      { name: "Threat Hunting", level: 88 },
      { name: "Incident Response", level: 85 },
      { name: "Malware Analysis", level: 78 },
    ],
  },
  {
    icon: Code2,
    title: "Programming",
    accent: "Kode yang dibangun untuk diuji",
    skills: [
      { name: "Python", level: 95 },
      { name: "Bash Scripting", level: 90 },
      { name: "JavaScript / TypeScript", level: 82 },
      { name: "C / C++ & Go", level: 78 },
    ],
  },
];

const TOOLBOX = [
  "Kali Linux",
  "Burp Suite",
  "Metasploit",
  "Nmap",
  "Wireshark",
  "Ghidra",
  "OWASP ZAP",
  "Splunk",
  "Docker",
  "Linux Hardening",
  "Git",
  "Cloud Security",
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="font-mono text-xs text-primary">{level}%</span>
      </div>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-secondary"
        role="progressbar"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={name}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-spider-dark via-primary to-[#ff5a5f]"
        />
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="keahlian" className="relative py-24 md:py-32">
      {/* section backdrop */}
      <div aria-hidden className="absolute inset-0 cyber-grid opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="02 // KEAHLIAN"
          title="Arsenal Keahlian"
          subtitle="Masuk kayak penyerang, nambal kayak pembela. Dua-duanya kepake tiap hari."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.14 }}
            >
              <TiltCard maxTilt={9} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-xl border border-border bg-card/80 p-6 backdrop-blur transition-colors hover:border-primary/50 md:p-7">
                  <div
                    aria-hidden
                    className="halftone absolute -right-8 -top-8 h-36 w-36 opacity-30 transition-opacity group-hover:opacity-60"
                  />
                  <div className="relative">
                    <div className="mb-5 flex items-center gap-4">
                      <span className="flex h-13 w-13 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 p-3 text-primary transition-all group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                        <cat.icon className="h-7 w-7" aria-hidden />
                      </span>
                      <div>
                        <h3 className="font-display text-lg font-bold tracking-wide">
                          {cat.title}
                        </h3>
                        <p className="font-mono text-[11px] text-muted-foreground">
                          {cat.accent}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {cat.skills.map((skill, j) => (
                        <SkillBar
                          key={skill.name}
                          name={skill.name}
                          level={skill.level}
                          delay={0.2 + j * 0.12}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Toolbox */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 rounded-xl border border-border bg-card/70 p-6 backdrop-blur md:p-8"
        >
          <div className="mb-5 flex items-center gap-3">
            <Wrench className="h-5 w-5 text-primary" aria-hidden />
            <h3 className="font-display text-base font-bold uppercase tracking-widest md:text-lg">
              Tools of the Trade
            </h3>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {TOOLBOX.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="cursor-default rounded-md border border-border bg-secondary/70 px-3.5 py-2 font-mono text-xs text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
