"use client";

const ITEMS = [
  "PENETRATION TESTING",
  "RED TEAM",
  "OSINT",
  "CRYPTOGRAPHY",
  "MALWARE ANALYSIS",
  "INCIDENT RESPONSE",
  "REVERSE ENGINEERING",
  "THREAT HUNTING",
  "NETWORK SECURITY",
  "SOCIAL ENGINEERING",
  "ZERO TRUST",
  "WEB SECURITY",
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
