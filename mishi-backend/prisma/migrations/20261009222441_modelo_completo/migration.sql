-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ADMIN', 'CAJERO', 'VETERINARIO', 'MESERO');

-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('MACHO', 'HEMBRA');

-- CreateEnum
CREATE TYPE "EstadoGato" AS ENUM ('EN_CUARENTENA', 'EN_TRATAMIENTO', 'DISPONIBLE', 'EN_PROCESO', 'ADOPTADO');

-- CreateEnum
CREATE TYPE "TipoRegistroSalud" AS ENUM ('VACUNA', 'DESPARASITACION', 'CONTROL', 'CIRUGIA', 'OTRO');

-- CreateEnum
CREATE TYPE "EstadoSolicitud" AS ENUM ('NUEVA', 'EN_REVISION', 'ENTREVISTA', 'APROBADA', 'RECHAZADA', 'ENTREGADA');

-- CreateEnum
CREATE TYPE "TipoExperiencia" AS ENUM ('SALA_MIMOS', 'CINE', 'KARAOKE');

-- CreateEnum
CREATE TYPE "EstadoReserva" AS ENUM ('CONFIRMADA', 'ASISTIO', 'CANCELADA', 'NO_ASISTIO');

-- CreateEnum
CREATE TYPE "MetodoPago" AS ENUM ('QR', 'TRANSFERENCIA', 'EFECTIVO');

-- CreateEnum
CREATE TYPE "TipoMovimiento" AS ENUM ('INGRESO', 'EGRESO');

-- CreateEnum
CREATE TYPE "CategoriaMovimiento" AS ENUM ('CAFETERIA', 'DONACION', 'ALIMENTO', 'VETERINARIA', 'INSUMOS', 'OTRO');

