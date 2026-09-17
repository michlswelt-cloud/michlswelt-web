import { createClient } from '@sanity/client';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01';

// `createClient` validiert die projectId sofort beim Erzeugen. Solange kein
// Sanity-Projekt konfiguriert ist (z.B. frisch geklontes Repo), wird ein
// Platzhalter verwendet, damit der Build nicht crasht - alle Aufrufer
// pruefen NEXT_PUBLIC_SANITY_PROJECT_ID, bevor sie tatsaechlich fetchen.
export const sanityClient = createClient({
  projectId: projectId || 'placeholder',
  dataset,
  apiVersion,
  useCdn: true,
});
