"use client";

import { motion } from "framer-motion";
import {
  Radar,
  ShieldCheck,
  KeyRound,
  Activity,
  ScanEye,
  FileSearch,
  Github,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";
import { SectionHeading } from "./section-heading";
import { TiltCard } from "./tilt-card";

const PROJECTS = [
  {
    icon: Radar,
    number: "01",
    title: "ReconSpider",
    description:
      "Tool OSINT yang crawl & petakan aset target otomatis — subdomain, endpoint, sampai graph hubungan antar sistem. Awalnya buat pakai sendiri, sekarang dipake tim lain.",
    tags: ["Python", "OSINT", "Automation"],
  },
  {
    icon: ShieldCheck,
    number: "02",
    title: "PhishGuard",
    description:
      "Ekstensi browser yang nandain situs phishing real-time: URL, konten halaman, sama sertifikat SSL. Semua dicek di bawah 50ms biar browsing nggak kerasa berat.",
    tags: ["TypeScript", "ML", "Extension"],
  },
  {
    icon: KeyRound,
    number: "03",
    title: "CryptVault",
    description:
      "Password manager zero-knowledge — Argon2 + AES-256-GCM. Vault nggak pernah keluar dari device dalam bentuk yang bisa dibaca. Nggak percaya cloud? Sama.",
    tags: ["Go", "Cryptography", "CLI"],
  },
  {
    icon: Activity,
    number: "04",
    title: "SentinelIDS",
    description:
      "IDS yang belajar pola trafik normal jaringan, terus nandain yang aneh-aneh lengkap dengan skor risikonya. Biar SOC bisa milih mana yang dikejar duluan.",
    tags: ["Python", "ML", "Networking"],
  },
  {
    icon: ScanEye,
    number: "05",
    title: "NetSentry",
    description:
      "Dashboard monitoring buat tim SOC: packet inspection, alert IOC, timeline insiden. Dibikin karena dulu timnya masih copy-paste dari lima tab berbeda.",
    tags: ["React", "Go", "eBPF"],
  },
  {
    icon: FileSearch,
    number: "06",
    title: "ForensiKit",
    description:
      "Kumpulan tool forensik digital — artefak sistem, dump memori, jejak jaringan. Mulai dari iseng, sekarang dipake beberapa lab independen.",
    tags: ["C++", "Forensics", "Toolkit"],
  },
];

export function Projects() {
  return (
    <section id="proyek" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="03 // PROYEK"
          title="Proyek Pilihan"
          subtitle="Tools yang kubangun sendiri — sebagian masih kupake tiap hari, sebagian nge-help tim lain."
        />

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.12 }}
              className="h-full"
            >
              <TiltCard maxTilt={10} className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card/80 backdrop-blur transition-colors hover:border-primary/60">
                  {/* top accent line */}
                  <div
                    aria-hidden
                    className="h-1 w-full bg-gradient-to-r from-primary via-[#ff5a5f] to-transparent opacity-70 transition-opacity group-hover:opacity-100"
                  />
                  <div className="flex grow flex-col p-6">
                    <div className="mb-5 flex items-start justify-between">
                      <span className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary transition-all duration-300 group-hover:rotate-[8deg] group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_0_26px_rgba(230,36,41,0.5)]">
                        <project.icon className="h-7 w-7" aria-hidden />
                      </span>
                      <span className="font-display text-3xl font-black text-secondary-foreground/20 transition-colors group-hover:text-primary/30">
                        {project.number}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold tracking-wide text-foreground">
                      {project.title}
                    </h3>
                    <p className="mt-3 grow text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-border bg-secondary/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                      <a
                        href="https://github.com/thetroll791-eng"
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Kode sumber ${project.title} di GitHub`}
                        className="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                      <a
                        href="#kontak"
                        aria-label={`Detail proyek ${project.title}`}
                        className="inline-flex h-10 items-center gap-1.5 rounded-md px-3 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-all hover:text-primary"
                      >
                        Detail
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                      <a
                        href="https://github.com/thetroll791-eng"
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Demo ${project.title}`}
                        className="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
