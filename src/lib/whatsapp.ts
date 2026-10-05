export interface WhatsAppContext {
  packageTitle?: string;
  date?: string;
  participants?: number;
  note?: string;
}

export function normalizePhoneNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  return digits;
}

export function isWhatsAppConfigured(raw: string): boolean {
  return /^62\d{8,}$/.test(normalizePhoneNumber(raw));
}

export function buildWhatsAppMessage(ctx: WhatsAppContext): string {
  const lines = ["Halo, saya ingin bertanya tentang paket wisata."];

  if (ctx.packageTitle) lines.push(`Paket: ${ctx.packageTitle}`);
  if (ctx.date) lines.push(`Tanggal perjalanan: ${ctx.date}`);
  if (ctx.participants !== undefined && ctx.participants > 0) {
    lines.push(`Jumlah peserta: ${ctx.participants} orang`);
  }
  if (ctx.note) lines.push(`Catatan: ${ctx.note}`);

  lines.push("Terima kasih.");
  return lines.join("\n");
}

export function buildWhatsAppUrl(
  rawNumber: string,
  ctx: WhatsAppContext,
): string | null {
  if (!isWhatsAppConfigured(rawNumber)) return null;
  const number = normalizePhoneNumber(rawNumber);
  const text = encodeURIComponent(buildWhatsAppMessage(ctx));
  return `https://wa.me/${number}?text=${text}`;
}
