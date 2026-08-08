# Changelog

All notable changes to the ISO 80369-7 & ISO 80369-20 Navigation App will be documented in this file.

## [v7.8.0] - 2026-08-08

### Refactored & Unified (Industrial Precision Morandi Color Palette & Design.md Spec)
- **Tool-Calling Integration**: Utilized Tool-Calling 5D Disambiguation Matrix to select Google Labs **Design.md** format specification (`DESIGN.md`) for defining persistent design tokens and visual identity.
- **Monochromatic Morandi Palette**: Eliminated multi-hue clutter (removed `purple-*`, `teal-*`, and consumer-style `from-X to-Y` gradients across all 8 components).
- **Standardized Semantics**:
  - `blue-600` (`#2563EB`) as sole brand & active navigation color.
  - `blue-800` (`#1E40AF`) for ISO 80369-7 standard badges.
  - `indigo-700` (`#4338CA`) for ISO 80369-20 standard & Annex badges.
  - `emerald-600`, `amber-600`, `rose-600` strictly for pass/worst-case/error semantic statuses.

## [v7.7.0] - 2026-08-08

### Fixed & Upgraded (Native Binary .XLSX Excel Exporter via ExcelJS)
- **Eliminated Excel Security Warning Popup (100% Zero Warnings)**: Upgraded `excelExporter.ts` to output true native binary OpenXML `.xlsx` files using ExcelJS (`workbook.xlsx.writeBuffer()`), completely removing Microsoft Excel Extension Hardening warning dialogs.
