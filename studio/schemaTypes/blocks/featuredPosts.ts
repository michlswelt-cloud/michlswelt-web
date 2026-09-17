import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'featuredPosts',
  title: 'Neueste Blog-Beitraege',
  type: 'object',
  icon: () => '📰',
  description: 'Zeigt automatisch die 3 neuesten Blog-Beitraege an.',
  fields: [defineField({ name: 'heading', title: 'Ueberschrift', type: 'string' })],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: title ? `Blog: ${title}` : 'Neueste Blog-Beitraege' }),
  },
});
