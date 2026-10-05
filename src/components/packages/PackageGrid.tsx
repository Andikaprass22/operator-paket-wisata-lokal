import type { Package } from "../../content/types";
import { Button } from "../ui/Button";
import { PackageCard } from "./PackageCard";

export function PackageGrid({
  packages,
  onReset,
}: {
  packages: Package[];
  onReset: () => void;
}) {
  if (packages.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-deep-900/25 bg-sand-100 px-6 py-16 text-center">
        <p className="font-display text-2xl text-deep-950">
          Tidak ada paket yang cocok
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm text-charcoal/75">
          Coba longgarkan filter durasi, jenis aktivitas, atau kisaran harga.
        </p>
        <div className="mt-6 flex justify-center">
          <Button variant="secondary" onClick={onReset}>
            Reset filter
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {packages.map((pkg) => (
        <PackageCard key={pkg.slug} pkg={pkg} />
      ))}
    </div>
  );
}
