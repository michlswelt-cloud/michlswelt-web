import type { StructureResolver } from 'sanity/structure';

// Singleton-Dokumente (siteSettings, navigation) bekommen eigene Eintraege
// ohne Liste, damit Redakteure sie nicht versehentlich duplizieren.
export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Inhalte')
    .items([
      S.listItem()
        .title('Website-Einstellungen')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('Navigation')
        .id('navigation')
        .child(S.document().schemaType('navigation').documentId('navigation')),
      S.divider(),
      S.documentTypeListItem('page').title('Seiten'),
      S.documentTypeListItem('post').title('Blog-Beitraege'),
      S.documentTypeListItem('event').title('Termine'),
      S.documentTypeListItem('portfolioItem').title('Portfolio'),
      S.documentTypeListItem('author').title('Autoren'),
    ]);
