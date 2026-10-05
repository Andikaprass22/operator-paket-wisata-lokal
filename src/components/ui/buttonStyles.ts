export type ButtonVariant = "primary" | "secondary" | "ghost" | "whatsapp";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-500 focus-visible:ring-offset-2 focus-visible:ring-offset-sand-50 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-coral-500 text-sand-50 hover:bg-coral-600",
  secondary:
    "border border-deep-900 text-deep-900 hover:bg-deep-900 hover:text-sand-50",
  ghost: "text-deep-900 hover:bg-sand-200",
  whatsapp: "bg-[#25D366] text-[#06282f] hover:bg-[#1ebe5b]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm min-h-11",
  md: "px-5 py-2.5 text-base min-h-11",
  lg: "px-7 py-3 text-base min-h-12",
};

export function buttonClasses(
  options: {
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
  } = {},
): string {
  const { variant = "primary", size = "md", className = "" } = options;
  return [base, variants[variant], sizes[size], className]
    .filter(Boolean)
    .join(" ");
}
