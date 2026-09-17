import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Blog-Beitrag',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titel', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'excerpt', title: 'Teaser-Text', type: 'text', rows: 3 }),
    defineField({ name: 'coverImage', title: 'Titelbild', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'body',
      title: 'Inhalt',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    }),
    defineField({ name: 'author', title: 'Autor', type: 'reference', to: [{ type: 'author' }] }),
    defineField({
      name: 'publishedAt',
      title: 'Veroeffentlicht am',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Schlagworte',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  orderings: [
    {
      title: 'Veroeffentlichungsdatum, neueste zuerst',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', media: 'coverImage', date: 'publishedAt' },
    prepare: ({ title, media, date }) => ({
      title,
      subtitle: date ? new Date(date).toLocaleDateString('de-DE') : undefined,
      media,
    }),
  },
});
