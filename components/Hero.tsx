"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Starfield from "./Starfield";
import Particles from "./Particles";
import Couple from "./Couple";
import Countdown from "./Countdown";
import SpriteImage from "./SpriteImage";
import { wedding } from "@/lib/config";
import { props } from "@/lib/assets";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const moonY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const hillsY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const scrollToStory = () => {
    document.getElementById("historia")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className="scanlines relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20"
      style={{
        background:
          "linear-gradient(180deg, #0d0820 0%, #1a1033 38%, #2a1b4d 70%, #4a2a5a 100%)",
      }}
    >
      {/* Sky */}
      <Starfield />
      <motion.div
        style={{ y: moonY }}
        className="pointer-events-none absolute right-[8%] top-[10%] sm:right-[14%]"
        aria-hidden
      >
        <div className="relative h-20 w-20 sm:h-28 sm:w-28">
          <div className="absolute inset-0 rounded-full bg-gold-soft shadow-[0_0_60px_18px_rgba(245,196,81,0.45)]" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cream to-gold-soft" />
          <div className="absolute left-4 top-5 h-3 w-3 rounded-full bg-gold/40" />
          <div className="absolute right-5 top-9 h-2 w-2 rounded-full bg-gold/40" />
          <div className="absolute left-8 bottom-5 h-2.5 w-2.5 rounded-full bg-gold/30" />
        </div>
      </motion.div>

      {/* Distant skyline with flickering windows */}
      <motion.div
        style={{ y: hillsY }}
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 sm:h-60"
        aria-hidden
      >
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-[#1a1033]" />
        <SpriteImage
          src={props.cottage}
          alt=""
          fallback=""
          className="absolute bottom-20 left-[6%] h-24 w-auto animate-flicker opacity-90"
        />
        <SpriteImage
          src={props.tree}
          alt=""
          fallback=""
          className="absolute bottom-20 left-[24%] hidden h-28 w-auto opacity-90 sm:block"
        />
        <SpriteImage
          src={props.cottage}
          alt=""
          fallback=""
          className="absolute bottom-20 right-[8%] h-20 w-auto animate-flicker opacity-90"
          style={{ animationDelay: "1.5s", transform: "scaleX(-1)" }}
        />
        <SpriteImage
          src={props.tree}
          alt=""
          fallback=""
          className="absolute bottom-20 right-[26%] hidden h-24 w-auto opacity-90 sm:block"
        />
      </motion.div>

      <Particles kind="stars" count={22} />
      <Particles kind="petals" count={18} />

      {/* Foreground content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <p className="font-display mb-4 text-[0.6rem] tracking-[0.3em] text-rose-soft sm:text-xs">
          ✦ SAVE THE DATE ✦
        </p>

        <h1 className="font-display flex flex-col items-center gap-3 text-3xl leading-relaxed text-pixel-shadow sm:flex-row sm:justify-center sm:gap-0 sm:text-5xl md:text-6xl">
          <span className="text-shimmer">{wedding.groom}</span>
          <span className="inline-block animate-bob text-rose sm:mx-4">❤</span>
          <span className="text-shimmer">{wedding.bride}</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-xl text-cream/90 sm:text-2xl">
          {wedding.tagline}
        </p>

        <div className="my-8">
          <Couple height={120} view="front" walking={false} />
        </div>

        <div className="mb-8">
          <Countdown />
        </div>

        <button onClick={scrollToStory} className="pixel-btn pixel-btn--rose">
          ▶ Ver nossa história
        </button>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        animate={reduce ? undefined : { y: [0, 10, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      >
        <span className="font-display text-[0.55rem] text-gold-soft/80">▼ role para baixo ▼</span>
      </motion.div>
    </section>
  );
}
