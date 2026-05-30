"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import Starfield from "./Starfield";
import Particles from "./Particles";
import Couple from "./Couple";
import SpriteImage from "./SpriteImage";
import { story, type StoryChapter } from "@/lib/config";
import { props } from "@/lib/assets";

const N = story.length;

// Per-scene ground colors + ambient particle type.
const sceneStyle: Record<
  StoryChapter["scene"],
  { ground: string; groundTop: string; particle: "petals" | "hearts" | "stars" | "leaves" }
> = {
  parque: { ground: "#2f6b2a", groundTop: "#5fa83f", particle: "leaves" },
  cafeteria: { ground: "#5a4636", groundTop: "#8a6b4a", particle: "hearts" },
  praia: { ground: "#cda86a", groundTop: "#ecd29a", particle: "stars" },
  pedido: { ground: "#3a2a4d", groundTop: "#6b4a8a", particle: "petals" },
};

function SceneArt({ chapter }: { chapter: StoryChapter }) {
  const s = sceneStyle[chapter.scene];
  return (
    <div className="relative h-full w-screen flex-shrink-0 overflow-hidden">
      {/* ground */}
      <div
        className="absolute inset-x-0 bottom-0 h-[20vh]"
        style={{ backgroundColor: s.ground }}
      >
        <div
          className="absolute inset-x-0 top-0 h-[3vh]"
          style={{ backgroundColor: s.groundTop }}
        />
        {/* path line */}
        <div className="absolute inset-x-0 top-[5vh] h-[2px] bg-black/15" />
      </div>

      {/* scene-specific props sit on the ground (bottom ~ 19vh) */}
      {chapter.scene === "parque" && (
        <>
          <SpriteImage src={props.tree} alt="" fallback="🌳" className="absolute bottom-[18vh] left-[8%] h-[34vh] w-auto" />
          <SpriteImage src={props.tree} alt="" fallback="🌳" className="absolute bottom-[18vh] right-[10%] h-[28vh] w-auto" style={{ transform: "scaleX(-1)" }} />
          <SpriteImage src={props.bush} alt="" fallback="🌸" className="absolute bottom-[18vh] left-[60%] h-[12vh] w-auto" />
          <SpriteImage src={props.bench} alt="" fallback="🪑" className="absolute bottom-[18vh] left-[70%] h-[14vh] w-auto" />
          <SpriteImage src={props.lamp} alt="" fallback="💡" className="absolute bottom-[18vh] left-[40%] h-[26vh] w-auto animate-flicker" />
        </>
      )}
      {chapter.scene === "cafeteria" && (
        <>
          <SpriteImage src={props.cafe} alt="" fallback="🏠" className="absolute bottom-[18vh] left-[12%] h-[40vh] w-auto" />
          <SpriteImage src={props.cafeTable} alt="" fallback="☕" className="absolute bottom-[18vh] left-[58%] h-[16vh] w-auto" />
          <SpriteImage src={props.lamp} alt="" fallback="💡" className="absolute bottom-[18vh] right-[12%] h-[26vh] w-auto animate-flicker" />
          <SpriteImage src={props.bush} alt="" fallback="🌿" className="absolute bottom-[18vh] right-[28%] h-[11vh] w-auto" />
        </>
      )}
      {chapter.scene === "praia" && (
        <>
          {/* sea */}
          <div className="absolute inset-x-0 bottom-[20vh] h-[10vh] overflow-hidden">
            <div
              className="absolute inset-0 animate-[shimmer_5s_linear_infinite]"
              style={{
                background:
                  "repeating-linear-gradient(90deg,#2f7fb0 0 16px,#3f93c4 16px 32px)",
                backgroundSize: "200% 100%",
                opacity: 0.85,
              }}
            />
            <div className="absolute inset-x-0 top-0 h-[2vh] bg-cream/40" />
          </div>
          <SpriteImage src={props.palm} alt="" fallback="🌴" className="absolute bottom-[18vh] left-[10%] h-[36vh] w-auto" />
          <SpriteImage src={props.umbrella} alt="" fallback="⛱️" className="absolute bottom-[18vh] right-[14%] h-[20vh] w-auto" />
        </>
      )}
      {chapter.scene === "pedido" && (
        <>
          <SpriteImage src={props.arch} alt="" fallback="💒" className="absolute bottom-[18vh] left-1/2 h-[40vh] w-auto -translate-x-1/2" />
          <SpriteImage src={props.lamp} alt="" fallback="🕯️" className="absolute bottom-[18vh] left-[14%] h-[24vh] w-auto animate-flicker" />
          <SpriteImage src={props.lamp} alt="" fallback="🕯️" className="absolute bottom-[18vh] right-[14%] h-[24vh] w-auto animate-flicker" style={{ animationDelay: "1s" }} />
          <SpriteImage src={props.ring} alt="" fallback="💍" className="absolute bottom-[46vh] left-1/2 h-[8vh] w-auto -translate-x-1/2 animate-float-slow" />
        </>
      )}
    </div>
  );
}

