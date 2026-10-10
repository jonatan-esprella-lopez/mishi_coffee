import { Link } from "react-router";
import { useAsync } from "../../hooks/useAsync";
import { formatBs, formatSesion } from "../../lib/format";
import { getExperiencias } from "../../services/experiencias.service";
import { buttonStyles } from "../ui";

export default function SalaConvivencia() {
  const { data, loading } = useAsync("experiencias", getExperiencias);
  const sala = data?.find((e) => e.tipo === "SALA_MIMOS");

  if (loading) return <div className="h-56 animate-pulse rounded-card bg-surface-alt" />;
  if (!sala) return null;

  return (
    <section className="flex flex-col gap-5 rounded-card bg-secondary-container p-6 text-on-secondary-container">
      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-2xl font-bold">{sala.nombre}</h2>
        <p>{sala.descripcion}</p>
        {Number(sala.consumoMinimoBs) > 0 && (
          <p className="text-sm font-semibold">
            Consumo mínimo {formatBs(sala.consumoMinimoBs)} · {sala.duracionMin} min por turno
          </p>
        )}
      </div>

      <ul className="grid gap-3 sm:grid-cols-3">
        {sala.sesiones.map((s) => (
          <li key={s.id} className="rounded-input bg-surface p-4 text-foreground shadow-card">
            <p className="font-heading text-lg font-bold">{formatSesion(s.inicio)}</p>
            <p className={s.cupoDisponible === 0 ? "text-sm text-danger" : "text-sm text-muted"}>
              {s.cupoDisponible === 0 ? "Sin cupos" : `${s.cupoDisponible} ${s.cupoDisponible === 1 ? "cupo" : "cupos"}`}
            </p>
          </li>
        ))}
      </ul>

      <Link to="/reservas" className={buttonStyles({ size: "lg" }) + " self-start"}>
        Reservar turno de mimos
      </Link>
    </section>
  );
}