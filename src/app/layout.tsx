import type { Metadata } from "next";
import { Orbitron, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-terminal",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "AD4M — Cybersecurity Developer & Security Researcher",
  description:
    "Portofolio AD4M — Cybersecurity Developer, Penetration Tester & Security Researcher. Membangun dan mengamankan sistem, satu kerentanan demi satu kerentanan.",
  keywords: [
    "AD4M",
    "cybersecurity",
    "penetration testing",
    "security researcher",
    "ethical hacker",
    "portofolio",
  ],
  authors: [{ name: "AD4M" }],
  openGraph: {
    title: "AD4M — Cybersecurity Developer",
    description:
      "Membangun dan mengamankan sistem, satu kerentanan demi satu kerentanan.",
    type: "website",
    images: ["/ad4m-spidey.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark" suppressHydrationWarning>
      <body
        className={`${orbitron.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
