import { notFound } from 'next/navigation';
import { sanityClient } from '@/lib/sanity/client';
import { allPageSlugsQuery, pageBySlugQuery } from '@/lib/sanity/queries';
import type { Page } from '@/lib/sanity/types';
import { PLACEHOLDER_SLUG, toStaticParams } from '@/lib/sanity/staticParams';
import PageBuilder from '@/components/PageBuilder';

export async function generateStaticParams() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return toStaticParams([]);
  const slugs = await sanityClient.fetch<string[]>(allPageSlugsQuery);
  // "home" wird bereits unter "/" gerendert (siehe app/page.tsx).
  return toStaticParams(slugs.filter((slug) => slug !== 'home'));
}

async function getPage(slug: string) {
  if (slug === PLACEHOLDER_SLUG || !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null;
  return sanityClient.fetch<Page | null>(pageBySlugQuery, { slug });
}

export default async function GenericPage({ params }: { params: { slug: string } }) {
  const page = await getPage(params.slug);

  if (!page) notFound();

  return <PageBuilder blocks={page.pageBuilder} />;
}
