"use client";

import { useEffect, useRef } from "react";

type Kind = "petals" | "hearts" | "stars" | "leaves";

type P = {
  x: number;
  y: number;
  vy: number;
  vx: number;
  sway: number;
  swaySpeed: number;
  size: number;
  rot: number;
  vrot: number;
  color: string;
};

const palettes: Record<Kind, string[]> = {
  petals: ["#f4b8c8", "#e87a9a", "#ffd6e0", "#fff4e0"],
  hearts: ["#e87a9a", "#f4b8c8", "#ff9d6c"],
  stars: ["#ffe6a8", "#f5c451", "#fff4e0", "#a8c8ff"],
  leaves: ["#9bd36a", "#5fa83f", "#f5c451", "#d49a2a"],
};

/** Draw one pixel particle as a tiny shape (no anti-aliasing). */
function drawParticle(ctx: CanvasRenderingContext2D, p: P, kind: Kind) {
  const s = p.size;
  ctx.fillStyle = p.color;
  if (kind === "hearts") {
    // pixel heart
    ctx.fillRect(p.x, p.y + s, s, s);
    ctx.fillRect(p.x + s * 2, p.y + s, s, s);
    ctx.fillRect(p.x + s, p.y, s, s);
    ctx.fillRect(p.x + s * 3, p.y, s, s);
    ctx.fillRect(p.x, p.y + s * 2, s * 4, s);
    ctx.fillRect(p.x + s, p.y + s * 3, s * 2, s);
  } else if (kind === "stars") {
    ctx.fillRect(p.x + s, p.y, s, s * 3);
    ctx.fillRect(p.x, p.y + s, s * 3, s);
  } else if (kind === "leaves") {
    ctx.fillRect(p.x, p.y, s * 2, s);
    ctx.fillRect(p.x + s, p.y + s, s * 2, s);
  } else {
    // petal: little 2x diamond
    ctx.fillRect(p.x + s, p.y, s, s);
    ctx.fillRect(p.x, p.y + s, s * 3, s);
    ctx.fillRect(p.x + s, p.y + s * 2, s, s);
  }
}

export default function Particles({
  kind = "petals",
  count = 28,
  className = "",
}: {
  kind?: Kind;
  count?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let parts: P[] = [];
    let raf = 0;
    let w = 0;
    let h = 0;
    let last = performance.now();

    const colors = palettes[kind];

    const spawn = (initial = false): P => {
      const size = 2 + Math.floor(Math.random() * 2);
      return {
        x: Math.random() * w,
        y: initial ? Math.random() * h : -10,
        vy: 12 + Math.random() * 26,
        vx: -6 + Math.random() * 12,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.6 + Math.random() * 1.4,
        size,
        rot: 0,
        vrot: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    };

    const build = () => {
      const parent = canvas.parentElement;
      w = parent?.clientWidth ?? window.innerWidth;
      h = parent?.clientHeight ?? window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
      parts = Array.from({ length: count }, () => spawn(true));
    };

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        p.sway += p.swaySpeed * dt;
        p.y += p.vy * dt;
        p.x += (p.vx + Math.sin(p.sway) * 14) * dt;
        if (p.y > h + 12 || p.x < -20 || p.x > w + 20) {
          parts[i] = spawn();
          parts[i].y = -10;
        }
        ctx.globalAlpha = 0.85;
        drawParticle(ctx, p, kind);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };

    build();
    raf = requestAnimationFrame(frame);

    const onResize = () => {
      cancelAnimationFrame(raf);
      build();
      raf = requestAnimationFrame(frame);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [kind, count]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    />
  );
}
