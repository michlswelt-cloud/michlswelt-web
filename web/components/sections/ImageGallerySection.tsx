import { urlFor } from '@/lib/sanity/image';
import type { ImageGalleryBlock } from '@/lib/sanity/types';

export default function ImageGallerySection({ block }: { block: ImageGalleryBlock }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      {block.heading ? (
        <h2 className="mb-6 font-heading text-2xl font-bold text-brand-primary">{block.heading}</h2>
      ) : null}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {block.images.map((img) => (
          <figure key={img._key} className="overflow-hidden rounded-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={urlFor(img.asset).width(600).height(600).fit('crop').auto('format').url()}
              alt={img.caption ?? ''}
              className="h-full w-full object-cover transition duration-300 hover:scale-105"
            />
            {img.caption ? (
              <figcaption className="mt-2 text-sm text-brand-secondary">{img.caption}</figcaption>
            ) : null}
          </figure>
        ))}
      </div>
    </section>
  );
}
