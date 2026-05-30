"use client";

import Reveal from "./Reveal";
import Particles from "./Particles";
import Couple from "./Couple";
import { wedding } from "@/lib/config";

const credits: { role: string; name: string }[] = [
  { role: "Protagonistas", name: `${wedding.groom} & ${wedding.bride}` },
  { role: "Direção de Aventura", name: "O Destino" },
  { role: "Trilha Sonora", name: "Batidas de dois corações" },
  { role: "Cenário", name: "Cada lugar onde nos amamos" },
  { role: "Efeitos Mágicos", name: "Pixel Art ✦ PixelLab AI" },
  { role: "Agradecimento Especial", name: "Você, por jogar conosco ❤" },
];

export default function Finale() {
  const toTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <section
      id="final"
      className="scanlines relative overflow-hidden px-4 pb-16 pt-24"
      style={{
        background:
          "linear-gradient(180deg,#2a1b4d 0%,#8a4a6a 30%,#e08a6c 55%,#f5c451 78%,#ffd98a 100%)",
      }}
    >
      <Particles kind="hearts" count={18} />

      {/* Big setting sun */}
      <div className="pointer-events-none absolute bottom-[34%] left-1/2 -z-0 h-56 w-56 -translate-x-1/2 rounded-full bg-gradient-to-b from-cream to-gold shadow-[0_0_120px_40px_rgba(245,196,81,0.6)] sm:h-72 sm:w-72" />

      {/* Sea / horizon with reflection */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%]">
        <div className="absolute inset-0 bg-[#b5683f]/70" />
        <div
          className="absolute inset-x-0 top-0 h-16 animate-[shimmer_6s_linear_infinite] opacity-60"
          style={{
            background:
              "repeating-linear-gradient(90deg,#f5c451 0 18px,#e08a6c 18px 36px)",
            backgroundSize: "200% 100%",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* couple silhouettes looking at the sunset */}
        <Reveal from="scale">
          <div
            className="mx-auto mb-2 w-fit"
            style={{ filter: "brightness(0.15) saturate(0)" }}
          >
            <Couple height={150} walking={false} shadow={false} />
          </div>
          <div className="mx-auto h-2 w-48 rounded-full bg-night-deep/30 blur-[2px]" />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="font-display mt-10 text-xs leading-relaxed text-night-deep sm:text-base">
            PLAYER 1 · {wedding.groom.toUpperCase()}
            <br />
            <span className="text-rose-deep">&</span>
            <br />
            PLAYER 2 · {wedding.bride.toUpperCase()}
          </p>
          <p className="mt-6 text-2xl text-night-deep sm:text-3xl">
            ...iniciando uma nova jornada juntos.
          </p>
        </Reveal>

        {/* Retro credits */}
        <Reveal delay={0.2}>
          <div className="pixel-panel mx-auto mt-14 max-w-md p-6 text-left">
            <p className="font-display mb-5 text-center text-[0.65rem] text-gold-soft text-glow sm:text-xs">
              ─ CRÉDITOS ─
            </p>
            <ul className="space-y-3">
              {credits.map((c) => (
                <li key={c.role} className="leading-tight">
                  <span className="font-display block text-[0.5rem] uppercase tracking-wider text-rose-soft">
                    {c.role}
                  </span>
                  <span className="text-xl text-cream">{c.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="font-display mt-12 animate-blink text-sm text-night-deep sm:text-lg">
            ♥ THE BEGINNING ♥
          </p>
          <button onClick={toTop} className="pixel-btn pixel-btn--rose mt-8">
            ▲ Voltar ao início
          </button>
          <p className="mt-10 text-base text-night-deep/60">
            © {wedding.dateLabel} · feito com pixels e amor para {wedding.groom} &{" "}
            {wedding.bride}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
