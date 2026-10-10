import { Coffee, Heart, PawPrint, Plus, Search, Trash2 } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Link } from "react-router";
import { Badge, Button, buttonStyles, Card, Chip, Input, StatCard, Tabs } from "../../components/ui";
import { ESTADO_GATO, ESTADO_SOLICITUD, type Tono } from "../../lib/estados";
import { formatBs, formatEdad } from "../../lib/format";
import type { EstadoGato, EstadoSolicitud } from "../../types";

/* Las clases van completas (no armadas con template strings) para que Tailwind las detecte. */
const swatches: { name: string; cls: string }[] = [
  { name: "background", cls: "bg-background text-foreground border border-border" },
  { name: "surface", cls: "bg-surface text-foreground border border-border" },
  { name: "surface-alt", cls: "bg-surface-alt text-foreground" },
  { name: "primary", cls: "bg-primary text-on-primary" },
  { name: "primary-container", cls: "bg-primary-container text-on-primary-container" },
  { name: "secondary", cls: "bg-secondary text-on-secondary" },
  { name: "secondary-container", cls: "bg-secondary-container text-on-secondary-container" },
  { name: "tertiary", cls: "bg-tertiary text-on-tertiary" },
  { name: "tertiary-container", cls: "bg-tertiary-container text-on-tertiary-container" },
  { name: "danger", cls: "bg-danger text-on-danger" },
  { name: "danger-container", cls: "bg-danger-container text-on-danger-container" },
];

const tonos: Tono[] = ["success", "warning", "info", "danger", "neutral"];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="border-b border-border pb-2 text-xl font-bold text-secondary dark:text-primary">{title}</h2>
      {children}
    </section>
  );
}

