import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'ctaBanner',
  title: 'Call-to-Action-Banner',
  type: 'object',
  icon: () => '📣',
  fields: [
    defineField({ name: 'heading', title: 'Ueberschrift', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'text', title: 'Text', type: 'text', rows: 2 }),
    defineField({ name: 'buttonLabel', title: 'Button-Text', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'buttonUrl', title: 'Button-Link', type: 'string', validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: `CTA: ${title}` }),
  },
});
