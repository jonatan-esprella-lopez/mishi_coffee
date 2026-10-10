import { COMPROMISOS } from "../../config/reglamento";
import { Button, Card, Checkbox } from "../ui";

type Props = { acepta: boolean; onAcepta: (value: boolean) => void; onContinuar: () => void };

export default function Reglamento({ acepta, onAcepta, onContinuar }: Props) {
  return (
    <Card className="flex flex-col gap-5">
      <div>
        <h2 className="font-heading text-xl font-bold text-foreground">Compromiso responsable</h2>
        <p className="text-sm text-muted">
          Nuestros michis merecen hogares definitivos basados en respeto mutuo y bienestar pleno. Lee con atención los 7 compromisos.
        </p>
      </div>

      <ol className="flex flex-col gap-3">
        {COMPROMISOS.map((texto, i) => (
          <li key={i} className="flex gap-3">
            <span className="grid size-7 shrink-0 place-items-center rounded-pill bg-tertiary-container font-heading text-sm font-bold text-on-tertiary-container">
              {i + 1}
            </span>
            <p className="text-sm text-foreground">{texto}</p>
          </li>
        ))}
      </ol>

      <div className="rounded-input bg-primary-container p-4 text-on-primary-container">
        <Checkbox
          checked={acepta}
          onChange={(e) => onAcepta(e.target.checked)}
          label="He leído y acepto el reglamento de adopción responsable de Mishin Café."
        />
      </div>

      <Button size="lg" fullWidth disabled={!acepta} onClick={onContinuar}>
        Continuar
      </Button>
    </Card>
  );
}