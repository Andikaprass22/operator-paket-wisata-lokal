import type { ItineraryStop } from "../../content/types";

export function Itinerary({ stops }: { stops: ItineraryStop[] }) {
  return (
    <ol className="relative space-y-7 border-l border-deep-900/15 pl-7">
      {stops.map((stop) => (
        <li key={`${stop.time}-${stop.title}`} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[35px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-sand-50 bg-lagoon-500"
          />
          <p className="text-xs font-semibold uppercase tracking-widest text-deep-700">
            {stop.time}
          </p>
          <h4 className="mt-1 font-display text-lg text-deep-950">
            {stop.title}
          </h4>
          <p className="mt-1 text-sm leading-relaxed text-charcoal/80">
            {stop.detail}
          </p>
        </li>
      ))}
    </ol>
  );
}
