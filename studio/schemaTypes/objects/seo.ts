import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({ name: 'metaTitle', title: 'Meta-Titel', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'Meta-Beschreibung', type: 'text', rows: 3 }),
    defineField({ name: 'ogImage', title: 'Social-Share-Bild', type: 'image' }),
  ],
  options: { collapsible: true, collapsed: true },
});