-- CreateEnum
CREATE TYPE "EstadoPedido" AS ENUM ('PENDIENTE', 'PREPARANDO', 'SERVIDO', 'PAGADO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "TipoRecordatorio" AS ENUM ('SEGUIMIENTO_7_DIAS', 'REFUERZO_VACUNA', 'OTRO');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" "Rol" NOT NULL DEFAULT 'MESERO',
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gato" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "edadMeses" INTEGER NOT NULL,
    "sexo" "Sexo" NOT NULL,
    "raza" TEXT,
    "color" TEXT,
    "castrado" BOOLEAN NOT NULL DEFAULT false,
    "pesoKg" DOUBLE PRECISION,
    "estado" "EstadoGato" NOT NULL DEFAULT 'EN_CUARENTENA',
    "fotoUrl" TEXT,
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Gato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rescate" (
    "id" TEXT NOT NULL,
    "gatoId" TEXT NOT NULL,
    "nombreProvisional" TEXT,
    "fotoRescateUrl" TEXT,
    "edadEstimada" TEXT,
    "lugarRescate" TEXT NOT NULL,
    "condicion" TEXT,
    "cuarentenaHasta" TIMESTAMP(3),
    "primerChequeoAt" TIMESTAMP(3),
    "fechaIngreso" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rescate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistroSalud" (
    "id" TEXT NOT NULL,
    "gatoId" TEXT NOT NULL,
    "tipo" "TipoRegistroSalud" NOT NULL,
    "nombre" TEXT NOT NULL,
    "producto" TEXT,
    "lote" TEXT,
    "fechaAplicada" TIMESTAMP(3) NOT NULL,
    "proximaDosis" TIMESTAMP(3),
    "veterinarioId" TEXT,
    "notas" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RegistroSalud_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adoptante" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT,
    "ci" TEXT,
    "direccion" TEXT,
    "zona" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Adoptante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solicitud" (
    "id" TEXT NOT NULL,
    "gatoId" TEXT NOT NULL,
    "adoptanteId" TEXT NOT NULL,
    "estado" "EstadoSolicitud" NOT NULL DEFAULT 'NUEVA',
    "prioritaria" BOOLEAN NOT NULL DEFAULT false,
    "puntajeMatch" INTEGER,
    "tipoVivienda" TEXT,
    "tieneMallas" BOOLEAN NOT NULL DEFAULT false,
    "detalleHogar" TEXT,
    "mascotasActuales" TEXT,
    "compromiso" TEXT,
    "revisadaPorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Solicitud_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adopcion" (
    "id" TEXT NOT NULL,
    "solicitudId" TEXT NOT NULL,
    "gatoId" TEXT NOT NULL,
    "contratoUrl" TEXT,
    "tutorAsignado" TEXT,
    "kitEntregado" BOOLEAN NOT NULL DEFAULT false,
    "fechaEntrega" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Adopcion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recordatorio" (
    "id" TEXT NOT NULL,
    "adopcionId" TEXT NOT NULL,
    "tipo" "TipoRecordatorio" NOT NULL DEFAULT 'SEGUIMIENTO_7_DIAS',
    "programadoPara" TIMESTAMP(3) NOT NULL,
    "enviado" BOOLEAN NOT NULL DEFAULT false,
    "enviadoAt" TIMESTAMP(3),

    CONSTRAINT "Recordatorio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experiencia" (
    "id" TEXT NOT NULL,
    "tipo" "TipoExperiencia" NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "duracionMin" INTEGER NOT NULL DEFAULT 45,
    "aforo" INTEGER NOT NULL,
    "consumoMinimoBs" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "activa" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Experiencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sesion" (
    "id" TEXT NOT NULL,
    "experienciaId" TEXT NOT NULL,
    "inicio" TIMESTAMP(3) NOT NULL,
    "fin" TIMESTAMP(3) NOT NULL,
    "detalle" TEXT,
    "cupoDisponible" INTEGER NOT NULL,

    CONSTRAINT "Sesion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reserva" (
    "id" TEXT NOT NULL,
    "sesionId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "personas" INTEGER NOT NULL DEFAULT 1,
    "butaca" TEXT,
    "codigoQr" TEXT NOT NULL,
    "estado" "EstadoReserva" NOT NULL DEFAULT 'CONFIRMADA',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mesa" (
    "id" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "codigoQr" TEXT NOT NULL,

    CONSTRAINT "Mesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Producto" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "precioBs" DECIMAL(10,2) NOT NULL,
    "fotoUrl" TEXT,
    "disponible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" TEXT NOT NULL,
    "mesaId" TEXT NOT NULL,
    "estado" "EstadoPedido" NOT NULL DEFAULT 'PENDIENTE',
    "propinaBs" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "totalBs" DECIMAL(10,2) NOT NULL,
    "llamoMesero" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemPedido" (
    "id" TEXT NOT NULL,
    "pedidoId" TEXT NOT NULL,
    "productoId" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precioUnitBs" DECIMAL(10,2) NOT NULL,
    "nota" TEXT,

    CONSTRAINT "ItemPedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pago" (
    "id" TEXT NOT NULL,
    "pedidoId" TEXT NOT NULL,
    "metodo" "MetodoPago" NOT NULL,
    "montoBs" DECIMAL(10,2) NOT NULL,
    "comprobanteUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pago_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movimiento" (
    "id" TEXT NOT NULL,
    "tipo" "TipoMovimiento" NOT NULL,
    "categoria" "CategoriaMovimiento" NOT NULL,
    "montoBs" DECIMAL(10,2) NOT NULL,
    "descripcion" TEXT,
    "metodoPago" "MetodoPago",
    "comprobanteUrl" TEXT,
    "registradoPorId" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Movimiento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Insumo" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "unidad" TEXT NOT NULL,
    "stockActual" DECIMAL(10,2) NOT NULL,
    "stockMinimo" DECIMAL(10,2) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Insumo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Gato_codigo_key" ON "Gato"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Rescate_gatoId_key" ON "Rescate"("gatoId");

-- CreateIndex
CREATE INDEX "RegistroSalud_gatoId_idx" ON "RegistroSalud"("gatoId");

-- CreateIndex
CREATE INDEX "Solicitud_estado_idx" ON "Solicitud"("estado");

-- CreateIndex
CREATE INDEX "Solicitud_gatoId_idx" ON "Solicitud"("gatoId");

-- CreateIndex
CREATE UNIQUE INDEX "Adopcion_solicitudId_key" ON "Adopcion"("solicitudId");

-- CreateIndex
CREATE UNIQUE INDEX "Adopcion_gatoId_key" ON "Adopcion"("gatoId");

-- CreateIndex
CREATE INDEX "Sesion_inicio_idx" ON "Sesion"("inicio");

-- CreateIndex
CREATE UNIQUE INDEX "Reserva_codigoQr_key" ON "Reserva"("codigoQr");

-- CreateIndex
CREATE INDEX "Reserva_sesionId_idx" ON "Reserva"("sesionId");

-- CreateIndex
CREATE UNIQUE INDEX "Mesa_numero_key" ON "Mesa"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "Mesa_codigoQr_key" ON "Mesa"("codigoQr");

-- CreateIndex
CREATE INDEX "Pedido_estado_idx" ON "Pedido"("estado");

-- CreateIndex
CREATE UNIQUE INDEX "Pago_pedidoId_key" ON "Pago"("pedidoId");

-- CreateIndex
CREATE INDEX "Movimiento_fecha_idx" ON "Movimiento"("fecha");

-- CreateIndex
CREATE INDEX "Movimiento_tipo_categoria_idx" ON "Movimiento"("tipo", "categoria");

-- AddForeignKey
ALTER TABLE "Rescate" ADD CONSTRAINT "Rescate_gatoId_fkey" FOREIGN KEY ("gatoId") REFERENCES "Gato"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroSalud" ADD CONSTRAINT "RegistroSalud_gatoId_fkey" FOREIGN KEY ("gatoId") REFERENCES "Gato"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroSalud" ADD CONSTRAINT "RegistroSalud_veterinarioId_fkey" FOREIGN KEY ("veterinarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solicitud" ADD CONSTRAINT "Solicitud_gatoId_fkey" FOREIGN KEY ("gatoId") REFERENCES "Gato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solicitud" ADD CONSTRAINT "Solicitud_adoptanteId_fkey" FOREIGN KEY ("adoptanteId") REFERENCES "Adoptante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solicitud" ADD CONSTRAINT "Solicitud_revisadaPorId_fkey" FOREIGN KEY ("revisadaPorId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adopcion" ADD CONSTRAINT "Adopcion_solicitudId_fkey" FOREIGN KEY ("solicitudId") REFERENCES "Solicitud"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adopcion" ADD CONSTRAINT "Adopcion_gatoId_fkey" FOREIGN KEY ("gatoId") REFERENCES "Gato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recordatorio" ADD CONSTRAINT "Recordatorio_adopcionId_fkey" FOREIGN KEY ("adopcionId") REFERENCES "Adopcion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sesion" ADD CONSTRAINT "Sesion_experienciaId_fkey" FOREIGN KEY ("experienciaId") REFERENCES "Experiencia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_sesionId_fkey" FOREIGN KEY ("sesionId") REFERENCES "Sesion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_mesaId_fkey" FOREIGN KEY ("mesaId") REFERENCES "Mesa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemPedido" ADD CONSTRAINT "ItemPedido_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemPedido" ADD CONSTRAINT "ItemPedido_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pago" ADD CONSTRAINT "Pago_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimiento" ADD CONSTRAINT "Movimiento_registradoPorId_fkey" FOREIGN KEY ("registradoPorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
