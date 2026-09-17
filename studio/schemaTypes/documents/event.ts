import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'event',
  title: 'Termin',
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
    defineField({ name: 'startDate', title: 'Start', type: 'datetime', validation: (r) => r.required() }),
    defineField({ name: 'endDate', title: 'Ende', type: 'datetime' }),
    defineField({ name: 'location', title: 'Ort', type: 'string' }),
    defineField({ name: 'image', title: 'Bild', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'description',
      title: 'Beschreibung',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    }),
    defineField({ name: 'ticketLink', title: 'Ticket-/Anmeldelink', type: 'url' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  orderings: [
    {
      title: 'Startdatum, naechste zuerst',
      name: 'startDateAsc',
      by: [{ field: 'startDate', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', media: 'image', date: 'startDate' },
    prepare: ({ title, media, date }) => ({
      title,
      subtitle: date ? new Date(date).toLocaleDateString('de-DE') : undefined,
      media,
    }),
  },
});
