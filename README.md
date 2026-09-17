# Michl's Welt – Website & CMS

Website fuer die Marke "Michl's Welt" mit einem Headless-CMS (Sanity), ueber
das Redakteure Inhalte pflegen und das Design (Farben, Schriften, Layout)
ohne Code-Aenderungen anpassen koennen.

## Architektur

```
michlswelt-web/
├── web/      Next.js-Frontend (App Router, TypeScript, Tailwind CSS)
│             wird als statische Seite exportiert (next export)
├── studio/   Sanity Studio (Admin-Oberflaeche des CMS)
│             separat gehostet auf *.sanity.studio
└── .github/workflows/deploy.yml   Build + FTP-Deploy nach Strato
```

**Warum diese Kombination?**

- **Sanity** ist ein gehostetes Headless-CMS: Redakteure pflegen Inhalte in
  einer komfortablen Oberflaeche, die Inhalte liegen aber nicht auf dem
  eigenen Server, sondern werden per API abgerufen.
- **Next.js mit statischem Export** erzeugt aus den CMS-Inhalten fertige
  HTML/CSS/JS-Dateien (`web/out/`). Diese lassen sich auf normalem
  Strato-Webspace per FTP hochladen – es wird **keine Node.js-Laufzeit auf
  dem Server benoetigt**.
