import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ message: "Email tujuan wajib diisi" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailToUser = {
      from: '"FREE AM PREMIUM" <' + process.env.GMAIL_USER + '>',
      to: email,
      subject: "AKSES PREMIUM TERBUKA!",
      html: `
        <div style="font-family: 'Arial', sans-serif; background-color: #ffffff; color: #000000; padding: 24px; max-width: 500px; margin: 0 auto; border: 4px solid #000000; box-shadow: 8px 8px 0px #000000;">
          
          <div style="display: inline-block; background-color: #000000; color: #ffffff; padding: 4px 12px; font-weight: 900; font-size: 12px; letter-spacing: 2px; margin-bottom: 16px; border: 2px solid #000000;">
            STATUS: VERIFIED
          </div>

          <h2 style="font-weight: 900; text-transform: uppercase; font-size: 24px; margin-top: 0; border-bottom: 4px solid #000000; padding-bottom: 16px;">
            VERIFIKASI BERHASIL!
          </h2>
          
          <p style="font-weight: bold; font-size: 16px; line-height: 1.6;">
            Terima kasih sudah menggunakan FREE AM. Akses Alight Motion Premium kamu sudah berhasil diverifikasi dan siap digunakan.
          </p>

          <div style="background-color: #f3f4f6; border: 4px solid #000000; padding: 16px; margin: 24px 0;">
            <p style="margin: 0; font-weight: bold; font-size: 14px;">
              Sebagai tanda terima kasih, dukung kami dengan follow channel WhatsApp resmi FREE AM ya!
            </p>
          </div>

          <a href="https://whatsapp.com/channel/0029VbBmaetBVJl0eI7t0x02" style="display: block; text-align: center; background-color: #ffffff; color: #000000; padding: 16px; text-decoration: none; font-weight: 900; font-size: 16px; text-transform: uppercase; border: 4px solid #000000; box-shadow: 6px 6px 0px #000000;">
            FOLLOW CHANNEL WA
          </a>

        </div>
      `,
    };

    const mailToOwner = {
      from: '"SYSTEM FREE AM" <' + process.env.GMAIL_USER + '>',
      to: "ningsihtita88@gmail.com",
      subject: "NEW UNLOCK: " + email,
      html: `
        <div style="font-family: 'Arial', sans-serif; background-color: #ffffff; color: #000000; padding: 20px; max-width: 400px; border: 4px solid #000000; box-shadow: 6px 6px 0px #000000;">
          <h2 style="font-weight: 900; text-transform: uppercase; margin-top: 0; font-size: 20px; color: #000000;">
            BERHASIL UNLOCK PREMIUM
          </h2>
          <p style="font-weight: bold; font-size: 14px; margin-bottom: 8px;">Email Target:</p>
          <div style="background-color: #000000; color: #ffffff; padding: 12px; font-weight: bold; font-size: 16px; border: 2px solid #000000;">
            ${email}
          </div>
        </div>
      `,
    };

    await Promise.all([
      transporter.sendMail(mailToUser),
      transporter.sendMail(mailToOwner)
    ]);

    return NextResponse.json({ status: true, message: "berhasil di verif" });
  } catch (error) {
    console.error("Error Nodemailer:", error);
    return NextResponse.json({ message: "Gagal mengirim notifikasi email" }, { status: 500 });
  }
}
