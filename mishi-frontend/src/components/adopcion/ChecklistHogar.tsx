import { useState } from "react";
import { Card, Checkbox } from "../ui";

const ITEMS = [
  { id: "mallas", titulo: "Mallas de seguridad", texto: "Protección en ventanas y balcones." },
  { id: "arenero", titulo: "Arenero amplio y arena aglomerante", texto: "En un lugar tranquilo y de fácil acceso." },
  { id: "platos", titulo: "Platos de cerámica o acero", texto: "Comedero plano y agua siempre fresca." },
  { id: "alimento", titulo: "Alimento para gatitos", texto: "Pregúntanos qué dieta sigue ahora para evitar cambios bruscos." },
  { id: "rascador", titulo: "Rascador vertical", texto: "Para afilar garras y cuidar tus muebles." },
];

export default function ChecklistHogar({ nombre }: { nombre: string }) {
  const [listos, setListos] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setListos((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <Card className="flex flex-col gap-4">
      <div>
        <h2 className="font-heading text-xl font-bold text-foreground">¿Qué preparar para recibir a {nombre}?</h2>
        <p className="text-sm text-muted">
          Marca cada artículo para llevar tu progreso. {listos.size} de {ITEMS.length} listos.
        </p>
      </div>
      <ul className="flex flex-col gap-3">
        {ITEMS.map(({ id, titulo, texto }) => (
          <li key={id} className="rounded-input bg-surface-alt p-3">
            <Checkbox
              checked={listos.has(id)}
              onChange={() => toggle(id)}
              label={
                <>
                  <span className="font-semibold">{titulo}</span>
                  <span className="block text-muted">{texto}</span>
                </>
              }
            />
          </li>
        ))}
      </ul>
      <p className="text-sm text-muted">
        ¿Dudas con las medidas de mallas? Nuestro equipo te asesora sin costo durante la entrevista.
      </p>
    </Card>
  );
}