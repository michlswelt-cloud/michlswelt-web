import Link from 'next/link';
import { sanityClient } from '@/lib/sanity/client';
import { allPortfolioItemsQuery } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import type { PortfolioItem } from '@/lib/sanity/types';

export const metadata = { title: 'Portfolio' };

export default async function PortfolioIndexPage() {
  const items = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    ? await sanityClient.fetch<PortfolioItem[]>(allPortfolioItemsQuery)
    : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="font-heading text-3xl font-bold text-brand-primary">Portfolio</h1>
      {!items.length ? (
        <p className="mt-6 text-brand-secondary">Es sind noch keine Portfolio-Eintraege vorhanden.</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item._id}
              href={`/portfolio/${item.slug.current}`}
              className="group overflow-hidden rounded-brand"
            >
              {item.images?.[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={urlFor(item.images[0].asset).width(500).height(500).fit('crop').auto('format').url()}
                  alt=""
                  className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
                />
              ) : null}
              <div className="mt-2">
                <h2 className="font-heading font-semibold text-brand-primary">{item.title}</h2>
                {item.category ? (
                  <p className="text-sm text-brand-secondary">{item.category}</p>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
