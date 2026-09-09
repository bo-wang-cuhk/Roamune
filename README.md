# Roamune

Roamune is a **mobile-first, local-first, offline-first travel PWA** for personal and family use. The first release is intentionally small: it records trips entirely on the current device and has no account, backend, or sync dependency.

The interface is designed first for iPhone Safari and Home Screen installation, while remaining responsive in desktop browsers. Its mobile layout and interaction patterns are inspired by the local TREK reference project, with a separate, lightweight implementation for Roamune.

## Architecture

```text
Pages / UI
    ↓
Trip Context + Repository
    ↓
IndexedDB
```

Pages never open IndexedDB transactions directly. `tripRepository` owns all business-facing data access, while `src/db` owns database initialization, schema upgrades, object stores, and transaction helpers. A future sync adapter can be added behind these boundaries without coupling pages to remote storage.

## Directory Structure

```text
src/
├── app/                 # App composition, router, shared Trip state
├── pages/
│   ├── Home/            # Summary, recent trip, empty state
│   ├── Trips/           # Complete trip list
│   ├── TripDetail/      # View, edit, and delete one trip
│   └── Settings/        # App, storage, and future sync information
├── mobile/              # Safe-area shell and bottom navigation
│   └── components/
├── components/          # Reusable trip cards, forms, headers, dialogs
├── db/                  # IndexedDB schema and transaction helpers
├── repo/                # Storage-independent Trip repository API
├── services/            # Local image preparation
├── sync/                # Future sync boundary; no implementation yet
├── types/               # Shared Trip types
└── styles/              # Shared design tokens and responsive styles

public/
├── assets/              # Offline-safe default travel cover
└── icons/               # Manifest and Apple touch icons

tests/                   # IndexedDB repository tests
.github/workflows/       # GitHub Pages deployment workflow
```

## Data Model

```ts
type Trip = {
  id: string
  title: string
  destination: string
  startDate: string
  endDate: string
  coverImage: string | null
  notes: string
  createdAt: string
  updatedAt: string
}
```

- IDs are generated as UUIDs where `crypto.randomUUID()` is available.
- Trip dates use `YYYY-MM-DD`, which is stable and serializable.
- Audit timestamps use ISO 8601 strings.
- `createdAt` is generated on creation.
- `updatedAt` is refreshed by the repository on every update.
- A selected cover is resized in the browser and stored as a data URL with the Trip record.

## Local Storage

Trip data is stored in the browser's IndexedDB database named `roamune`.

**Each device has its own IndexedDB.** An iPhone installation and a desktop browser therefore contain separate data. Clearing browser or PWA site data deletes the trips on that device. The current release does not upload travel data anywhere.

## Development

Node.js 22 is recommended.

```bash
npm install
npm run dev
```

Vite prints the local development URL. Open it in a browser; routes use URL hashes so navigation works on static hosting.

## Tests

```bash
npm test
npm run typecheck
```

The repository tests use a browser-compatible IndexedDB implementation and cover create, read, update, validation, and delete behavior.

## Build

```bash
npm run build
```

The static production output is written to `dist/`. The build also generates:

- `manifest.webmanifest`
- a service worker
- precached application shell and static assets
- iPhone Home Screen metadata and icons

You can inspect the production build locally with:

```bash
npm run preview
```

## GitHub Pages

Roamune uses `HashRouter` and Vite's relative asset base, so it works both at a repository subpath and at a custom Pages domain without server-side route rewrites.

An Actions workflow is included at `.github/workflows/deploy.yml`:

1. Create or push this project to a GitHub repository whose default branch is `main`.
2. In **Settings → Pages**, choose **GitHub Actions** as the source.
3. Push to `main`, or run **Deploy Roamune to GitHub Pages** manually from the Actions tab.
4. The workflow runs `npm ci`, builds `dist/`, and publishes it with the official Pages actions.

For a project site, the final URL is normally:

```text
https://<username>.github.io/<repository>/
```

## Install on iPhone

1. Open the deployed HTTPS URL in Safari.
2. Tap **Share**.
3. Choose **Add to Home Screen**.
4. Launch Roamune from the new Home Screen icon.

Safe-area insets are applied to the top chrome and floating bottom navigation so the interface clears the Dynamic Island, notch, and Home Indicator.

## Current Scope

The local MVP includes:

- Home, Trips, Trip Detail, and Settings pages
- create, read, update, and delete for Trips
- local optional cover-image selection
- IndexedDB persistence through a repository boundary
- responsive TREK-inspired mobile UI
- installable manifest and Apple mobile metadata
- service-worker application-shell caching
- static GitHub Pages build and deployment workflow

The TREK logo/icon assets are temporary visual placeholders, as requested, and should be replaced before a public branded release.

## Known Limitations

- No device-to-device sync or remote backup
- Clearing site data permanently removes local trips
- Browser image decoding determines which photo formats can be selected; HEIC support varies by iOS/Safari version
- Large collections of high-resolution cover images still consume the browser's per-site storage quota, even though images are resized
- Offline startup works after the production PWA has been loaded once so its application shell can be cached
- Development mode does not behave exactly like the generated production service worker

## Future — Not Implemented

Possible later phases include:

- Places and a refined Trip structure
- Photos and richer notes
- Expenses and people
- GitHub Sync Adapter
- encrypted remote data
- multi-device sync
- conflict resolution

None of these features are implemented in the current phase. The next product step is **Places / Trip structure refinement**. GitHub Sync should come only after that data model is settled.
