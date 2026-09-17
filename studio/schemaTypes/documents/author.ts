import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'author',
  title: 'Autor',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'image', title: 'Foto', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'bio', title: 'Kurzbio', type: 'array', of: [{ type: 'block' }] }),
  ],
  preview: {
    select: { title: 'name', media: 'image' },
  },
});
