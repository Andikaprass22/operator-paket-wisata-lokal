import type { Package } from "../../content/types";

export function MeetingPoint({ pkg }: { pkg: Package }) {
  return (
    <div className="rounded-2xl border border-deep-900/10 bg-sand-100 p-5">
      <h4 className="text-xs font-semibold uppercase tracking-widest text-deep-700">
        Titik kumpul
      </h4>
      <p className="mt-2 text-sm leading-relaxed text-charcoal/85">
        {pkg.meetingPoint}
      </p>
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-charcoal/75">Jumlah peserta</dt>
          <dd className="text-deep-950">
            {pkg.minParticipants}–{pkg.maxParticipants} orang
          </dd>
        </div>
        <div>
          <dt className="text-charcoal/75">Ketersediaan</dt>
          <dd className="text-deep-950">{pkg.seatsNote}</dd>
        </div>
      </dl>
    </div>
  );
}
