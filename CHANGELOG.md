# Changelog

All notable changes to the ISO 80369-7 & ISO 80369-20 Navigation App will be documented in this file.

## [v8.15.0] - 2026-09-03

### SSOT Alignment: ISO 80369-20:2024 Preconditioning & MECE Audit
- **Preconditioning SSOT Alignment**:
  - `DvpGenerator.tsx`: Corrected the legacy preconditioning banner from `(23 ± 2) °C` / `(50 ± 5) % RH` to official ISO 80369-20:2024 Clause 4 / Section .2 specifications: `(20 ± 5) °C` and `(50 ± 10) % RH`.
  - `excelExporter.ts`: Restructured Sheet 3 to `ISO 80369-20:2024 Clause 4 & Section .2 Preconditioning Specification` (`Preconditioning Specs`), explicitly detailing sample preconditioning `(20 ± 5) °C`, humidity `(50 ± 10) % RH`, and ambient test environment range (`15 °C ~ 30 °C`, `10 % ~ 70 % RH`).
  - `isoData.ts`: Updated 14 Mandatory Elements item e) to cite Clause 4 / Section .2 with standardized example value `20.5 °C, 52.0% RH`.
- **SSOT Unit Test Guard**: Added explicit automated assertion in `isoHelpers.test.ts` verifying `ISO20_ANNEX_A_PRECONDITIONING` has `tempC.target === 20`, `tempC.tolerance === 5`, `rhPercent.target === 50`, `rhPercent.tolerance === 10` (17/17 tests passing).
- **MECE Navigation Validation**: Verified 5 main tabs and dual-tier filters satisfy mutual exclusivity and collective exhaustiveness across small-bore Luer connector design verification domains.

## [v8.14.0] - 2026-09-03

### International Bilingual Architecture & Full English Export
- **Lightweight i18n Context (Zero Dependency)**: Built custom React `LanguageContext` + TypeScript dictionary (`src/i18n/LanguageContext.tsx`, `src/i18n/translations.ts`) supporting instantaneous `zh` ⇄ `en` toggle with `localStorage` persistence and `?lang=en` URL parameter auto-detection.
- **Top Header & Navigation Localization**: Integrated sleek `[🌐 English / 繁體中文]` switcher into `Header.tsx`, dynamically translating title, subtitle, version badge, and all 5 main navigation tabs.
- **DVP Matrix & 14 Reporting Items Full English Interface**:
  - `DvpGenerator.tsx`: Subtab navigation, filter dropdowns (Male/Female, Lock/Slip), table headers, pre-assembly conditions, applied loads, hold times, reference fixtures, and acceptance criteria fully localized.
  - Section .5 Test Report 14 Mandatory Elements cards dynamically display official English descriptions (`descriptionEn`) and verified example values (`exampleValueEn`).
  - Added bilingual CSV export (`exportReportChecklistCSV`) generating localized filenames and column headers.
- **Medical-Grade Excel Bilingual Workbook Export (`excelExporter.ts`)**:
  - Function signature accepts `(config: TestConfigState, language: 'zh' | 'en' = 'zh')`.
  - When in English mode, exports `ISO_80369_7_Design_Verification_Plan_Report_{date}.xlsx` with 3 fully translated A4 landscape worksheets: `ISO20 Report 14 Items`, `DVP Test Matrix`, and `Preconditioning Specs`.
- **Validation & Automated Tests**: Added 3 new unit tests to `src/utils/isoHelpers.test.ts` (16/16 tests passing, 100% clean typecheck and production build).

## [v8.13.0] - 2026-09-03

