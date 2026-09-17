import PortableText from '@/components/PortableText';
import type { RichTextBlock } from '@/lib/sanity/types';

export default function RichTextSection({ block }: { block: RichTextBlock }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <PortableText value={block.content} />
    </section>
  );
}
