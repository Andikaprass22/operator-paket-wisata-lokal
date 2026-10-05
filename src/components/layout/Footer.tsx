import type { SiteConfig } from "../../content/types";
import { WhatsAppButton } from "../ui/WhatsAppButton";

export function Footer({ site }: { site: SiteConfig }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-deep-950 text-sand-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-lagoon-500 font-display text-deep-950">
              {site.logoMark}
            </span>
            <span className="font-display text-lg text-sand-50">
              {site.businessName}
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-sand-100/75">
            {site.tagline}
          </p>
        </div>

        <div>
          <h3 className="font-display text-base text-sand-50">Kontak</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                className="hover:text-lagoon-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-500"
                href={`mailto:${site.email}`}
              >
                {site.email}
              </a>
            </li>
            <li>
              <a
                className="hover:text-lagoon-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-500"
                href={`tel:${site.whatsappNumber}`}
              >
                {site.phoneDisplay}
              </a>
            </li>
            <li className="text-sand-100/75">{site.address}</li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base text-sand-50">Media sosial</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {site.socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-lagoon-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-500"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <WhatsAppButton number={site.whatsappNumber} ctx={{}} size="sm">
              Chat WhatsApp
            </WhatsAppButton>
          </div>
        </div>

        <div>
          <h3 className="font-display text-base text-sand-50">Navigasi</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href.startsWith("#") ? `/${item.href}` : item.href}
                  className="hover:text-lagoon-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-500"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-sand-100/15 px-4 py-8">
        <p className="mx-auto max-w-6xl text-xs text-sand-100/60">
          © {year} {site.businessName}.
        </p>
      </div>
    </footer>
  );
}
