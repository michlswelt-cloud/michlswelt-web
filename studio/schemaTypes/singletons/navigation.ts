import { defineField, defineType } from 'sanity';

const navItem = {
  name: 'navigationItem',
  title: 'Menuepunkt',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Bezeichnung', type: 'string', validation: (r: any) => r.required() }),
    defineField({
      name: 'linkType',
      title: 'Linktyp',
      type: 'string',
      options: {
        list: [
          { title: 'Interne Seite', value: 'internal' },
          { title: 'Externe URL', value: 'external' },
        ],
        layout: 'radio',
      },
      initialValue: 'internal',
    }),
    defineField({
      name: 'internalLink',
      title: 'Interne Seite',
      type: 'reference',
      to: [{ type: 'page' }],
      hidden: ({ parent }: any) => parent?.linkType !== 'internal',
    }),
    defineField({
      name: 'externalUrl',
      title: 'Externe URL',
      type: 'url',
      hidden: ({ parent }: any) => parent?.linkType !== 'external',
    }),
    defineField({ name: 'openInNewTab', title: 'In neuem Tab oeffnen', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'label' },
  },
};

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Menuepunkte',
      type: 'array',
      of: [navItem],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Navigation' }),
  },
});