### Golden Merge: SSOT Dual-Phase Expansion & Excel DVP Synchronization
- **TopicClauseExplorer UI Dual-Phase Architecture**: Rebuilt quantitative condition card into Phase 1 (Pre-assembly) and Phase 2 (Test Challenge Load) horizontal layout with clear visual hierarchy, S15A dual-axis apparatus notes, and explicit status badges.
- **Data-layer SSOT PreAssembly Enums**: Established `PreAssemblyCondition` interface and exported 4 authoritative constants (`PRE_ASSEMBLY_LOCK`, `PRE_ASSEMBLY_SLIP`, `PRE_ASSEMBLY_NOT_APPLICABLE`), binding across all 32 standard clauses in `isoTopicsData.ts`.
- **Excel DVP Report Sync**: Updated `excelExporter.ts` (Sheet 2 DVP Matrix) to dynamically align with selected L1/L2 test forces, split hold times (15-20s vs 30-35s), 3-decimal torque precision (0.018-0.020 N·m), and Annex H.4 "No cocking" pass criteria.
- **Code Harmonization**: Refactored `DvpGenerator.tsx` with clean render helpers (`renderPreAssembly`, `renderTestLoad`, `renderHoldTime`, `renderPassCriteria`) while maintaining high-fidelity Morandi badges and responsive layout.
- **Testing & Asset Optimization**: Verified all 13 unit tests passing in `isoHelpers.test.ts`; PWA cache streamlined from 60.3MB down to 42.1MB.

## [v8.12.0] - 2026-09-03

### Fixed (ISO 80369-20 Annex H.4 DVP Compliance Corrections)
- **Clause 6.6 Pre-assembly**: Changed `assemblyTorqueNm` from {min:0, max:0} to {min:0.08, max:0.12} and added `assemblyAxialForceN: {min:26.5, max:27.5}` per ISO 80369-20 Annex H.4 a).
- **Clause 6.6 Pass Criteria**: Added "No cocking" (接頭無歪斜) per ISO 80369-20 Annex H.4 d).
- **Clause 6.3 Pass Criteria**: Removed subjective "no visible cracks" visual inspection; now correctly states "comply with 6.1.1 leakage test only" per ISO 80369-7 6.3 text.
- **Clause 6.1 Hold Time**: Split display into Pressure Decay (6.1.2): 15–20s and Liquid Pressure (6.1.3): 30–35s with "choose one" note per ISO 80369-7 6.1.1 either/or.
- **Clause 6.4 Test Force**: Added L1/L2 type filter so Slip shows 23–25 N and Lock shows 32–35 N (was incorrectly merged as 23–35 N).
- **All Clauses Pre-assembly**: Added "Hold 5–6s then release" note to every clause's pre-assembly display.
- **DVP Audit Note**: Added prominent warning that 6.6 direct torque is incorrect.

### Added
- 5 new unit tests in `isoHelpers.test.ts` covering all DVP corrections (13 total tests, all passing).
- `preAssemblyHoldSec` optional field in `ISOClauseInfo` type.
- L1/L2 type filter toggle in `ClauseComparisonMatrix` component.

### Removed
- 17 unused image/PPTX assets (~17.8 MB): orphaned diagram renders, blueprint page 15, testing blueprint pages 1 & 6, plus 2 root-level PPTX and PNG files.

### Refactored
- `DvpGenerator.tsx`: Extracted 4 pure render helper functions (`renderPreAssembly`, `renderHoldTime`, `renderTestLoad`, `renderPassCriteria`) with explicit `ISOClauseInfo` typing (fixes TS2344).



## [v8.3.0] - 2026-08-08

### Updated (ISO 80369-20:2024 Annex B.4 Tab Label & Pressure Decay Curve Image Integration)
- **Tab Label Customization**: Customized the second tab label for `ISO 80369-20:2024 Annex B.4` (`ISO20-FIG-B2`) to display as **「壓降測試曲線圖」** (Pressure Decay Test Curve Plot).
- **Correct Image Asset Integration**: Embedded `壓力衰檢測試說明.png` (Deconstructing the Four Stages of Pressure Decay Test: Fill, Stabilize, Test, Exhaust) into `public/assets/diagrams/pressure_decay_explanation.png` for Annex B.4.

## [v8.2.0] - 2026-08-08

### Refactored & Purified (Removal of 3D/HD Photorealistic Render Mode)
- **UI Simplification & Standard Blueprint Focus**: Removed the redundant `3D/HD 精密重構圖` tab option and associated asset code from `ISOStandardFigureRenderer.tsx`.
- **Pure Dual Blueprint Mode**: Streamlined the renderer display mode to 2 official engineering blueprint tabs:
  1. 📐 **ISO 80369-7 幾何尺寸藍圖** (`official_blueprint`)
  2. ⚡ **ISO 80369-20 實驗架設藍圖** (`testing_blueprint`)
