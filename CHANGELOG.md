# Changelog

All notable changes to the ISO 80369-7 & ISO 80369-20 Navigation App will be documented in this file.

## [v8.32.0] - 2026-09-05

### Ecosystem Stakeholder Integration: Player Roles & 3-Way Closed Loop
- **Design Intent**:
  - Beyond explaining the technical distinction between -7 and -20, incorporate the active "Players" (Manufacturer, Testing Lab, Regulatory Authority, and Healthcare/Patients) and their 3-way closed loop dynamic.
- **Changes**:
  - **Slide 1**:
    - Left comparison matrix updated to explicitly feature:
      - 🏭 **Player 1 (Manufacturer / Candidate)**: Reads -7 to sculpt micro-tolerances, select medical plastics, and align with the 6 acceptance criteria.
      - 🔬 **Player 2 (Third-party Testing Lab / Invigilator)**: Reads -20 to mount Annex C stainless steel fixtures, enforce 27N/0.1N·m assembly SOP, and output objective test scores.
    - Hero bar upgraded to: 「三者動態閉環：廠商看 -7 造接頭 ➔ 檢驗所依 -20 測極限 ➔ 監管局 (FDA) 審查雙標準吻合度發照 ➔ 醫護病患安心盲插！」
    - Slide 1 presentation notes updated to reflect player roles and closed-loop narration.
  - **Slide 6 (Analogy Slide)**:
    - Example 3 rewritten to align with the players: Manufacturer (Candidate) ➔ Testing Lab (Invigilator) ➔ Regulators & Clinical Staff (License & Safety Beneficiaries).
  - **Single-File Bundle**: Re-compiled `public/slides-standalone.html` (27.05 MB) to mirror the SSOT.
- **Verification**: `npm test` 17/17 PASS, `npm run lint` PASS, `npm run build` PASS.

## [v8.31.0] - 2026-09-05

### Slide 1 Cognitive Clarity: ISO 80369-7 vs -20 Relationship Restructure
- **Root Cause (RCA)**:
  - Previously, Slide 1 used ambiguous badges (`-7: 告訴你管子長什麼樣` vs `-20: 鐵面無私的及格大考`), which misled readers by implying -20 establishes pass/fail criteria. In reality, Clause 6 of ISO 80369-7 sets acceptance criteria (What & Criteria), while ISO 80369-20 only standardizes laboratory testing procedures (How to test) across all medical connector series.
- **Corrective & Preventive Action (CAPA)**:
  - Restructured the bottom of Slide 1 left card into a dual-column comparison matrix clearly articulating:
    - **ISO 80369-7**: 專科考卷 (What & Criteria) — 血管/皮下專用，規範幾何尺寸、防呆要求與及格分數線。
    - **ISO 80369-20**: 共用考場 (How to test) — 全系列通用，不設分數線，提供標準治具與物理量測 SOP（附錄 B~J）。
    - **Summary Hero Bar**: 「-7 決定尺寸與驗收標準 ⟷ -20 提供共用實驗室量測手法」。
  - Updated presentation notes for Slide 1.
  - Re-compiled `public/slides-standalone.html` to mirror the SSOT.
- **Verification**: `npm test` 17/17 PASS, `npm run lint` PASS, `npm run build` PASS.

## [v8.30.0] - 2026-09-05

### Presentation Entry Navigation & Service Worker Interception Fix
- **Root Cause (RCA)**:
  1. **Workbox Navigation Fallback Interception**: `vite-plugin-pwa` registered a catch-all `NavigationRoute(createHandlerBoundToURL("index.html"))` without a denylist. When users clicked "🎬 投影片演示" to open the slides in a new tab, the Service Worker intercepted the navigation request and returned the SPA `index.html` (the app homepage) instead of the actual slide deck.
  2. **Direct Link Precision**: The previous navigation link pointed to `slides/slides-standalone.html` (a 27 MB monolithic file) or directory root, which suffered from path ambiguities and caching conflicts.
  3. **Orphan Artifact**: `public/index.html` (a historical redirect stub from v8.28.1) existed alongside the root `index.html`, violating MECE architecture principles.
- **Corrective & Preventive Action (CAPA)**:
  1. Configured `navigateFallbackDenylist: [/.*\/slides(\/.*)?$/, /^\/slides(\/.*)?$/, /slides-standalone\.html/]` in `vite.config.ts`, ensuring Service Worker completely bypasses slide URLs and allows direct navigation.
  2. Updated `Header.tsx` presentation link to `${import.meta.env.BASE_URL}slides/index.html` for instant loading of the lightweight (~120 KB) slide deck in a new tab.
  3. Removed redundant `public/index.html` to eliminate potential static routing collisions.
