"use client";

import { useEffect, useRef } from "react";
import { MessagesSquare, MessageSquare, ArrowRight } from "lucide-react";

/**
 * Kolom komentar portofolio — pakai giscus (GitHub Discussions).
 * Gratis, tanpa database, aman buat serverless/Vercel.
 *
 * Aktifin lewat env var (lihat README — bagian "Kolom Komentar"):
 * - NEXT_PUBLIC_GISCUS_REPO        contoh: "thetroll791-eng/portofolio"
 * - NEXT_PUBLIC_GISCUS_REPO_ID     dari giscus.app
 * - NEXT_PUBLIC_GISCUS_CATEGORY    default: "Announcements"
 * - NEXT_PUBLIC_GISCUS_CATEGORY_ID dari giscus.app
 *
 * Kalau env belum diset, yang tampil kartu fallback yang tetap rapi —
 * jadi situs nggak pernah kelihatan rusak.
 */
const GISCUS_REPO = process.env.NEXT_PUBLIC_GISCUS_REPO ?? "";
const GISCUS_REPO_ID = process.env.NEXT_PUBLIC_GISCUS_REPO_ID ?? "";
const GISCUS_CATEGORY =
  process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? "Announcements";
const GISCUS_CATEGORY_ID = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID ?? "";
const GISCUS_ENABLED = Boolean(GISCUS_REPO && GISCUS_REPO_ID && GISCUS_CATEGORY_ID);

export function Guestbook() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!GISCUS_ENABLED || !containerRef.current) return;
    const container = containerRef.current;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", GISCUS_REPO);
    script.setAttribute("data-repo-id", GISCUS_REPO_ID);
    script.setAttribute("data-category", GISCUS_CATEGORY);
    script.setAttribute("data-category-id", GISCUS_CATEGORY_ID);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "transparent_dark");
    script.setAttribute("data-lang", "id");
    script.setAttribute("data-loading", "lazy");
    container.appendChild(script);

    return () => {
      script.remove();
      container.replaceChildren();
    };
  }, []);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 text-center">
        <h3 className="flex items-center justify-center gap-2.5 font-display text-base font-bold uppercase tracking-[0.2em] text-muted-foreground">
          <MessageSquare className="h-5 w-5 text-primary" aria-hidden />
          Komentar
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Kayak kolom komentar YouTube — tinggalin jejak kamu soal playlist
          ini.
        </p>
      </div>

      {GISCUS_ENABLED ? (
        <div
          ref={containerRef}
          className="rounded-xl border border-border bg-card/60 p-2 backdrop-blur"
        />
      ) : (
        <div className="rounded-xl border border-dashed border-border bg-card/60 p-8 text-center backdrop-blur">
          <MessagesSquare
            className="mx-auto h-7 w-7 text-primary/70"
            aria-hidden
          />
          <p className="mt-4 font-display text-lg font-bold tracking-wide text-foreground">
            Kolom komentar masih dipasang
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Komentarnya bakal aktif otomatis setelah repo GitHub ini
            disambungin ke giscus — caranya ada di README, cuma butuh 2
            menit. Buat sementara, sapa aku lewat form kontak aja ya.
          </p>
          <a
            href="#kontak"
            className="mt-5 inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-all hover:border-primary/60 hover:text-primary"
          >
            Ke form kontak
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      )}
    </div>
  );
}
