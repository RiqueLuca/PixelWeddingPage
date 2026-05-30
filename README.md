# 💍 Henrique & Thayna — Nossa Aventura em Pixel Art

Site de casamento interativo em **pixel art 2D**, estilo JRPG / cozy game
(Stardew Valley, Chrono Trigger), com scroll animado, parallax, contagem
regressiva em tempo real, partículas pixeladas e a "aventura do casal" como
um jogo jogável. Data do casamento: **13 de março de 2027**.

Feito com **Next.js 14 + TypeScript + Tailwind CSS + Framer Motion**.
Assets pixel art gerados via **PixelLab AI**.

---

## 🚀 Como rodar

```bash
npm install
npm run dev      # http://localhost:3000
```

Build de produção (saída estática, pode hospedar em Vercel/Netlify/qualquer host):

```bash
npm run build
npm start
```

---

## ✏️ Como personalizar (o essencial fica em 1 arquivo)

Quase tudo de texto/conteúdo está em [`lib/config.ts`](lib/config.ts):

- **Nomes** dos noivos, **data/hora** e frase do hero.
- **Local, endereço, horário, dress code** da seção do casamento.
- **Link de RSVP** (`rsvp.url`): cole aqui o link do seu Google Forms. Se ficar
  vazio, o botão "Confirmar presença" abre um e-mail pré-preenchido.
- **`story[]`**: os 4 capítulos da história (parque, cafeteria, praia, pedido),
  com os diálogos no balão estilo JRPG.

> ⚠️ Alguns valores estão como **placeholder** ("A definir", "Endereço a
> confirmar"). Edite-os com as informações reais do evento.

---

## 📸 Adicionar suas fotos (galeria)

Coloque 6 imagens em `public/assets/gallery/` com os nomes:
`foto1.png`, `foto2.png`, ... `foto6.png` (qualquer tamanho — são exibidas
pixeladas dentro das "cartas colecionáveis"). Pode trocar os títulos/legendas
em `gallery` dentro de [`lib/assets.ts`](lib/assets.ts).

## 🎵 Música ambiente

Coloque um arquivo em `public/audio/ambient.mp3`. O botão **SOM** (canto
superior direito) liga/desliga. Sem o arquivo, o botão fica desabilitado.

---

## 🧙 Personagens do casal (pixel art a partir das suas fotos)

Os sprites atuais em `public/assets/characters/` (`groom*.png`, `bride*.png`)
são **placeholders genéricos**. Para versões fiéis a vocês, envie as fotos —
o gerador do PixelLab é por descrição de texto, então traduzimos cada foto
(cabelo, tom de pele, traços, roupa) em um sprite. É só substituir os arquivos:

- `groom.png` / `bride.png` → perfil lateral (usado na caminhada da história)
- `groom-south.png` / `bride-south.png` → de frente (usado no hero em pé)

Depois de baixar novos sprites, rode os utilitários para limpar fundo e bordas:

```bash
python scripts/cutout.py   # remove fundo opaco (se houver)
python scripts/trim.py     # corta a transparência sobrando
```

---

## 🗂️ Estrutura

```
app/                 layout, página única, estilos globais
components/          Hero, StoryJourney, WeddingInfo, Gallery, Finale,
                     Countdown, Couple, Particles, Starfield, MusicToggle...
lib/config.ts        TODO o conteúdo editável (nomes, data, evento, história)
lib/assets.ts        caminhos dos sprites/props
public/assets/props  cenário pixel art (árvore, café, arco de flores, etc.)
public/assets/characters  sprites do casal
scripts/             trim.py / cutout.py (processamento de sprites)
```

Feito com pixels e amor 💕
