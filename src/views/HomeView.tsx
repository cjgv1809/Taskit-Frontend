import FeaturedCharacteristics from "@/components/FeaturedCharacteristics";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MiddleSection from "@/components/MiddleSection";
import TrialSection from "@/components/TrialSection";

function HomeView() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MiddleSection />
        <FeaturedCharacteristics />
        <TrialSection />
      </main>
      <Footer />
    </>
  );
}

export default HomeView;
