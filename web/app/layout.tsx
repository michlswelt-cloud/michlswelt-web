import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fetchGlobalData, siteSettingsToCssVariables } from '@/lib/sanity/fetchGlobalData';
import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const { siteSettings } = await fetchGlobalData();
  return {
    title: {
      default: siteSettings?.title ?? "Michl's Welt",
      template: `%s | ${siteSettings?.title ?? "Michl's Welt"}`,
    },
    description: siteSettings?.tagline,
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { siteSettings, navigation } = await fetchGlobalData();
  const cssVariables = siteSettingsToCssVariables(siteSettings);

  return (
    <html lang="de">
      {/* Markenfarben/-fonts aus Sanity ueberschreiben hier die Fallback-Werte aus globals.css */}
      <head>{cssVariables ? <style>{`:root { ${cssVariables} }`}</style> : null}</head>
      <body>
        <Header siteSettings={siteSettings} navigation={navigation} />
        <main>{children}</main>
        <Footer siteSettings={siteSettings} />
      </body>
    </html>
  );
}
