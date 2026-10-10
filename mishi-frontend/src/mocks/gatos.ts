import type { Gato, RegistroSalud, Rescate } from "../types";
import { enDias, hace } from "./_fechas";

// fotoUrl: null por ahora. Cuando tengan fotos, ponlas en public/gatos/ y usa "/gatos/milo.jpg".
export const gatosMock: Gato[] = [
  {
    id: "gato-milo", codigo: "MC-2024-08", nombre: "Milo", edadMeses: 8, sexo: "MACHO",
    raza: "Mestizo", color: "Atigrado naranja", castrado: true, pesoKg: 3.8,
    estado: "DISPONIBLE", fotoUrl: null,
    descripcion: "Rey de los ronroneos en tu regazo mientras tomas un latte.",
    createdAt: hace(120),
  },
  {
    id: "gato-luna", codigo: "MC-2024-05", nombre: "Luna", edadMeses: 12, sexo: "HEMBRA",
    raza: "Mestiza", color: "Tuxedo blanco y negro", castrado: true, pesoKg: 3.4,
    estado: "DISPONIBLE", fotoUrl: null,
    descripcion: "Compañera silenciosa ideal para leer novelas en tu regazo.",
    createdAt: hace(300),
  },
  {
    id: "gato-nube", codigo: "MC-2024-11", nombre: "Nube", edadMeses: 6, sexo: "MACHO",
    raza: "Mestizo", color: "Blanco esponjoso", castrado: false, pesoKg: 2.1,
    estado: "EN_PROCESO", fotoUrl: null,
    descripcion: "Incansable cazador de rascadores y plumitas.",
    createdAt: hace(60),
  },
  {
    id: "gato-canela", codigo: "MC-2024-02", nombre: "Canela", edadMeses: 24, sexo: "HEMBRA",
    raza: "Mestiza", color: "Carey tricolor", castrado: true, pesoKg: 4.1,
    estado: "DISPONIBLE", fotoUrl: null,
    descripcion: "Maternal, extremadamente cariñosa y con ganas de compañía.",
    createdAt: hace(500),
  },
  {
    id: "gato-simba", codigo: "MC-2023-14", nombre: "Simba", edadMeses: 14, sexo: "MACHO",
    raza: "Mestizo", color: "Gris atigrado", castrado: true, pesoKg: 4.4,
    estado: "ADOPTADO", fotoUrl: null, descripcion: null,
    createdAt: hace(700),
  },
];

export const rescatesMock: Rescate[] = [
  {
    id: "rescate-milo", gatoId: "gato-milo", nombreProvisional: null, fotoRescateUrl: null,
    edadEstimada: "~2 meses", lugarRescate: "Plaza Central",
    condicion: "Desnutrición leve y pulgas", cuarentenaHasta: null,
    primerChequeoAt: hace(118), fechaIngreso: hace(120),
  },
  {
    id: "rescate-canela", gatoId: "gato-canela", nombreProvisional: "Tricolor", fotoRescateUrl: null,
    edadEstimada: "~1 año", lugarRescate: "Sopocachi", condicion: null,
    cuarentenaHasta: null, primerChequeoAt: hace(498), fechaIngreso: hace(500),
  },
];

export const registrosSaludMock: RegistroSalud[] = [
  {
    id: "salud-1", gatoId: "gato-milo", tipo: "VACUNA", nombre: "Triple Felina",
    producto: null, lote: "TF-992", fechaAplicada: hace(85), proximaDosis: enDias(280),
    veterinarioId: "usuario-vet-1", notas: null, createdAt: hace(85),
  },
  {
    id: "salud-2", gatoId: "gato-milo", tipo: "VACUNA", nombre: "Antirrábica Felina",
    producto: null, lote: "AR-401", fechaAplicada: hace(50), proximaDosis: enDias(315),
    veterinarioId: "usuario-vet-1", notas: null, createdAt: hace(50),
  },
  {
    id: "salud-3", gatoId: "gato-milo", tipo: "DESPARASITACION", nombre: "Desparasitación interna y externa",
    producto: "Pipeta Revolution Plus", lote: null, fechaAplicada: hace(10), proximaDosis: enDias(20),
    veterinarioId: "usuario-vet-1", notas: null, createdAt: hace(10),
  },
  {
    id: "salud-4", gatoId: "gato-milo", tipo: "CONTROL", nombre: "Test FeLV / FIV",
    producto: "Prueba rápida inmunocromatográfica", lote: null, fechaAplicada: hace(120), proximaDosis: null,
    veterinarioId: "usuario-vet-1", notas: "Resultado: doble negativo (−)", createdAt: hace(120),
  },
  // Vencido a propósito, para probar el badge "Vencido"
  {
    id: "salud-5", gatoId: "gato-luna", tipo: "DESPARASITACION", nombre: "Desparasitación",
    producto: null, lote: null, fechaAplicada: hace(95), proximaDosis: hace(5),
    veterinarioId: "usuario-vet-1", notas: null, createdAt: hace(95),
  },
];