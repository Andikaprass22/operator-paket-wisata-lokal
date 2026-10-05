import type { ReactNode } from "react";
import type { TravelInfoBlock } from "../../content/types";
import { SectionHeading } from "../ui/SectionHeading";

const ICONS: Record<TravelInfoBlock["icon"], ReactNode> = {
  plane: (
    <path d="M2 12l18-7-4 8 4 8-18-7 5-1z" />
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
    </>
  ),
  bag: (
    <>
      <rect x="4" y="7" width="16" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
};

export function TravelInfoSection({ blocks }: { blocks: TravelInfoBlock[] }) {
  return (
    <section id="informasi" className="scroll-mt-24 bg-sand-50 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Info perjalanan"
          title="Sebelum berangkat"
          description="Transportasi, cuaca, persiapan barang, dan hal yang perlu diperhatikan."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {blocks.map((block) => (
            <article
              key={block.id}
              className="rounded-3xl border border-deep-900/10 bg-sand-100 p-6"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-deep-900 text-sand-50">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {ICONS[block.icon]}
                  </svg>
                </span>
                <h3 className="font-display text-lg text-deep-950">
                  {block.title}
                </h3>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-charcoal/80">
                {block.body}
              </p>

              <ul className="mt-4 space-y-2 text-sm text-charcoal/80">
                {block.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span aria-hidden="true" className="text-lagoon-500">
                      •
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
