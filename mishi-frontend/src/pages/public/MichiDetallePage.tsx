import { ArrowLeft, BookOpen, Mars, Palette, PawPrint, Scissors, ShieldCheck, Venus, Weight, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router";
import CarnetSalud from "../../components/michis/CarnetSalud";
import MichiFoto from "../../components/michis/MichiFoto";
import SobreMichi from "../../components/michis/SobreMichi";
import { Badge, buttonStyles, Card, Tabs } from "../../components/ui";
import { useAsync } from "../../hooks/useAsync";
import { ESTADO_GATO, ESTADOS_PUBLICOS } from "../../lib/estados";
import { formatEdad } from "../../lib/format";
import { getGato } from "../../services/gatos.service";

function Dato({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-input bg-surface-alt p-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-pill bg-primary-container text-on-primary-container">
        <Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted">{label}</p>
        <p className="truncate font-heading font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
}

function Volver() {
  return (
    <Link to="/michis" className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold">
      <ArrowLeft className="size-4" /> Volver a los michis
    </Link>
  );
}

export default function MichiDetallePage() {
  const { id = "" } = useParams();
  const { data: gato, loading, error } = useAsync(`michi-${id}`, () => getGato(id));
  const [tab, setTab] = useState<"sobre" | "salud">("sobre");

  if (loading) {
    return (
      <div className="grid gap-6 py-6 lg:grid-cols-2">
        <div className="aspect-square animate-pulse rounded-card bg-surface-alt" />
        <div className="h-96 animate-pulse rounded-card bg-surface-alt" />
      </div>
    );
  }

  const visible = gato && (ESTADOS_PUBLICOS.includes(gato.estado) || gato.estado === "ADOPTADO");

  if (error || !gato || !visible) {
    return (
      <div className="flex flex-col gap-4 py-6">
        <Volver />
        <Card className="flex flex-col items-start gap-3">
          <p className="font-heading text-xl font-bold text-foreground">No encontramos a este michi</p>
          <p className="text-muted">Puede que ya no esté disponible o que el enlace sea incorrecto.</p>
          <Link to="/michis" className={buttonStyles({ variant: "soft" })}>Ver a todos los michis</Link>
        </Card>
      </div>
    );
  }

  const estado = ESTADO_GATO[gato.estado];
  const esMacho = gato.sexo === "MACHO";

  return (
    <div className="flex flex-col gap-4 py-6">
      <Volver />

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        {/* Foto */}
        <div className="relative lg:sticky lg:top-24">
          <MichiFoto gato={gato} className="aspect-square w-full rounded-card" />
          <Badge tone={estado.tone} dot className="absolute left-4 top-4 shadow-card">{estado.label}</Badge>
          <span className="absolute bottom-4 left-4 rounded-pill bg-surface/90 px-3 py-1 font-label text-xs font-bold text-foreground">
            #{gato.codigo}
          </span>
        </div>

        {/* Información */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-heading text-4xl font-extrabold text-secondary dark:text-primary">{gato.nombre}</h1>
            <Badge tone="info">{formatEdad(gato.edadMeses)}</Badge>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Dato icon={esMacho ? Mars : Venus} label="Sexo" value={esMacho ? "Macho" : "Hembra"} />
            <Dato icon={Scissors} label="Condición" value={gato.castrado ? (esMacho ? "Castrado" : "Esterilizada") : "Sin esterilizar"} />
            <Dato icon={Palette} label="Pelaje" value={gato.color ?? "—"} />
            <Dato icon={Weight} label="Peso" value={gato.pesoKg ? `${gato.pesoKg} kg` : "—"} />
          </div>

          {/* CTA según estado */}
          {gato.estado === "DISPONIBLE" && (
            <Link to={`/michis/${gato.id}/adoptar`} className={buttonStyles({ size: "lg", fullWidth: true })}>
              <PawPrint className="size-5" /> Quiero adoptar a {gato.nombre}
            </Link>
          )}
          {gato.estado === "EN_PROCESO" && (
            <Card className="flex flex-col items-start gap-3 bg-primary-container text-on-primary-container">
              <p>Ya hay una solicitud en proceso para {gato.nombre}. Mientras tanto, conoce a otros michis.</p>
              <Link to="/michis" className={buttonStyles({ variant: "secondary", size: "sm" })}>Ver otros michis</Link>
            </Card>
          )}
          {gato.estado === "ADOPTADO" && (
            <Card className="bg-tertiary-container text-on-tertiary-container">
              {gato.nombre} ya encontró un hogar. ¡Gracias por apoyar al refugio!
            </Card>
          )}

          <Tabs
            ariaLabel="Información del michi"
            value={tab}
            onChange={setTab}
            items={[
              { value: "sobre", label: `Sobre ${gato.nombre}`, icon: BookOpen },
              { value: "salud", label: "Salud", icon: ShieldCheck },
            ]}
          />

          {tab === "sobre" ? <SobreMichi gato={gato} /> : <CarnetSalud registros={gato.registrosSalud} />}

          {gato.estado !== "ADOPTADO" && (
            <Card className="flex flex-col items-start gap-3 bg-secondary-container text-on-secondary-container">
              <p className="font-heading font-bold">Conócelo en persona</p>
              <p className="text-sm">Reserva un turno de mimos en la sala de convivencia y pasa un rato con {gato.nombre}.</p>
              <Link to="/reservas" className={buttonStyles({ variant: "secondary", size: "sm" })}>Reservar turno</Link>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}