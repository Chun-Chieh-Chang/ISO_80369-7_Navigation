# Changelog

All notable changes to the ISO 80369-7 & ISO 80369-20 Navigation App will be documented in this file.

## [v7.6.0] - 2026-08-08

### Added & Upgraded (A4 Landscape Print & Medical Aesthetics Excel Export)
- **A4 Single-Page Width Landscape Setup (`<Layout ss:Orientation="Landscape"/> <FitWidth>1</FitWidth>`)**: Configured XML Spreadsheet 2003 page setup and print parameters to ensure all columns fit 100% within a single A4 Landscape page width when opened, printed, or exported to PDF in Excel.
- **Morandi Medical Aesthetics & Styled Cell Formatting**: Added dark navy title banners (`#0F172A`), royal blue headers (`#2563EB`), bold white text, emerald green mandatory badges (`#DCFCE7`), slate border gridlines, and amber regulatory warning boxes.
- **Automatic Text Wrapping (`ss:WrapText="1"`)**: Applied multi-line text wrapping to instructions and examples to prevent horizontal column stretching and truncation.
- **Web & Print Layout Sync**: Added `@media print` CSS rules enforcing A4 landscape printing and zero clipping for browser printing (`Ctrl+P`).
- **Bundle Optimization**: Reduced JS bundle size from 741 kB down to 468 kB (40% lighter and faster load time).

## [v7.5.0] - 2026-08-08

### Added & Upgraded (Medical-Grade Excel Exporter .XLSX)
- **Multi-Worksheet Excel Workbook (.xlsx)**: Integrated SheetJS `xlsx` library to generate native binary `.xlsx` spreadsheets, eliminating UTF-8 encoding/BOM issues across Windows, macOS, and Linux.
- **Sheet 1: 14項法定報告檢核(Section .5)**: Pre-populates all 14 mandatory reporting items (a ~ n) with code, standard requirement, Chinese title, mandatory status, regulatory guidelines, report examples, and dedicated empty input boxes for laboratory engineers.
