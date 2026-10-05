import type { ActivityType, DurationBucket, Package } from "../content/types";

export type PriceBucket = "semua" | "dibawah2jt" | "2jt-5jt" | "diatas5jt";

export interface FilterState {
  duration: DurationBucket | "semua";
  activity: ActivityType | "semua";
  price: PriceBucket;
}

export const defaultFilters: FilterState = {
  duration: "semua",
  activity: "semua",
  price: "semua",
};

export function durationBucketOf(days: number): DurationBucket {
  if (days <= 1) return "1hari";
  if (days <= 3) return "23hari";
  return "4hari+";
}

export function matchesPriceBucket(amount: number, bucket: PriceBucket): boolean {
  if (bucket === "dibawah2jt") return amount < 2_000_000;
  if (bucket === "2jt-5jt") return amount >= 2_000_000 && amount <= 5_000_000;
  if (bucket === "diatas5jt") return amount > 5_000_000;
  return true;
}

export function filterPackages(
  packages: Package[],
  filters: FilterState,
): Package[] {
  return packages.filter((pkg) => {
    if (
      filters.duration !== "semua" &&
      durationBucketOf(pkg.durationDays) !== filters.duration
    ) {
      return false;
    }
    if (
      filters.activity !== "semua" &&
      !pkg.activityTypes.includes(filters.activity)
    ) {
      return false;
    }
    if (!matchesPriceBucket(pkg.price.amount, filters.price)) {
      return false;
    }
    return true;
  });
}

export function countActiveFilters(filters: FilterState): number {
  let count = 0;
  if (filters.duration !== "semua") count += 1;
  if (filters.activity !== "semua") count += 1;
  if (filters.price !== "semua") count += 1;
  return count;
}
