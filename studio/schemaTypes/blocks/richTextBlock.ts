import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'richTextBlock',
  title: 'Textabschnitt',
  type: 'object',
  icon: () => '📝',
  fields: [
    defineField({
      name: 'content',
      title: 'Inhalt',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Textabschnitt' }),
  },
});
