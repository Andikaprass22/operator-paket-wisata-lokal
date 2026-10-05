import type { ReactNode } from "react";
import type { SiteConfig } from "../../content/types";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { ScrollToTop } from "./ScrollToTop";

export function SiteLayout({
  site,
  children,
}: {
  site: SiteConfig;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar site={site} />
      <div className="flex-1">{children}</div>
      <Footer site={site} />
    </div>
  );
}
