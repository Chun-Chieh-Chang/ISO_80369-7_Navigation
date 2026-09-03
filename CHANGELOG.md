# Changelog

All notable changes to the ISO 80369-7 & ISO 80369-20 Navigation App will be documented in this file.

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
