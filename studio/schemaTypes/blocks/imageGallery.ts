import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'imageGallery',
  title: 'Bildergalerie',
  type: 'object',
  icon: () => '🖼️',
  fields: [
    defineField({ name: 'heading', title: 'Ueberschrift', type: 'string' }),
    defineField({
      name: 'images',
      title: 'Bilder',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'galleryImage',
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
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: title ? `Galerie: ${title}` : 'Bildergalerie' }),
  },
});
