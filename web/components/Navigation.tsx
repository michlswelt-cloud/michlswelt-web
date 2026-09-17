import Link from 'next/link';
import type { NavigationItem } from '@/lib/sanity/types';

function resolveHref(item: NavigationItem): string {
  if (item.linkType === 'external') {
    return item.externalUrl ?? '#';
  }
  const slug = item.internalLink?.slug?.current;
  return slug ? `/${slug === 'home' ? '' : slug}` : '#';
}

export default function Navigation({ items }: { items: NavigationItem[] }) {
  if (!items?.length) return null;

  return (
    <nav aria-label="Hauptnavigation">
      <ul className="flex flex-wrap items-center gap-6 font-body text-sm">
        {items.map((item) => (
          <li key={item._key}>
            {item.linkType === 'external' ? (
              <a
                href={resolveHref(item)}
                target={item.openInNewTab ? '_blank' : undefined}
                rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                className="transition-colors hover:text-brand-accent"
              >
                {item.label}
              </a>
            ) : (
              <Link href={resolveHref(item)} className="transition-colors hover:text-brand-accent">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
