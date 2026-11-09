import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const contactSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter").max(100),
  email: z.string().email("Format email tidak valid").max(200),
  message: z.string().min(10, "Pesan minimal 10 karakter").max(2000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const firstError =
        parsed.error.issues[0]?.message ?? "Data yang dikirim tidak valid";
      return NextResponse.json({ ok: false, error: firstError }, { status: 400 });
    }

    await db.contactMessage.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        message: parsed.data.message,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] gagal menyimpan pesan:", error);
    return NextResponse.json(
      { ok: false, error: "Terjadi kesalahan di server. Coba lagi nanti." },
      { status: 500 }
    );
  }
}
