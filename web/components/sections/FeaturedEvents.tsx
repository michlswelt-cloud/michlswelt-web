import Link from 'next/link';
import { urlFor } from '@/lib/sanity/image';
import type { FeaturedEventsBlock } from '@/lib/sanity/types';

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default function FeaturedEvents({ block }: { block: FeaturedEventsBlock }) {
  if (!block.events?.length) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      {block.heading ? (
        <h2 className="mb-6 font-heading text-2xl font-bold text-brand-primary">{block.heading}</h2>
      ) : null}
      <div className="grid gap-6 md:grid-cols-3">
        {block.events.map((event) => (
          <Link
            key={event._id}
            href={`/events/${event.slug.current}`}
            className="group overflow-hidden rounded-brand border border-brand-secondary/10"
          >
            {event.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={urlFor(event.image).width(500).height(300).fit('crop').auto('format').url()}
                alt=""
                className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
              />
            ) : null}
            <div className="p-4">
              <p className="text-sm font-semibold text-brand-accent">{formatDate(event.startDate)}</p>
              <h3 className="mt-1 font-heading text-lg font-semibold text-brand-primary">
                {event.title}
              </h3>
              {event.location ? (
                <p className="mt-2 text-sm text-brand-secondary">{event.location}</p>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
