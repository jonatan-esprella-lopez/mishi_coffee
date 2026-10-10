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