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
| `NEXT_PUBLIC_GISCUS_REPO` | Repo buat kolom komentar, format: `user/repo`, mis. `thetroll791-eng/portofolio` |
| `NEXT_PUBLIC_GISCUS_REPO_ID` | ID repo dari giscus.app (lihat panduan di bawah) |
| `NEXT_PUBLIC_GISCUS_CATEGORY` | Kategori Discussions, default: `Announcements` |
| `NEXT_PUBLIC_GISCUS_CATEGORY_ID` | ID kategori dari giscus.app |

> Tanpa `RESEND_API_KEY` form kontak tetap jalan (validasi + log), tapi
> pesannya nggak sampai ke inbox. Supaya pesan masuk ke email: daftar gratis
> di [resend.com](https://resend.com), buat API key, lalu set kedua variable
> di atas. Setelah deploy, bisa juga ganti ke domain sendiri di
> **Settings → Domains**.

## Aktifkan kolom komentar (Giscus)

Kolom komentar di bagian bawah section **Musik** pakai
[giscus](https://giscus.app) — komentarnya disimpan di GitHub Discussions,
gratis dan tanpa database. Selama env var giscus belum diset, yang tampil
adalah kartu pengganti yang tetap rapi.

Langkah aktivasi (±2 menit):

1. Pastikan repo portofolio ini **public** di GitHub.
2. Di halaman repo: **Settings → General → Features** → centang **Discussions**.
3. Buka [github.com/apps/giscus](https://github.com/apps/giscus) → **Install** → pilih repo portofolio.
4. Buka [giscus.app](https://giscus.app/id) → masukkan nama repo → pilih
   mapping **pathname** dan kategori **Announcements**.
5. Copy nilai `data-repo-id` dan `data-category-id` dari snippet yang muncul.
6. Di Vercel: **Settings → Environment Variables** → tambahkan 4 variable
   giscus dari tabel di atas (repo, repo ID, category, category ID).
7. **Deployments → Redeploy** — kolom komentar langsung aktif.

## Struktur singkat

```
src/app/                    → halaman utama, layout, metadata, API kontak
src/components/portfolio/   → semua section (hero, about, skills, projects, musik, dst)
public/                     → foto & aset statis
```

## Catatan section Musik

Playlist "Melankolia Radikal" dari **Dongker** di-embed lewat YouTube
(youtube-nocookie). Kalau suatu saat playlist-nya dipindah/dihapus pemiliknya,
cukup ganti `listId` di `src/components/portfolio/music.tsx` dengan ID
playlist YouTube baru (bagian `list=` pada URL playlist).
