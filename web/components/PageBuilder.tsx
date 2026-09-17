import type { PageBuilderBlock } from '@/lib/sanity/types';
import Hero from './sections/Hero';
import RichTextSection from './sections/RichTextSection';
import ImageGallerySection from './sections/ImageGallerySection';
import CtaBanner from './sections/CtaBanner';
import FeaturedPosts from './sections/FeaturedPosts';
import FeaturedEvents from './sections/FeaturedEvents';

// Zentrale Stelle, um neue Layout-Bausteine zu registrieren: Schema in
// studio/schemaTypes/blocks anlegen, Typ in lib/sanity/types.ts ergaenzen
// und hier eine Komponente zuordnen.
export default function PageBuilder({ blocks }: { blocks?: PageBuilderBlock[] }) {
  if (!blocks?.length) return null;

  return (
    <>
      {blocks.map((block) => {
        switch (block._type) {
          case 'hero':
            return <Hero key={block._key} block={block} />;
          case 'richTextBlock':
            return <RichTextSection key={block._key} block={block} />;
          case 'imageGallery':
            return <ImageGallerySection key={block._key} block={block} />;
          case 'ctaBanner':
            return <CtaBanner key={block._key} block={block} />;
          case 'featuredPosts':
            return <FeaturedPosts key={block._key} block={block} />;
          case 'featuredEvents':
            return <FeaturedEvents key={block._key} block={block} />;
          default:
            return null;
        }
      })}
    </>
  );
}
