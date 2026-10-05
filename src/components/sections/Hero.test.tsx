// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { site } from "../../content/site";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("menampilkan headline dari konfigurasi situs", () => {
    const { container } = render(<Hero site={site} />);
    expect(container.querySelector("h1")?.textContent).toBe(site.heroHeadline);
  });

  it("memakai SmartImage sehingga gambar gagal muat jatuh ke placeholder", () => {
    const { container } = render(<Hero site={site} />);
    const img = container.querySelector("img");

    expect(img?.getAttribute("src")).toBe("/images/hero-rinjani.svg");
    fireEvent.error(img!);
    expect(container.querySelector("img")?.getAttribute("src")).toBe(
      "/images/placeholder.svg",
    );
  });
});
