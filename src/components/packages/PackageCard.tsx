import { site } from "../../content/site";
import type { ActivityType, Package } from "../../content/types";
import { formatRupiah, formatTanggal } from "../../lib/format";
import { ACTIVITY_LABEL } from "../../lib/labels";
import { Badge } from "../ui/Badge";
import type { BadgeTone } from "../ui/Badge";
import { LinkButton } from "../ui/Button";
import { SmartImage } from "../ui/SmartImage";
import { WhatsAppButton } from "../ui/WhatsAppButton";

const ACTIVITY_TONE: Record<ActivityType, BadgeTone> = {
  pantai: "lagoon",
  gunung: "neutral",
  budaya: "coral",
  bahari: "lagoon",
  kuliner: "sand",
};

export function PackageCard({ pkg }: { pkg: Package }) {
  const nearestSchedule = pkg.schedule[0];

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-deep-900/10 bg-sand-50 shadow-sm">
      <SmartImage
        src={pkg.heroImage}
        alt={`Ilustrasi ${pkg.title}`}
        ratio="aspect-[4/3]"
      />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-2">
          {pkg.activityTypes.map((activity) => (
            <Badge key={activity} tone={ACTIVITY_TONE[activity]}>
              {ACTIVITY_LABEL[activity]}
            </Badge>
          ))}
        </div>

        <h3 className="mt-4 font-display text-xl leading-snug text-deep-950">
          {pkg.title}
        </h3>
        <p className="mt-1 text-sm text-charcoal/70">{pkg.destination}</p>
        <p className="mt-3 text-sm leading-relaxed text-charcoal/80">
          {pkg.summary}
        </p>

        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-widest text-deep-700">
              Durasi
            </dt>
            <dd className="mt-0.5 text-deep-950">{pkg.durationLabel}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-deep-700">
              Jadwal
            </dt>
            <dd className="mt-0.5 text-deep-950">
              {nearestSchedule ? formatTanggal(nearestSchedule) : "—"}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-xs uppercase tracking-widest text-deep-700">
              Peserta
            </dt>
            <dd className="mt-0.5 text-deep-950">
              {pkg.minParticipants}–{pkg.maxParticipants} orang
            </dd>
          </div>
        </dl>

        <div className="mt-5 border-t border-deep-900/10 pt-4">
          <p className="font-display text-2xl text-deep-950">
            {formatRupiah(pkg.price.amount)}
          </p>
          <p className="mt-1 text-xs text-charcoal/75">{pkg.priceNote}</p>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <LinkButton href={`/paket/${pkg.slug}`} size="sm">
            Lihat Detail
          </LinkButton>
          <WhatsAppButton
            number={site.whatsappNumber}
            ctx={{ packageTitle: pkg.title }}
            size="sm"
          >
            Pesan via WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </article>
  );
}
