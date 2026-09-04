import { ANNEX_C_FIGURES } from '../data/isoData';
import { AnnexCFigureInfo } from '../types';

/**
 * Maps ISO clause ID to its corresponding SVG / Figure Key
 */
export const getClauseSvgKey = (clauseId: string): string => {
  switch (clauseId) {
    case '6.1':
      return 'ISO20-FIG-B1';
    case '6.2':
      return 'ISO20-FIG-D1';
    case '6.3':
      return 'ISO20-FIG-E1';
    case '6.4':
      return 'ISO20-FIG-F1';
    case '6.5':
      return 'ISO20-FIG-G1';
    case '6.6':
      return 'ISO20-FIG-H1';
    case 'Clause 4':
      return 'ISO20-FIG-J1';
    case 'Clause 5':
      return 'ISO7-FIG-B3';
    case 'Annex C':
      return 'ISO7-FIG-C3';
    case 'Clause 1':
      return 'ISO7-CLAUSE-1';
    case 'Clause 2':
      return 'ISO7-CLAUSE-2';
    case 'Clause 3':
      return 'ISO7-CLAUSE-3';
    default:
      return 'ISO20-FIG-B1';
  }
};

/**
 * Safe Annex C Figure Lookup helper supporting both dot format ('ISO20-B.1') and hypen format ('ISO20-FIG-B1')
 */
export const getAnnexCFigure = (key: string): AnnexCFigureInfo | undefined => {
  if (!key) return undefined;

  // Direct lookup
  if (ANNEX_C_FIGURES[key]) {
    return ANNEX_C_FIGURES[key];
  }

  // Alias lookup by svgKey or normalized key
  const normalizedKey = key.toUpperCase().trim();
  const figureEntry = Object.values(ANNEX_C_FIGURES).find(
    fig => fig.id === key || fig.id === normalizedKey || fig.svgKey === key || fig.svgKey === normalizedKey
  );

  if (figureEntry) {
    return figureEntry;
  }

  // Handle hyphen / dot conversion e.g. 'ISO20-FIG-B1' -> 'ISO20-B.1'
  const dotKey = key.replace('ISO20-FIG-', 'ISO20-').replace('ISO7-FIG-', '');
  return ANNEX_C_FIGURES[dotKey];
};
