import type { ReactNode } from "react";

export type BadgeTone = "neutral" | "lagoon" | "coral" | "sand";

const tones: Record<BadgeTone, string> = {
  neutral: "bg-deep-900 text-sand-50",
  lagoon: "bg-lagoon-300 text-deep-950",
  coral: "bg-coral-500 text-sand-50",
  sand: "bg-sand-200 text-deep-900",
};

export function Badge({
  children,
  tone = "sand",
}: {
  children: ReactNode;
  tone?: BadgeTone;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
