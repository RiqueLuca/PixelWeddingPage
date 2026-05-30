"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  /** Optional emoji/text fallback shown if the sprite file is missing. */
  fallback?: React.ReactNode;
  draggable?: boolean;
};

/**
 * Pixel-art <img> that hides itself (or shows a fallback) when the asset
 * file doesn't exist yet. Lets us build the UI before every PixelLab asset
 * has been downloaded.
 */
export default function SpriteImage({
  src,
  alt,
  className = "",
  style,
  fallback,
  draggable = false,
}: Props) {
  const [errored, setErrored] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Images that 404 before React attaches onError (e.g. during SSR/hydration)
  // never fire the event — detect those broken images on mount.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setErrored(true);
  }, [src]);

  if (errored) {
    if (fallback === undefined) return null;
    return (
      <span
        className={`flex items-center justify-center ${className}`}
        style={style}
        aria-label={alt}
        role="img"
      >
        {fallback}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={`pixelated ${className}`}
      style={style}
      draggable={draggable}
      onError={() => setErrored(true)}
    />
  );
}
