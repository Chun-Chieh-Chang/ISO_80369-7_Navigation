# Changelog

All notable changes to the ISO 80369-7 & ISO 80369-20 Navigation App will be documented in this file.

## [v7.3.0] - 2026-08-08

### Added & Upgraded (PWA Full Support)
- **PWA Web App Manifest**: Added `manifest.webmanifest` defining standalone display mode, theme colors (`#2563eb`), app icons, and scope.
- **Service Worker & Offline Cache**: Integrated `vite-plugin-pwa` and Workbox (`generateSW`), precaching all assets (HTML, JS, CSS, SVG, blueprint PNGs) for 100% offline hospital/laboratory usage.
- **PWA App Icons**: Created high-resolution 192x192, 512x512, maskable PNG icons, Apple touch icon (`apple-touch-icon.png`), and SVG favicon (`favicon.svg`).
- **iOS & Android Installation Support**: Added mobile web app meta tags (`apple-mobile-web-app-capable`, `theme-color`), and built interactive `PwaInstallPrompt` banner component.
- **Offline Network Toast**: Added auto-detecting floating toast when network disconnects, notifying users of active offline PWA cache mode.

## [v7.0.0] - 2026-08-08

### Fixed & Audited
- **Standard Compliance**: Verified ISO 80369-7:2021 Clause 6.1~6.6 and ISO 80369-20 Annex B~K parameters against standard text.
- **Annex B Figure Corrections**: Fixed Fig. B.4 (Male Luer Lock Rotatable Collar) and Fig. B.5 (Female Luer Lock Connector) names, genders, and descriptions.
- **B.1 / B.2 Exact Dimensions**: Updated tip diameter Ød (3.970~4.035 mm), base diameter Øg (4.375~4.440 mm), female small end ØG (3.820~3.865 mm), and large end ØD (4.225~4.270 mm).
- **Key Resolution & Helper Refactor**: Created shared `src/utils/isoHelpers.ts` to normalize figure keys (`ISO20-FIG-B1` vs `ISO20-B.1`), fixing silent fallback bug in `DvpGenerator.tsx` and `ClauseComparisonMatrix.tsx`.
- **Testing**: Added Vitest unit test suite (`src/utils/isoHelpers.test.ts`) covering figure key mapping, gender verification, parameter bounds, and full clause figure lookup (7/7 tests passing).
