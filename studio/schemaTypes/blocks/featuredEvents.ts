import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'featuredEvents',
  title: 'Naechste Termine',
  type: 'object',
  icon: () => '📅',
  description: 'Zeigt automatisch die 3 naechsten anstehenden Termine an.',
  fields: [defineField({ name: 'heading', title: 'Ueberschrift', type: 'string' })],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: title ? `Termine: ${title}` : 'Naechste Termine' }),
  },
});
