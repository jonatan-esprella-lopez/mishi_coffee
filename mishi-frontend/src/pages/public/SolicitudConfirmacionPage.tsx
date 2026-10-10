import { Clock, MapPin, MessageCircle, PartyPopper } from "lucide-react";
import { Link, useLocation } from "react-router";
import ChecklistHogar from "../../components/adopcion/ChecklistHogar";
import ProcesoSolicitud from "../../components/adopcion/ProcesoSolicitud";
import MichiFoto from "../../components/michis/MichiFoto";
import { Badge, buttonStyles, Card } from "../../components/ui";
import { LOCAL } from "../../config/local";
import { useAsync } from "../../hooks/useAsync";
import { ESTADO_SOLICITUD } from "../../lib/estados";
import { formatEdad } from "../../lib/format";
import { getGato } from "../../services/gatos.service";

type NavState = { solicitudId?: string; gatoId?: string } | null;

export default function SolicitudConfirmacionPage() {
  const state = useLocation().state as NavState;
  const gatoId = state?.gatoId ?? "";
  const { data: gato, loading } = useAsync(`confirmacion-${gatoId}`, () =>
    gatoId ? getGato(gatoId) : Promise.resolve(null),
  );

  if (!state?.solicitudId) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col gap-4 py-6">
        <Card className="flex flex-col items-start gap-3">
          <h1 className="font-heading text-xl font-bold text-foreground">No hay una solicitud para mostrar</h1>
          <p className="text-muted">
            Si ya enviaste tu solicitud, nuestro equipo te contactará por WhatsApp. Si aún no, conoce a los michis que buscan hogar.
          </p>
          <Link to="/michis" className={buttonStyles()}>Ver a los michis</Link>
        </Card>
      </div>
    );
  }

  const estado = ESTADO_SOLICITUD.NUEVA;
  const nombre = gato?.nombre ?? "tu michi";
  const whatsapp = LOCAL.whatsapp
    ? `https://wa.me/${LOCAL.whatsapp}?text=${encodeURIComponent(`Hola, envié una solicitud para adoptar a ${nombre}.`)}`
    : null;

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5 py-6">
      <Card className="flex flex-col items-center gap-3 bg-tertiary-container text-center text-on-tertiary-container">
        <span className="grid size-14 place-items-center rounded-pill bg-tertiary text-on-tertiary">
          <PartyPopper className="size-7" />
        </span>
        <h1 className="font-heading text-2xl font-extrabold">¡Solicitud recibida con éxito!</h1>
        <p>Gracias por abrirle tu corazón a una nueva vida. Ya comenzamos a revisar tu postulación con mucho cariño.</p>
      </Card>

      <Card className="flex flex-col gap-4">
        {loading ? (
          <div className="h-16 animate-pulse rounded-input bg-surface-alt" />
        ) : (
          gato && (
            <div className="flex items-center gap-4">
              <MichiFoto gato={gato} className="size-16 shrink-0 rounded-input" />
              <div className="min-w-0 flex-1">
                <p className="font-heading text-xl font-bold text-foreground">{gato.nombre}</p>
                <p className="text-sm text-muted">{formatEdad(gato.edadMeses)} · #{gato.codigo}</p>
              </div>
              <Badge tone={estado.tone} dot>{estado.label}</Badge>
            </div>
          )
        )}
        <p className="flex items-center gap-2 rounded-input bg-surface-alt p-3 text-sm text-foreground">
          <Clock className="size-4 shrink-0 text-muted" />
          Tiempo estimado de respuesta: menos de 24 horas.
        </p>
        <p className="text-xs text-muted">Solicitud #{state.solicitudId.slice(0, 8).toUpperCase()}</p>
      </Card>

      <Card className="flex flex-col gap-4">
        <h2 className="font-heading text-xl font-bold text-foreground">Próximos pasos hacia el hogar</h2>
        <ProcesoSolicitud estado="NUEVA" />
      </Card>

      <ChecklistHogar nombre={nombre} />

      <Card className="flex flex-col gap-4">
        <h2 className="font-heading text-xl font-bold text-foreground">¿Tienes dudas?</h2>
        {whatsapp && (
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={buttonStyles({ variant: "secondary", fullWidth: true })}>
            <MessageCircle className="size-5" /> Escribir al equipo de adopciones
          </a>
        )}
        <div className="flex flex-col gap-1 rounded-input bg-surface-alt p-4 text-sm">
          <p className="font-heading font-bold text-foreground">Conoce a {nombre} en persona</p>
          <p className="flex items-start gap-2 text-muted">
            <MapPin className="mt-0.5 size-4 shrink-0" /> {LOCAL.direccion}
          </p>
          <p className="flex items-start gap-2 text-muted">
            <Clock className="mt-0.5 size-4 shrink-0" /> {LOCAL.horario}
          </p>
        </div>
      </Card>

      <Link to="/" className={buttonStyles({ variant: "soft", fullWidth: true })}>Volver al inicio</Link>
    </div>
  );
}