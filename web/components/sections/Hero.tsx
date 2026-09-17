import Link from 'next/link';
import { urlFor } from '@/lib/sanity/image';
import type { HeroBlock } from '@/lib/sanity/types';

export default function Hero({ block }: { block: HeroBlock }) {
  return (
    <section className="relative overflow-hidden bg-brand-primary text-white">
      {block.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={urlFor(block.image).width(1600).height(700).fit('crop').auto('format').url()}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
      ) : null}
      <div className="relative mx-auto max-w-4xl px-4 py-24 text-center">
        <h1 className="font-heading text-4xl font-bold md:text-5xl">{block.heading}</h1>
        {block.subheading ? (
          <p className="mt-4 text-lg text-white/90">{block.subheading}</p>
        ) : null}
        {block.ctaLabel && block.ctaUrl ? (
          <Link
            href={block.ctaUrl}
            className="mt-8 inline-block rounded-brand bg-brand-accent px-6 py-3 font-body font-semibold text-white transition hover:opacity-90"
          >
            {block.ctaLabel}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
