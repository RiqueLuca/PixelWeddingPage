"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; size: number; phase: number; speed: number };

/**
 * Pixel star field rendered on a canvas. Stars twinkle; a few are larger
 * "diamond" sparkles. Sits absolutely inside a relatively-positioned parent.
 */
export default function Starfield({ density = 0.00018 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let stars: Star[] = [];
    let raf = 0;
    let w = 0;
    let h = 0;

    const palette = ["#fff4e0", "#ffe6a8", "#f4b8c8", "#a8c8ff"];
    const colorFor = (i: number) => palette[i % palette.length];

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

      const count = Math.floor(w * h * density);
      stars = Array.from({ length: count }, () => ({
        x: Math.floor(Math.random() * w),
        y: Math.floor(Math.random() * h),
        size: Math.random() < 0.12 ? 3 : Math.random() < 0.4 ? 2 : 1,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 1.4,
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const tw = reduce ? 0.85 : 0.5 + 0.5 * Math.sin(t * 0.001 * s.speed + s.phase);
        ctx.globalAlpha = 0.25 + tw * 0.75;
        ctx.fillStyle = colorFor(i);
        ctx.fillRect(s.x, s.y, s.size, s.size);
        if (s.size >= 3) {
          // little sparkle cross for the big stars
          ctx.globalAlpha = 0.2 + tw * 0.5;
          ctx.fillRect(s.x - 2, s.y + 1, 2, 1);
          ctx.fillRect(s.x + s.size, s.y + 1, 2, 1);
          ctx.fillRect(s.x + 1, s.y - 2, 1, 2);
          ctx.fillRect(s.x + 1, s.y + s.size, 1, 2);
        }
      }
      ctx.globalAlpha = 1;
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    build();
    if (reduce) {
      draw(0);
    } else {
      raf = requestAnimationFrame(draw);
    }

    const onResize = () => {
      cancelAnimationFrame(raf);
      build();
      if (reduce) draw(0);
      else raf = requestAnimationFrame(draw);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
