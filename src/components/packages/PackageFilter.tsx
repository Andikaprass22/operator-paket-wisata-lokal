import type { ActivityType, DurationBucket } from "../../content/types";
import type { FilterState, PriceBucket } from "../../lib/filters";
import { Button } from "../ui/Button";

const DURATION_OPTIONS: { value: DurationBucket | "semua"; label: string }[] = [
  { value: "semua", label: "Semua durasi" },
  { value: "1hari", label: "1 hari" },
  { value: "23hari", label: "2–3 hari" },
  { value: "4hari+", label: "4 hari atau lebih" },
];

const ACTIVITY_OPTIONS: { value: ActivityType | "semua"; label: string }[] = [
  { value: "semua", label: "Semua aktivitas" },
  { value: "pantai", label: "Pantai" },
  { value: "gunung", label: "Gunung" },
  { value: "budaya", label: "Budaya" },
  { value: "bahari", label: "Bahari" },
  { value: "kuliner", label: "Kuliner" },
];

const PRICE_OPTIONS: { value: PriceBucket; label: string }[] = [
  { value: "semua", label: "Semua harga" },
  { value: "dibawah2jt", label: "Di bawah Rp2 juta" },
  { value: "2jt-5jt", label: "Rp2–5 juta" },
  { value: "diatas5jt", label: "Di atas Rp5 juta" },
];

const selectClass =
  "w-full rounded-xl border border-deep-900/20 bg-sand-50 px-3 py-2 text-sm text-deep-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-500";

export function PackageFilter({
  value,
  onChange,
  resultCount,
  activeCount,
  onReset,
}: {
  value: FilterState;
  onChange: (next: FilterState) => void;
  resultCount: number;
  activeCount: number;
  onReset: () => void;
}) {
  return (
    <div className="rounded-3xl border border-deep-900/10 bg-sand-100 p-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label
            htmlFor="filter-durasi"
            className="mb-2 block text-xs font-semibold uppercase tracking-widest text-deep-700"
          >
            Durasi
          </label>
          <select
            id="filter-durasi"
            className={selectClass}
            value={value.duration}
            onChange={(event) =>
              onChange({
                ...value,
                duration: event.target.value as FilterState["duration"],
              })
            }
          >
            {DURATION_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="filter-aktivitas"
            className="mb-2 block text-xs font-semibold uppercase tracking-widest text-deep-700"
          >
            Jenis aktivitas
          </label>
          <select
            id="filter-aktivitas"
            className={selectClass}
            value={value.activity}
            onChange={(event) =>
              onChange({
                ...value,
                activity: event.target.value as FilterState["activity"],
              })
            }
          >
            {ACTIVITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="filter-harga"
            className="mb-2 block text-xs font-semibold uppercase tracking-widest text-deep-700"
          >
            Kisaran harga
          </label>
          <select
            id="filter-harga"
            className={selectClass}
            value={value.price}
            onChange={(event) =>
              onChange({
                ...value,
                price: event.target.value as PriceBucket,
              })
            }
          >
            {PRICE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="text-sm text-charcoal/75">
          Menampilkan <strong className="text-deep-950">{resultCount}</strong>{" "}
          paket
          {activeCount > 0 ? ` · ${activeCount} filter aktif` : ""}
        </p>
        {activeCount > 0 ? (
          <Button variant="secondary" size="sm" onClick={onReset}>
            Reset filter
          </Button>
        ) : null}
      </div>
    </div>
  );
}
