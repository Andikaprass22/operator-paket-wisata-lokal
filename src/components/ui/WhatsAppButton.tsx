import { useId } from "react";
import type { ReactNode } from "react";
import { buildWhatsAppUrl } from "../../lib/whatsapp";
import type { WhatsAppContext } from "../../lib/whatsapp";
import { LinkButton } from "./Button";
import { buttonClasses } from "./buttonStyles";
import type { ButtonSize, ButtonVariant } from "./buttonStyles";

export function WhatsAppButton({
  number,
  ctx,
  children,
  variant = "whatsapp",
  size = "md",
  className,
}: {
  number: string;
  ctx: WhatsAppContext;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  const descriptionId = useId();
  const url = buildWhatsAppUrl(number, ctx);

  if (!url) {
    return (
      <span className="inline-flex flex-col items-start gap-1">
        <button
          type="button"
          disabled
          aria-describedby={descriptionId}
          className={buttonClasses({ variant, size, className })}
        >
          {children}
        </button>
        <span id={descriptionId} className="text-xs text-charcoal/75">
          Nomor WhatsApp belum diatur, jadi tombol ini dinonaktifkan.
        </span>
      </span>
    );
  }

  return (
    <LinkButton href={url} external variant={variant} size={size} className={className}>
      {children}
    </LinkButton>
  );
}
