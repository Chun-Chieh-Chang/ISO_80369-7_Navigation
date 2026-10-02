---
name: Milk Tea Caramel Neumorphic (Inset Focus)
colors:
  brand-bar: "#252035"
  neo-bg: "#e8d4b8"
  neo-surface: "#f2e3cb"
  neo-inset: "#dcc9a8"
  neo-pill: "#f8edd8"
  neo-accent: "#8b6840"
  neo-border: "rgba(139, 104, 64, 0.32)"
  neo-text: "#2c1a0e"
  neo-muted: "#4a2e10"
  shadow-dark: "rgba(92, 65, 35, 0.36)"
  shadow-light: "rgba(255, 248, 235, 0.92)"
  semantic-pass: "#059669"
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

**Milk-Tea Caramel Neumorphic — "Inset Focus".** The UI reads as a warm, tactile physical instrument panel: cards float above a milk-tea beige ground, trays and inputs are pressed into it. Elevation is expressed through a two-layer shadow pair (warm caramel dark cast + cream highlight), never through strokes or flat gray. Contrast values are audited for readability (see `contrast-audit-report.md`); muted text never drops below the readability floor.

> SSOT note: the normative definitions of every variable below live in `src/index.css` (`:root` + `@theme`). This document describes intent; the CSS is the source of truth.

## Content Archetype

**Industrial / Tool** product (ISO 80369-7 & 80369-20 medical connector validation navigator). High information density, disciplined whitespace, monospace reserved strictly for measured values (`tech-value` semantics). The dark brand bar (`#252035`) carries calm authority; the beige field below it carries the working surfaces.

## Color System

### Surface Strata (Neumorphic Foundation)

| Token | Value | Role |
|---|---|---|
| `--neo-bg` | `#e8d4b8` | Page ground — warm milk-tea beige |
| `--neo-surface` | `#f2e3cb` | Elevated cards (`.neo-card`) |
| `--neo-inset` | `#dcc9a8` | Sunken trays / inputs (`.neo-tray`, `.neo-input`) |
| `--neo-pill` | `#f8edd8` | Active pill sitting on a surface (`.neo-pill-active`) |

### Two-Layer Shadow Pair

Every elevation change uses the same pair — a warm-tinted dark caramel cast (`--neo-sd`) plus a soft cream highlight (`--neo-sl`), mirrored (dark bottom-right, light top-left):

- **Base card:** `6px 6px 15px var(--neo-sd), -6px -6px 15px var(--neo-sl)`
- **Inset tray:** `inset 3px 3px 8px var(--neo-sd), inset -3px -3px 8px var(--neo-sl)`
- **Hover lift:** `translateY(-4px)` + shadows deepened to `9px 9px 22px`

### Accent & Type

- **Accent (`--neo-accent` `#8b6840`):** caramel brown — active tabs, CTA buttons, primary interactive states.
- **Text (`--neo-text` `#2c1a0e`) / Muted (`--neo-muted` `#4a2e10`):** deep coffee tones, never pure black.
- **Brand bar (`#252035` deep purple-gray):** header only. Inside it, slate/amber/purple Tailwind utilities are used against the dark ground (not the neo tokens).
- **Standard identification:** blue family for ISO 80369-7 badges, indigo family for ISO 80369-20 badges (semantic continuity with earlier releases).

### Semantic Accents (Functional Only)

- **Success (#059669):** pass criteria, export confirmation.
- **Warning (#D97706):** worst-case scenarios, regulatory warnings.
- **Error (#E11D48):** fail criteria, danger indicators.

## Interaction Motion (v8.44.0)

All motion uses **only `transform` + `opacity`** (GPU-friendly, no reflow):

| Effect | Class | Spec |
|---|---|---|
| Card hover lift | `.neo-card:hover` | `translateY(-4px)`, 0.25s ease-out |
| Stagger entrance | `.stagger-card` | `fadeUp` 0.5s, `animationDelay: idx * 0.08s`, `backwards` fill |
| Page transition | `.page-transition` | `pageIn` 0.4s ease-out (remount via `key={activeTab}`) |
| Accordion expand | `.tree-children` | `max-height 0 → 800px` + opacity, 0.3s; chevron `rotate(90deg)` |
| Sliding pill indicator | `.pill-slider` | measured `left/width`, 0.25s cubic-bezier, re-measured on resize |
| Spotlight hover | `.spotlight-card` | radial gradient at `--mx/--my`, gated by `@media (hover: hover)` |

Spotlight color derives from the cream highlight (`rgba(255, 248, 235, …)`) so the glow reads as the same physical light source as the neumorphic shadows. Touch devices get no hover-dependent effects.

## Anti-Patterns

| Don't | Do Instead |
|:---|:---|
| Use strokes/borders to fake elevation | Use the two-layer shadow pair on `--neo-bg` ground |
| Hardcode shadow/highlight colors | Reference `--neo-sd` / `--neo-sl` variables |
| Animate `width`/`height`/`margin` | Animate `transform` / `opacity` only |
| Put `bg-white` cards on the beige ground | Use `.neo-card` (`--neo-surface`) |
| Use high-saturation candy colors | Stay in the caramel/cream family; semantic accents excepted |
| Blue UI chrome (`#2563eb` legacy) | Caramel accent `#8b6840`; blue/indigo only for standard-ID badges |

## Spacing

All margin and padding values must be multiples of 4px (4, 8, 12, 16, 24, 32, 48, 64).
