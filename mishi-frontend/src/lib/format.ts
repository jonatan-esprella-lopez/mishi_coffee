export function formatBs(value: string | number): string {
  const n = typeof value === "string" ? Number(value) : value;
  const hasDecimals = !Number.isInteger(n);
  return `Bs ${n.toLocaleString("es-BO", {
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: 2,
  })}`;
}

export function formatEdad(meses: number): string {
  if (meses < 12) return `${meses} ${meses === 1 ? "mes" : "meses"}`;
  const años = Math.floor(meses / 12);
  const resto = meses % 12;
  const a = `${años} ${años === 1 ? "año" : "años"}`;
  return resto ? `${a} y ${resto} ${resto === 1 ? "mes" : "meses"}` : a;
}

export function formatSesion(iso: string): string {
  const d = new Date(iso);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const dia = new Date(d);
  dia.setHours(0, 0, 0, 0);
  const diff = Math.round((dia.getTime() - hoy.getTime()) / 86_400_000);
  const hora = d.toLocaleTimeString("es-BO", { hour: "2-digit", minute: "2-digit", hour12: false });
  if (diff === 0) return `Hoy ${hora}`;
  if (diff === 1) return `Mañana ${hora}`;
  return `${d.toLocaleDateString("es-BO", { weekday: "short" })} ${hora}`;
}