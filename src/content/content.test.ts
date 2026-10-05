import { describe, it, expect } from "vitest";
import { packages } from "./packages";
import { galleryItems } from "./gallery";
import { faqItems } from "./faq";
import { site } from "./site";

describe("integritas konten", () => {
  it("slug paket unik", () => {
    const slugs = packages.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("setiap paket punya gambar & isi wajib", () => {
    for (const p of packages) {
      expect(p.heroImage.startsWith("/images/")).toBe(true);
      expect(p.galleryImages.length).toBeGreaterThan(0);
      for (const img of [p.heroImage, ...p.galleryImages]) {
        expect(img.startsWith("/images/")).toBe(true);
      }
      expect(p.itinerary.length).toBeGreaterThan(0);
      expect(p.included.length).toBeGreaterThan(0);
      expect(p.excluded.length).toBeGreaterThan(0);
      expect(p.activityTypes.length).toBeGreaterThan(0);
      expect(p.maxParticipants).toBeGreaterThanOrEqual(p.minParticipants);
      expect(p.minParticipants).toBeGreaterThanOrEqual(1);
    }
  });

  it("nomor whatsapp hanya berisi digit", () => {
    expect(site.whatsappNumber).toMatch(/^\d+$/);
  });

  it("id galeri dan faq unik", () => {
    expect(new Set(galleryItems.map((g) => g.id)).size).toBe(galleryItems.length);
    expect(new Set(faqItems.map((f) => f.id)).size).toBe(faqItems.length);
  });
});
