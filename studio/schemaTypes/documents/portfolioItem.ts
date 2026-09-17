import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'portfolioItem',
  title: 'Portfolio-Eintrag',
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
    defineField({ name: 'category', title: 'Kategorie', type: 'string' }),
    defineField({
      name: 'images',
      title: 'Bilder',
      type: 'array',
      validation: (r) => r.min(1),
      of: [
        {
          type: 'object',
          name: 'portfolioImage',
          fields: [
            defineField({ name: 'asset', title: 'Bild', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'caption', title: 'Bildunterschrift', type: 'string' }),
          ],
          preview: {
            select: { media: 'asset', title: 'caption' },
          },
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Beschreibung',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    select: { title: 'title', media: 'images.0.asset', category: 'category' },
    prepare: ({ title, media, category }) => ({ title, subtitle: category, media }),
  },
});
