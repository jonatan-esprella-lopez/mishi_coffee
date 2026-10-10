/** Simula latencia de red para ver los estados de carga. Se borra al conectar la API real. */
export const simulateLatency = (ms = 250) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));