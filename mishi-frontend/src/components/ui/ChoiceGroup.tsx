import { Check } from "lucide-react";
import { useId } from "react";
import { cn } from "../../lib/cn";

type Props = {
  legend: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export default function ChoiceGroup({ legend, options, value, onChange, error }: Props) {
  const labelId = useId();

  return (
    <div className="flex flex-col gap-2">
      <span id={labelId} className="font-label text-sm font-semibold text-foreground">{legend}</span>
      <div
        role="radiogroup"
        aria-labelledby={labelId}
        aria-invalid={!!error}
        tabIndex={-1}
        className="flex flex-wrap gap-2 outline-none"
      >
        {options.map((option) => {
          const selected = option === value;
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-pill px-4 py-2 font-label text-sm font-semibold transition-colors",
                selected
                  ? "bg-primary text-on-primary"
                  : "bg-surface-alt text-foreground hover:bg-surface-alt-hover active:bg-surface-alt-pressed",
              )}
            >
              {selected && <Check className="size-4" />}
              {option}
            </button>
          );
        })}
      </div>
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  );
}