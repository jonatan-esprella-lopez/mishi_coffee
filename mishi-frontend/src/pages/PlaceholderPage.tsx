export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold text-secondary dark:text-primary">{title}</h2>
      <p className="text-muted">En construcción</p>
    </section>
  );
}