import type { EstadoGato, EstadoSolicitud } from "../types";

export type Tono = "success" | "warning" | "info" | "danger" | "neutral";
type Meta = { label: string; tone: Tono };

export const ESTADO_GATO: Record<EstadoGato, Meta> = {
  EN_CUARENTENA: { label: "En cuarentena", tone: "neutral" },
  EN_TRATAMIENTO: { label: "En tratamiento", tone: "neutral" },
  DISPONIBLE: { label: "Disponible", tone: "success" },
  EN_PROCESO: { label: "En proceso", tone: "warning" },
  ADOPTADO: { label: "Adoptado", tone: "info" },
};

export const ESTADO_SOLICITUD: Record<EstadoSolicitud, Meta> = {
  NUEVA: { label: "Nueva", tone: "info" },
  EN_REVISION: { label: "En revisión", tone: "warning" },
  ENTREVISTA: { label: "Entrevista", tone: "warning" },
  APROBADA: { label: "Aprobada", tone: "success" },
  RECHAZADA: { label: "Rechazada", tone: "danger" },
  ENTREGADA: { label: "Entregada", tone: "success" },
};

export const ESTADOS_PUBLICOS: EstadoGato[] = ["DISPONIBLE", "EN_PROCESO"];