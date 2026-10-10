import { ArrowLeft } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Reglamento from "../../components/adopcion/Reglamento";
import MichiFoto from "../../components/michis/MichiFoto";
import { Badge, Button, buttonStyles, Card, Checkbox, ChoiceGroup, Input, Textarea } from "../../components/ui";
import { useAsync } from "../../hooks/useAsync";
import { ESTADO_GATO } from "../../lib/estados";
import { formatEdad } from "../../lib/format";
import { getGato } from "../../services/gatos.service";
import { crearSolicitud } from "../../services/solicitudes.service";

const VIVIENDAS = ["Departamento", "Casa con patio cerrado", "Alquiler pet-friendly"];
const MASCOTAS = ["No, sería el primero", "Sí, otros gatos", "Sí, perritos amigables"];

type Form = {
  nombre: string;
  telefono: string;
  email: string;
  zona: string;
  ci: string;
  direccion: string;
  tipoVivienda: string;
  tieneMallas: boolean;
  detalleHogar: string;
  mascotas: string;
  motivo: string;
  familia: boolean;
  contacto: boolean;
};
type Errors = Partial<Record<keyof Form, string>>;

const inicial: Form = {
  nombre: "", telefono: "", email: "", zona: "", ci: "", direccion: "",
  tipoVivienda: "", tieneMallas: false, detalleHogar: "",
  mascotas: "", motivo: "", familia: false, contacto: false,
};

/** Deja solo los 8 dígitos del celular, aunque el usuario escriba "+591 7891 2345" */
function soloCelular(valor: string) {
  const d = valor.replace(/\D/g, "");
  return d.length === 11 && d.startsWith("591") ? d.slice(3) : d;
}

function validar(f: Form): Errors {
  const e: Errors = {};
  if (f.nombre.trim().length < 3) e.nombre = "Ingresa tu nombre completo.";
  if (!/^[67]\d{7}$/.test(soloCelular(f.telefono))) e.telefono = "Ingresa un celular de 8 dígitos, por ejemplo 78912345.";
  if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Ingresa un correo válido.";
  if (!f.zona.trim()) e.zona = "Indica tu ciudad o zona.";
  if (!f.tipoVivienda) e.tipoVivienda = "Elige el tipo de vivienda.";
  if (!f.mascotas) e.mascotas = "Cuéntanos si tienes otras mascotas.";
  if (f.motivo.trim().length < 20) e.motivo = "Cuéntanos un poco más (mínimo 20 caracteres).";
  if (!f.familia) e.familia = "Toda tu familia debe estar de acuerdo con la adopción.";
  if (!f.contacto) e.contacto = "Necesitamos tu autorización para contactarte.";
  return e;
}

