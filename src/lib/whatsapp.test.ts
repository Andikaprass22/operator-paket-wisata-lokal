import { describe, it, expect } from "vitest";
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  isWhatsAppConfigured,
  normalizePhoneNumber,
} from "./whatsapp";

describe("normalizePhoneNumber", () => {
  it("menormalkan awalan lokal dan internasional", () => {
    expect(normalizePhoneNumber("0812345678")).toBe("62812345678");
    expect(normalizePhoneNumber("+62 812-3456-78")).toBe("62812345678");
    expect(normalizePhoneNumber("62 812 3456 78")).toBe("62812345678");
  });
});

describe("isWhatsAppConfigured", () => {
  it("menerima hanya nomor yang punya digit cukup", () => {
    expect(isWhatsAppConfigured("628123456789")).toBe(true);
    expect(isWhatsAppConfigured("08123456789")).toBe(true);
    expect(isWhatsAppConfigured("")).toBe(false);
    expect(isWhatsAppConfigured("abc")).toBe(false);
    expect(isWhatsAppConfigured("123")).toBe(false);
  });
});

describe("buildWhatsAppMessage", () => {
  it("memuat paket, tanggal, dan peserta bila diberikan", () => {
    const msg = buildWhatsAppMessage({
      packageTitle: "Gili Trawangan & Gili Air Escape",
      date: "2026-11-14",
      participants: 2,
    });
    expect(msg).toContain("Gili Trawangan & Gili Air Escape");
    expect(msg).toContain("2026-11-14");
    expect(msg).toContain("2");
  });

  it("tidak memaksakan field kosong ke pesan", () => {
    const msg = buildWhatsAppMessage({
      packageTitle: "Sasak Culture & Sade Village",
    });
    expect(msg).toContain("Sasak Culture & Sade Village");
    expect(msg).not.toContain("Tanggal");
    expect(msg).not.toContain("Peserta");
  });
});

describe("buildWhatsAppUrl", () => {
  it("membuat url wa.me yang ter-encode", () => {
    const url = buildWhatsAppUrl("08123456789", {
      packageTitle: "Rinjani Sembalun Summit Trek",
      date: "2026-12-01",
      participants: 4,
    });
    expect(url).not.toBeNull();
    expect(url!.startsWith("https://wa.me/628123456789?text=")).toBe(true);
    expect(url!).toContain("%20");
    expect(url!).not.toContain(" ");
  });

  it("mengembalikan null bila nomor tidak valid", () => {
    expect(buildWhatsAppUrl("", {})).toBeNull();
    expect(buildWhatsAppUrl("abc", {})).toBeNull();
  });
});
