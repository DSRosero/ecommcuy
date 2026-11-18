import { HeroBanner } from "@/components/hero-banner";
import { CatalogSection } from "@/components/catalog-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner />
      <CatalogSection />
    </div>
  );
}
