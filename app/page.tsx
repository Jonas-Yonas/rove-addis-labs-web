import { CapabilitiesSection } from "@/components/home/capabilities-section";
import { CtaSection } from "@/components/home/cta-section";
import { HeroSection } from "@/components/home/hero-section";
import { InsightsSection } from "@/components/home/insights-section";
import { LabsSection } from "@/components/home/labs-section";
import { ProductsSection } from "@/components/home/products-section";
import { SolutionsSection } from "@/components/home/solutions-section";
import { WorkSection } from "@/components/home/work-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CapabilitiesSection />
      <SolutionsSection />
      <ProductsSection />
      <LabsSection />
      <WorkSection />
      <InsightsSection />
      <CtaSection />
    </>
  );
}
