import { experienciasMock } from "../mocks/experiencias";
import type { ExperienciaConSesiones } from "../types";
import { simulateLatency } from "./_utils";

export async function getExperiencias(): Promise<ExperienciaConSesiones[]> {
  await simulateLatency();
  return experienciasMock.filter((e) => e.activa);
}