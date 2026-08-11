import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, link } = body;

    if (!email || !link) {
      return NextResponse.json({ message: "Email dan Link wajib diisi" }, { status: 400 });
    }

    // Panggil API asli dari SERVER SIDE
    const apiKey = "yudzx";
    const apiUrl = `https://api.theresav.biz.id/premium/alightmotion/verify?email=${encodeURIComponent(email)}&link=${encodeURIComponent(link)}&apikey=${apiKey}`;

    const res = await fetch(apiUrl, { cache: "no-store" });
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
