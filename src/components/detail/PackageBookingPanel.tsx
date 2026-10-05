import { useState } from "react";
import { site } from "../../content/site";
import type { Package } from "../../content/types";
import { formatRupiah } from "../../lib/format";
import { LinkButton } from "../ui/Button";
import { WhatsAppButton } from "../ui/WhatsAppButton";

const fieldClass =
  "w-full rounded-xl border border-deep-900/20 bg-sand-50 px-3 py-2 text-sm text-deep-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-500";

export function PackageBookingPanel({ pkg }: { pkg: Package }) {
  const [date, setDate] = useState("");
  const [participantsInput, setParticipantsInput] = useState(
    String(pkg.minParticipants),
  );

  const raw = Number(participantsInput);
  const participants =
    !Number.isFinite(raw) || raw < 1
      ? pkg.minParticipants
      : Math.min(Math.max(Math.trunc(raw), pkg.minParticipants), pkg.maxParticipants);

  return (
    <aside className="rounded-3xl border border-deep-900/10 bg-sand-50 p-6 lg:sticky lg:top-24">
      <p className="font-display text-3xl text-deep-950">
        {formatRupiah(pkg.price.amount)}
      </p>
      <p className="mt-1 text-xs text-charcoal/75">{pkg.priceNote}</p>

      <div className="mt-6 space-y-4">
        <div>
          <label
            className="mb-2 block text-xs font-semibold uppercase tracking-widest text-deep-700"
            htmlFor="booking-date"
          >
            Tanggal perjalanan
          </label>
          <input
            id="booking-date"
            type="date"
            className={fieldClass}
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>

        <div>
          <label
            className="mb-2 block text-xs font-semibold uppercase tracking-widest text-deep-700"
            htmlFor="booking-participants"
          >
            Jumlah peserta
          </label>
          <input
            id="booking-participants"
            type="number"
            min={pkg.minParticipants}
            max={pkg.maxParticipants}
            className={fieldClass}
            value={participantsInput}
            onChange={(event) => setParticipantsInput(event.target.value)}
          />
          <p className="mt-1 text-xs text-charcoal/75">
            {pkg.minParticipants}–{pkg.maxParticipants} orang per keberangkatan.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <WhatsAppButton
          number={site.whatsappNumber}
          ctx={{ packageTitle: pkg.title, date, participants }}
          size="md"
          className="w-full"
        >
          Pesan via WhatsApp
        </WhatsAppButton>
        <LinkButton
          href={`/?paket=${pkg.slug}#formulir`}
          variant="secondary"
          size="md"
          className="w-full"
        >
          Ajukan lewat formulir
        </LinkButton>
      </div>

      <p className="mt-4 text-xs text-charcoal/75">
        Ketersediaan dikonfirmasi manual oleh operator.
      </p>
    </aside>
  );
}
