import { formatTanggal } from "./format";

export interface TripRequestInput {
  packageSlug: string;
  date: string;
  participants: number;
  name: string;
  contact: string;
  note?: string;
}

export type TripRequestErrors = Partial<Record<keyof TripRequestInput, string>>;

export interface ValidateOptions {
  today?: Date;
  minParticipants?: number;
  maxParticipants?: number;
}

function startOfDay(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

export function validateTripRequest(
  input: TripRequestInput,
  options: ValidateOptions = {},
): TripRequestErrors {
  const errors: TripRequestErrors = {};
  const today = startOfDay(options.today ?? new Date());

  if (!input.packageSlug.trim()) {
    errors.packageSlug = "Pilih paket terlebih dahulu.";
  }

  if (!input.date.trim()) {
    errors.date = "Tanggal perjalanan wajib diisi.";
  } else {
    const chosen = new Date(`${input.date}T00:00:00`);
    if (Number.isNaN(chosen.getTime())) {
      errors.date = "Format tanggal tidak dikenali.";
    } else if (startOfDay(chosen) < today) {
      errors.date = "Tanggal perjalanan tidak boleh di masa lalu.";
    }
  }

  const participants = input.participants;
  const minParticipants = Math.max(1, options.minParticipants ?? 1);

  if (!Number.isFinite(participants) || !Number.isInteger(participants)) {
    errors.participants = "Jumlah peserta wajib diisi dengan angka.";
  } else if (participants < minParticipants) {
    errors.participants = `Jumlah peserta minimal ${minParticipants} orang untuk paket ini.`;
  } else if (
    options.maxParticipants !== undefined &&
    participants > options.maxParticipants
  ) {
    errors.participants = `Jumlah peserta maksimal ${options.maxParticipants} orang untuk paket ini.`;
  }

  if (!input.name.trim()) {
    errors.name = "Nama wajib diisi.";
  }
  if (!input.contact.trim()) {
    errors.contact = "Kontak wajib diisi.";
  }

  return errors;
}

export function buildTripRequestSummary(
  input: TripRequestInput,
  packageTitle: string,
): string {
  const lines = [
    `Paket: ${packageTitle}`,
    `Tanggal: ${formatTanggal(input.date)}`,
    `Peserta: ${input.participants} orang`,
    `Nama: ${input.name}`,
    `Kontak: ${input.contact}`,
  ];
  if (input.note && input.note.trim()) {
    lines.push(`Catatan: ${input.note.trim()}`);
  }
  return lines.join("\n");
}
