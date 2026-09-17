import siteSettings from './singletons/siteSettings';
import navigation from './singletons/navigation';

import page from './documents/page';
import post from './documents/post';
import author from './documents/author';
import event from './documents/event';
import portfolioItem from './documents/portfolioItem';

import seo from './objects/seo';

import hero from './blocks/hero';
import richTextBlock from './blocks/richTextBlock';
import imageGallery from './blocks/imageGallery';
import ctaBanner from './blocks/ctaBanner';
import featuredPosts from './blocks/featuredPosts';
import featuredEvents from './blocks/featuredEvents';

export const schemaTypes = [
  // Singletons
  siteSettings,
  navigation,
  // Dokumente
  page,
  post,
  author,
  event,
  portfolioItem,
  // Objekte
  seo,
  // Page-Builder-Bloecke
  hero,
  richTextBlock,
  imageGallery,
  ctaBanner,
  featuredPosts,
  featuredEvents,
];
