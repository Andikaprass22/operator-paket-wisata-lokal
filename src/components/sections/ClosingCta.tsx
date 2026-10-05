import type { SiteConfig } from "../../content/types";
import { LinkButton } from "../ui/Button";
import { WhatsAppButton } from "../ui/WhatsAppButton";

export function ClosingCta({ site }: { site: SiteConfig }) {
  return (
    <section className="bg-deep-950 px-4 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl leading-tight text-sand-50 sm:text-4xl">
          {site.closingHeadline}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-sand-100/80">
          {site.closingBody}
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <LinkButton href="#formulir" size="lg">
            Ajukan Trip
          </LinkButton>
          <WhatsAppButton
            number={site.whatsappNumber}
            ctx={{}}
            size="lg"
            variant="whatsapp"
          >
            Chat WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
