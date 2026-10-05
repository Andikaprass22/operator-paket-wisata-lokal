import { describe, it, expect } from "vitest";
import { formatRupiah, formatTanggal } from "./format";

describe("formatRupiah", () => {
  it("tanpa pemisah desimal dan tanpa spasi setelah Rp", () => {
    expect(formatRupiah(0)).toBe("Rp0");
    expect(formatRupiah(150000)).toBe("Rp150.000");
    expect(formatRupiah(1250000)).toBe("Rp1.250.000");
    expect(formatRupiah(12500000)).toBe("Rp12.500.000");
  });
});

describe("formatTanggal", () => {
  it("memformat tanggal lokal tanpa pergeseran hari", () => {
    expect(formatTanggal("2026-11-14")).toBe("14 Nov 2026");
    expect(formatTanggal("2027-01-01")).toBe("1 Jan 2027");
  });

  it("mengembalikan placeholder untuk tanggal tidak valid", () => {
    expect(formatTanggal("")).toBe("—");
    expect(formatTanggal("bukan-tanggal")).toBe("—");
  });
});
