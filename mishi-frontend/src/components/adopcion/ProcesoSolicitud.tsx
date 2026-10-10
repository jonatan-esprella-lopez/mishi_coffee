import { Check } from "lucide-react";
import { cn } from "../../lib/cn";
import type { EstadoSolicitud } from "../../types";

const PASOS: { titulo: string; texto: string; estados: EstadoSolicitud[] }[] = [
  {
    titulo: "Validación del hogar",
    texto: "Revisamos tu solicitud y las condiciones de tu hogar, como las mallas de seguridad.",
    estados: ["NUEVA", "EN_REVISION"],
  },
  {
    titulo: "Entrevista cordial",
    texto: "Te contactamos por WhatsApp para conocernos y coordinar tu visita al café.",
    estados: ["ENTREVISTA"],
  },
  {
    titulo: "Firma y carnet sanitario",
    texto: "Firmas el compromiso responsable y recibes la cartilla veterinaria con las vacunas al día.",
    estados: ["APROBADA"],
  },
  {
    titulo: "Seguimiento continuo",
    texto: "Te acompañamos después de la entrega con controles por WhatsApp para asegurar una buena adaptación.",
    estados: ["ENTREGADA"],
  },
];

export default function ProcesoSolicitud({ estado }: { estado: EstadoSolicitud }) {
  const actual = PASOS.findIndex((p) => p.estados.includes(estado));

  return (
    <ol className="flex flex-col gap-3">
      {PASOS.map((paso, i) => {
        const hecho = actual !== -1 && i < actual;
        const enCurso = i === actual;
        return (
          <li
            key={paso.titulo}
            aria-current={enCurso ? "step" : undefined}
            className={cn(
              "flex gap-3 rounded-input p-4",
              hecho && "bg-tertiary-container text-on-tertiary-container",
              enCurso && "bg-primary-container text-on-primary-container",
              !hecho && !enCurso && "bg-surface-alt text-muted",
            )}
          >
            <span
              className={cn(
                "grid size-8 shrink-0 place-items-center rounded-pill font-heading text-sm font-extrabold",
                hecho && "bg-tertiary text-on-tertiary",
                enCurso && "bg-primary text-on-primary",
                !hecho && !enCurso && "bg-surface text-muted",
              )}
            >
              {hecho ? <Check className="size-4" /> : i + 1}
            </span>
            <div>
              <h3 className="font-heading font-bold">
                {paso.titulo}
                <span className="sr-only">{hecho ? " (completado)" : enCurso ? " (en curso)" : " (pendiente)"}</span>
              </h3>
              <p className="text-sm">{paso.texto}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}