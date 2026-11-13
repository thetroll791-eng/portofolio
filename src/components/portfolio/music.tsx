"use client";

import { motion } from "framer-motion";
import {
  Headphones,
  Music2,
  ExternalLink,
  Quote,
  Disc3,
} from "lucide-react";
import { SectionHeading } from "./section-heading";
import { TiltCard } from "./tilt-card";
import { Guestbook } from "./guestbook";

/* Playlist resmi "Melankolia Radikal" — Dongker (band punk, Bandung).
   ID playlist diverifikasi via YouTube oEmbed, jangan diganti sembarangan. */
const PLAYLIST = {
  title: "Melankolia Radikal",
  artist: "Dongker",
  listId: "OLAK5uy_lhUt-ztlH-WAVZdjw6QkYZarOZvAm3VLU",
  facts: ["11 lagu", "±35 menit", "Punk · Bandung"],
  moods: ["Melankolis", "Ngalir", "Malem-malem", "Fokus"],
};

const EMBED_URL = `https://www.youtube-nocookie.com/embed/videoseries?list=${PLAYLIST.listId}`;
const YTMUSIC_URL = `https://music.youtube.com/playlist?list=${PLAYLIST.listId}`;

const EQ_BARS = [0.9, 0.6, 1.15, 0.7, 0.8];

export function MusicSection() {
  return (
    <section id="musik" className="relative py-24 md:py-32">
      <div aria-hidden className="absolute inset-0 cyber-grid opacity-30" />
      <div
        aria-hidden
        className="absolute inset-0 [background:radial-gradient(ellipse_at_top,rgba(230,36,41,0.08),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="05 // MUSIK"
          title="Soundtrack Ngoding"
          subtitle="Playlist kesukaanku yang nemenin tiap baris kode — play, fokus, gas."
        />

        <div className="grid items-start gap-8 lg:grid-cols-5">
          {/* ===== Player ===== */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65 }}
            className="lg:col-span-3"
          >
            <div className="overflow-hidden rounded-xl border border-border bg-card/80 shadow-2xl backdrop-blur">
              {/* player header */}
              <div className="flex items-center justify-between gap-3 border-b border-border bg-card px-4 py-3">
                <span className="flex min-w-0 items-center gap-2 font-mono text-xs text-muted-foreground">
                  <Music2 className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span className="truncate">
                    now_playing: {PLAYLIST.title.toLowerCase()} —{" "}
                    {PLAYLIST.artist.toLowerCase()}
                  </span>
                </span>
                {/* mini equalizer */}
                <span className="flex shrink-0 items-end gap-1" aria-hidden>
                  {EQ_BARS.map((speed, i) => (
                    <motion.span
                      key={i}
                      animate={{ scaleY: [0.25, 1, 0.4, 0.85, 0.25] }}
                      transition={{
                        duration: speed * 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.12,
                      }}
                      className="h-4 w-1 origin-bottom rounded-full bg-gradient-to-t from-primary to-terminal"
                    />
                  ))}
                </span>
              </div>

              {/* embed */}
              <div className="aspect-video w-full">
                <iframe
                  src={EMBED_URL}
                  title={`Playlist ${PLAYLIST.title} oleh ${PLAYLIST.artist} di YouTube`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="h-full w-full"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-[11px] text-muted-foreground">
                {"//"} diputar via youtube-nocookie — lebih privat buat kamu
              </p>
              <a
                href={YTMUSIC_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 font-mono text-xs text-muted-foreground transition-all hover:border-primary/60 hover:text-primary"
              >
                <Headphones className="h-3.5 w-3.5" aria-hidden />
                Buka di YouTube Music
                <ExternalLink className="h-3 w-3" aria-hidden />
              </a>
            </div>
          </motion.div>

          {/* ===== Komentar-ku soal playlist ini ===== */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="lg:col-span-2"
          >
            <TiltCard maxTilt={7} className="h-full">
              <div className="relative flex h-full flex-col rounded-xl border border-border bg-card/70 p-6 backdrop-blur transition-colors hover:border-primary/50 md:p-7">
                <div
                  aria-hidden
                  className="halftone absolute -right-8 -top-8 h-36 w-36 opacity-30"
                />

                <div className="relative">
                  <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    <Quote className="h-4 w-4 text-primary" aria-hidden />
                    komentar-ku // soal playlist ini
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-foreground md:text-base">
                    Album ini yang paling ngeyel nemenin aku ngoding — dari
                    halaman pertama sampai deploy pertama. Melankolisnya
                    aneh cocoknya sama debugging: entah kenapa, lagu sedih
                    malah bikin otak fokus. Rumusnya simple — volume 60,
                    kopi secangkir, error boleh tak terbatas.
                  </p>

                  <p className="mt-4 font-mono text-xs text-terminal">
                    — ad4m, tiap malem ngoding
                  </p>

                  <div className="my-5 h-px bg-border" aria-hidden />

                  <div className="flex flex-wrap gap-2">
                    {PLAYLIST.facts.map((fact) => (
                      <span
                        key={fact}
                        className="inline-flex items-center gap-1.5 rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-[11px] text-primary"
                      >
                        <Disc3 className="h-3 w-3" aria-hidden />
                        {fact}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {PLAYLIST.moods.map((mood) => (
                      <span
                        key={mood}
                        className="rounded-md border border-border bg-secondary/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                      >
                        {mood}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>

        {/* ===== Kolom komentar — di bagian bawah ===== */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16"
        >
          <Guestbook />
        </motion.div>
      </div>
    </section>
  );
}
