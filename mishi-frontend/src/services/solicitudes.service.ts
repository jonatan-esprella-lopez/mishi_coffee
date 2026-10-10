import type { NuevaSolicitud, Solicitud } from "../types";
import { simulateLatency } from "./_utils";

export async function crearSolicitud(data: NuevaSolicitud): Promise<Solicitud> {
  await simulateLatency(600);
  const ahora = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    gatoId: data.gatoId,
    adoptanteId: crypto.randomUUID(),
    estado: "NUEVA",
    prioritaria: false,
    puntajeMatch: null,
    tipoVivienda: data.tipoVivienda ?? null,
    tieneMallas: data.tieneMallas,
    detalleHogar: data.detalleHogar ?? null,
    mascotasActuales: data.mascotasActuales ?? null,
    compromiso: data.compromiso ?? null,
    revisadaPorId: null,
    createdAt: ahora,
    updatedAt: ahora,
  };
}