---
name: Industrial Precision Morandi
colors:
  primary: "#2563EB"
  primary-light: "#DBEAFE"
  primary-dark: "#1E40AF"
  secondary: "#4338CA"
  secondary-light: "#E0E7FF"
  neutral-base: "#F8FAFC"
  neutral-surface: "#FFFFFF"
  neutral-border: "#E2E8F0"
  neutral-text-primary: "#0F172A"
  neutral-text-secondary: "#64748B"
  semantic-success: "#059669"
  semantic-warning: "#D97706"
  semantic-error: "#E11D48"
typography:
  h1:
    fontFamily: Inter, system-ui, sans-serif
    fontSize: 1.25rem
    fontWeight: 800
  h2:
    fontFamily: Inter, system-ui, sans-serif
    fontSize: 1rem
    fontWeight: 700
  body:
    fontFamily: Inter, system-ui, sans-serif
    fontSize: 0.875rem
    fontWeight: 400
  caption:
    fontFamily: Inter, system-ui, sans-serif
    fontSize: 0.8125rem
    fontWeight: 400
  mono:
    fontFamily: ui-monospace, SFMono-Regular, Menlo, monospace
    fontSize: 0.8125rem
    fontWeight: 600
rounded:
  sm: 8px
  md: 12px
  lg: 16px
  pill: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
---

## Overview

**Industrial Precision with Monochrome Morandi Palette.** The UI evokes the calm authority of a certified medical testing laboratory — precise, trustworthy, and restrained. Every color decision serves a semantic purpose; decoration is secondary to clarity.

## Content Archetype

This is an **Industrial / Tool** type product (ISO medical connector standard navigation system). The design language follows `industrial precision with monochrome palette`: slate-blue neutrals, monospace accents for data, clean gridlines, and high information density with disciplined whitespace.

## Colors

The palette uses a **Monochromatic Blue-Slate** strategy with exactly 3 semantic accent colors.

### Brand & Standard Identification

- **Primary (#2563EB, blue-600):** Royal Blue — the sole brand color. Used for active navigation tabs, CTA buttons, and primary interactive elements.
- **Primary Dark (#1E40AF, blue-800):** Ocean Blue — used exclusively for ISO 80369-7 standard identification badges and clause number labels.
- **Secondary (#4338CA, indigo-700):** Deep Indigo — used exclusively for ISO 80369-20 standard identification badges and Annex references. Provides visual differentiation from ISO-7 while remaining within the blue color family.

### Semantic Accents (Functional Only)

- **Success (#059669, emerald-600):** Pass criteria, export confirmation, standard connectors.
- **Warning (#D97706, amber-600):** Worst-case scenarios, regulatory warnings, safety notices.
- **Error (#E11D48, rose-600):** Fail criteria, destructive overload, danger indicators.

### Neutrals

- **Base (#F8FAFC, slate-50):** Cool gray page foundation, reduces eye fatigue.
- **Surface (#FFFFFF, white):** Card and panel backgrounds, provides elevation.
- **Border (#E2E8F0, slate-200):** Subtle dividers, never visually heavy.
- **Text Primary (#0F172A, slate-900):** Headlines and primary content.
- **Text Secondary (#64748B, slate-500):** Metadata, captions, helper text.

## Anti-Patterns

| Don't | Do Instead |
|:---|:---|
| Use `purple-*` for ISO-20 | Use `indigo-*` (same blue family) |
| Use gradient backgrounds (`from-X to-Y`) for brand elements | Use solid `blue-600` |
| Use more than 3 non-neutral hue families | Stick to blue + emerald + amber + rose |
| Mix `bg-white` and `bg-slate-50` for same-level cards | Use `bg-white` for all card surfaces |
| Use high-saturation candy colors | Use Morandi-tinted muted variants |

## Spacing

All margin and padding values must be multiples of 4px (4, 8, 12, 16, 24, 32, 48, 64).

## Shadows

- **Level 1 (Card Base):** `0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)`
- **Level 2 (Hover):** `0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)`
- **Level 3 (Floating):** `0 12px 32px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.04)`
