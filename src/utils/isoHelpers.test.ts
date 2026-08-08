import { describe, it, expect } from 'vitest';
import { getClauseSvgKey, getAnnexCFigure } from './isoHelpers';
import { ISO_CLAUSES, ANNEX_C_FIGURES } from '../data/isoData';

describe('ISO 80369-7 & 20 Data & Helper Unit Tests', () => {
  it('should map clause IDs to correct SVG keys in getClauseSvgKey', () => {
    expect(getClauseSvgKey('6.1')).toBe('ISO20-FIG-B1');
    expect(getClauseSvgKey('6.2')).toBe('ISO20-FIG-D1');
    expect(getClauseSvgKey('6.3')).toBe('ISO20-FIG-E1');
    expect(getClauseSvgKey('6.4')).toBe('ISO20-FIG-F1');
    expect(getClauseSvgKey('6.5')).toBe('ISO20-FIG-G1');
    expect(getClauseSvgKey('6.6')).toBe('ISO20-FIG-H1');
  });

  it('should resolve figure info cleanly whether hyphenated or dotted key is passed', () => {
    const figFromDotKey = getAnnexCFigure('ISO20-B.1');
    const figFromHyphenKey = getAnnexCFigure('ISO20-FIG-B1');

    expect(figFromDotKey).toBeDefined();
    expect(figFromHyphenKey).toBeDefined();
    expect(figFromHyphenKey?.id).toBe('ISO20-B.1');
  });

  it('should verify Fig. B.4 is Male Lock Rotatable Collar according to ISO 80369-7:2021', () => {
    const b4 = ANNEX_C_FIGURES['B.4'];
    expect(b4).toBeDefined();
    expect(b4.gender).toBe('male');
    expect(b4.type).toBe('lock');
    expect(b4.name).toContain('Rotatable');
  });

  it('should verify Fig. B.5 is Female Luer Lock Connector according to ISO 80369-7:2021', () => {
    const b5 = ANNEX_C_FIGURES['B.5'];
    expect(b5).toBeDefined();
    expect(b5.gender).toBe('female');
    expect(b5.type).toBe('lock');
  });

  it('should verify Fig. B.1 tip diameter Ød is 3.970~4.035 mm', () => {
    const b1 = ANNEX_C_FIGURES['B.1'];
    expect(b1.descriptionZh).toContain('3.970~4.035');
  });

  it('should verify Clause 6.4 test forces are correctly specified', () => {
    const c64 = ISO_CLAUSES['6.4'];
    expect(c64.testForceN.min).toBe(23);
    expect(c64.testForceN.max).toBe(35);
  });
});
