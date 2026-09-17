import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'page',
  title: 'Seite',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titel', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'Fuer die Startseite den Slug "home" verwenden.',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Seitenaufbau',
      description: 'Baue die Seite aus wiederverwendbaren Layout-Bausteinen zusammen.',
      type: 'array',
      of: [
        { type: 'hero' },
        { type: 'richTextBlock' },
        { type: 'imageGallery' },
        { type: 'ctaBanner' },
        { type: 'featuredPosts' },
        { type: 'featuredEvents' },
      ],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current' },
    prepare: ({ title, slug }) => ({ title, subtitle: slug ? `/${slug}` : undefined }),
  },
});
