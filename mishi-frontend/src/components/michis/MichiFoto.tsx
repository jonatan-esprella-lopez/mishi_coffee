import { PawPrint } from "lucide-react";
import { cn } from "../../lib/cn";
import type { Gato } from "../../types";

type Props = { gato: Pick<Gato, "nombre" | "fotoUrl">; className?: string };

export default function MichiFoto({ gato, className }: Props) {
  if (gato.fotoUrl) {
    return (
      <img src={gato.fotoUrl} alt={`Foto de ${gato.nombre}`} loading="lazy" className={cn("object-cover", className)} />
    );
  }
  return (
    <div
      role="img"
      aria-label={`${gato.nombre} aún no tiene foto`}
      className={cn(
        "grid place-items-center bg-linear-to-br from-primary-container to-secondary-container text-on-primary-container",
        className,
      )}
    >
      <PawPrint className="size-12 opacity-60" />
    </div>
  );
}