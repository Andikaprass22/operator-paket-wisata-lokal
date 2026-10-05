export function Inclusions({
  included,
  excluded,
}: {
  included: string[];
  excluded: string[];
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-widest text-deep-700">
          Termasuk
        </h4>
        <ul className="mt-3 space-y-2 text-sm text-charcoal/85">
          {included.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true" className="text-lagoon-500">
                {"\u2713"}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-widest text-deep-700">
          Tidak termasuk
        </h4>
        <ul className="mt-3 space-y-2 text-sm text-charcoal/85">
          {excluded.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true" className="text-coral-500">
                {"\u2715"}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
