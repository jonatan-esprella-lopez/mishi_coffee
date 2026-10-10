import { Mars, Venus } from "lucide-react";
import { Link } from "react-router";
import { ESTADO_GATO } from "../../lib/estados";
import { formatEdad } from "../../lib/format";
import type { Gato } from "../../types";
import { Badge, buttonStyles, Card } from "../ui";
import MichiFoto from "./MichiFoto";

export default function MichiCard({ gato }: { gato: Gato }) {
  const estado = ESTADO_GATO[gato.estado];
  const esMacho = gato.sexo === "MACHO";
  const SexoIcon = esMacho ? Mars : Venus;

  return (
    <Card className="flex flex-col gap-4">
      <div className="relative">
        <MichiFoto gato={gato} className="aspect-4/3 w-full rounded-input" />
        <Badge tone={estado.tone} dot className="absolute right-3 top-3 shadow-card">
          {estado.label}
        </Badge>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="flex items-center gap-1.5 font-heading text-xl font-bold text-foreground">
            {gato.nombre}
            <SexoIcon aria-hidden="true" className="size-5 text-secondary" />
            <span className="sr-only">{esMacho ? "Macho" : "Hembra"}</span>
          </h3>
          <Badge tone="info">{formatEdad(gato.edadMeses)}</Badge>
        </div>
        {gato.color && <p className="text-sm text-muted">{gato.color}</p>}
        {gato.descripcion && <p className="text-sm italic text-muted">“{gato.descripcion}”</p>}
      </div>

      <div className="mt-auto flex flex-wrap gap-2">
        {gato.estado === "DISPONIBLE" && (
          <Link to={`/michis/${gato.id}/adoptar`} className={buttonStyles({ size: "sm" })}>
            Adoptar a {gato.nombre}
          </Link>
        )}
        <Link to={`/michis/${gato.id}`} className={buttonStyles({ variant: "soft", size: "sm" })}>
          Ver historia
        </Link>
      </div>
    </Card>
  );
}