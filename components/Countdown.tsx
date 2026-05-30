"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/lib/config";

type T = { days: number; hours: number; mins: number; secs: number; done: boolean };

function diff(target: Date): T {
  const ms = target.getTime() - Date.now();
  if (ms <= 0) return { days: 0, hours: 0, mins: 0, secs: 0, done: true };
  const secs = Math.floor(ms / 1000);
  return {
    days: Math.floor(secs / 86400),
    hours: Math.floor((secs % 86400) / 3600),
    mins: Math.floor((secs % 3600) / 60),
    secs: secs % 60,
    done: false,
  };
}

function Cell({ value, label }: { value: number; label: string }) {
  const str = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div className="pixel-panel min-w-[58px] px-2 py-3 sm:min-w-[88px] sm:px-4 sm:py-5">
        <span className="font-display block text-center text-xl text-gold-soft text-glow sm:text-4xl">
          {str}
        </span>
      </div>
      <span className="font-display mt-2 text-[0.5rem] uppercase tracking-widest text-rose-soft sm:text-[0.6rem]">
        {label}
      </span>
    </div>
  );
}

export default function Countdown({ compact = false }: { compact?: boolean }) {
  const [t, setT] = useState<T | null>(null);

  useEffect(() => {
    setT(diff(wedding.date));
    const id = setInterval(() => setT(diff(wedding.date)), 1000);
    return () => clearInterval(id);
  }, []);

  // Avoid SSR/CSR mismatch: render placeholders until mounted.
  const v = t ?? { days: 0, hours: 0, mins: 0, secs: 0, done: false };

  if (v.done) {
    return (
      <p className="font-display text-center text-lg text-gold text-glow">
        ❤️ Hoje começa para sempre ❤️
      </p>
    );
  }

  return (
    <div
      className={`flex items-start justify-center gap-2 sm:gap-4 ${
        compact ? "scale-90" : ""
      }`}
      suppressHydrationWarning
    >
      <Cell value={v.days} label="Dias" />
      <span className="font-display pt-3 text-2xl text-gold sm:pt-5 sm:text-4xl">:</span>
      <Cell value={v.hours} label="Horas" />
      <span className="font-display pt-3 text-2xl text-gold sm:pt-5 sm:text-4xl">:</span>
      <Cell value={v.mins} label="Min" />
      <span className="font-display pt-3 text-2xl text-gold sm:pt-5 sm:text-4xl">:</span>
      <Cell value={v.secs} label="Seg" />
    </div>
  );
}
