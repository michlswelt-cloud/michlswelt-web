import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from './client';

export interface SanityImageSource {
  asset?: { _ref: string; _type: 'reference' };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  [key: string]: unknown;
}

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
