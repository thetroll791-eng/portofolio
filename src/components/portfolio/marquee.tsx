"use client";

const ITEMS = [
  "CYBERSECURITY",
  "WEB DEVELOPMENT",
  "PYTHON",
  "HTML & CSS",
  "JAVASCRIPT",
  "UI & ANIMASI",
  "NETLIFY",
  "LINUX",
  "NETWORKING",
  "OWASP",
  "CTF",
  "PROBLEM SOLVING",
];

export function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div
      aria-hidden
      className="relative z-10 overflow-hidden border-y border-border bg-card/70 py-4 backdrop-blur"
    >
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 font-mono text-sm tracking-[0.25em] text-muted-foreground"
          >
            {item}
            <span className="text-primary">{"//"}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
