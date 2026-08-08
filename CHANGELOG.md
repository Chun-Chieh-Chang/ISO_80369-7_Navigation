# Changelog

All notable changes to the ISO 80369-7 & ISO 80369-20 Navigation App will be documented in this file.

## [v7.7.0] - 2026-08-08

### Fixed & Upgraded (Native Binary .XLSX Excel Exporter via ExcelJS)
- **Eliminated Excel Security Warning Popup (100% Zero Warnings)**: Upgraded `excelExporter.ts` to output true native binary OpenXML `.xlsx` files using ExcelJS (`workbook.xlsx.writeBuffer()`), completely removing Microsoft Excel Extension Hardening warning dialogs.
- **A4 Single-Page Width Fit (`fitToWidth: 1, fitToHeight: 0, orientation: 'landscape', paperSize: 9`)**: Configured native Excel page setup so printing or PDF export automatically fits 100% within a single A4 Landscape page width without overflowing right.
- **Morandi Medical Aesthetics & Styled Cell Formatting**: Applied Dark Navy title headers (`#0F172A`), Royal Blue column headers (`#2563EB`), Emerald Green mandatory badges (`#DCFCE7`), slate border gridlines (`#E2E8F0`), and amber regulatory warning text.
- **Automatic Multi-line Text Wrapping (`alignment: { wrapText: true }`)**: Configured cell text wrapping on all instruction, example, and criteria columns so text wraps vertically instead of expanding columns horizontally.

## [v7.6.0] - 2026-08-08

### Added & Upgraded (A4 Landscape Print & Medical Aesthetics Excel Export)
- **A4 Single-Page Width Landscape Setup (`<Layout ss:Orientation="Landscape"/> <FitWidth>1</FitWidth>`)**: Configured XML Spreadsheet 2003 page setup and print parameters to ensure all columns fit 100% within a single A4 Landscape page width when opened, printed, or exported to PDF in Excel.