export default function StoryJourney() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const pct = (mult: number) => `-${((N - 1) / N) * 100 * mult}%`;
  const worldX = useTransform(scrollYProgress, [0, 1], ["0%", pct(1)]);
  const midX = useTransform(scrollYProgress, [0, 1], ["0%", pct(0.55)]);
  const farX = useTransform(scrollYProgress, [0, 1], ["0%", pct(0.22)]);

  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(N - 1, Math.max(0, Math.floor(p * (N - 1) + 0.5)));
    if (i !== active) setActive(i);
  });

  const chapter = story[active];
  const particleKind = sceneStyle[chapter.scene].particle;

  return (
    <section id="historia" ref={ref} style={{ height: `${N * 100}vh` }} className="relative">
      <div className="scanlines sticky top-0 h-screen w-full overflow-hidden">
        {/* Twilight backdrop */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg,#1a1033 0%,#3a2255 30%,#6b4a8a 58%,#e08a6c 80%,#f5c451 100%)",
          }}
        />
        <Starfield density={0.00009} />

        {/* far parallax: sun + clouds + hills */}
        <motion.div style={{ x: farX }} className="absolute inset-0" aria-hidden>
          <div className="absolute right-[12%] top-[14%] h-24 w-24 rounded-full bg-gold-soft shadow-[0_0_70px_24px_rgba(245,196,81,0.5)]" />
          <SpriteImage src={props.cloud} alt="" fallback="" className="absolute left-[10%] top-[16%] h-16 w-auto animate-drift opacity-90" />
          <SpriteImage src={props.cloud} alt="" fallback="" className="absolute left-[40%] top-[26%] h-12 w-auto animate-drift opacity-80" style={{ animationDelay: "4s", animationDuration: "28s" }} />
          <SpriteImage src={props.cloud} alt="" fallback="" className="absolute left-[66%] top-[12%] h-20 w-auto animate-drift opacity-90" style={{ animationDelay: "2s", animationDuration: "26s" }} />
          <SpriteImage src={props.cloud} alt="" fallback="" className="absolute left-[86%] top-[28%] h-14 w-auto animate-drift opacity-80" style={{ animationDelay: "6s" }} />
        </motion.div>

        {/* mid parallax: distant hill band */}
        <motion.div style={{ x: midX }} className="absolute inset-0" aria-hidden>
          <div className="absolute bottom-[20vh] left-0 right-0 h-[14vh]">
            <div className="absolute bottom-0 left-[0%] h-[14vh] w-[40vw] rounded-t-[50%] bg-dusk/70" />
            <div className="absolute bottom-0 left-[35vw] h-[11vh] w-[45vw] rounded-t-[50%] bg-dusk/60" />
            <div className="absolute bottom-0 left-[80vw] h-[13vh] w-[50vw] rounded-t-[50%] bg-dusk/70" />
            <div className="absolute bottom-0 left-[140vw] h-[12vh] w-[45vw] rounded-t-[50%] bg-dusk/60" />
          </div>
        </motion.div>

        {/* world track: the scenes */}
        <motion.div
          style={{ x: worldX, width: `${N * 100}vw` }}
          className="absolute inset-y-0 left-0 flex"
        >
          {story.map((c) => (
            <SceneArt key={c.id} chapter={c} />
          ))}
        </motion.div>

        {/* the couple, walking in place near center-left */}
        <div className="pointer-events-none absolute bottom-[18vh] left-[34%] z-20 -translate-x-1/2">
          <Couple height={120} walking shadow />
        </div>

        {/* ambient particles for the active scene */}
        <Particles kind={particleKind} count={20} />

        {/* chapter label */}
        <div className="absolute left-1/2 top-16 z-30 w-[88%] max-w-2xl -translate-x-1/2 text-center sm:top-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={chapter.id + "-title"}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-display text-sm text-pixel-shadow text-gold-soft sm:text-xl">
                {chapter.title}
              </h2>
              <p className="mt-1 text-lg text-cream/80 sm:text-xl">{chapter.date}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* JRPG dialogue */}
        <div className="absolute bottom-6 left-1/2 z-30 w-[92%] max-w-2xl -translate-x-1/2">
          <AnimatePresence mode="wait">
            <motion.div
              key={chapter.id + "-dlg"}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.35 }}
              className="dialogue-box"
            >
              {chapter.speaker && (
                <span className="font-display absolute -top-3 left-3 border-2 border-cream bg-rose px-2 py-1 text-[0.5rem] text-night-deep">
                  {chapter.speaker}
                </span>
              )}
              <div className="space-y-1 pt-1">
                {chapter.dialogue.map((line, i) => (
                  <p key={i} className="text-lg leading-snug sm:text-xl">
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* progress dots */}
        <div className="absolute right-4 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-2">
          {story.map((c, i) => (
            <span
              key={c.id}
              className={`h-2 w-2 border border-night-deep ${
                i === active ? "scale-150 bg-gold" : "bg-cream/40"
              } transition-transform`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
