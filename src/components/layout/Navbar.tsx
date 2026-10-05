import { useState } from "react";
import { useLocation } from "react-router-dom";
import type { SiteConfig } from "../../content/types";
import { LinkButton } from "../ui/Button";

export function Navbar({ site }: { site: SiteConfig }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const navHref = (hash: string) => (onHome ? hash : `/${hash}`);

  return (
    <header className="sticky top-0 z-40 border-b border-deep-900/10 bg-sand-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <a
          href={navHref("#beranda")}
          className="flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-500"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-deep-900 font-display text-sand-50">
            {site.logoMark}
          </span>
          <span className="font-display text-lg text-deep-950">
            {site.businessName}
          </span>
        </a>

        <nav
          aria-label="Navigasi utama"
          className="hidden items-center gap-1 lg:flex"
        >
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={navHref(item.href)}
              className="rounded-full px-3 py-2 text-sm font-medium text-deep-900 hover:bg-sand-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-500"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <LinkButton href={navHref("#paket")} size="sm">
            Pilih Paket
          </LinkButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          className="rounded-full border border-deep-900/20 px-4 py-2 text-sm font-semibold text-deep-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-500 lg:hidden"
        >
          {open ? "Tutup" : "Menu"}
        </button>
      </div>

      {open ? (
        <nav
          id="menu-mobile"
          aria-label="Navigasi seluler"
          className="border-t border-deep-900/10 bg-sand-50 px-4 py-4 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={navHref(item.href)}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-base font-medium text-deep-900 hover:bg-sand-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-500"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <LinkButton
            href={navHref("#paket")}
            size="sm"
            className="mt-4 w-full"
            onClick={() => setOpen(false)}
          >
            Pilih Paket
          </LinkButton>
        </nav>
      ) : null}
    </header>
  );
}
