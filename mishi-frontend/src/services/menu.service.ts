import { mesasMock, productosMock } from "../mocks/menu";
import type { Mesa, Producto } from "../types";
import { simulateLatency } from "./_utils";

export async function getMesas(): Promise<Mesa[]> {
  await simulateLatency(100);
  return mesasMock;
}

export async function getProductos(): Promise<Producto[]> {
  await simulateLatency();
  return productosMock.filter((p) => p.disponible);
}