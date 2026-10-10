import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import type { Tono } from "../../lib/estados";

const tones: Record<Tono, string> = {
  success: "bg-tertiary-container text-on-tertiary-container border-tertiary/30",
  warning: "bg-primary-container text-on-primary-container border-primary/40",
  info: "bg-secondary-container text-on-secondary-container border-secondary/30",
  danger: "bg-danger-container text-on-danger-container border-danger/30",
  neutral: "bg-surface-alt text-muted border-border",
};

type Props = HTMLAttributes<HTMLSpanElement> & { tone?: Tono; dot?: boolean };

export default function Badge({ tone = "neutral", dot = false, className, children, ...props }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill border px-3 py-1 font-label text-xs font-bold",
        tones[tone],
        className,
      )}
      {...props}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}