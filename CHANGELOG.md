# Changelog

All notable changes to the ISO 80369-7 & ISO 80369-20 Navigation App will be documented in this file.

## [v7.5.0] - 2026-08-08

### Added & Upgraded (Medical-Grade Excel Exporter .XLSX)
- **Multi-Worksheet Excel Workbook (.xlsx)**: Integrated SheetJS `xlsx` library to generate native binary `.xlsx` spreadsheets, eliminating UTF-8 encoding/BOM issues across Windows, macOS, and Linux.
- **Sheet 1: 14項法定報告檢核(Section .5)**: Pre-populates all 14 mandatory reporting items (a ~ n) with code, standard requirement, Chinese title, mandatory status, regulatory guidelines, report examples, and dedicated empty input boxes for laboratory engineers.
- **Sheet 2: DVP驗證計畫矩陣表(ISO 7&20)**: Contains product-specific design verification matrix with assembly torque/force, active load (pressure/vacuum/torque/pull), hold time, reference connector (Fig. C.1 ~ C.6), worst-case rationale, and pass criteria.
- **Sheet 3: Annex A 大氣環境規格**: Lists environmental temperature (23±2°C), relative humidity (50±5% RH), and minimum 24h preconditioning protocol.
- **Dual Export UI**: Embedded primary Excel export (`.xlsx`) button alongside secondary CSV (`.csv`) export button across headers and DVP generator views.

## [v7.4.0] - 2026-08-08

### Added & Compliant (ISO 80369-20 Section .5 Reporting Requirements)
- **ISO 80369-20 Section .5 Mandatory 14 Test Report Elements (a ~ n)**: Added full compliance checklist (`ISO20_MANDATORY_REPORT_ITEMS`) covering Reference Standard, Date, Connectors Under Test, Sample Size n, Preconditioning, Reference Connector, Applied Load, Acceptance Criteria, Deviations, Unusual Features, Test Volume V, Test Period, Pressure Change ΔP, and Conformance Statement.
- **Annex A Atmospheric Preconditioning**: Exported `ISO20_ANNEX_A_PRECONDITIONING` requirements ($(23 \pm 2)^\circ\text{C}$, $(50 \pm 5)\%\text{ RH} \ge 24\text{ hours}$) and embedded environmental preconditioning card.
