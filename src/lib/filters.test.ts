import { describe, it, expect } from "vitest";
import {
  countActiveFilters,
  defaultFilters,
  durationBucketOf,
  filterPackages,
  matchesPriceBucket,
} from "./filters";
import type { Package } from "../content/types";

function mk(overrides: Partial<Package>): Package {
  return {
    slug: "p",
    title: "t",
    summary: "s",
    destination: "d",
    durationDays: 1,
    durationLabel: "1 hari",
    price: { amount: 500000, currency: "IDR" },
    priceNote: "catatan",
    activityTypes: ["pantai"],
    schedule: ["2026-11-01"],
    meetingPoint: "x",
    minParticipants: 1,
    maxParticipants: 10,
    seatsNote: "catatan",
    heroImage: "/images/placeholder.svg",
    galleryImages: ["/images/placeholder.svg"],
    highlights: [],
    itinerary: [],
    facilities: [],
    included: ["a"],
    excluded: ["b"],
    ...overrides,
  };
}

const a = mk({
  slug: "a",
  durationDays: 1,
  activityTypes: ["pantai"],
  price: { amount: 550000, currency: "IDR" },
});
const b = mk({
  slug: "b",
  durationDays: 3,
  activityTypes: ["gunung"],
  price: { amount: 4350000, currency: "IDR" },
});
const c = mk({
  slug: "c",
  durationDays: 4,
  activityTypes: ["budaya"],
  price: { amount: 5750000, currency: "IDR" },
});

describe("durasi", () => {
  it("memetakan jumlah hari ke bucket", () => {
    expect(durationBucketOf(1)).toBe("1hari");
    expect(durationBucketOf(2)).toBe("23hari");
    expect(durationBucketOf(3)).toBe("23hari");
    expect(durationBucketOf(4)).toBe("4hari+");
  });
});

describe("harga", () => {
  it("memetakan nilai ke bucket", () => {
    expect(matchesPriceBucket(1_999_999, "dibawah2jt")).toBe(true);
    expect(matchesPriceBucket(2_000_000, "dibawah2jt")).toBe(false);
    expect(matchesPriceBucket(2_000_000, "2jt-5jt")).toBe(true);
    expect(matchesPriceBucket(5_000_000, "2jt-5jt")).toBe(true);
    expect(matchesPriceBucket(5_000_001, "diatas5jt")).toBe(true);
    expect(matchesPriceBucket(150000, "semua")).toBe(true);
  });
});

describe("filterPackages", () => {
  it("default tidak menyaring apa pun", () => {
    expect(filterPackages([a, b, c], defaultFilters)).toHaveLength(3);
  });

  it("menggabungkan kategori dengan AND", () => {
    const f = {
      ...defaultFilters,
      duration: "1hari" as const,
      activity: "pantai" as const,
      price: "dibawah2jt" as const,
    };
    expect(filterPackages([a, b], f)).toEqual([a]);
  });

  it("kombinasi tanpa kecocokan mengembalikan array kosong", () => {
    const f = {
      ...defaultFilters,
      duration: "4hari+" as const,
      activity: "kuliner" as const,
    };
    expect(filterPackages([a, b], f)).toEqual([]);
  });

  it("daftar kosong tetap kosong", () => {
    expect(filterPackages([], defaultFilters)).toEqual([]);
  });
});

describe("countActiveFilters", () => {
  it("menghitung filter yang aktif", () => {
    expect(countActiveFilters(defaultFilters)).toBe(0);
    expect(
      countActiveFilters({
        duration: "1hari",
        activity: "semua",
        price: "dibawah2jt",
      }),
    ).toBe(2);
  });
});
