import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Website-Einstellungen',
  type: 'document',
  groups: [
    { name: 'general', title: 'Allgemein', default: true },
    { name: 'branding', title: 'Branding & Design' },
    { name: 'social', title: 'Social Media' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Website-Titel', type: 'string', group: 'general', validation: (r) => r.required() }),
    defineField({ name: 'tagline', title: 'Untertitel / Slogan', type: 'string', group: 'general' }),
    defineField({ name: 'logo', title: 'Logo', type: 'image', group: 'branding' }),
    defineField({ name: 'favicon', title: 'Favicon', type: 'image', group: 'branding' }),
    defineField({
      name: 'primaryColor',
      title: 'Primaerfarbe',
      description: 'Hauptfarbe, z.B. fuer Header und Ueberschriften (Hex-Code, z.B. #1f2937)',
      type: 'string',
      group: 'branding',
    }),
    defineField({
      name: 'secondaryColor',
      title: 'Sekundaerfarbe',
      description: 'Fuer Texte, Rahmen, dezente Elemente',
      type: 'string',
      group: 'branding',
    }),
    defineField({
      name: 'accentColor',
      title: 'Akzentfarbe',
      description: 'Fuer Buttons, Links, Hervorhebungen',
      type: 'string',
      group: 'branding',
    }),
    defineField({ name: 'backgroundColor', title: 'Hintergrundfarbe', type: 'string', group: 'branding' }),
    defineField({ name: 'textColor', title: 'Textfarbe', type: 'string', group: 'branding' }),
    defineField({
      name: 'fontHeading',
      title: 'Schriftart Ueberschriften',
      description: 'CSS-Font-Familie, z.B. "Georgia, serif" oder Name einer eingebundenen Webfont',
      type: 'string',
      group: 'branding',
    }),
    defineField({
      name: 'fontBody',
      title: 'Schriftart Fliesstext',
      type: 'string',
      group: 'branding',
    }),
    defineField({
      name: 'borderRadius',
      title: 'Eckenradius (Buttons/Karten)',
      description: 'CSS-Wert, z.B. "0.5rem" oder "0" fuer eckiges Design',
      type: 'string',
      group: 'branding',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social-Media-Links',
      type: 'array',
      group: 'social',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({ name: 'platform', title: 'Plattform', type: 'string' }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
          ],
        },
      ],
    }),
    defineField({ name: 'footerText', title: 'Footer-Text', type: 'string', group: 'general' }),
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }) => ({ title: title ?? 'Website-Einstellungen' }),
  },
});
