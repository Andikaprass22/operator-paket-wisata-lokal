import { useMemo, useState } from "react";
import { PackageFilter } from "../components/packages/PackageFilter";
import { PackageGrid } from "../components/packages/PackageGrid";
import { ClosingCta } from "../components/sections/ClosingCta";
import { FaqSection } from "../components/sections/FaqSection";
import { Gallery } from "../components/sections/Gallery";
import { Hero } from "../components/sections/Hero";
import { OperatorProfileSection } from "../components/sections/OperatorProfileSection";
import { ReviewsSection } from "../components/sections/ReviewsSection";
import { TravelInfoSection } from "../components/sections/TravelInfoSection";
import { TripForm } from "../components/sections/TripForm";
import { SectionHeading } from "../components/ui/SectionHeading";
import { faqItems } from "../content/faq";
import { galleryItems } from "../content/gallery";
import { operatorProfile } from "../content/operator";
import { packages } from "../content/packages";
import { reviews } from "../content/reviews";
import { site } from "../content/site";
import { travelInfo } from "../content/travelInfo";
import {
  countActiveFilters,
  defaultFilters,
  filterPackages,
} from "../lib/filters";
import type { FilterState } from "../lib/filters";

export default function HomePage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const results = useMemo(() => filterPackages(packages, filters), [filters]);
  const resetFilters = () => setFilters(defaultFilters);

  return (
    <main>
      <Hero site={site} />

      <section id="paket" className="scroll-mt-24 bg-sand-100 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Paket wisata"
            title="Pilih paket sesuai gaya perjalanan Anda"
            description="Saring berdasarkan durasi, jenis aktivitas, atau kisaran harga."
          />

          <div className="mt-8">
            <PackageFilter
              value={filters}
              onChange={setFilters}
              resultCount={results.length}
              activeCount={countActiveFilters(filters)}
              onReset={resetFilters}
            />
          </div>

          <div className="mt-8">
            <PackageGrid packages={results} onReset={resetFilters} />
          </div>
        </div>
      </section>

      <Gallery items={galleryItems} />
      <OperatorProfileSection profile={operatorProfile} />
      <ReviewsSection reviews={reviews} />
      <TravelInfoSection blocks={travelInfo} />
      <FaqSection items={faqItems} />
      <TripForm packages={packages} />
      <ClosingCta site={site} />
    </main>
  );
}
