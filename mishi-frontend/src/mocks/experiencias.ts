import type { ExperienciaConSesiones, Sesion } from "../types";
import { enHoras } from "./_fechas";

const sesion = (
  id: string, experienciaId: string, inicioEnHoras: number,
  duracionMin: number, cupoDisponible: number, detalle: string | null = null,
): Sesion => {
  const inicio = enHoras(inicioEnHoras);
  const fin = new Date(new Date(inicio).getTime() + duracionMin * 60_000).toISOString();
  return { id, experienciaId, inicio, fin, detalle, cupoDisponible };
};

export const experienciasMock: ExperienciaConSesiones[] = [
  {
    id: "exp-mimos", tipo: "SALA_MIMOS", nombre: "Sala de Convivencia",
    descripcion: "Turnos de 45 minutos en el área de sillones y rascadores con los michis.",
    duracionMin: 45, aforo: 4, consumoMinimoBs: "25", activa: true,
    sesiones: [
      sesion("ses-m1", "exp-mimos", 2, 45, 3),
      sesion("ses-m2", "exp-mimos", 3.5, 45, 1),
      sesion("ses-m3", "exp-mimos", 5, 45, 4),
    ],
  },
  {
    id: "exp-cine", tipo: "CINE", nombre: "Tardes de Cine Libre con Ronroneos",
    descripcion: "Clásicos de cine animado envueltos en mantas suaves mientras los michis descansan en tu regazo.",
    duracionMin: 120, aforo: 12, consumoMinimoBs: "30", activa: true,
    sesiones: [sesion("ses-c1", "exp-cine", 26, 120, 8, "Clásico de animación")],
  },
  {
    id: "exp-karaoke", tipo: "KARAOKE", nombre: "Noche de Karaoke Acústico Felino",
    descripcion: "Volumen bajo y acústica respetuosa para cuidar el oído de los michis.",
    duracionMin: 90, aforo: 20, consumoMinimoBs: "0", activa: true,
    sesiones: [sesion("ses-k1", "exp-karaoke", 50, 90, 14)],
  },
];