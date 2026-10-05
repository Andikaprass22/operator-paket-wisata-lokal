import { useState } from "react";
import type { FaqItem } from "../../content/types";
import { SectionHeading } from "../ui/SectionHeading";

export function FaqSection({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" className="scroll-mt-24 bg-sand-100 px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Pertanyaan yang sering diajukan"
          description="Hal-hal yang paling sering ditanyakan sebelum berangkat."
        />

        <ul className="mt-8 divide-y divide-deep-900/10 overflow-hidden rounded-3xl border border-deep-900/10 bg-sand-50">
          {items.map((item) => {
            const open = openId === item.id;
            return (
              <li key={item.id}>
                <h3>
                  <button
                    type="button"
                    id={`${item.id}-button`}
                    onClick={() => setOpenId(open ? null : item.id)}
                    aria-expanded={open}
                    aria-controls={`${item.id}-panel`}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-500"
                  >
                    <span className="text-base font-semibold text-deep-950">
                      {item.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-xl leading-none text-deep-700"
                    >
                      {open ? "\u2212" : "+"}
                    </span>
                  </button>
                </h3>
                <div
                  id={`${item.id}-panel`}
                  role="region"
                  aria-labelledby={`${item.id}-button`}
                  hidden={!open}
                  className="px-5 pb-5 text-sm leading-relaxed text-charcoal/80"
                >
                  {item.answer}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
