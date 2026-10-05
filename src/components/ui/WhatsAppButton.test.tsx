// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { WhatsAppButton } from "./WhatsAppButton";

describe("WhatsAppButton", () => {
  it("merender tautan wa.me untuk nomor valid", () => {
    const { container } = render(
      <WhatsAppButton
        number="08123456789"
        ctx={{ packageTitle: "Gili Trawangan" }}
      >
        Chat
      </WhatsAppButton>,
    );

    const link = container.querySelector("a");
    expect(link?.getAttribute("href")).toContain("https://wa.me/628123456789");
    expect(container.querySelector("button")).toBeNull();
  });

  it("menonaktifkan tombol dan menampilkan penjelasan bila nomor tidak valid", () => {
    const { container } = render(
      <WhatsAppButton number="" ctx={{}}>
        Chat
      </WhatsAppButton>,
    );

    expect(container.querySelector("a")).toBeNull();
    const button = container.querySelector("button") as HTMLButtonElement | null;
    expect(button).not.toBeNull();
    expect(button?.disabled).toBe(true);
    expect(container.textContent).toContain("belum diatur");
  });
});
