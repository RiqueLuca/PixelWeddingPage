import Hero from "@/components/Hero";
import StoryJourney from "@/components/StoryJourney";
import WeddingInfo from "@/components/WeddingInfo";
import Gallery from "@/components/Gallery";
import Finale from "@/components/Finale";
import MusicToggle from "@/components/MusicToggle";

export default function Home() {
  return (
    <main className="relative">
      <MusicToggle />
      <Hero />
      <StoryJourney />
      <WeddingInfo />
      <Gallery />
      <Finale />
    </main>
  );
}
