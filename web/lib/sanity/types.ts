import type { SanityImageSource } from './image';
import type { PortableTextBlock } from '@portabletext/react';

export interface SiteSettings {
  title: string;
  tagline?: string;
  logo?: SanityImageSource;
  favicon?: SanityImageSource;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  backgroundColor?: string;
  textColor?: string;
  fontHeading?: string;
  fontBody?: string;
  borderRadius?: string;
  socialLinks?: { platform: string; url: string }[];
  footerText?: string;
}

export interface InternalLinkTarget {
  slug?: { current: string };
  _type?: string;
}

export interface NavigationItem {
  _key: string;
  label: string;
  linkType: 'internal' | 'external';
  internalLink?: InternalLinkTarget;
  externalUrl?: string;
  openInNewTab?: boolean;
}

export interface Navigation {
  items: NavigationItem[];
}

export interface HeroBlock {
  _type: 'hero';
  _key: string;
  heading: string;
  subheading?: string;
  image?: SanityImageSource;
  ctaLabel?: string;
  ctaUrl?: string;
}

export interface RichTextBlock {
  _type: 'richTextBlock';
  _key: string;
  content: PortableTextBlock[];
}

export interface ImageGalleryBlock {
  _type: 'imageGallery';
  _key: string;
  heading?: string;
  images: { asset: SanityImageSource; caption?: string; _key: string }[];
}

export interface CtaBannerBlock {
  _type: 'ctaBanner';
  _key: string;
  heading: string;
  text?: string;
  buttonLabel: string;
  buttonUrl: string;
}

export interface FeaturedPostsBlock {
  _type: 'featuredPosts';
  _key: string;
  heading?: string;
  posts: Post[];
}

export interface FeaturedEventsBlock {
  _type: 'featuredEvents';
  _key: string;
  heading?: string;
  events: EventItem[];
}

export type PageBuilderBlock =
  | HeroBlock
  | RichTextBlock
  | ImageGalleryBlock
  | CtaBannerBlock
  | FeaturedPostsBlock
  | FeaturedEventsBlock;

export interface Seo {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImageSource;
}

export interface Page {
  _id: string;
  title: string;
  slug: { current: string };
  seo?: Seo;
  pageBuilder?: PageBuilderBlock[];
}

export interface Author {
  name: string;
  image?: SanityImageSource;
  bio?: PortableTextBlock[];
}

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverImage?: SanityImageSource;
  body?: PortableTextBlock[];
  author?: Author;
  publishedAt: string;
  tags?: string[];
  seo?: Seo;
}

export interface EventItem {
  _id: string;
  title: string;
  slug: { current: string };
  startDate: string;
  endDate?: string;
  location?: string;
  description?: PortableTextBlock[];
  image?: SanityImageSource;
  ticketLink?: string;
  seo?: Seo;
}

export interface PortfolioItem {
  _id: string;
  title: string;
  slug: { current: string };
  category?: string;
  images: { asset: SanityImageSource; caption?: string; _key: string }[];
  description?: PortableTextBlock[];
}
