import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { sanityClient } from '@/lib/sanity/client';
import { allEventSlugsQuery, eventBySlugQuery } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import type { EventItem } from '@/lib/sanity/types';
import { PLACEHOLDER_SLUG, toStaticParams } from '@/lib/sanity/staticParams';
import PortableText from '@/components/PortableText';

export async function generateStaticParams() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return toStaticParams([]);
  const slugs = await sanityClient.fetch<string[]>(allEventSlugsQuery);
  return toStaticParams(slugs);
}

async function getEvent(slug: string) {
  if (slug === PLACEHOLDER_SLUG || !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null;
  return sanityClient.fetch<EventItem | null>(eventBySlugQuery, { slug });
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const event = await getEvent(params.slug);
  return {
    title: event?.seo?.metaTitle ?? event?.title,
    description: event?.seo?.metaDescription,
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default async function EventPage({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug);
  if (!event) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      {event.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={urlFor(event.image).width(1200).height(600).fit('crop').auto('format').url()}
          alt=""
          className="mb-8 w-full rounded-brand object-cover"
        />
      ) : null}
      <p className="text-sm font-semibold text-brand-accent">{formatDate(event.startDate)}</p>
      <h1 className="mt-2 font-heading text-3xl font-bold text-brand-primary">{event.title}</h1>
      {event.location ? <p className="mt-2 text-brand-secondary">{event.location}</p> : null}
      <div className="mt-8">
        <PortableText value={event.description ?? []} />
      </div>
      {event.ticketLink ? (
        <a
          href={event.ticketLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-brand bg-brand-accent px-6 py-3 font-body font-semibold text-white transition hover:opacity-90"
        >
          Tickets / Anmeldung
        </a>
      ) : null}
    </article>
  );
}
