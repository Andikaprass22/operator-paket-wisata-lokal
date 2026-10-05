import { describe, it, expect } from "vitest";
import { buildTripRequestSummary, validateTripRequest } from "./tripRequest";
import type { TripRequestInput } from "./tripRequest";

const base: TripRequestInput = {
  packageSlug: "sade-village-culture",
  date: "2026-12-01",
  participants: 2,
  name: "Budi",
  contact: "08123456789",
};
const today = new Date("2026-10-05T00:00:00");

describe("validateTripRequest", () => {
  it("input valid tidak menghasilkan error", () => {
    expect(validateTripRequest(base, { today })).toEqual({});
  });

  it("menolak tanggal lampau", () => {
    const errs = validateTripRequest({ ...base, date: "2026-01-01" }, { today });
    expect(errs.date).toBeDefined();
  });

  it("menerima tanggal hari ini", () => {
    const errs = validateTripRequest({ ...base, date: "2026-10-05" }, { today });
    expect(errs.date).toBeUndefined();
  });

  it("menolak peserta 0, negatif, atau melebihi kapasitas", () => {
    const opts = { today, maxParticipants: 12 };
    expect(validateTripRequest({ ...base, participants: 0 }, opts).participants).toBeDefined();
    expect(validateTripRequest({ ...base, participants: -3 }, opts).participants).toBeDefined();
    expect(validateTripRequest({ ...base, participants: 99 }, opts).participants).toBeDefined();
    expect(validateTripRequest({ ...base, participants: 12 }, opts).participants).toBeUndefined();
  });

  it("menolak peserta di bawah minimum paket", () => {
    const errs = validateTripRequest(
      { ...base, participants: 1 },
      { today, minParticipants: 2, maxParticipants: 12 },
    );
    expect(errs.participants).toBeDefined();
    expect(
      validateTripRequest({ ...base, participants: 2 }, { today, minParticipants: 2 })
        .participants,
    ).toBeUndefined();
  });

  it("menolak field wajib kosong", () => {
    const errs = validateTripRequest(
      { ...base, packageSlug: "", name: "  ", contact: "" },
      { today },
    );
    expect(errs.packageSlug).toBeDefined();
    expect(errs.name).toBeDefined();
    expect(errs.contact).toBeDefined();
  });

  it("menolak tanggal dan peserta kosong", () => {
    const errs = validateTripRequest(
      { ...base, date: "", participants: Number.NaN },
      { today },
    );
    expect(errs.date).toBeDefined();
    expect(errs.participants).toBeDefined();
  });
});

describe("buildTripRequestSummary", () => {
  it("memuat paket, tanggal, dan peserta", () => {
    const summary = buildTripRequestSummary(base, "Sasak Culture & Sade Village");
    expect(summary).toContain("Sasak Culture & Sade Village");
    expect(summary).toContain("1 Des 2026");
    expect(summary).toContain("2");
  });
});
