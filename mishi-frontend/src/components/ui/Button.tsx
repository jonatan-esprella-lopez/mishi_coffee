import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { buttonStyles, type ButtonSize, type ButtonVariant } from "./button.styles";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

export default function Button({ variant, size, fullWidth, className, type = "button", ...props }: Props) {
  return <button type={type} className={cn(buttonStyles({ variant, size, fullWidth }), className)} {...props} />;
}