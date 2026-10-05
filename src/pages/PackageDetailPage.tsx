import { useParams } from "react-router-dom";
import { Inclusions } from "../components/detail/Inclusions";
import { Itinerary } from "../components/detail/Itinerary";
import { MeetingPoint } from "../components/detail/MeetingPoint";
import { PackageBookingPanel } from "../components/detail/PackageBookingPanel";
import { Badge } from "../components/ui/Badge";
import { LinkButton } from "../components/ui/Button";
import { SmartImage } from "../components/ui/SmartImage";
import { packages } from "../content/packages";
import { formatTanggal } from "../lib/format";
import { ACTIVITY_LABEL } from "../lib/labels";

export default function PackageDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const pkg = packages.find((item) => item.slug === slug);

  if (!pkg) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl text-deep-950">
          Paket tidak ditemukan
        </h1>
        <p className="mt-4 text-base text-charcoal/75">
          Paket yang Anda cari tidak tersedia, atau sudah diganti oleh operator.
        </p>
        <div className="mt-8 flex justify-center">
          <LinkButton href="/" size="lg">
            Kembali ke daftar paket
          </LinkButton>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 pt-6">
        <a
          href="/#paket"
          className="text-sm font-medium text-deep-700 hover:text-deep-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-500"
        >
          {"\u2190"} Kembali ke daftar paket
        </a>
      </div>

      <header className="mx-auto mt-6 max-w-6xl px-4">
        <SmartImage
          src={pkg.heroImage}
          alt={`Ilustrasi ${pkg.title}`}
          ratio="aspect-[16/7]"
          className="rounded-3xl"
        />
        <div className="mt-6 flex flex-wrap gap-2">
          {pkg.activityTypes.map((activity) => (
            <Badge key={activity} tone="lagoon">
              {ACTIVITY_LABEL[activity]}
            </Badge>
          ))}
        </div>
        <h1 className="mt-4 max-w-3xl font-display text-3xl leading-tight text-deep-950 sm:text-4xl">
          {pkg.title}
        </h1>
        <p className="mt-2 text-sm text-charcoal/70">
          {pkg.destination} · {pkg.durationLabel}
        </p>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-charcoal/85">
          {pkg.summary}
        </p>
      </header>

      <div className="mx-auto mt-14 grid max-w-6xl gap-12 px-4 pb-20 lg:grid-cols-[1fr_minmax(0,360px)]">
        <div className="space-y-12">
          <section>
            <h2 className="font-display text-2xl text-deep-950">Sekilas</h2>
            <ul className="mt-4 space-y-2 text-sm text-charcoal/85">
              {pkg.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2">
                  <span aria-hidden="true" className="text-lagoon-500">
                    •
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-deep-950">
              Rencana perjalanan
            </h2>
            <div className="mt-5">
              <Itinerary stops={pkg.itinerary} />
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl text-deep-950">Fasilitas</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {pkg.facilities.map((facility) => (
                <li key={facility}>
                  <Badge tone="sand">{facility}</Badge>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-deep-950">
              Yang termasuk & tidak termasuk
            </h2>
            <div className="mt-5">
              <Inclusions included={pkg.included} excluded={pkg.excluded} />
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl text-deep-950">Jadwal</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {pkg.schedule.map((date) => (
                <li key={date}>
                  <Badge tone="lagoon">{formatTanggal(date)}</Badge>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <MeetingPoint pkg={pkg} />
          </section>
        </div>

        <PackageBookingPanel pkg={pkg} />
      </div>
    </main>
  );
}
