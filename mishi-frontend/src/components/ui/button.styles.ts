import { cn } from "../../lib/cn";

export const buttonVariants = {
  primary: "bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-pressed",
  secondary: "bg-secondary text-on-secondary hover:bg-secondary-hover active:bg-secondary-pressed",
  soft: "bg-secondary-container text-on-secondary-container hover:bg-secondary-container-hover active:bg-secondary-container-pressed",
  outline: "border-2 border-secondary text-secondary hover:bg-secondary-container active:bg-secondary-container-pressed",
  ghost: "text-foreground hover:bg-secondary-container hover:text-on-secondary-container active:bg-secondary-container-pressed",
  danger: "bg-danger text-on-danger hover:bg-danger-hover active:bg-danger-pressed",
} as const;

export const buttonSizes = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
  icon: "size-10",
} as const;

export type ButtonVariant = keyof typeof buttonVariants;
export type ButtonSize = keyof typeof buttonSizes;

type Options = { variant?: ButtonVariant; size?: ButtonSize; fullWidth?: boolean };

export function buttonStyles({ variant = "primary", size = "md", fullWidth = false }: Options = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-pill font-label font-semibold no-underline transition-all active:scale-[0.98] disabled:pointer-events-none disabled:bg-disabled disabled:text-on-disabled",
    buttonVariants[variant],
    buttonSizes[size],
    fullWidth && "w-full",
  );
}