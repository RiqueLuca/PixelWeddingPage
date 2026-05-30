// Asset path manifest. Files live under /public/assets and are generated
// via PixelLab AI. Components degrade gracefully if a file is missing.
//
// All paths are prefixed with the deploy base path (e.g. "/PixelWeddingPage"
// on GitHub Pages) so they resolve correctly when the site is served from a
// subfolder. Locally NEXT_PUBLIC_BASE_PATH is empty, so paths stay at root.
const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";
const a = (p: string) => `${bp}${p}`;

export const props = {
  tree: a("/assets/props/tree.png"),
  lamp: a("/assets/props/lamp.png"),
  bench: a("/assets/props/bench.png"),
  cottage: a("/assets/props/cottage.png"),
  palm: a("/assets/props/palm.png"),
  arch: a("/assets/props/arch.png"),
  bush: a("/assets/props/bush.png"),
  cafe: a("/assets/props/cafe.png"),
  cafeTable: a("/assets/props/cafe-table.png"),
  umbrella: a("/assets/props/umbrella.png"),
  ring: a("/assets/props/ring.png"),
  bouquet: a("/assets/props/bouquet.png"),
  minimap: a("/assets/props/minimap.png"),
  cloud: a("/assets/props/cloud.png"),
};

export const characters = {
  // Side profile (facing right) — used for the walking journey.
  groom: a("/assets/characters/groom.png"),
  bride: a("/assets/characters/bride.png"),
  // Front-facing — used for the standing hero pose.
  groomFront: a("/assets/characters/groom-south.png"),
  brideFront: a("/assets/characters/bride-south.png"),
};

export const tiles = {
  grass: a("/assets/tiles/grass.png"),
  sand: a("/assets/tiles/sand.png"),
  cobblestone: a("/assets/tiles/cobblestone.png"),
};

export const audio = {
  ambient: a("/audio/ambient.mp3"),
};

// Gallery photos — drop your pictures here (any size; they'll render pixelated).
export const gallery = [
  { src: a("/assets/gallery/foto1.png"), title: "Carta I", caption: "O Encontro" },
  { src: a("/assets/gallery/foto2.png"), title: "Carta II", caption: "Primeiro Café" },
  { src: a("/assets/gallery/foto3.png"), title: "Carta III", caption: "A Viagem" },
  { src: a("/assets/gallery/foto4.png"), title: "Carta IV", caption: "O Pedido" },
  { src: a("/assets/gallery/foto5.png"), title: "Carta V", caption: "Aventuras" },
  { src: a("/assets/gallery/foto6.png"), title: "Carta VI", caption: "Para Sempre" },
];
