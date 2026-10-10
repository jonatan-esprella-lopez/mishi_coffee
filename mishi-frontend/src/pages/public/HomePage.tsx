import { Heart, PawPrint } from "lucide-react";
import { Link } from "react-router";
import SalaConvivencia from "../../components/experiencias/SalaConvivencia";
import MichiCard from "../../components/michis/MichiCard";
import { Badge, buttonStyles, StatCard } from "../../components/ui";
import { useAsync } from "../../hooks/useAsync";
import { getGatos, getResumenGatos } from "../../services/gatos.service";

const pasos = [
  { titulo: "Visítanos en el café", texto: "Toma un café de especialidad y comparte un rato con los michis en la sala de convivencia." },
  { titulo: "Conoce a tu compañero", texto: "Descubre qué michi conecta con tu estilo de vida, tu espacio y tu energía." },
  { titulo: "Solicitud responsable", texto: "Llena el formulario, validamos la seguridad del hogar y formalizamos la bienvenida con su carnet sanitario." },
];

export default function HomePage() {
  const { data: resumen } = useAsync("resumen-gatos", getResumenGatos);
  const { data: destacados, loading } = useAsync("michis-destacados", () => getGatos({ estados: ["DISPONIBLE"] }));

  return (
    <div className="flex flex-col gap-12 py-6 md:gap-16 md:py-10">
      {/* Hero */}
      <section className="grid items-center gap-8 md:grid-cols-2">
        <div className="flex flex-col items-start gap-5">
          <Badge tone="warning">Café de especialidad y refugio</Badge>
          <h1 className="font-heading text-4xl font-extrabold leading-tight text-secondary md:text-5xl dark:text-primary">
            Una taza de café, una segunda oportunidad
          </h1>
          <p className="max-w-prose text-lg text-muted">
            Disfruta de café de especialidad, tardes de cine y karaoke mientras brindas un hogar cálido a gatitos rescatados en Bolivia.
          </p>
          <div className="grid w-full max-w-md grid-cols-2 gap-3">
            <StatCard icon={PawPrint} value={resumen?.residentes ?? "–"} label="Michis en el refugio" />
            <StatCard icon={Heart} tone="tertiary" value={resumen?.adoptados ?? "–"} label="Adopciones" />
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/michis" className={buttonStyles({ size: "lg" })}>
              <PawPrint className="size-5" /> Conoce a los michis
            </Link>
            <a href="#proceso" className={buttonStyles({ variant: "soft", size: "lg" })}>
              ¿Cómo funciona?
            </a>
          </div>
        </div>

        {/* TODO: reemplazar por una foto real del local */}
        <div
          aria-hidden="true"
          className="hidden aspect-square place-items-center rounded-card bg-linear-to-br from-primary-container to-secondary-container text-on-primary-container md:grid"
        >
          <PawPrint className="size-32 opacity-50" />
        </div>
      </section>

      {/* Michis destacados */}
      <section className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-heading text-2xl font-bold text-foreground">Michis en busca de hogar</h2>
          <Link to="/michis" className="font-label font-semibold">Ver todos</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? [0, 1, 2].map((i) => <div key={i} className="h-96 animate-pulse rounded-card bg-surface-alt" />)
            : (destacados ?? []).slice(0, 3).map((g) => <MichiCard key={g.id} gato={g} />)}
        </div>
      </section>

      {/* Proceso */}
      <section id="proceso" className="flex scroll-mt-24 flex-col gap-4">
        <h2 className="font-heading text-2xl font-bold text-foreground">El proceso en 3 pasos</h2>
        <ol className="grid gap-4 md:grid-cols-3">
          {pasos.map((p, i) => (
            <li key={p.titulo} className="flex gap-4 rounded-card bg-surface-alt p-5">
              <span className="grid size-10 shrink-0 place-items-center rounded-pill bg-primary font-heading font-extrabold text-on-primary">
                {i + 1}
              </span>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground">{p.titulo}</h3>
                <p className="text-sm text-muted">{p.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Sala de convivencia */}
      <SalaConvivencia />
    </div>
  );
}