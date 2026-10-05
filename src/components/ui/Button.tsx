import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
} from "react";
import { buttonClasses } from "./buttonStyles";
import type { ButtonSize, ButtonVariant } from "./buttonStyles";

export type { ButtonSize, ButtonVariant } from "./buttonStyles";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & CommonProps) {
  return (
    <button
      type={type}
      className={buttonClasses({ variant, size, className })}
      {...rest}
    />
  );
}

export function LinkButton({
  variant,
  size,
  className,
  external,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> &
  CommonProps & { external?: boolean }) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <a
      className={buttonClasses({ variant, size, className })}
      {...externalProps}
      {...rest}
    >
      {children}
    </a>
  );
}
