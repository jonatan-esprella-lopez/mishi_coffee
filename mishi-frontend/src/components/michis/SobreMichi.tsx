import { formatFecha } from "../../lib/format";
import type { GatoDetalle } from "../../types";
import { Card } from "../ui";

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold text-muted">{label}</dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  );
}

export default function SobreMichi({ gato }: { gato: GatoDetalle }) {
  const { rescate } = gato;

  if (!rescate && !gato.descripcion) {
    return <Card className="text-muted">Aún estamos escribiendo la historia de {gato.nombre}.</Card>;
  }

  return (
    <Card className="flex flex-col gap-4">
      <h2 className="font-heading text-xl font-bold text-foreground">Historia de rescate</h2>

      {gato.descripcion && <p className="text-lg italic text-muted">“{gato.descripcion}”</p>}

      {rescate && (
        <dl className="grid gap-4 sm:grid-cols-2">
          <Item label="Rescatado en" value={rescate.lugarRescate} />
          {rescate.edadEstimada && <Item label="Edad al llegar" value={rescate.edadEstimada} />}
          {rescate.condicion && <Item label="Condición al llegar" value={rescate.condicion} />}
          <Item label="En el refugio desde" value={formatFecha(rescate.fechaIngreso)} />
        </dl>
      )}
    </Card>
  );
}