"use client";

import Reveal from "./Reveal";
import SpriteImage from "./SpriteImage";
import { gallery } from "@/lib/assets";

export default function Gallery() {
  return (
    <section
      id="galeria"
      className="relative overflow-hidden bg-night-deep px-4 py-20"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-display text-center text-xl text-pixel-shadow text-shimmer sm:text-3xl">
            ✦ Álbum de Cartas ✦
          </h2>
          <p className="mt-3 text-center text-xl text-cream/80">
            Passe o mouse para virar cada carta colecionável
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-8">
          {gallery.map((card, i) => (
            <Reveal key={card.title} from="scale" delay={i * 0.08}>
              <div className="group [perspective:900px]">
                <div className="relative aspect-[3/4] w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front: photo card */}
                  <div className="absolute inset-0 [backface-visibility:hidden]">
                    <div className="card-frame flex h-full w-full flex-col">
                      <div className="relative flex-1 overflow-hidden border-2 border-night-deep bg-night-soft">
                        <SpriteImage
                          src={card.src}
                          alt={card.caption}
                          fallback={
                            <span className="flex h-full w-full flex-col items-center justify-center gap-2 text-cream/60">
                              <span className="text-4xl">❔</span>
                              <span className="font-display text-[0.5rem]">FOTO AQUI</span>
                            </span>
                          }
                          className="h-full w-full object-cover"
                          style={{ objectFit: "cover" }}
                        />
                        <span className="absolute right-1 top-1 font-display text-[0.5rem] text-gold-soft text-glow">
                          ★
                        </span>
                      </div>
                      <p className="font-display mt-2 text-center text-[0.5rem] text-night-deep sm:text-[0.6rem]">
                        {card.caption}
                      </p>
                    </div>
                  </div>

                  {/* Back: card back */}
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <div className="card-frame flex h-full w-full items-center justify-center">
                      <div className="flex h-full w-full flex-col items-center justify-center gap-3 border-2 border-night-deep bg-gradient-to-br from-night-soft to-night-deep p-3 text-center">
                        <span className="text-3xl">💖</span>
                        <p className="font-display text-[0.55rem] text-gold-soft sm:text-[0.7rem]">
                          {card.title}
                        </p>
                        <p className="text-base text-cream/80">{card.caption}</p>
                        <span className="font-display text-[0.45rem] text-rose-soft">
                          ✦ memória rara ✦
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center text-base text-cream/50">
          (Adicione suas fotos em <code className="text-gold-soft">public/assets/gallery/</code>)
        </p>
      </div>
    </section>
  );
}
