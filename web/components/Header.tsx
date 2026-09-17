import Link from 'next/link';
import { urlFor } from '@/lib/sanity/image';
import type { Navigation as NavigationData, SiteSettings } from '@/lib/sanity/types';
import Navigation from './Navigation';

export default function Header({
  siteSettings,
  navigation,
}: {
  siteSettings: SiteSettings | null;
  navigation: NavigationData | null;
}) {
  return (
    <header className="border-b border-brand-secondary/20 bg-brand-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          {siteSettings?.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={urlFor(siteSettings.logo).width(160).height(48).fit('max').url()}
              alt={siteSettings.title}
              className="h-10 w-auto"
            />
          ) : (
            <span className="font-heading text-xl font-bold text-brand-primary">
              {siteSettings?.title ?? "Michl's Welt"}
            </span>
          )}
        </Link>
        <Navigation items={navigation?.items ?? []} />
      </div>
    </header>
  );
}
