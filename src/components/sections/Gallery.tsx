import type { GalleryItem } from "../../content/types";
import { SectionHeading } from "../ui/SectionHeading";
import { SmartImage } from "../ui/SmartImage";

export function Gallery({ items }: { items: GalleryItem[] }) {
  return (
    <section id="galeri" className="scroll-mt-24 bg-sand-50 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Galeri"
          title="Destinasi dan aktivitas"
          description="Sekilas tempat yang akan Anda kunjungi bersama pemandu lokal."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <figure
              key={item.id}
              className="overflow-hidden rounded-2xl bg-sand-100"
            >
              <SmartImage src={item.src} alt={item.alt} ratio="aspect-[4/3]" />
              <figcaption className="p-4 text-sm text-charcoal/75">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
