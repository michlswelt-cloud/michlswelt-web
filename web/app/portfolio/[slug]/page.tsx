import { notFound } from 'next/navigation';
import { sanityClient } from '@/lib/sanity/client';
import { allPortfolioSlugsQuery, portfolioItemBySlugQuery } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import type { PortfolioItem } from '@/lib/sanity/types';
import { PLACEHOLDER_SLUG, toStaticParams } from '@/lib/sanity/staticParams';
import PortableText from '@/components/PortableText';

export async function generateStaticParams() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return toStaticParams([]);
  const slugs = await sanityClient.fetch<string[]>(allPortfolioSlugsQuery);
  return toStaticParams(slugs);
}

async function getPortfolioItem(slug: string) {
  if (slug === PLACEHOLDER_SLUG || !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null;
  return sanityClient.fetch<PortfolioItem | null>(portfolioItemBySlugQuery, { slug });
}

export default async function PortfolioItemPage({ params }: { params: { slug: string } }) {
  const item = await getPortfolioItem(params.slug);
  if (!item) notFound();

  return (
    <article className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="font-heading text-3xl font-bold text-brand-primary">{item.title}</h1>
      {item.category ? <p className="mt-2 text-brand-secondary">{item.category}</p> : null}
      <div className="mt-8">
        <PortableText value={item.description ?? []} />
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {item.images?.map((img) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={img._key}
            src={urlFor(img.asset).width(800).fit('max').auto('format').url()}
            alt={img.caption ?? ''}
            className="w-full rounded-brand object-cover"
          />
        ))}
      </div>
    </article>
  );
}
