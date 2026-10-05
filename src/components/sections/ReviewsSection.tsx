import type { Review } from "../../content/types";
import { SectionHeading } from "../ui/SectionHeading";

export function ReviewsSection({ reviews }: { reviews: Review[] }) {
  return (
    <section id="ulasan" className="scroll-mt-24 bg-sand-50 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Ulasan"
          title="Kata peserta sebelumnya"
          description="Cerita dari peserta yang pernah ikut perjalanan bersama kami."
        />

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => {
            const rating = Math.min(5, Math.max(0, Math.trunc(review.rating)));

            return (
              <figure
                key={review.id}
                className="flex h-full flex-col rounded-3xl border border-deep-900/10 bg-sand-100 p-6"
              >
                <p
                  className="text-lg text-coral-500"
                  aria-label={`Rating ${rating} dari 5`}
                >
                  {"\u2605".repeat(rating)}
                  <span className="text-sand-200">
                    {"\u2605".repeat(5 - rating)}
                  </span>
                </p>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-charcoal/85">
                  {review.text}
                </blockquote>
                <figcaption className="mt-5 border-t border-deep-900/10 pt-4 text-sm">
                  <span className="font-semibold text-deep-950">
                    {review.name}
                  </span>
                  <span className="block text-charcoal/75">
                    {review.origin} · {review.tripLabel}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
