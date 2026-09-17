import Link from 'next/link';
import { sanityClient } from '@/lib/sanity/client';
import { allEventsQuery } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import type { EventItem } from '@/lib/sanity/types';

export const metadata = { title: 'Termine' };

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default async function EventsIndexPage() {
  const events = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    ? await sanityClient.fetch<EventItem[]>(allEventsQuery)
    : [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="font-heading text-3xl font-bold text-brand-primary">Termine</h1>
      {!events.length ? (
        <p className="mt-6 text-brand-secondary">Aktuell sind keine Termine eingetragen.</p>
      ) : (
        <div className="mt-8 space-y-10">
          {events.map((event) => (
            <article key={event._id} className="flex gap-6">
              {event.image ? (
                <Link href={`/events/${event.slug.current}`} className="shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={urlFor(event.image).width(200).height(150).fit('crop').auto('format').url()}
                    alt=""
                    className="h-32 w-44 rounded-brand object-cover"
                  />
                </Link>
              ) : null}
              <div>
                <p className="text-sm font-semibold text-brand-accent">{formatDate(event.startDate)}</p>
                <h2 className="mt-1 font-heading text-xl font-semibold text-brand-primary">
                  <Link href={`/events/${event.slug.current}`}>{event.title}</Link>
                </h2>
                {event.location ? <p className="mt-2 text-brand-text">{event.location}</p> : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
