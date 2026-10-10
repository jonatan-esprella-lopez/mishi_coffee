import type { LucideIcon } from "lucide-react";
import { cn } from "../../lib/cn";

type TabItem<T extends string> = { value: T; label: string; icon?: LucideIcon };

type Props<T extends string> = {
  items: TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel?: string;
  className?: string;
};

export default function Tabs<T extends string>({ items, value, onChange, ariaLabel, className }: Props<T>) {
  return (
    <div role="tablist" aria-label={ariaLabel} className={cn("flex gap-1 rounded-pill bg-surface-alt p-1", className)}>
      {items.map(({ value: v, label, icon: Icon }) => {
        const active = v === value;
        return (
          <button
            key={v}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(v)}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-pill px-4 py-2 font-label text-sm font-semibold transition-colors",
              active ? "bg-surface text-foreground shadow-card" : "text-muted hover:text-foreground",
            )}
          >
            {Icon && <Icon className="size-4" />}
            {label}
          </button>
        );
      })}
    </div>
  );
}