function Row({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <p className="text-sm text-muted">{label}</p>}
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

export default function UiPage() {
  const [filtro, setFiltro] = useState("todos");
  const [tab, setTab] = useState<"general" | "salud" | "historia">("general");

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 p-6">
      <header>
        <h1 className="text-3xl font-extrabold text-foreground">Guía de componentes</h1>
        <p className="text-muted">
          Página temporal de desarrollo. Cambia entre claro y oscuro con el botón del header para revisar todo.
        </p>
      </header>

      <Section title="Colores">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {swatches.map(({ name, cls }) => (
            <div key={name} className={`rounded-input p-4 font-label text-sm font-semibold ${cls}`}>
              {name}
            </div>
          ))}
        </div>
        <Row label="Texto">
          <span className="text-foreground">foreground</span>
          <span className="text-muted">muted</span>
          <span className="text-foreground-subtle">foreground-subtle</span>
          <span className="text-link">link</span>
          <span className="text-danger">danger</span>
        </Row>
      </Section>

      <Section title="Tipografía">
        <div className="flex flex-col gap-2">
          <p className="font-heading text-5xl font-extrabold text-foreground">Display 48</p>
          <p className="font-heading text-3xl font-bold text-foreground">Headline 32</p>
          <p className="font-heading text-xl font-semibold text-foreground">Headline 20 · Plus Jakarta Sans</p>
          <p className="font-body text-base text-foreground">
            Body 16 · Nunito Sans. Rescatado cerca de la plaza central con apenas 2 meses de vida.
          </p>
          <p className="font-label text-sm font-semibold text-muted">Label 14 · Plus Jakarta Sans</p>
          <p className="font-heading text-2xl font-extrabold text-foreground">{formatBs("24")} · {formatBs("18450")} · {formatBs("12.5")}</p>
          <p className="text-muted">{formatEdad(1)} · {formatEdad(8)} · {formatEdad(12)} · {formatEdad(30)}</p>
        </div>
      </Section>

      <Section title="Botones">
        <Row label="Variantes (pasa el mouse y haz clic para ver hover y pressed)">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="soft">Soft</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </Row>
        <Row label="Tamaños">
          <Button size="sm">Pequeño</Button>
          <Button size="md">Mediano</Button>
          <Button size="lg">Grande</Button>
          <Button size="icon" variant="ghost" aria-label="Favorito"><Heart className="size-5" /></Button>
          <Button size="icon" variant="danger" aria-label="Eliminar"><Trash2 className="size-5" /></Button>
        </Row>
        <Row label="Con icono, deshabilitado y ancho completo">
          <Button><PawPrint className="size-4" /> Adoptar a Milo</Button>
          <Button variant="secondary"><Plus className="size-4" /> Registrar</Button>
          <Button disabled>Deshabilitado</Button>
        </Row>
        <Button fullWidth size="lg">Ancho completo</Button>
        <Row label="Un Link con aspecto de botón (buttonStyles)">
          <Link to="/michis" className={buttonStyles({ variant: "outline" })}>Ver michis</Link>
          <Link to="/menu" className={buttonStyles({ variant: "soft" })}><Coffee className="size-4" /> Ir al menú</Link>
        </Row>
      </Section>

      <Section title="Badges">
        <Row label="Tonos">
          {tonos.map((t) => (
            <Badge key={t} tone={t}>{t}</Badge>
          ))}
        </Row>
        <Row label="Estados del gato (lib/estados.ts)">
          {(Object.keys(ESTADO_GATO) as EstadoGato[]).map((e) => (
            <Badge key={e} tone={ESTADO_GATO[e].tone} dot>{ESTADO_GATO[e].label}</Badge>
          ))}
        </Row>
        <Row label="Estados de la solicitud">
          {(Object.keys(ESTADO_SOLICITUD) as EstadoSolicitud[]).map((e) => (
            <Badge key={e} tone={ESTADO_SOLICITUD[e].tone}>{ESTADO_SOLICITUD[e].label}</Badge>
          ))}
        </Row>
      </Section>

      <Section title="Chips y tabs">
        <Row label="Chips de filtro">
          <Chip selected={filtro === "todos"} count={12} onClick={() => setFiltro("todos")}>Todos</Chip>
          <Chip selected={filtro === "jovenes"} count={5} onClick={() => setFiltro("jovenes")}>Jóvenes</Chip>
          <Chip selected={filtro === "disponibles"} count={8} icon={PawPrint} onClick={() => setFiltro("disponibles")}>
            Disponibles
          </Chip>
        </Row>
        <Tabs
          ariaLabel="Secciones del michi"
          value={tab}
          onChange={setTab}
          items={[
            { value: "general", label: "General" },
            { value: "salud", label: "Salud", icon: Heart },
            { value: "historia", label: "Historia" },
          ]}
        />
        <p className="text-sm text-muted">Pestaña activa: {tab}</p>
      </Section>

      <Section title="Inputs">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Nombre completo" placeholder="Ej. Sofía Vargas" />
          <Input label="WhatsApp" placeholder="+591 78912345" hint="Te contactaremos por este número." />
          <Input label="Correo" defaultValue="correo-invalido" error="Ingresa un correo válido." />
          <Input label="Deshabilitado" placeholder="No editable" disabled />
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-foreground-subtle" />
          <Input aria-label="Buscar" placeholder="Buscar michi..." className="pl-12" />
        </div>
      </Section>

      <Section title="Cards">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <p className="font-heading font-bold text-foreground">Card normal</p>
            <p className="text-muted">Superficie blanca con sombra suave.</p>
          </Card>
          <Card interactive>
            <p className="font-heading font-bold text-foreground">Card interactiva</p>
            <p className="text-muted">Sube un poco al pasar el mouse.</p>
          </Card>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard icon={PawPrint} value={14} label="Michis rescatados" />
          <StatCard icon={Heart} tone="tertiary" value={9} label="Adopciones" hint="este mes" />
          <StatCard icon={Trash2} tone="danger" value={3} label="Requieren atención" />
        </div>
      </Section>
    </div>
  );
}