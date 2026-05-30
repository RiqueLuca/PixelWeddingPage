"use client";

import Reveal from "./Reveal";
import Particles from "./Particles";
import SpriteImage from "./SpriteImage";
import { wedding } from "@/lib/config";
import { props } from "@/lib/assets";

const stats: { icon: string; label: string; value: string }[] = [
  { icon: "📅", label: "Data", value: wedding.dateLabel },
  { icon: "⏰", label: "Horário", value: wedding.event.horario },
  { icon: "🏰", label: "Local", value: wedding.event.local },
  { icon: "📍", label: "Endereço", value: wedding.event.endereco },
  { icon: "👗", label: "Dress code", value: wedding.event.dressCode },
];

export default function WeddingInfo() {
  const rsvpHref = wedding.rsvp.url
    ? wedding.rsvp.url
    : `mailto:${wedding.rsvp.email}?subject=${encodeURIComponent(
        `Confirmação de presença — ${wedding.groom} & ${wedding.bride}`
      )}&body=${encodeURIComponent(
        "Olá! Confirmo minha presença no casamento. \n\nNome:\nNº de convidados:\nObservações:"
      )}`;

  return (
    <section
      id="casamento"
      className="relative overflow-hidden bg-night px-4 py-20"
      style={{
        background:
          "linear-gradient(180deg,#f5c451 0%,#e08a6c 6%,#2a1b4d 22%,#1a1033 100%)",
      }}
    >
      <Particles kind="stars" count={16} />

      <div className="relative z-10 mx-auto max-w-5xl">
        <Reveal>
          <h2 className="font-display text-center text-xl text-pixel-shadow text-shimmer sm:text-3xl">
            ⚔ O Grande Evento ⚔
          </h2>
          <p className="mt-3 text-center text-xl text-cream/80">
            Sua presença é a recompensa lendária desta jornada
          </p>
        </Reveal>

        <div className="mt-12 grid items-start gap-8 md:grid-cols-2">
          {/* RPG status menu */}
          <Reveal from="right">
            <div className="pixel-panel p-5 sm:p-7">
              <p className="font-display mb-4 border-b-2 border-gold/40 pb-3 text-[0.65rem] text-gold-soft sm:text-xs">
                ▣ MENU · INFORMAÇÕES
              </p>
              <ul className="space-y-4">
                {stats.map((s) => (
                  <li key={s.label} className="flex items-start gap-3">
                    <span className="text-2xl leading-none">{s.icon}</span>
                    <div>
                      <p className="font-display text-[0.55rem] uppercase tracking-wider text-rose-soft sm:text-[0.65rem]">
                        {s.label}
                      </p>
                      <p className="text-xl text-cream">{s.value}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-7 text-center">
                <a
                  href={rsvpHref}
                  target={wedding.rsvp.url ? "_blank" : undefined}
                  rel="noreferrer"
                  className="pixel-btn"
                >
                  ✚ Confirmar presença
                </a>
                <p className="mt-3 text-base text-cream/60">
                  {wedding.rsvp.deadlineLabel}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Mini-map */}
          <Reveal from="left" delay={0.1}>
            <div className="pixel-panel pixel-panel--rose p-5 sm:p-7">
              <p className="font-display mb-4 border-b-2 border-rose/40 pb-3 text-[0.65rem] text-rose-soft sm:text-xs">
                ▣ MAPA DO REINO
              </p>
              <div className="relative flex items-center justify-center">
                <SpriteImage
                  src={props.minimap}
                  alt="Mini-mapa do local do casamento"
                  fallback={<span className="text-7xl">🗺️</span>}
                  className="h-56 w-auto drop-shadow-[4px_4px_0_rgba(13,8,32,0.6)]"
                />
                <span className="absolute bottom-2 right-2 animate-bob text-2xl">📍</span>
              </div>
              <p className="mt-4 text-center text-lg text-cream/70">
                {wedding.event.local} · {wedding.event.cidade}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
