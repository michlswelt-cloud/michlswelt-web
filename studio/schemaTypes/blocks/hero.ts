import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'hero',
  title: 'Hero-Bereich',
  type: 'object',
  icon: () => '🏔️',
  fields: [
    defineField({ name: 'heading', title: 'Ueberschrift', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'subheading', title: 'Unterzeile', type: 'text', rows: 2 }),
    defineField({ name: 'image', title: 'Hintergrundbild', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'ctaLabel', title: 'Button-Text', type: 'string' }),
    defineField({ name: 'ctaUrl', title: 'Button-Link', type: 'string' }),
  ],
  preview: {
    select: { title: 'heading', media: 'image' },
    prepare: ({ title, media }) => ({ title: `Hero: ${title}`, media }),
  },
});
