import { PortableText as PortableTextBase, type PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/react';
import { urlFor } from '@/lib/sanity/image';
import type { SanityImageSource } from '@/lib/sanity/image';

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImageSource }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={urlFor(value).width(1200).fit('max').auto('format').url()}
        alt=""
        className="my-6 rounded-brand"
      />
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-accent underline underline-offset-2"
      >
        {children}
      </a>
    ),
  },
};

export default function PortableText({ value }: { value: PortableTextBlock[] }) {
  if (!value?.length) return null;
  return (
    <div className="prose max-w-none font-body text-brand-text">
      <PortableTextBase value={value} components={components} />
    </div>
  );
}
