import Link from 'next/link';
import type { CtaBannerBlock } from '@/lib/sanity/types';

export default function CtaBanner({ block }: { block: CtaBannerBlock }) {
  return (
    <section className="bg-brand-accent/10 py-12">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 text-center">
        <h2 className="font-heading text-2xl font-bold text-brand-primary">{block.heading}</h2>
        {block.text ? <p className="text-brand-text">{block.text}</p> : null}
        <Link
          href={block.buttonUrl}
          className="rounded-brand bg-brand-accent px-6 py-3 font-body font-semibold text-white transition hover:opacity-90"
        >
          {block.buttonLabel}
        </Link>
      </div>
    </section>
  );
}
