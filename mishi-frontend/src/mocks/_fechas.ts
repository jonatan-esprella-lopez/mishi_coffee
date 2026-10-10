const DIA = 86_400_000;
export const hace = (dias: number) => new Date(Date.now() - dias * DIA).toISOString();
export const enDias = (dias: number) => new Date(Date.now() + dias * DIA).toISOString();
export const enHoras = (horas: number) => new Date(Date.now() + horas * 3_600_000).toISOString();