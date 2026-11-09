# AD4M — Portofolio

Portofolio 3D bertema Spider-Man untuk **AD4M** — cybersecurity developer.
Dibangun dengan Next.js + Three.js + Tailwind CSS + Framer Motion.

## Menjalankan di lokal

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Deploy ke Vercel

### Cara 1 — lewat GitHub (disarankan)

1. Push folder project ini ke repo GitHub kamu (`thetroll791-eng`).
2. Buka [vercel.com](https://vercel.com) → login pakai akun GitHub.
3. Klik **Add New → Project** → pilih repo portofolio ini.
4. Framework preset: **Next.js** (terdeteksi otomatis) — biarkan semua setting default.
5. Klik **Deploy**. 2–3 menit beres, langsung live di `nama-project.vercel.app`.

### Cara 2 — lewat Vercel CLI

```bash
npm i -g vercel
vercel          # ikuti instruksinya
vercel --prod   # deploy production
```

> Project ini udah serverless-ready: nggak butuh database, dan output
> `standalone` otomatis dimatikan saat build di Vercel (lihat `next.config.ts`).

## Environment variable (opsional)

Di Vercel: **Settings → Environment Variables**.

| Variable              | Fungsi                                                        |
| --------------------- | ------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`| URL produksi buat metadata SEO, contoh: `https://ad4m.vercel.app` |
| `RESEND_API_KEY`      | Kalau diisi, pesan dari form kontak diteruskan ke email kamu  |
| `CONTACT_EMAIL`       | Tujuan penerusan pesan, contoh: `thetroll791@gmail.com`       |

> Tanpa `RESEND_API_KEY` form kontak tetap jalan (validasi + log), tapi
> pesannya nggak sampai ke inbox. Supaya pesan masuk ke email: daftar gratis
> di [resend.com](https://resend.com), buat API key, lalu set kedua variable
> di atas. Setelah deploy, bisa juga ganti ke domain sendiri di
> **Settings → Domains**.

## Struktur singkat

```
src/app/                    → halaman utama, layout, metadata, API kontak
src/components/portfolio/   → semua section (hero, about, skills, projects, dst)
public/                     → foto & aset statis
```