- **Verification**:
  - `dist/sw.js` inspected: confirmed `{denylist:[...]}` generated correctly.
  - `npm run lint`: PASS (0 errors).
  - `npm test`: 17/17 PASS (zero regression).
  - `npm run build`: PASS.

## [v8.29.0] - 2026-09-05

### MECE Asset Cleanup & Documentation Synchronization
- **Duplicate Asset Removal (MECE)**: Eliminated redundant `public/slides/assets/real_connectors/` (6 JPGs, ~213 KB) — canonical source is `public/assets/real_connectors/`.
- **Orphaned Image Purge**: Removed 9 unused images not referenced by `public/slides/index.html`:
  - `blueprint/page_{1,2,11,12,13,14}.png` (6 files, ~6 MB)
  - `testing_blueprint/test_page_{2,3}.png` (2 files, ~8 MB)
- **Documentation Alignment**:
  - `README.md`: Rewritten to reflect dual-architecture (React SPA + Static Slides).
  - `CHANGELOG.md`: Completed missing entries for v8.24.0–v8.28.2.
  - `package.json`: Version bump 8.17.0 → 8.29.0.
  - `metadata.json`: Updated description to match current feature set.
- **Estimated disk savings**: ~18 MB (orphaned blueprint/testing images).
- **Tests**: 17/17 unit tests passing ✅ (zero regression).

## [v8.28.2] - 2026-09-05

### React App Restoration
- **Critical Revert**: Restored React interactive application (`src/`, `package.json`, `vite.config.ts`, etc.) from v8.27.0 base.
- The React SPA is the primary feature (clause search, DVP generator, connector inspector, bilingual i18n).
- Static slides (`public/slides/`) remain as supplementary visual content.
- GitHub Pages workflow re-enabled with full Vite build pipeline.

## [v8.28.1] - 2026-09-05

### Root Index Redirect
- Added `public/index.html` that auto-redirects (0 s meta-refresh) to `./slides/`.
- Provides a landing card with "ISO 80369 醫療接頭救命科普堂" branding and a CTA button.

## [v8.28.0] - 2026-09-05

### Architecture Simplification — Static-Only Mode
- **Removed** React SPA: `src/`, `index.html` (Vite entry), `package.json`, `vite.config.ts`, `tsconfig.json`, `.env.example`, `metadata.json`.
- **Simplified** `.github/workflows/deploy.yml` to zero-build static deployment (`./public` → GitHub Pages).
- **Updated** `.gitignore` and `README.md` to reflect pure-static architecture.
- **Note**: This was reverted in v8.28.2 after the React app was identified as core functionality.

## [v8.27.0] - 2026-09-04

### Slide 2 Visual Balance Fix
- Increased `feature-list` gap: 10 px → 18 px for breathing room between items.
- Upgraded `feature-item` typography: font-size 15 → 15.5 px, line-height 1.6 → 1.75.
- Enlarged `feature-bullet`: 24 → 28 px diameter, font-weight 800 → 900.
- Improved Slide 2 right-card text density; Slide 7 benefits proportionally.
- Rebuilt `slides-standalone.html` (27.1 MB).

## [v8.26.0] - 2026-09-04

### Slide 11 Vertical Balance + MECE Cleanup
- **Layout fix**: Changed `slide-body` from Flex-column to CSS Grid (`auto 1fr`) so bottom 3-card row fills remaining height, eliminating hollow whitespace gap.
- **Typography upgrade**: Step titles 16 → 17 px / 800 → 900 wt; card titles 18 → 19 px; body text 13.5 → 15 px.
- **Header spacing**: Tightened `margin-bottom` 18 → 12 px, `padding-bottom` 14 → 10 px.
- **MECE**: Deleted unauthorized copy `public/slides.html` (violated SSOT principle).
- **Standalone rebuild**: `slides-standalone.html` regenerated (27.1 MB).

## [v8.24.0] - 2026-09-04

### Build MECE Enforcement
- Added `build:standalone` npm script (`scripts/build_standalone.cjs`).
- Added Vite plugin in `vite.config.ts` that automatically removes `dist/slides-standalone.html` after build to prevent bundling the 27 MB offline bundle into GitHub Pages artifact.
- Added `package.json` dependency on `node` (already available, no new npm packages).

---
*Earlier changelog entries (v8.1.0–v8.23.0) are preserved in git history and DEV_LOG.md.*
