import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import MichiCard from "../../components/michis/MichiCard";
import { Button, Card, Chip, Input } from "../../components/ui";
import { useAsync } from "../../hooks/useAsync";
import { ESTADOS_PUBLICOS } from "../../lib/estados";
import { getGatos } from "../../services/gatos.service";
import type { Gato } from "../../types";

type Filtro = "todos" | "jovenes" | "disponibles" | "machos" | "hembras";

const filtros: { value: Filtro; label: string; test: (g: Gato) => boolean }[] = [
  { value: "todos", label: "Todos", test: () => true },
  { value: "jovenes", label: "Jóvenes", test: (g) => g.edadMeses < 12 },
  { value: "disponibles", label: "Disponibles", test: (g) => g.estado === "DISPONIBLE" },
  { value: "machos", label: "Machos", test: (g) => g.sexo === "MACHO" },
  { value: "hembras", label: "Hembras", test: (g) => g.sexo === "HEMBRA" },
];

export default function MichisPage() {
  const { data: gatos, loading, error } = useAsync("michis-publicos", () =>
    getGatos({ estados: ESTADOS_PUBLICOS }),
  );
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const [busqueda, setBusqueda] = useState("");

  const visibles = useMemo(() => {
    const test = filtros.find((f) => f.value === filtro)?.test ?? (() => true);
    const q = busqueda.trim().toLowerCase();
    return (gatos ?? []).filter((g) => test(g) && (!q || g.nombre.toLowerCase().includes(q)));
  }, [gatos, filtro, busqueda]);

  const limpiar = () => {
    setFiltro("todos");
    setBusqueda("");
  };

  return (
    <div className="flex flex-col gap-6 py-6">
      <header>
        <h1 className="font-heading text-3xl font-extrabold text-secondary md:text-4xl dark:text-primary">
          Michis en busca de hogar
        </h1>
        <p className="text-muted">Conoce a tus futuros compañeros de vida.</p>
      </header>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-foreground-subtle" />
        <Input
          aria-label="Buscar michi por nombre"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="pl-12"
        />
      </div>

      <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:px-0">
        {filtros.map((f) => (
          <Chip
            key={f.value}
            selected={filtro === f.value}
            count={gatos ? gatos.filter(f.test).length : undefined}
            onClick={() => setFiltro(f.value)}
          >
            {f.label}
          </Chip>
        ))}
      </div>

      {error ? (
        <Card className="text-danger">No pudimos cargar a los michis. Intenta de nuevo en unos minutos.</Card>
      ) : loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-96 animate-pulse rounded-card bg-surface-alt" />
          ))}
        </div>
      ) : visibles.length === 0 ? (
        <Card className="flex flex-col items-start gap-3">
          <p className="text-muted">Ningún michi coincide con tu búsqueda.</p>
          <Button variant="soft" onClick={limpiar}>Limpiar filtros</Button>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibles.map((g) => (
            <MichiCard key={g.id} gato={g} />
          ))}
        </div>
      )}
    </div>
  );
}