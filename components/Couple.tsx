"use client";

import SpriteImage from "./SpriteImage";
import { characters } from "@/lib/assets";

type Props = {
  /** pixel height of each character */
  height?: number;
  /** play the walking bob animation */
  walking?: boolean;
  /** flip to face left */
  faceLeft?: boolean;
  className?: string;
  /** show a soft ground shadow under each character */
  shadow?: boolean;
  /** "front" = facing viewer (standing), "side" = right profile (walking) */
  view?: "front" | "side";
};

function Char({
  src,
  alt,
  fallback,
  height,
  walking,
  delay,
  shadow,
}: {
  src: string;
  alt: string;
  fallback: string;
  height: number;
  walking: boolean;
  delay: string;
  shadow: boolean;
}) {
  return (
    <div className="relative flex flex-col items-center" style={{ height }}>
      <SpriteImage
        src={src}
        alt={alt}
        fallback={<span style={{ fontSize: height * 0.7 }}>{fallback}</span>}
        className={walking ? "animate-bob" : "animate-float-slow"}
        style={{ height, width: "auto", animationDelay: delay }}
      />
      {shadow && (
        <span
          className="absolute -bottom-1 left-1/2 -z-10 -translate-x-1/2 rounded-full bg-night-deep/50 blur-[2px]"
          style={{ width: height * 0.55, height: height * 0.12 }}
          aria-hidden
        />
      )}
    </div>
  );
}

export default function Couple({
  height = 120,
  walking = false,
  faceLeft = false,
  className = "",
  shadow = true,
  view = "side",
}: Props) {
  const groomSrc = view === "front" ? characters.groomFront : characters.groom;
  const brideSrc = view === "front" ? characters.brideFront : characters.bride;
  return (
    <div
      className={`flex items-end justify-center ${view === "front" ? "gap-2" : "gap-0"} ${className}`}
      style={{ transform: faceLeft ? "scaleX(-1)" : undefined }}
    >
      <Char
        src={groomSrc}
        alt="Henrique"
        fallback="🤴"
        height={height}
        walking={walking}
        delay="0ms"
        shadow={shadow}
      />
      <Char
        src={brideSrc}
        alt="Thayna"
        fallback="👰"
        height={height}
        walking={walking}
        delay="0.2s"
        shadow={shadow}
      />
    </div>
  );
}
