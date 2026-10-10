// ── Enums ──
export type Rol = "ADMIN" | "CAJERO" | "VETERINARIO" | "MESERO";
export type Sexo = "MACHO" | "HEMBRA";
export type EstadoGato = "EN_CUARENTENA" | "EN_TRATAMIENTO" | "DISPONIBLE" | "EN_PROCESO" | "ADOPTADO";
export type TipoRegistroSalud = "VACUNA" | "DESPARASITACION" | "CONTROL" | "CIRUGIA" | "OTRO";
export type EstadoSolicitud = "NUEVA" | "EN_REVISION" | "ENTREVISTA" | "APROBADA" | "RECHAZADA" | "ENTREGADA";
export type TipoExperiencia = "SALA_MIMOS" | "CINE" | "KARAOKE";
export type EstadoReserva = "CONFIRMADA" | "ASISTIO" | "CANCELADA" | "NO_ASISTIO";
export type MetodoPago = "QR" | "TRANSFERENCIA" | "EFECTIVO";
export type TipoMovimiento = "INGRESO" | "EGRESO";
export type CategoriaMovimiento = "CAFETERIA" | "DONACION" | "ALIMENTO" | "VETERINARIA" | "INSUMOS" | "OTRO";
export type EstadoPedido = "PENDIENTE" | "PREPARANDO" | "SERVIDO" | "PAGADO" | "CANCELADO";
export type TipoRecordatorio = "SEGUIMIENTO_7_DIAS" | "REFUERZO_VACUNA" | "OTRO";

// ── Staff ──
export type Usuario = {
  id: string;
  nombre: string;
  email: string;
  rol: Rol;
  activo: boolean;
  createdAt: string;
};

// ── Gatos ──
export type Gato = {
  id: string;
  codigo: string;
  nombre: string;
  edadMeses: number;
  sexo: Sexo;
  raza: string | null;
  color: string | null;
  castrado: boolean;
  pesoKg: number | null;
  estado: EstadoGato;
  fotoUrl: string | null;
  descripcion: string | null;
  createdAt: string;
};

export type Rescate = {
  id: string;
  gatoId: string;
  nombreProvisional: string | null;
  fotoRescateUrl: string | null;
  edadEstimada: string | null;
  lugarRescate: string;
  condicion: string | null;
  cuarentenaHasta: string | null;
  primerChequeoAt: string | null;
  fechaIngreso: string;
};

export type RegistroSalud = {
  id: string;
  gatoId: string;
  tipo: TipoRegistroSalud;
  nombre: string;
  producto: string | null;
  lote: string | null;
  fechaAplicada: string;
  proximaDosis: string | null;
  veterinarioId: string | null;
  notas: string | null;
  createdAt: string;
};

export type GatoDetalle = Gato & {
  rescate: Rescate | null;
  registrosSalud: RegistroSalud[];
};

// ── Adopciones ──
export type Adoptante = {
  id: string;
  nombre: string;
  telefono: string;
  email: string | null;
  ci: string | null;
  direccion: string | null;
  zona: string | null;
  createdAt: string;
};

export type Solicitud = {
  id: string;
  gatoId: string;
  adoptanteId: string;
  estado: EstadoSolicitud;
  prioritaria: boolean;
  puntajeMatch: number | null;
  tipoVivienda: string | null;
  tieneMallas: boolean;
  detalleHogar: string | null;
  mascotasActuales: string | null;
  compromiso: string | null;
  revisadaPorId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type NuevaSolicitud = {
  gatoId: string;
  adoptante: Pick<Adoptante, "nombre" | "telefono"> &
    Partial<Pick<Adoptante, "email" | "ci" | "direccion" | "zona">>;
  tipoVivienda?: string;
  tieneMallas: boolean;
  detalleHogar?: string;
  mascotasActuales?: string;
  compromiso?: string;
};

export type Adopcion = {
  id: string;
  solicitudId: string;
  gatoId: string;
  contratoUrl: string | null;
  tutorAsignado: string | null;
  kitEntregado: boolean;
  fechaEntrega: string;
};

export type Recordatorio = {
  id: string;
  adopcionId: string;
  tipo: TipoRecordatorio;
  programadoPara: string;
  enviado: boolean;
  enviadoAt: string | null;
};

// ── Experiencias y reservas ──
export type Experiencia = {
  id: string;
  tipo: TipoExperiencia;
  nombre: string;
  descripcion: string | null;
  duracionMin: number;
  aforo: number;
  consumoMinimoBs: string;
  activa: boolean;
};

export type Sesion = {
  id: string;
  experienciaId: string;
  inicio: string;
  fin: string;
  detalle: string | null;
  cupoDisponible: number;
};

export type ExperienciaConSesiones = Experiencia & { sesiones: Sesion[] };

export type Reserva = {
  id: string;
  sesionId: string;
  nombre: string;
  telefono: string;
  personas: number;
  butaca: string | null;
  codigoQr: string;
  estado: EstadoReserva;
  createdAt: string;
};

// ── Cafetería ──
export type Mesa = { id: string; numero: number; codigoQr: string };

export type Producto = {
  id: string;
  nombre: string;
  categoria: string;
  precioBs: string;
  fotoUrl: string | null;
  disponible: boolean;
};

export type Pedido = {
  id: string;
  mesaId: string;
  estado: EstadoPedido;
  propinaBs: string;
  totalBs: string;
  llamoMesero: boolean;
  createdAt: string;
};

export type ItemPedido = {
  id: string;
  pedidoId: string;
  productoId: string;
  cantidad: number;
  precioUnitBs: string;
  nota: string | null;
};

export type Pago = {
  id: string;
  pedidoId: string;
  metodo: MetodoPago;
  montoBs: string;
  comprobanteUrl: string | null;
  createdAt: string;
};

// ── Finanzas y stock ──
export type Movimiento = {
  id: string;
  tipo: TipoMovimiento;
  categoria: CategoriaMovimiento;
  montoBs: string;
  descripcion: string | null;
  metodoPago: MetodoPago | null;
  comprobanteUrl: string | null;
  registradoPorId: string;
  fecha: string;
};

export type Insumo = {
  id: string;
  nombre: string;
  categoria: string;
  unidad: string;
  stockActual: string;
  stockMinimo: string;
  updatedAt: string;
};