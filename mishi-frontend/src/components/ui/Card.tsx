import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type Props = HTMLAttributes<HTMLDivElement> & { interactive?: boolean };

export default function Card({ interactive = false, className, ...props }: Props) {
  return (
    <div
      className={cn(
        "rounded-card border border-border/50 bg-surface p-4 shadow-card",
        interactive && "cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-card-hover",
        className,
      )}
      {...props}
    />
  );
}