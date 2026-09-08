import { ANNEX_C_FIGURES, ISO_CLAUSES } from '../data/isoData';
import { AnnexCFigureInfo, AnnexCFigureId, ConnectorGender, ConnectorType, TestClauseId } from '../types';

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

/* ------------------------------------------------------------------------- *
 * Annex C reference-connector resolution (single source of truth)
 * ------------------------------------------------------------------------- */

/**
 * Reference connectors that ISO 80369-7:2021 permits for each performance clause.
 * Transcribed from the "Check conformance by ..." sentence of each subclause:
 *
 *   6.1.2 / 6.1.3 / 6.2 / 6.3 -> Figures C.1, C.2, C.4 and C.5, as appropriate
 *   6.4                       -> Figures C.2, C.3, C.5 and C.6, as appropriate
 *   6.5                       -> Figures C.1 and C.4, as appropriate   (lock only)
 *   6.6                       -> Figures C.3 and C.6, as appropriate   (lock only)
 *
 * Kept here only as an assertion target; the actual pairing is derived from
 * ANNEX_C_FIGURES, whose `intendedClauses`/`gender`/`type` mirror the Annex C
 * figure captions verbatim.
 */
export const ISO7_CLAUSE_REFERENCE_CONNECTORS: Record<TestClauseId, AnnexCFigureId[]> = {
  '6.1': ['C.1', 'C.2', 'C.4', 'C.5'],
  '6.2': ['C.1', 'C.2', 'C.4', 'C.5'],
  '6.3': ['C.1', 'C.2', 'C.4', 'C.5'],
  '6.4': ['C.2', 'C.3', 'C.5', 'C.6'],
  '6.5': ['C.1', 'C.4'],
  '6.6': ['C.3', 'C.6']
};

/**
 * Resolve the Annex C reference connector required to test one device under test.
 *
 * ISO 80369-7:2021 always mates the connector under test with a reference connector
 * of the OPPOSITE gender and the MATCHING locking style, so the pairing is fully
 * determined by the Annex C figure captions - it is derived here rather than
 * restated at each call site.
 *
 * Returns undefined when the clause does not apply to that connector style
 * (6.5 and 6.6 are Luer lock only), so callers render an explicit "not applicable"
 * instead of a plausible-looking wrong figure.
 */
export const getRequiredReferenceConnector = (
  clauseId: TestClauseId,
  dutGender: ConnectorGender,
  dutType: ConnectorType
): AnnexCFigureInfo | undefined => {
  const referenceGender: ConnectorGender = dutGender === 'male' ? 'female' : 'male';
  return Object.values(ANNEX_C_FIGURES).find(
    fig =>
      fig.annexGroup === 'Annex C' &&
      fig.gender === referenceGender &&
      fig.type === dutType &&
      fig.intendedClauses.includes(clauseId)
  );
};

/* ------------------------------------------------------------------------- *
 * Standard pre-assembly (ISO 80369-20:2024, X.4 - identical in Annexes B-K)
 * ------------------------------------------------------------------------- */

/**
 * The standard assembly step differs between locking and non-locking connectors:
 * the order of application is reversed and the slip variant is torque-limited.
 * Verbatim source: ISO 80369-20:2024, B.4 b) 1) and 2).
 */
export interface PreAssemblySpec {
  /** Applies to a locking connector (collar torque first) or a slip one (axial force first). */
  connectorType: ConnectorType;
  torqueNm: { min?: number; max: number };
  axialForceN: { min: number; max: number };
  holdSec: { min: number; max: number };
  /** Slip connectors only: rotation is capped instead of torque-controlled. */
  maxRotationDeg?: number;
}

export const getPreAssemblySpec = (connectorType: ConnectorType): PreAssemblySpec =>
  connectorType === 'slip'
    ? {
        connectorType: 'slip',
        // "assemble by applying an axial force of between 26,5 N and 27,5 N. Then, while
        //  continuing to apply the axial force, rotate the connector under test with a
        //  torque not exceeding 0,10 N.m to give a rotation not exceeding 90 degrees."
        torqueNm: { max: 0.10 },
        axialForceN: { min: 26.5, max: 27.5 },
        holdSec: { min: 5, max: 6 },
        maxRotationDeg: 90
      }
    : {
        connectorType: 'lock',
        // "assemble by rotating the collar of the connector under test to a torque of
        //  between 0,08 N.m and 0,12 N.m. Then, while continuing to apply the torque,
        //  apply an axial force of between 26,5 N and 27,5 N."
        torqueNm: { min: 0.08, max: 0.12 },
        axialForceN: { min: 26.5, max: 27.5 },
        holdSec: { min: 5, max: 6 }
      };

