import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter").max(100),
  email: z.string().email("Format email tidak valid").max(200),
  message: z.string().min(10, "Pesan minimal 10 karakter").max(2000),
});

/**
 * POST /api/contact
 *
 * Serverless-friendly (Vercel): tanpa database.
 * - Kalau env RESEND_API_KEY + CONTACT_EMAIL diset, pesan diteruskan ke email.
 * - Kalau tidak, pesan tetap divalidasi dan dicatat di log server.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const firstError =
        parsed.error.issues[0]?.message ?? "Data yang dikirim tidak valid";
      return NextResponse.json({ ok: false, error: firstError }, { status: 400 });
    }

    const { name, email, message } = parsed.data;

    if (process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Portofolio AD4M <onboarding@resend.dev>",
            to: [process.env.CONTACT_EMAIL],
            subject: `Pesan baru dari ${name} — portofolio AD4M`,
            text: `Dari: ${name} <${email}>\n\n${message}`,
          }),
        });
        if (!res.ok) throw new Error(`Resend merespon ${res.status}`);
      } catch (err) {
        // Gagal kirim email tidak boleh bikin user dapat error
        console.error("[contact] gagal teruskan ke email:", err);
      }
    }

    console.log("[contact] pesan masuk:", {
      name,
      email,
      message: message.slice(0, 80),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] error:", error);
    return NextResponse.json(
      { ok: false, error: "Ada yang error di server. Coba lagi nanti ya." },
      { status: 500 }
    );
  }
}
