import { useId, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
  startText?: string;
};

export default function Input({ label, hint, error, startText, className, id, ...props }: Props) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="font-label text-sm font-semibold text-foreground">
          {label}
        </label>
      )}
      <div className="relative">
        {startText && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-label text-sm font-semibold text-muted">
            {startText}
          </span>
        )}
        <input
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={cn(
            "w-full rounded-input border-[1.5px] border-border bg-surface px-4 py-3 text-foreground placeholder:text-foreground-subtle transition focus:border-secondary focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60",
            startText && "pl-16",
            error && "border-danger focus:border-danger",
            className,
          )}
          {...props}
        />
      </div>
      {error ? (
        <p id={`${inputId}-error`} className="text-sm text-danger">{error}</p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="text-sm text-muted">{hint}</p>
      ) : null}
    </div>
  );
}