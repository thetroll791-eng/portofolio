"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Clock,
  Send,
  Loader2,
  ShieldCheck,
  Github,
} from "lucide-react";
import { SectionHeading } from "./section-heading";
import { TiltCard } from "./tilt-card";
import { useToast } from "@/hooks/use-toast";

const INFO = [
  {
    icon: Mail,
    title: "Email",
    value: "thetroll791@gmail.com",
    href: "mailto:thetroll791@gmail.com",
  },
  {
    icon: MapPin,
    title: "Lokasi",
    value: "Indonesia — bisa dari mana aja",
    href: undefined,
  },
  {
    icon: Clock,
    title: "Waktu Respons",
    value: "< 24 jam (biasanya lebih cepat)",
    href: undefined,
  },
];

const SOCIALS = [
  { icon: Github, href: "https://github.com/thetroll791-eng", label: "GitHub AD4M: thetroll791-eng" },
];

export function Contact() {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        toast({
          title: "Gagal kirim",
          description: data.error ?? "Ada yang error ni, coba lagi ya.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Pesan masuk!",
          description: "Makasih! Aku bales secepatnya — biasanya di bawah 24 jam.",
        });
        setForm({ name: "", email: "", message: "" });
      }
    } catch {
      toast({
        title: "Gagal kirim",
        description: "Sinyalnya ngambek. Coba lagi bentar lagi ya.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const inputClass =
    "min-h-[48px] w-full rounded-md border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/25";

  return (
    <section id="kontak" className="relative py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-0 [background:radial-gradient(ellipse_at_bottom,rgba(230,36,41,0.09),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="05 // KONTAK"
          title="Mari Bicara"
          subtitle="Mau nitip bikin web, ngobrol soal Python & security, atau sekadar kenalan? Sini, ketik aja."
        />

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Info */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            {INFO.map((info, i) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <TiltCard maxTilt={7}>
                  <a
                    href={info.href ?? "#kontak"}
                    className={`flex items-center gap-4 rounded-xl border border-border bg-card/70 p-5 backdrop-blur transition-colors hover:border-primary/50 ${
                      info.href ? "" : "cursor-default"
                    }`}
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                      <info.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                        {info.title}
                      </p>
                      <p className="mt-0.5 font-semibold text-foreground">
                        {info.value}
                      </p>
                    </div>
                  </a>
                </TiltCard>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.36 }}
              className="flex items-center gap-3 rounded-xl border border-terminal/25 bg-terminal/[0.06] p-5"
            >
              <ShieldCheck className="h-6 w-6 shrink-0 text-terminal" aria-hidden />
              <p className="text-sm leading-relaxed text-muted-foreground">
                <span className="font-semibold text-terminal">
                  Santai aja
                </span>{" "}
                — sapa pake bahasa sehari-hari. Aku bales beneran, bukan
                auto-reply.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-2 flex items-center gap-3"
            >
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
            </motion.div>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65 }}
            onSubmit={handleSubmit}
            className="rounded-xl border border-border bg-card/70 p-6 backdrop-blur md:p-8 lg:col-span-3"
            aria-label="Formulir kontak"
          >
            <p className="mb-1 font-mono text-xs text-primary">
              $ ./kirim-pesan --encrypted
            </p>
            <h3 className="mb-6 font-display text-xl font-bold tracking-wide">
              Kirim Pesan
            </h3>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-sm font-medium text-muted-foreground"
                >
                  Nama <span className="text-primary">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  minLength={2}
                  maxLength={100}
                  autoComplete="name"
                  placeholder="Nama kamu"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-sm font-medium text-muted-foreground"
                >
                  Email <span className="text-primary">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  maxLength={200}
                  autoComplete="email"
                  placeholder="kamu@email.com"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="contact-message"
                className="mb-2 block text-sm font-medium text-muted-foreground"
              >
                Pesan <span className="text-primary">*</span>
              </label>
              <textarea
                id="contact-message"
                required
                minLength={10}
                maxLength={2000}
                rows={5}
                placeholder="Tulis di sini — nitip web? tanya-tanya? sekadar kenalan? gas aja..."
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className={`${inputClass} min-h-[130px] resize-y`}
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-primary font-semibold text-white shadow-[0_0_26px_rgba(230,36,41,0.4)] transition-all hover:shadow-[0_0_42px_rgba(230,36,41,0.6)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
            >
              {sending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                  Sabar bentar...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" aria-hidden />
                  Gas Kirim
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
