export function formatRupiah(amount: number): string {
  const digits = new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 0,
  }).format(amount);
  return `Rp${digits}`;
}

export function formatTanggal(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
