"use client";

import { useState } from "react";

export default function FreeAM() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [notif, setNotif] = useState({ show: false, message: "", type: "" });

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setNotif({ show: false, message: "", type: "" });

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      // Cek kalau kena blokir IP dari backend (Status 429)
      if (res.status === 429) {
         setNotif({
          show: true,
          message: data.message || "LIMIT IP TERCAPAI! BELI PREMIUM UNTUK UNLIMITED.",
          type: "error",
        });
        setLoading(false);
        return;
      }

      const isSuccess = data.status === true || (data.message && data.message.toLowerCase().includes("berhasil"));

      if (isSuccess) {
        setNotif({ show: true, message: "BERHASIL TERKIRIM", type: "success" });
        setStep(2);
      } else {
        setNotif({
          show: true,
          message: data.message || "Gagal mengirim link verifikasi.",
          type: "error",
        });
      }
    } catch (error) {
      setNotif({
        show: true,
        message: "Koneksi terputus. Cek console browser.",
        type: "error",
      });
    }
    setLoading(false);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setNotif({ show: false, message: "", type: "" });

    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, link }),
      });

      const data = await res.json();

      const isSuccess = data.status === true || (data.message && data.message.toLowerCase().includes("berhasil"));

      if (isSuccess) {
        setNotif({ show: true, message: "SILAHKAN LOGIN AM", type: "success" });
        setStep(3);
      } else {
        setNotif({
          show: true,
          message: data.message || "Verifikasi gagal.",
          type: "error",
        });
      }
    } catch (error) {
      setNotif({ show: true, message: "Koneksi terputus.", type: "error" });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px] flex flex-col items-center font-sans text-black relative pb-12">
      
      {/* BANNER ANNOUNCEMENT (FIXED TOP) */}
      <div className="w-full bg-white border-b-4 border-black p-3 flex justify-center items-center gap-3 z-20 shadow-[0_6px_0_rgba(0,0,0,1)] animate-fade-in">
        <svg xmlns="http://www.w3.org/200.0/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 shrink-0">
          <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
        </svg>
        <p className="font-black uppercase tracking-widest text-xs sm:text-sm text-center">
          BELI AKSES PREMIUM 20K — BEBAS BIKIN AKUN SEPUASNYA!
        </p>
        <svg xmlns="http://www.w3.org/200.0/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 shrink-0">
          <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
        </svg>
      </div>

      {/* MAIN CONTAINER */}
      <div className="flex-1 w-full flex flex-col items-center justify-center p-4 mt-8">
        <div className="w-full max-w-md bg-white border-4 border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] p-8 relative">
          
          <div className="absolute -top-4 -left-4 bg-black text-white px-4 py-1 font-black tracking-widest text-sm uppercase transform -rotate-3 border-2 border-white outline outline-2 outline-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            PREMIUM
          </div>

          <h1 className="text-4xl font-black uppercase mb-2 tracking-tighter mt-4">FREE AM</h1>
          <p className="font-bold mb-8 text-gray-700 border-b-4 border-black pb-4">
            UNLOCK ALIGHT MOTION PREMIUM
          </p>

          {notif.show && (
            <div className={`mb-6 p-4 border-4 border-black font-black uppercase flex items-start gap-3 ${
              notif.type === "success" ? "bg-white shadow-[6px_6px_0px_rgba(0,0,0,1)]" : "bg-black text-white shadow-[6px_6px_0px_rgba(200,200,200,1)]"
            }`}>
              <svg xmlns="http://www.w3.org/200.0/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8 shrink-0 mt-1">
                {notif.type === "success" ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                )}
              </svg>
              <span className="tracking-wide break-words w-full text-sm leading-snug">{notif.message}</span>
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleSendEmail} className="space-y-6">
              <div className="space-y-2">
                <label className="font-black uppercase text-lg tracking-wide block">Email Anda</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/200.0/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-black">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@contoh.com" className="w-full pl-14 p-4 bg-white border-4 border-black text-black font-bold focus:outline-none focus:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all" />
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-black text-white font-black uppercase tracking-widest p-4 border-4 border-black hover:bg-white hover:text-black hover:-translate-y-1 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2">
                {loading ? "Memproses..." : "Kirim Verifikasi"}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="space-y-2">
                <label className="font-black uppercase text-lg tracking-wide block">Link Verifikasi</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/200.0/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-black">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                    </svg>
                  </div>
                  <input type="text" required value={link} onChange={(e) => setLink(e.target.value)} placeholder="Tempel link..." className="w-full pl-14 p-4 bg-white border-4 border-black text-black font-bold focus:outline-none focus:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all" />
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-white text-black font-black uppercase tracking-widest p-4 border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[10px_10px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none transition-all flex justify-center items-center gap-2">
                {loading ? "Memverifikasi..." : "Verify Sekarang"}
              </button>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              <h2 className="text-2xl font-black uppercase mb-2">Akses Terbuka</h2>
              <button onClick={() => { setStep(1); setEmail(""); setLink(""); setNotif({ show: false, message: "", type: "" }); }} className="mt-8 font-black uppercase border-b-4 border-black hover:bg-black hover:text-white transition-all px-2 py-1">
                ← Ulangi Proses
              </button>
            </div>
          )}

        </div>

        {/* CREATOR BADGE */}
        <div className="mt-12 bg-white border-4 border-black px-6 py-2 shadow-[6px_6px_0px_rgba(0,0,0,1)] transform rotate-2 animate-fade-in hover:rotate-0 transition-all cursor-default">
          <p className="font-black uppercase tracking-widest text-sm text-black flex items-center gap-2">
            CREATOR : 
            <span className="bg-black text-white px-3 py-1 border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-all">
            skvcalno
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}
