// Central wedding configuration. Edit these values freely.
export const wedding = {
  groom: "Henrique",
  bride: "Thayna",
  // Wedding date/time — adjust the time to the real ceremony time.
  // Month is 0-indexed in JS Date: 2 = March.
  date: new Date(2027, 2, 13, 16, 0, 0),
  dateLabel: "13 de Março de 2027",
  tagline: "Nossa aventura começa para sempre em 13 de março de 2027",
  hero: {
    questText: "Pressione START para começar nossa jornada",
  },
  // Event details — placeholders, replace with the real info.
  event: {
    local: "Igreja Santissima Trindade",
    endereco: "Igreja Santissima Trindade",
    horario: "16h30",
    dressCode: "Traje social",
    cidade: "Brasil",
  },
  rsvp: {
    // Put your RSVP form link here (Google Forms, etc.). Empty = mailto fallback.
      url: "https://docs.google.com/forms/d/e/1FAIpQLSfTWAPTufbNJYENXJwLXHRwnjnUvkbPwkq_VsoN0CS9eKnZHA/viewform?usp=publish-editor",
    email: "henriqueluca.p@gmail.com",
    deadlineLabel: "Confirme até 13 de fevereiro de 2027",
  },
} as const;

export type StoryChapter = {
  id: string;
  scene: "parque" | "cafeteria" | "praia" | "pedido";
  title: string;
  date: string;
  dialogue: string[];
  speaker?: "Henrique" | "Thayna" | "Narrador";
};

export const story: StoryChapter[] = [
  {
    id: "encontro",
    scene: "parque",
    title: "Capítulo I — O Encontro",
    date: "Onde tudo começou",
    speaker: "Narrador",
    dialogue: [
      "Numa tarde dourada, dois aventureiros cruzaram o mesmo caminho no parque...",
      "Henrique: — Acho que nossa party acabou de ganhar um novo membro. ✨",
    ],
  },
  {
    id: "cafe",
    scene: "cafeteria",
    title: "Capítulo II — O Primeiro Café",
    date: "As primeiras conversas",
    speaker: "Thayna",
    dialogue: [
      "Entre xícaras quentes e risadas, o tempo virou +999 de afeto.",
      "Thayna: — Com você, até o café mais simples vira uma quest épica. ☕",
    ],
  },
  {
    id: "praia",
    scene: "praia",
    title: "Capítulo III — A Aventura",
    date: "Mares, viagens e sonhos",
    speaker: "Narrador",
    dialogue: [
      "Pés na areia, mãos dadas — exploraram litorais e colecionaram pôr do sol.",
      "Henrique & Thayna: — Level up no amor! 🌊",
    ],
  },
  {
    id: "pedido",
    scene: "pedido",
    title: "Capítulo IV — O Pedido",
    date: "Para sempre desbloqueado",
    speaker: "Henrique",
    dialogue: [
      "Sob luzes douradas, um joelho no chão e um anel brilhante...",
      "Henrique: — Quer ser meu Player 2 para o resto da vida?",
      "Thayna: — SIM! ❤️ (Conquista desbloqueada: Noivos)",
    ],
  },
];
