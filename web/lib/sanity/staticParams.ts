// Next.js verlangt bei `output: "export"` fuer jede dynamische Route
// mindestens einen Pfad aus generateStaticParams() - ein leeres Array laesst
// den Build fehlschlagen. Das passiert real, sobald ein Inhaltstyp (noch)
// keine Eintraege hat, z.B. direkt nach dem Start der Seite. Falls die
// Slug-Liste leer ist, wird deshalb ein Platzhalter-Slug erzeugt; die
// jeweilige Detailseite ruft fuer diesen ohnehin `notFound()` auf, da kein
// Dokument mit diesem Slug existiert.
export const PLACEHOLDER_SLUG = '__none__';

export function toStaticParams(slugs: string[]): { slug: string }[] {
  const safeSlugs = slugs.length ? slugs : [PLACEHOLDER_SLUG];
  return safeSlugs.map((slug) => ({ slug }));
}
