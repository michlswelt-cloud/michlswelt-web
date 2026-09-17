export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-heading text-3xl font-bold text-brand-primary">Seite nicht gefunden</h1>
      <p className="mt-4 text-brand-secondary">
        Die angeforderte Seite existiert nicht oder wurde verschoben.
      </p>
    </div>
  );
}