export default function SolicitudAdopcionPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { data: gato, loading } = useAsync(`adoptar-${id}`, () => getGato(id));

  const [step, setStep] = useState<1 | 2>(1);
  const [acepta, setAcepta] = useState(false);
  const [form, setForm] = useState<Form>(inicial);
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const set = <K extends keyof Form>(key: K, value: Form[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const irAlPaso = (n: 1 | 2) => {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!gato) return;

    const encontrados = validar(form);
    setErrors(encontrados);
    if (Object.keys(encontrados).length > 0) {
      setTimeout(() => document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(), 0);
      return;
    }

    setSaving(true);
    setSubmitError("");
    try {
      const solicitud = await crearSolicitud({
        gatoId: gato.id,
        adoptante: {
          nombre: form.nombre.trim(),
          telefono: `+591${soloCelular(form.telefono)}`,
          email: form.email.trim() || undefined,
          ci: form.ci.trim() || undefined,
          direccion: form.direccion.trim() || undefined,
          zona: form.zona.trim(),
        },
        tipoVivienda: form.tipoVivienda,
        tieneMallas: form.tieneMallas,
        detalleHogar: form.detalleHogar.trim() || undefined,
        mascotasActuales: form.mascotas,
        compromiso: `${form.motivo.trim()}\n\nToda la familia está de acuerdo con la adopción: sí.`,
      });
      navigate("/solicitud/confirmacion", {
        replace: true,
        state: { solicitudId: solicitud.id, gatoId: gato.id },
      });
    } catch {
      setSubmitError("No pudimos enviar tu solicitud. Intenta de nuevo en unos minutos.");
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="mx-auto my-6 h-96 max-w-2xl animate-pulse rounded-card bg-surface-alt" />;
  }

  if (!gato || gato.estado !== "DISPONIBLE") {
    return (
      <div className="mx-auto flex max-w-2xl flex-col gap-4 py-6">
        <Card className="flex flex-col items-start gap-3">
          <p className="font-heading text-xl font-bold text-foreground">
            {gato ? `${gato.nombre} ya no está disponible para adopción` : "No encontramos a este michi"}
          </p>
          <p className="text-muted">Mira a los otros michis que están esperando un hogar.</p>
          <Link to="/michis" className={buttonStyles({ variant: "soft" })}>Ver a los michis</Link>
        </Card>
      </div>
    );
  }

  const estado = ESTADO_GATO[gato.estado];

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5 py-6">
      <Link to={`/michis/${gato.id}`} className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold">
        <ArrowLeft className="size-4" /> Volver a {gato.nombre}
      </Link>

      <Card className="flex items-center gap-4">
        <MichiFoto gato={gato} className="size-16 shrink-0 rounded-input" />
        <div className="min-w-0 flex-1">
          <h1 className="font-heading text-xl font-extrabold text-secondary dark:text-primary">
            Adoptar a {gato.nombre}
          </h1>
          <p className="text-sm text-muted">{formatEdad(gato.edadMeses)} · #{gato.codigo}</p>
        </div>
        <Badge tone={estado.tone} dot>{estado.label}</Badge>
      </Card>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <span className="font-label font-semibold text-foreground">Paso {step} de 2</span>
          <span className="text-muted">{step === 1 ? "Reglamento" : "Tus datos"}</span>
        </div>
        <div
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={2}
          aria-valuenow={step}
          className="h-2 overflow-hidden rounded-pill bg-surface-alt"
        >
          <div className="h-full rounded-pill bg-primary transition-all" style={{ width: step === 1 ? "50%" : "100%" }} />
        </div>
      </div>

      {step === 1 ? (
        <Reglamento acepta={acepta} onAcepta={setAcepta} onContinuar={() => irAlPaso(2)} />
      ) : (
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
          <Card className="flex flex-col gap-4">
            <h2 className="font-heading text-lg font-bold text-foreground">1. Tus datos</h2>
            <Input label="Nombre completo" autoComplete="name" value={form.nombre}
              onChange={(e) => set("nombre", e.target.value)} error={errors.nombre} />
            <Input label="WhatsApp" startText="+591" inputMode="tel" autoComplete="tel-national" placeholder="78912345"
              value={form.telefono} onChange={(e) => set("telefono", e.target.value)} error={errors.telefono}
              hint="Te contactaremos por este número." />
            <Input label="Correo electrónico (opcional)" type="email" autoComplete="email" value={form.email}
              onChange={(e) => set("email", e.target.value)} error={errors.email} />
            <Input label="Ciudad / zona de residencia" autoComplete="address-level2" placeholder="Ej. Sopocachi, La Paz"
              value={form.zona} onChange={(e) => set("zona", e.target.value)} error={errors.zona} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="CI (opcional)" value={form.ci} onChange={(e) => set("ci", e.target.value)} />
              <Input label="Dirección (opcional)" autoComplete="street-address" value={form.direccion}
                onChange={(e) => set("direccion", e.target.value)} />
            </div>
          </Card>

          <Card className="flex flex-col gap-5">
            <h2 className="font-heading text-lg font-bold text-foreground">2. Tu hogar</h2>
            <ChoiceGroup legend="Tipo de vivienda" options={VIVIENDAS} value={form.tipoVivienda}
              onChange={(v) => set("tipoVivienda", v)} error={errors.tipoVivienda} />
            <Checkbox checked={form.tieneMallas} onChange={(e) => set("tieneMallas", e.target.checked)}
              label="Tengo mallas de seguridad en ventanas y balcones." />
            <Textarea label="Cuéntanos de tu hogar (opcional)" rows={3} value={form.detalleHogar}
              onChange={(e) => set("detalleHogar", e.target.value)}
              placeholder="Ej. Depto de 95 m² en 4to piso, con balcón." />
            <ChoiceGroup legend="¿Vives con otras mascotas?" options={MASCOTAS} value={form.mascotas}
              onChange={(v) => set("mascotas", v)} error={errors.mascotas} />
            <Textarea label={`¿Por qué deseas adoptar a ${gato.nombre}?`} value={form.motivo}
              onChange={(e) => set("motivo", e.target.value)} error={errors.motivo}
              hint="Cuéntanos sobre tu rutina, tu tiempo y tu experiencia con mascotas." />
            <Checkbox checked={form.familia} onChange={(e) => set("familia", e.target.checked)}
              error={errors.familia} label="Toda mi familia o las personas con quienes vivo están de acuerdo." />
          </Card>

          <Card className="flex flex-col gap-4">
            <Checkbox checked={form.contacto} onChange={(e) => set("contacto", e.target.checked)}
              error={errors.contacto}
              label="Acepto el contacto por WhatsApp y el uso de mis datos para el proceso de adopción en Mishin Café." />
            <p className="rounded-input bg-secondary-container p-3 text-sm text-on-secondary-container">
              Tu solicitud será revisada por nuestro equipo. Enviar el formulario no implica aprobación automática.
            </p>
            {submitError && <p role="alert" className="text-sm text-danger">{submitError}</p>}
            <Button type="submit" size="lg" fullWidth disabled={saving}>
              {saving ? "Enviando..." : "Enviar solicitud de adopción"}
            </Button>
            <Button variant="ghost" fullWidth onClick={() => irAlPaso(1)} disabled={saving}>
              Volver al reglamento
            </Button>
          </Card>
        </form>
      )}
    </div>
  );
}