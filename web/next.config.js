/** @type {import('next').NextConfig} */
const nextConfig = {
  // Statischer Export, damit die Seite auf einfachem Webspace (z.B. Strato)
  // ohne Node.js-Runtime per FTP deployt werden kann.
  output: 'export',
  trailingSlash: true,
  images: {
    // Kein Node-Server fuer die Next/Image-Optimierung verfuegbar;
    // Bilder werden stattdessen ueber die Sanity Image-CDN-URLs ausgeliefert.
    unoptimized: true,
  },
};

module.exports = nextConfig;
