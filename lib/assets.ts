// Asset path manifest. Files live under /public/assets and are generated
// via PixelLab AI. Components degrade gracefully if a file is missing.
export const props = {
  tree: "/assets/props/tree.png",
  lamp: "/assets/props/lamp.png",
  bench: "/assets/props/bench.png",
  cottage: "/assets/props/cottage.png",
  palm: "/assets/props/palm.png",
  arch: "/assets/props/arch.png",
  bush: "/assets/props/bush.png",
  cafe: "/assets/props/cafe.png",
  cafeTable: "/assets/props/cafe-table.png",
  umbrella: "/assets/props/umbrella.png",
  ring: "/assets/props/ring.png",
  bouquet: "/assets/props/bouquet.png",
  minimap: "/assets/props/minimap.png",
  cloud: "/assets/props/cloud.png",
} as const;

// Gallery photos — drop your pictures here (any size; they'll render pixelated).
export const gallery = [
  { src: "/assets/gallery/foto1.png", title: "Carta I", caption: "O Encontro" },
  { src: "/assets/gallery/foto2.png", title: "Carta II", caption: "Primeiro Café" },
  { src: "/assets/gallery/foto3.png", title: "Carta III", caption: "A Viagem" },
  { src: "/assets/gallery/foto4.png", title: "Carta IV", caption: "O Pedido" },
  { src: "/assets/gallery/foto5.png", title: "Carta V", caption: "Aventuras" },
  { src: "/assets/gallery/foto6.png", title: "Carta VI", caption: "Para Sempre" },
] as const;

export const characters = {
  // Side profile (facing right) — used for the walking journey.
  groom: "/assets/characters/groom.png",
  bride: "/assets/characters/bride.png",
  // Front-facing — used for the standing hero pose.
  groomFront: "/assets/characters/groom-south.png",
  brideFront: "/assets/characters/bride-south.png",
} as const;

export const tiles = {
  grass: "/assets/tiles/grass.png",
  sand: "/assets/tiles/sand.png",
  cobblestone: "/assets/tiles/cobblestone.png",
} as const;

export const audio = {
  ambient: "/audio/ambient.mp3",
} as const;
