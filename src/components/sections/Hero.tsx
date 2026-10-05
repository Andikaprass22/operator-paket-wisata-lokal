import { packages } from "../../content/packages";
import type { SiteConfig } from "../../content/types";
import { LinkButton } from "../ui/Button";
import { SmartImage } from "../ui/SmartImage";
import { WhatsAppButton } from "../ui/WhatsAppButton";

export function Hero({ site }: { site: SiteConfig }) {
  return (
    <section id="beranda" className="scroll-mt-24">
      <div className="relative min-h-[85vh] w-full overflow-hidden bg-deep-950">
        <SmartImage
          src="/images/hero-rinjani.svg"
          alt="Ilustrasi lanskap pegunungan Lombok saat matahari terbit"
          fill
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-950/70 via-deep-950/40 to-deep-950/90" />

        <div className="relative mx-auto flex min-h-[85vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lagoon-300">
            {site.region}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-sand-50 sm:text-5xl lg:text-6xl">
            {site.heroHeadline}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-sand-100/85">
            {site.heroSubhead}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <LinkButton href="#paket" size="lg">
              Lihat Paket
            </LinkButton>
            <WhatsAppButton
              number={site.whatsappNumber}
              ctx={{}}
              size="lg"
              variant="whatsapp"
            >
              Tanya via WhatsApp
            </WhatsAppButton>
          </div>

          <dl className="mt-14 grid max-w-2xl grid-cols-1 gap-6 border-t border-sand-100/20 pt-7 text-sand-50 sm:grid-cols-3">
            <div>
              <dt className="text-xs uppercase tracking-widest text-lagoon-300">
                Pilihan paket
              </dt>
              <dd className="mt-1 font-display text-2xl">
                {packages.length} paket
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-lagoon-300">
                Cakupan
              </dt>
              <dd className="mt-1 font-display text-2xl">Lintas wilayah</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-lagoon-300">
                Respons
              </dt>
              <dd className="mt-1 font-display text-2xl">WhatsApp</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
