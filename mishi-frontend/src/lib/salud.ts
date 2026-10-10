import type { RegistroSalud } from "../types";

export type Vigencia = "al_dia" | "vencido" | "sin_refuerzo";

export function vigencia(r: RegistroSalud, ahora = Date.now()): Vigencia {
  if (!r.proximaDosis) return "sin_refuerzo";
  return new Date(r.proximaDosis).getTime() < ahora ? "vencido" : "al_dia";
}

export function porcentajeAlDia(registros: RegistroSalud[]): number | null {
  const conRefuerzo = registros.filter((r) => r.proximaDosis);
  if (conRefuerzo.length === 0) return null;
  const vigentes = conRefuerzo.filter((r) => vigencia(r) === "al_dia").length;
  return Math.round((vigentes / conRefuerzo.length) * 100);
}