- Aenderungen im CMS werden erst live, wenn die Seite neu gebaut und
  hochgeladen wird (siehe [Deployment](#deployment)).

## Content-Modell

| Typ | Zweck |
|---|---|
| `siteSettings` (Singleton) | Branding: Logo, Farben, Schriften, Social Links |
| `navigation` (Singleton) | Hauptmenue der Seite |
| `page` | Frei aufbaubare Seiten via Page Builder (inkl. Startseite, Slug `home`) |
| `post` | Blog-/News-Beitraege |
| `event` | Termine/Veranstaltungen |
| `portfolioItem` | Portfolio-/Galerie-Eintraege |
| `author` | Autoren fuer Blog-Beitraege |

### Design-Parametrierung

Im Studio unter **Website-Einstellungen → Branding & Design** lassen sich
Primaer-, Sekundaer- und Akzentfarbe, Hintergrund-/Textfarbe, Schriftarten
und der Eckenradius von Buttons/Karten pflegen. Diese Werte werden beim
Bauen der Seite als CSS-Variablen (`--color-primary`, `--font-heading`, ...)
gesetzt (`web/app/layout.tsx`) und von Tailwind-Utility-Klassen wie
`bg-brand-primary` oder `font-heading` genutzt. **Farb-/Font-Aenderungen
erfordern keinen Code-Change**, nur einen neuen Build+Deploy.

### Page Builder / Layout-Bausteine

Seiten (`page`) bestehen aus einer Liste von Bausteinen, die Redakteure frei
zusammenstellen und sortieren koennen:

- **Hero** – grosser Aufmacher mit Bild, Ueberschrift, Button
- **Textabschnitt** – Rich Text mit Bildern
- **Bildergalerie** – Bilder-Grid mit Bildunterschriften
- **CTA-Banner** – Call-to-Action mit Button
- **Neueste Blog-Beitraege** – zeigt automatisch die 3 neuesten Posts
- **Naechste Termine** – zeigt automatisch die naechsten 3 Events

Neuen Baustein-Typ hinzufuegen:
1. Schema in `studio/schemaTypes/blocks/<name>.ts` anlegen und in
   `studio/schemaTypes/index.ts` sowie `studio/schemaTypes/documents/page.ts`
   (Feld `pageBuilder.of`) eintragen.
2. TypeScript-Typ in `web/lib/sanity/types.ts` ergaenzen
   (`PageBuilderBlock`-Union).
3. Komponente in `web/components/sections/` erstellen und in
   `web/components/PageBuilder.tsx` registrieren.

## Lokale Entwicklung

Voraussetzung: Node.js 20+.

### 1. Sanity-Projekt anlegen

```bash
cd studio
npm install
npx sanity init   # erstellt ein neues Sanity-Projekt, waehlt Dataset "production"
```

`.env.example` nach `.env` kopieren und die Projekt-ID eintragen (oder
`npx sanity init` traegt sie automatisch in `sanity.cli.ts` ein).

Studio lokal starten:

```bash
npm run dev   # http://localhost:3333
```

### 2. Frontend

```bash
cd web
npm install
cp .env.local.example .env.local
# NEXT_PUBLIC_SANITY_PROJECT_ID und NEXT_PUBLIC_SANITY_DATASET eintragen
npm run dev   # http://localhost:3000
```

Ohne gesetzte `NEXT_PUBLIC_SANITY_PROJECT_ID` zeigt die Seite Platzhalter-
Hinweise statt zu crashen – so laesst sich das Grundgeruest auch ohne
CMS-Anbindung pruefen.

### 3. Startseite anlegen

Im Studio ein Dokument vom Typ **Seite** mit Slug `home` erstellen und mit
dem Page Builder befuellen. Weitere Seiten (z.B. "Ueber uns", "Kontakt")
funktionieren genauso – sie sind automatisch unter `/<slug>` erreichbar.

## Deployment

### Sanity Studio veroeffentlichen

```bash
cd studio
npm run deploy   # deployt nach https://<projektname>.sanity.studio
```

Redakteure pflegen Inhalte danach direkt unter dieser URL, ohne lokale
Installation.

### Frontend nach Strato deployen

Der Workflow `.github/workflows/deploy.yml` baut das Frontend bei jedem
Push auf `main` und laedt `web/out/` per FTP auf den Strato-Webspace hoch.

**Einmalig einzurichtende GitHub-Secrets** (Repository → Settings → Secrets
and variables → Actions):

| Secret | Beschreibung |
|---|---|
| `SANITY_PROJECT_ID` | Sanity-Projekt-ID |
| `SANITY_DATASET` | i.d.R. `production` |
| `STRATO_FTP_SERVER` | FTP-Host, z.B. `ftp.michlswelt.de` |
| `STRATO_FTP_USERNAME` | FTP-Benutzername aus dem Strato-Kundenmenue |
| `STRATO_FTP_PASSWORD` | FTP-Passwort |
| `STRATO_FTP_TARGET_DIR` | Zielverzeichnis auf dem Webspace, z.B. `/` oder `/htdocs/` |

**Aenderungen im CMS live schalten:** Da die Seite statisch exportiert wird,
werden neue/geaenderte Inhalte erst nach einem neuen Deploy sichtbar. Optionen:

- Manuell: Workflow im Tab "Actions" per `workflow_dispatch` anstossen.
- Automatisch bei jedem `git push` auf `main` (z.B. wenn Inhalte via
  Sanity-Migration/Import ins Repo wandern – im Normalfall aber nicht der
  Weg, da Inhalte direkt in Sanity gepflegt werden).
- **Empfohlen:** In Sanity unter *API → Webhooks* einen Webhook auf
  `POST https://api.github.com/repos/<owner>/<repo>/dispatches` mit
  `{"event_type":"sanity-publish"}` einrichten, der bei jeder
  Veroeffentlichung im Studio automatisch einen Rebuild ausloest (Header
  `Authorization: Bearer <GitHub PAT>` erforderlich, als Secret im
  Webhook hinterlegen – nicht im Repo).

### Alternative: Hosting auf einem Strato-VPS

Falls statt Standard-Webspace ein Strato-VPS/Root-Server mit Node.js
verwendet wird, kann `web/next.config.js` (`output: 'export'` entfernen) auf
Server-Rendering umgestellt und die App per `npm run build && npm run start`
(idealerweise hinter Nginx + PM2 oder Docker) betrieben werden. Das
ermoeglicht z.B. Inhalte ohne Rebuild live zu aktualisieren (ISR).

## Tech-Stack

- [Next.js](https://nextjs.org/) 14 (App Router, TypeScript)
- [Tailwind CSS](https://tailwindcss.com/) mit CMS-gesteuerten CSS-Variablen
- [Sanity](https://www.sanity.io/) (Headless CMS, Studio v3)
- [@portabletext/react](https://github.com/portabletext/react-portabletext) fuer Rich-Text-Rendering
- GitHub Actions + FTP-Deploy fuer Strato-Webspace
