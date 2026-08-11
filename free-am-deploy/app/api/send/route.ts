import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ message: "Email wajib diisi" }, { status: 400 });
    }

    const apiKey = "yudzx";
    const apiUrl = `https://api.theresav.biz.id/premium/alightmotion/send?email=${encodeURIComponent(email)}&apikey=${apiKey}`;

    const res = await fetch(apiUrl, { cache: "no-store" });
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
