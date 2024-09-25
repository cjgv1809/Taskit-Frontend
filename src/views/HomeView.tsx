import { useRedirectIfAuthenticated } from "@/hooks";
import FeaturedCharacteristics from "@/components/FeaturedCharacteristics";
import Hero from "@/components/Hero";
import MiddleSection from "@/components/MiddleSection";
import TrialSection from "@/components/TrialSection";

function HomeView() {
  const isLoading = useRedirectIfAuthenticated();

  if (isLoading) return <div>Loading...</div>; // Show loading while auth state is determined

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
