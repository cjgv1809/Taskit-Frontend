import FeaturedCharacteristics from "@/components/FeaturedCharacteristics";
import Hero from "@/components/Hero";
import MiddleSection from "@/components/MiddleSection";
import TrialSection from "@/components/TrialSection";

function HomeView() {
  return (
    <main>
      <Hero />
      <MiddleSection />
      <FeaturedCharacteristics />
      <TrialSection />
    </main>
  );
}

export default HomeView;
