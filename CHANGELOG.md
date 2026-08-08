# Changelog

All notable changes to the ISO 80369-7 & ISO 80369-20 Navigation App will be documented in this file.

## [v6.8.0] - 2026-08-08

### Fixed & Audited
- **Standard Compliance**: Verified ISO 80369-7:2021 Clause 6.1~6.6 and ISO 80369-20 Annex B~K parameters against standard text.
- **Annex B Figure Corrections**: Fixed Fig. B.4 (Male Luer Lock Rotatable Collar) and Fig. B.5 (Female Luer Lock Connector) names, genders, and descriptions.
- **B.1 / B.2 Exact Dimensions**: Updated tip diameter $\varnothing d$ (3.970~4.035 mm), base diameter $\varnothing g$ (4.375~4.440 mm), female small end $\varnothing G$ (3.820~3.865 mm), and large end $\varnothing D$ (4.225~4.270 mm).
- **Key Resolution & Helper Refactor**: Created shared `src/utils/isoHelpers.ts` to normalize figure keys (`ISO20-FIG-B1` vs `ISO20-B.1`), fixing silent fallback bug in `DvpGenerator.tsx`.
- **Testing**: Added Vitest unit test suite (`src/utils/isoHelpers.test.ts`) covering figure key mapping, gender verification, and parameter bounds.
- **Project Hygiene**: Cleaned unused dependencies, removed duplicate root binary files and double lockfile (`bun.lock`), localized `index.html` lang attribute to `zh-TW`, and added open source `LICENSE`.
