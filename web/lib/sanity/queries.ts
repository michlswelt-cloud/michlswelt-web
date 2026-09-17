// GROQ-Queries sind reine Strings; der `groq`-Tag von next-sanity dient nur
// dem Editor-Tooling (Syntax-Highlighting). Um next-sanity - und damit dessen
// Re-Export von @sanity/next-loader mit "use server"-Code, der den
// statischen Next.js-Export blockiert - nicht importieren zu muessen, wird
// hier ein einfacher Passthrough-Tag verwendet.
function groq(strings: TemplateStringsArray, ...values: unknown[]): string {
  return strings.reduce((acc, str, i) => acc + str + (i < values.length ? String(values[i]) : ''), '');
}

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    title,
    tagline,
    logo,
    favicon,
    primaryColor,
    secondaryColor,
    accentColor,
    backgroundColor,
    textColor,
    fontHeading,
    fontBody,
    borderRadius,
    socialLinks,
    footerText
  }
`;

export const navigationQuery = groq`
  *[_type == "navigation"][0]{
    items[]{
      _key,
      label,
      linkType,
      "internalLink": internalLink->{slug, _type},
      externalUrl,
      openInNewTab
    }
  }
`;

const pageBuilderProjection = groq`
  pageBuilder[]{
    ...,
    _type == "featuredPosts" => {
      ...,
      "posts": *[_type == "post"] | order(publishedAt desc)[0...3]{
        _id, title, slug, excerpt, coverImage, publishedAt
      }
    },
    _type == "featuredEvents" => {
      ...,
      "events": *[_type == "event" && startDate >= now()] | order(startDate asc)[0...3]{
        _id, title, slug, startDate, location, image
      }
    }
  }
`;

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    seo,
    ${pageBuilderProjection}
  }
`;

export const allPageSlugsQuery = groq`*[_type == "page" && defined(slug.current)].slug.current`;

export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc){
    _id, title, slug, excerpt, coverImage, publishedAt, tags
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    _id, title, slug, excerpt, coverImage, body, publishedAt, tags, seo,
    "author": author->{name, image, bio}
  }
`;

export const allPostSlugsQuery = groq`*[_type == "post" && defined(slug.current)].slug.current`;

export const allEventsQuery = groq`
  *[_type == "event"] | order(startDate desc){
    _id, title, slug, startDate, endDate, location, image
  }
`;

export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0]{
    _id, title, slug, startDate, endDate, location, description, image, ticketLink, seo
  }
`;

export const allEventSlugsQuery = groq`*[_type == "event" && defined(slug.current)].slug.current`;

export const allPortfolioItemsQuery = groq`
  *[_type == "portfolioItem"] | order(_createdAt desc){
    _id, title, slug, category, images
  }
`;

export const portfolioItemBySlugQuery = groq`
  *[_type == "portfolioItem" && slug.current == $slug][0]{
    _id, title, slug, category, images, description
  }
`;

export const allPortfolioSlugsQuery = groq`*[_type == "portfolioItem" && defined(slug.current)].slug.current`;
