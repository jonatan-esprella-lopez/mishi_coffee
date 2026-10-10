import { Bug, FileText, Scissors, Stethoscope, Syringe, type LucideIcon } from "lucide-react";
import { formatFecha } from "../../lib/format";
import { porcentajeAlDia, vigencia } from "../../lib/salud";
import type { RegistroSalud, TipoRegistroSalud } from "../../types";
import { Badge, Card } from "../ui";

const ICONOS: Record<TipoRegistroSalud, LucideIcon> = {
  VACUNA: Syringe,
  DESPARASITACION: Bug,
  CONTROL: Stethoscope,
  CIRUGIA: Scissors,
  OTRO: FileText,
};

export default function CarnetSalud({ registros }: { registros: RegistroSalud[] }) {
  if (registros.length === 0) {
    return <Card className="text-muted">Aún no hay registros de salud publicados para este michi.</Card>;
  }

  const pct = porcentajeAlDia(registros);
  const ordenados = [...registros].sort(
    (a, b) => new Date(b.fechaAplicada).getTime() - new Date(a.fechaAplicada).getTime(),
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-heading text-xl font-bold text-foreground">Carnet de salud</h2>
        {pct !== null && <Badge tone={pct === 100 ? "success" : "warning"}>{pct}% al día</Badge>}
      </div>

      <ul className="flex flex-col gap-3">
        {ordenados.map((r) => {
          const Icon = ICONOS[r.tipo];
          const estado = vigencia(r);
          return (
            <li key={r.id}>
              <Card className="flex gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-pill bg-tertiary-container text-on-tertiary-container">
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="font-heading font-bold text-foreground">{r.nombre}</h3>
                    {estado === "al_dia" && <Badge tone="success" dot>Al día</Badge>}
                    {estado === "vencido" && <Badge tone="danger">Vencido</Badge>}
                  </div>
                  {(r.producto || r.lote) && (
                    <p className="text-sm text-muted">
                      {[r.producto, r.lote && `Lote ${r.lote}`].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  <p className="text-sm text-muted">Aplicada: {formatFecha(r.fechaAplicada)}</p>
                  {r.proximaDosis && (
                    <p className={estado === "vencido" ? "text-sm font-semibold text-danger" : "text-sm text-muted"}>
                      Próxima dosis: {formatFecha(r.proximaDosis)}
                    </p>
                  )}
                </div>
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}