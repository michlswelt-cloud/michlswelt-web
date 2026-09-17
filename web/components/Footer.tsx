import type { SiteSettings } from '@/lib/sanity/types';

export default function Footer({ siteSettings }: { siteSettings: SiteSettings | null }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-brand-secondary/20 bg-brand-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-brand-secondary md:flex-row md:items-center md:justify-between">
        <p>
          {siteSettings?.footerText ??
            `© ${year} ${siteSettings?.title ?? "Michl's Welt"}. Alle Rechte vorbehalten.`}
        </p>
        {siteSettings?.socialLinks?.length ? (
          <ul className="flex gap-4">
            {siteSettings.socialLinks.map((link) => (
              <li key={link.platform}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-accent"
                >
                  {link.platform}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </footer>
  );
}
