"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function Home() {
  // ── ORIGINAL LOGIC — untouched ──
  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://bookmark-app-kappa-livid.vercel.app/dashboard",
      },
    });
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body { font-family:'Inter',sans-serif; background:#0a0a0f; overflow:hidden; }

        .page-wrapper {
          display:flex; align-items:center; justify-content:center;
          height:100vh; width:100vw;
          background: radial-gradient(ellipse at 50% 0%, #1a1040 0%, #0a0a0f 70%);
          position:relative;
        }

        /* Grid */
        .grid-bg {
          position:absolute; inset:0;
          background-image:
            linear-gradient(rgba(120,80,255,.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(120,80,255,.06) 1px, transparent 1px);
          background-size:48px 48px;
          mask-image:radial-gradient(ellipse at center, black 30%, transparent 80%);
          animation:gridDrift 20s ease-in-out infinite alternate;
        }
        @keyframes gridDrift { from{transform:translateY(0)} to{transform:translateY(-24px)} }

        /* Orbs */
        .orb { position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; }
        .orb-1 { width:480px;height:480px;top:-120px;left:-80px;
          background:radial-gradient(circle,rgba(109,40,217,.35),transparent 70%);
          animation:floatOrb1 8s ease-in-out infinite; }
        .orb-2 { width:360px;height:360px;bottom:-80px;right:-60px;
          background:radial-gradient(circle,rgba(59,130,246,.25),transparent 70%);
          animation:floatOrb2 11s ease-in-out infinite; }
        .orb-3 { width:240px;height:240px;top:40%;left:60%;
          background:radial-gradient(circle,rgba(236,72,153,.18),transparent 70%);
          animation:floatOrb3 14s ease-in-out infinite; }
        @keyframes floatOrb1{0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,40px) scale(1.08)}}
        @keyframes floatOrb2{0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-25px,-30px) scale(1.05)}}
        @keyframes floatOrb3{0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,20px)}}

        /* Sparkles */
        .particles { position:absolute; inset:0; pointer-events:none; overflow:hidden; }
        .particle { position:absolute; width:2px; height:2px; border-radius:50%;
          background:#a78bfa; opacity:0;
          animation:twinkle var(--dur) ease-in-out infinite var(--delay); }
        @keyframes twinkle{0%,100%{opacity:0;transform:scale(1)} 50%{opacity:.8;transform:scale(2)}}

        /* Card */
        .card {
          position:relative; z-index:10;
          background:rgba(255,255,255,.04);
          border:1px solid rgba(255,255,255,.1);
          border-radius:24px; padding:56px 48px 48px; width:420px;
          backdrop-filter:blur(24px);
          box-shadow:0 0 0 1px rgba(120,80,255,.12),0 24px 64px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.08);
          animation:cardReveal .8s cubic-bezier(.16,1,.3,1) both;
        }
        @keyframes cardReveal{from{opacity:0;transform:translateY(32px) scale(.96)} to{opacity:1;transform:translateY(0) scale(1)}}

        .icon-wrap {
          display:flex; align-items:center; justify-content:center;
          margin:0 auto 28px; width:64px; height:64px; border-radius:18px;
          background:linear-gradient(135deg,#7c3aed,#4f46e5);
          box-shadow:0 8px 24px rgba(124,58,237,.45);
          animation:iconPop .6s .3s cubic-bezier(.34,1.56,.64,1) both;
        }
        @keyframes iconPop{from{opacity:0;transform:scale(.4) rotate(-12deg)} to{opacity:1;transform:scale(1) rotate(0)}}

        .card-title { font-size:26px; font-weight:700; color:#f1f5f9; text-align:center; letter-spacing:-.5px; animation:fadeUp .6s .4s both; }
        .card-sub   { font-size:14px; color:#64748b; text-align:center; margin-top:8px; line-height:1.6; animation:fadeUp .6s .5s both; }
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)}}

        .divider { display:flex; align-items:center; gap:12px; margin:32px 0; animation:fadeUp .6s .6s both; }
        .divider-line { flex:1; height:1px; background:rgba(255,255,255,.08); }
        .divider-text { font-size:12px; color:#475569; white-space:nowrap; }

        /* Button */
        .btn-google {
          position:relative; width:100%;
          display:flex; align-items:center; justify-content:center; gap:12px;
          padding:14px 24px; border-radius:12px;
          background:linear-gradient(135deg,#4285f4,#3b5bdb);
          color:#fff; font-size:15px; font-weight:600; letter-spacing:.2px;
          border:none; cursor:pointer; overflow:hidden;
          transition:transform .18s ease, box-shadow .18s ease;
          box-shadow:0 4px 20px rgba(66,133,244,.35);
          font-family:'Inter',sans-serif;
          animation:fadeUp .6s .7s both;
        }
        .btn-google:hover { transform:translateY(-2px) scale(1.01); box-shadow:0 8px 32px rgba(66,133,244,.55); }
        .btn-google:active { transform:translateY(0) scale(.99); }
        .btn-google::before {
          content:''; position:absolute; top:0; left:-100%; width:60%; height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.22),transparent);
          transition:left .5s ease; pointer-events:none;
        }
        .btn-google:hover::before { left:160%; }
        .btn-google::after {
          content:''; position:absolute; inset:-2px; border-radius:14px;
          background:linear-gradient(135deg,#818cf8,#4285f4,#a78bfa);
          z-index:-1; opacity:0; transition:opacity .3s ease;
        }
        .btn-google:hover::after { opacity:1; animation:ringPulse 1.2s ease-in-out infinite; }
        @keyframes ringPulse{0%,100%{opacity:.6} 50%{opacity:1}}
        .btn-google svg { flex-shrink:0; transition:transform .3s ease; }
        .btn-google:hover svg { transform:rotate(8deg) scale(1.1); }

        .card-footer { margin-top:24px; font-size:12px; color:#334155; text-align:center; line-height:1.6; animation:fadeUp .6s .8s both; }
        .card-footer a { color:#818cf8; text-decoration:none; }
        .card-footer a:hover { text-decoration:underline; }
      `}</style>

      <div className="page-wrapper">
        <div className="grid-bg" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <div className="particles">
          {Array.from({ length: 32 }).map((_, i) => (
            <div
              key={i}
              className="particle"
              style={
                {
                  left: `${(i * 37 + 11) % 100}%`,
                  top: `${(i * 53 + 7) % 100}%`,
                  "--dur": `${2.5 + (i % 5) * 0.8}s`,
                  "--delay": `${(i % 7) * 0.6}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        {mounted && (
          <div className="card">
            {/* ── ORIGINAL BUTTON — onClick & text unchanged ── */}
            <button onClick={loginWithGoogle} className="btn-google">
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path
                  fill="#fff"
                  d="M44.5 20H24v8.5h11.7C34.3 33.9 29.7 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 6 1.1 8.1 3l6-6C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.6 20-21 0-1.4-.2-2.7-.5-4Z"
                />
              </svg>
              Login with Google
            </button>
          </div>
        )}
      </div>
    </>
  );
}
