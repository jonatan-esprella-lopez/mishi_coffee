import type { LucideIcon } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
  count?: number;
  icon?: LucideIcon;
};

export default function Chip({ selected = false, count, icon: Icon, className, children, type = "button", ...props }: Props) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-pill px-4 py-2 font-label text-sm font-semibold transition-colors",
        selected
          ? "bg-primary text-on-primary"
          : "bg-surface-alt text-foreground hover:bg-surface-alt-hover active:bg-surface-alt-pressed",
        className,
      )}
      {...props}
    >
      {Icon && <Icon className="size-4" />}
      {children}
      {count !== undefined && (
        <span className={cn("text-xs font-normal", selected ? "opacity-80" : "text-muted")}>{count}</span>
      )}
    </button>
  );
}