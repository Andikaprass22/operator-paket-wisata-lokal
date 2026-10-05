export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  id,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  id?: string;
}) {
  const isDark = tone === "dark";
  return (
    <div
      id={id}
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow ? (
        <p
          className={`text-sm font-semibold uppercase tracking-[0.18em] ${
            isDark ? "text-lagoon-300" : "text-deep-700"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`mt-3 font-display text-3xl leading-tight sm:text-4xl ${
          isDark ? "text-sand-50" : "text-deep-950"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-base leading-relaxed ${
            isDark ? "text-sand-100/80" : "text-charcoal/80"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
