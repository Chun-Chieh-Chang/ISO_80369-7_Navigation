# Changelog

All notable changes to the ISO 80369-7 & ISO 80369-20 Navigation App will be documented in this file.

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
