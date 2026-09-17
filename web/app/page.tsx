import { sanityClient } from '@/lib/sanity/client';
import { pageBySlugQuery } from '@/lib/sanity/queries';
import type { Page } from '@/lib/sanity/types';
import PageBuilder from '@/components/PageBuilder';

export const revalidate = false;

export default async function HomePage() {
  const page = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    ? await sanityClient.fetch<Page | null>(pageBySlugQuery, { slug: 'home' })
    : null;

  if (!page) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-heading text-3xl font-bold text-brand-primary">Willkommen bei Michl&apos;s Welt</h1>
        <p className="mt-4 text-brand-secondary">
          Es wurde noch keine Startseite im CMS angelegt. Lege im Sanity Studio ein
          Dokument vom Typ &quot;Seite&quot; mit dem Slug <code>home</code> an und
          baue sie mit dem Page Builder auf.
        </p>
      </div>
    );
  }

  return <PageBuilder blocks={page.pageBuilder} />;
}
