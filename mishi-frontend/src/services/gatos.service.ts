import { gatosMock, registrosSaludMock, rescatesMock } from "../mocks/gatos";
import type { EstadoGato, Gato, GatoDetalle, Sexo } from "../types";
import { simulateLatency } from "./_utils";

export type FiltroGatos = {
  estados?: EstadoGato[];
  sexo?: Sexo;
  busqueda?: string;
  maxMeses?: number;
};

export async function getGatos(filtro: FiltroGatos = {}): Promise<Gato[]> {
  await simulateLatency();
  const q = filtro.busqueda?.trim().toLowerCase();
  return gatosMock.filter(
    (g) =>
      (!filtro.estados || filtro.estados.includes(g.estado)) &&
      (!filtro.sexo || g.sexo === filtro.sexo) &&
      (filtro.maxMeses === undefined || g.edadMeses <= filtro.maxMeses) &&
      (!q || g.nombre.toLowerCase().includes(q)),
  );
}

export async function getGato(id: string): Promise<GatoDetalle | null> {
  await simulateLatency();
  const gato = gatosMock.find((g) => g.id === id);
  if (!gato) return null;
  return {
    ...gato,
    rescate: rescatesMock.find((r) => r.gatoId === id) ?? null,
    registrosSalud: registrosSaludMock.filter((r) => r.gatoId === id),
  };
}