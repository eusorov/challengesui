import { LandingBerlinSection } from "@/features/landing/LandingBerlinSection";
import { LandingBigJoin } from "@/features/landing/LandingBigJoin";
import { LandingCategories } from "@/features/landing/LandingCategories";
import { LandingFooter } from "@/features/landing/LandingFooter";
import { LandingFriends } from "@/features/landing/LandingFriends";
import { LandingHero } from "@/features/landing/LandingHero";
import { LandingHowItWorks } from "@/features/landing/LandingHowItWorks";
import { LandingNav } from "@/features/landing/LandingNav";
import "@/features/landing/landing.css";

export default function LandingPage() {
  return (
    <>
      <LandingNav />
      <LandingHero />
      <LandingBerlinSection />
      <LandingBigJoin />
      <LandingCategories />
      <LandingHowItWorks />
      <LandingFriends />
      <LandingFooter />
    </>
  );
}
