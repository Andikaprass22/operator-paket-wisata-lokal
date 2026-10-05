// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { SmartImage } from "./SmartImage";

describe("SmartImage", () => {
  it("menampilkan src yang diberikan", () => {
    const { container } = render(
      <SmartImage src="/images/gili-trawangan.svg" alt="Gili" />,
    );
    expect(container.querySelector("img")?.getAttribute("src")).toBe(
      "/images/gili-trawangan.svg",
    );
  });

  it("beralih ke placeholder ketika gambar gagal dimuat", () => {
    const { container } = render(
      <SmartImage src="/images/tidak-ada.svg" alt="Hilang" />,
    );
    fireEvent.error(container.querySelector("img")!);
    expect(container.querySelector("img")?.getAttribute("src")).toBe(
      "/images/placeholder.svg",
    );
  });

  it("mereset kegagalan ketika src berubah", () => {
    const { container, rerender } = render(
      <SmartImage src="/images/tidak-ada.svg" alt="A" />,
    );
    fireEvent.error(container.querySelector("img")!);
    expect(container.querySelector("img")?.getAttribute("src")).toBe(
      "/images/placeholder.svg",
    );

    rerender(<SmartImage src="/images/gili-trawangan.svg" alt="A" />);
    expect(container.querySelector("img")?.getAttribute("src")).toBe(
      "/images/gili-trawangan.svg",
    );
  });

  it("mode fill memakai pembungkus absolut", () => {
    const { container } = render(
      <SmartImage src="/images/hero-rinjani.svg" alt="Hero" fill priority />,
    );
    expect(container.querySelector("div")?.className).toContain(
      "absolute inset-0",
    );
  });
});
