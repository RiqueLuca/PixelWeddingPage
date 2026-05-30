"use client";

import { useEffect, useRef, useState } from "react";
import { audio } from "@/lib/assets";

/**
 * Fixed pixel button that plays/pauses looping ambient music.
 * Browsers block autoplay with sound, so it starts paused until the user
 * clicks. If the audio file is missing it disables itself silently.
 */
export default function MusicToggle() {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.volume = 0.35;
  }, []);

  const toggle = async () => {
    const el = ref.current;
    if (!el) return;
    try {
      if (playing) {
        el.pause();
        setPlaying(false);
      } else {
        await el.play();
        setPlaying(true);
      }
    } catch {
      setAvailable(false);
    }
  };

  return (
    <>
      <audio
        ref={ref}
        src={audio.ambient}
        loop
        preload="none"
        onError={() => setAvailable(false)}
      />
      <button
        onClick={toggle}
        disabled={!available}
        aria-label={playing ? "Pausar música" : "Tocar música"}
        title={
          available
            ? playing
              ? "Pausar música"
              : "Tocar música ambiente"
            : "Música indisponível (adicione public/audio/ambient.mp3)"
        }
        className="font-display fixed right-3 top-3 z-[60] flex items-center gap-2 border-2 border-night-deep bg-night-soft/90 px-3 py-2 text-[0.55rem] text-gold-soft shadow-pixel-sm backdrop-blur-sm transition-transform hover:translate-y-[1px] disabled:opacity-40 sm:right-5 sm:top-5 sm:text-[0.65rem]"
      >
        <span className="text-base leading-none">
          {available ? (playing ? "🔊" : "🔈") : "🔇"}
        </span>
        <span className="hidden sm:inline">
          {playing ? "SOM ON" : "SOM OFF"}
        </span>
      </button>
    </>
  );
}