/** Human-readable pre-assembly sentence, order-of-operations preserved. */
export const formatPreAssembly = (connectorType: ConnectorType, isEn: boolean): string => {
  const p = getPreAssemblySpec(connectorType);
  if (p.connectorType === 'slip') {
    return isEn
      ? `Axial force ${p.axialForceN.min}-${p.axialForceN.max} N first, then rotate <= ${p.maxRotationDeg} deg with torque <= ${p.torqueNm.max.toFixed(2)} N·m while maintaining axial force; both held simultaneously for ${p.holdSec.min}-${p.holdSec.max} s then release`
      : `先施加軸向推力 ${p.axialForceN.min}–${p.axialForceN.max} N，再於維持該推力下以 ≤ ${p.torqueNm.max.toFixed(2)} N·m 扭矩旋轉 ≤ ${p.maxRotationDeg}°；兩力同時維持 ${p.holdSec.min}–${p.holdSec.max} 秒後釋放`;
  }
  return isEn
    ? `Collar torque ${p.torqueNm.min?.toFixed(2)}-${p.torqueNm.max.toFixed(2)} N·m first (threads engaged), then axial force ${p.axialForceN.min}-${p.axialForceN.max} N while maintaining torque; both held simultaneously for ${p.holdSec.min}-${p.holdSec.max} s then release`
    : `先將套環旋至 ${p.torqueNm.min?.toFixed(2)}–${p.torqueNm.max.toFixed(2)} N·m 扭矩（螺紋咬合），再於維持該扭矩下施加軸向推力 ${p.axialForceN.min}–${p.axialForceN.max} N；兩力同時維持 ${p.holdSec.min}–${p.holdSec.max} 秒後釋放`;
};

/**
 * Short descriptive label for an Annex C reference connector, derived from the
 * figure's own attributes so it cannot drift from the drawing data.
 * Example: "Female Lock Worst-case 2.71mm" / "母鎖定 最壞情況 2.71mm".
 */
export const getReferenceConnectorLabel = (fig: AnnexCFigureInfo, isEn: boolean): string => {
  const gender = isEn
    ? (fig.gender === 'male' ? 'Male' : 'Female')
    : (fig.gender === 'male' ? '公' : '母');
  const style = isEn
    ? (fig.type === 'lock' ? 'Lock' : 'Slip')
    : (fig.type === 'lock' ? '鎖定' : '滑動');
  const grade = isEn
    ? (fig.isWorstCase ? 'Worst-case' : 'Nominal')
    : (fig.isWorstCase ? '最壞情況' : '標稱');
  const width = fig.tabWidthMm ? ` ${fig.tabWidthMm.toFixed(2)}mm` : '';
  return isEn ? `${gender} ${style} ${grade}${width}` : `${gender}${style} ${grade}${width}`;
};

/**
 * All four device-under-test pairings for one clause, rendered as a single line.
 * Combinations the clause does not cover (6.5 and 6.6 are Luer lock only) are
 * omitted and flagged, so the matrix cell can never imply a slip fixture for a
 * lock-only clause.
 */
export const formatClauseFixtureMatrix = (clauseId: TestClauseId, isEn: boolean): string => {
  const combos: Array<{ gender: ConnectorGender; type: ConnectorType }> = [
    { gender: 'male', type: 'lock' },
    { gender: 'female', type: 'lock' },
    { gender: 'male', type: 'slip' },
    { gender: 'female', type: 'slip' }
  ];
  const parts: string[] = [];
  let slipCovered = false;

  combos.forEach(({ gender, type }) => {
    const fig = getRequiredReferenceConnector(clauseId, gender, type);
    if (!fig) return;
    if (type === 'slip') slipCovered = true;
    const dut = isEn
      ? `${gender === 'male' ? 'Male' : 'Female'} ${type === 'lock' ? 'Lock' : 'Slip'}`
      : `${gender === 'male' ? '公' : '母'}${type === 'lock' ? '鎖' : '滑'}配`;
    const wc = fig.isWorstCase ? (isEn ? ' (Worst-case)' : ' (最壞情況)') : '';
    parts.push(isEn ? `${dut}: ${fig.figureNumber}${wc}` : `${dut} ${fig.figureNumber}${wc}`);
  });

  const lockOnly = !slipCovered ? (isEn ? ' (Lock only)' : ' (僅限鎖定型)') : '';
  return parts.join(isEn ? ' | ' : ' ｜ ') + lockOnly;
};

/**
 * Pre-assembly sentence for a clause, covering every connector style the clause
 * applies to. Clauses 6.1-6.4 cover both lock and slip, whose assembly sequences
 * differ (ISO 80369-20:2024, X.4 b) 1) vs 2)); 6.5 and 6.6 are lock only.
 */
export const formatPreAssemblyForClause = (clauseId: TestClauseId, isEn: boolean): string => {
  const types = ISO_CLAUSES[clauseId]?.applicableTypes ?? ['lock', 'slip'];
  const order: ConnectorType[] = ['lock', 'slip'];
  return order
    .filter(tp => types.includes(tp))
    .map(tp => {
      const tag = isEn
        ? (tp === 'lock' ? 'Lock (L2)' : 'Slip (L1)')
        : (tp === 'lock' ? '鎖定型 (L2)' : '滑動型 (L1)');
      return `${tag}: ${formatPreAssembly(tp, isEn)}`;
    })
    .join(isEn ? ' | ' : ' ｜ ');
};

/** Both pre-assembly sequences, for contexts not tied to one clause (e.g. the Clause 4 row). */
export const formatPreAssemblyBothTypes = (isEn: boolean): string => {
  const tag = (tp: 'lock' | 'slip') =>
    isEn ? (tp === 'lock' ? 'Lock (L2)' : 'Slip (L1)') : (tp === 'lock' ? '鎖定型 (L2)' : '滑動型 (L1)');
  return (['lock', 'slip'] as const)
    .map(tp => `${tag(tp)}: ${formatPreAssembly(tp, isEn)}`)
    .join(isEn ? ' | ' : ' ｜ ');
};
