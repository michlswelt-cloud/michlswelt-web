import { sanityClient } from './client';
import { navigationQuery, siteSettingsQuery } from './queries';
import type { Navigation, SiteSettings } from './types';

export async function fetchGlobalData(): Promise<{
  siteSettings: SiteSettings | null;
  navigation: Navigation | null;
}> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    // Ohne konfiguriertes Sanity-Projekt (z.B. frisch geklontes Repo) faellt
    // der Build auf die CSS-Fallback-Werte in globals.css zurueck, statt zu crashen.
    return { siteSettings: null, navigation: null };
  }

  const [siteSettings, navigation] = await Promise.all([
    sanityClient.fetch<SiteSettings | null>(siteSettingsQuery),
    sanityClient.fetch<Navigation | null>(navigationQuery),
  ]);

  return { siteSettings, navigation };
}

export function siteSettingsToCssVariables(siteSettings: SiteSettings | null): string {
  if (!siteSettings) return '';

  const vars: Record<string, string | undefined> = {
    '--color-primary': siteSettings.primaryColor,
    '--color-secondary': siteSettings.secondaryColor,
    '--color-accent': siteSettings.accentColor,
    '--color-background': siteSettings.backgroundColor,
    '--color-text': siteSettings.textColor,
    '--font-heading': siteSettings.fontHeading,
    '--font-body': siteSettings.fontBody,
    '--radius-base': siteSettings.borderRadius,
  };

  return Object.entries(vars)
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => `${key}: ${value};`)
    .join(' ');
}
