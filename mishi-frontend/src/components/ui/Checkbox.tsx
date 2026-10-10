import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: ReactNode;
  error?: string;
};

export default function Checkbox({ label, error, className, id, ...props }: Props) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label htmlFor={inputId} className="flex cursor-pointer items-start gap-3 text-foreground">
        <input
          id={inputId}
          type="checkbox"
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className="mt-0.5 size-5 shrink-0 cursor-pointer accent-secondary"
          {...props}
        />
        <span className="text-sm">{label}</span>
      </label>
      {error && <p id={`${inputId}-error`} className="pl-8 text-sm text-danger">{error}</p>}
    </div>
  );
}