import type { Mesa, Producto } from "../types";

export const mesasMock: Mesa[] = [1, 2, 3, 4].map((n) => ({
  id: `mesa-${n}`, numero: n, codigoQr: `mesa-qr-${n}`,
}));

const p = (id: string, nombre: string, categoria: string, precioBs: string): Producto => ({
  id, nombre, categoria, precioBs, fotoUrl: null, disponible: true,
});

export const productosMock: Producto[] = [
  p("prod-1", "Mishi Moka Especial", "Café", "24"),
  p("prod-2", "Latte Felino con Canela", "Café", "22"),
  p("prod-3", "Cappuccino Clásico", "Café", "18"),
  p("prod-4", "Cold Brew de la Casa", "Café", "20"),
  p("prod-5", "Affogato Ronroneo", "Postres", "22"),
  p("prod-6", "Croissant Mishi Dulce", "Repostería", "16"),
  p("prod-7", "Cheesecake Frutos Rojos", "Postres", "20"),
  p("prod-8", "Combo Película y Café", "Combos", "28"),
];