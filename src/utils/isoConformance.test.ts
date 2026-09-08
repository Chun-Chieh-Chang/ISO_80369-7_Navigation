import { describe, it, expect } from 'vitest';
import { ISO_CLAUSES, ANNEX_C_FIGURES, ISO20_REPORT_ELEMENT_COUNTS, ISO20_MANDATORY_REPORT_ITEMS } from '../data/isoData';
import { ISO_TOPICS, STANDARD_CLAUSE_DETAILS } from '../data/isoTopicsData';
import {
  getRequiredReferenceConnector,
  getPreAssemblySpec,
  formatClauseFixtureMatrix,
  formatPreAssembly,
  ISO7_CLAUSE_REFERENCE_CONNECTORS
} from './isoHelpers';
import { findTopicForClause, resolveTopicClauses, resolveDefaultClauseId } from '../hooks/useClauseDetailDrawer';
import { TestClauseId } from '../types';

/**
 * Facts transcribed from the standards themselves, kept here so a future data edit
 * that drifts from ISO 80369-7:2021 / ISO 80369-20:2024 fails the build.
 *
 * Sources:
 *   ISO 80369-7:2021,  Clause 6 and Annex C (figure captions C.1 - C.6)
 *   ISO 80369-20:2024, Clause 4 Table 1, Annexes B - K (X.2, X.4, X.5)
 */

describe('ISO 80369-7:2021 Clause 6 - quantitative requirements', () => {
  it('6.1 fluid leakage: 300-330 kPa; 15-20 s decay, 30-35 s falling drop', () => {
    const c = ISO_CLAUSES['6.1'];
    expect(c.holdTimeSec).toEqual({ min: 15, max: 35 });
    expect(c.passCriteria).toContain('300');
    expect(c.passCriteria).toContain('330');
    expect(c.passCriteria).toContain('0.005');
  });

  it('6.2 sub-atmospheric air leakage: 80.0-88.0 kPa over 15-20 s', () => {
    const c = ISO_CLAUSES['6.2'];
    expect(c.holdTimeSec).toEqual({ min: 15, max: 20 });
    expect(c.passCriteria).toContain('80.0');
    expect(c.passCriteria).toContain('88.0');
  });

  it('6.3 stress cracking: assembled for not less than 48 h', () => {
    expect(ISO_CLAUSES['6.3'].holdTimeSec.min).toBe(48 * 3600);
  });

  it('6.4 axial load: 23-25 N slip / 32-35 N lock, hold 10-15 s', () => {
    const c = ISO_CLAUSES['6.4'];
    expect(c.testForceN).toEqual({ min: 23, max: 35 });
    expect(c.holdTimeSec).toEqual({ min: 10, max: 15 });
  });

  it('6.5 unscrewing: 0.018-0.020 N.m for 10-15 s, Luer lock only', () => {
    const c = ISO_CLAUSES['6.5'];
    expect(c.testTorqueNm).toEqual({ min: 0.018, max: 0.020 });
    expect(c.holdTimeSec).toEqual({ min: 10, max: 15 });
    expect(c.applicableTypes).toEqual(['lock']);
  });

  it('6.6 overriding: 0.15-0.17 N.m for 5-10 s, Luer lock only', () => {
    const c = ISO_CLAUSES['6.6'];
    expect(c.testTorqueNm).toEqual({ min: 0.15, max: 0.17 });
    expect(c.holdTimeSec).toEqual({ min: 5, max: 10 });
    expect(c.applicableTypes).toEqual(['lock']);
  });
});

describe('ISO 80369-7:2021 Annex C - reference connector identities', () => {
  // Each entry is the figure caption, verbatim in meaning.
  const CAPTIONS: Record<string, { gender: string; type: string; clauses: TestClauseId[]; worstCase: boolean }> = {
    // C.1 Female reference Luer lock connector for testing male Luer connectors for
    //     leakage, separation from unscrewing, stress cracking and non-interconnectable
    'C.1': { gender: 'female', type: 'lock', clauses: ['6.1', '6.2', '6.3', '6.5'], worstCase: false },
    // C.2 Male reference Luer slip connector for testing female Luer connectors for
    //     leakage, separation from axial load, stress cracking and non-interconnectable
    'C.2': { gender: 'male', type: 'slip', clauses: ['6.1', '6.2', '6.3', '6.4'], worstCase: false },
    // C.3 Female reference Luer lock connector for testing male Luer lock connector for
    //     separation from axial load and resistance to overriding
    'C.3': { gender: 'female', type: 'lock', clauses: ['6.4', '6.6'], worstCase: true },
    // C.4 Male reference Luer lock connector for testing female Luer connectors for
    //     leakage, separation from unscrewing, stress cracking and non-interconnectable
    'C.4': { gender: 'male', type: 'lock', clauses: ['6.1', '6.2', '6.3', '6.5'], worstCase: false },
    // C.5 Female reference Luer slip connector for testing male Luer connectors for
    //     leakage, separation from axial load, stress cracking and non-interconnectable
    'C.5': { gender: 'female', type: 'slip', clauses: ['6.1', '6.2', '6.3', '6.4'], worstCase: false },
    // C.6 Male reference connector for testing female Luer lock connector for
    //     separation from axial load and resistance to overriding
    'C.6': { gender: 'male', type: 'lock', clauses: ['6.4', '6.6'], worstCase: true }
  };

  Object.entries(CAPTIONS).forEach(([id, expected]) => {
    it(`Fig.${id} matches its Annex C caption`, () => {
      const fig = ANNEX_C_FIGURES[id];
      expect(fig, `${id} missing`).toBeDefined();
      expect(fig.gender).toBe(expected.gender);
      expect(fig.type).toBe(expected.type);
      expect([...fig.intendedClauses].sort()).toEqual([...expected.clauses].sort());
      expect(fig.isWorstCase).toBe(expected.worstCase);
    });
  });

  it('Fig.C.1 nominal lug 3,50 mm and Fig.C.3 worst-case lug 2,71 mm', () => {
    expect(ANNEX_C_FIGURES['C.1'].tabWidthMm).toBe(3.5);
    expect(ANNEX_C_FIGURES['C.3'].tabWidthMm).toBe(2.71);
  });
});

describe('Reference connector resolution', () => {
  it('never returns a figure outside the set the clause permits', () => {
    (Object.keys(ISO7_CLAUSE_REFERENCE_CONNECTORS) as TestClauseId[]).forEach(clauseId => {
      const permitted = ISO7_CLAUSE_REFERENCE_CONNECTORS[clauseId];
      (['male', 'female'] as const).forEach(gender => {
        (['lock', 'slip'] as const).forEach(type => {
          const fig = getRequiredReferenceConnector(clauseId, gender, type);
          if (fig) expect(permitted, `${clauseId} ${gender} ${type} -> ${fig.id}`).toContain(fig.id);
        });
      });
    });
  });

  it('pairs the device under test with an opposite-gender reference connector', () => {
    (Object.keys(ISO7_CLAUSE_REFERENCE_CONNECTORS) as TestClauseId[]).forEach(clauseId => {
      (['male', 'female'] as const).forEach(gender => {
        (['lock', 'slip'] as const).forEach(type => {
          const fig = getRequiredReferenceConnector(clauseId, gender, type);
          if (fig) expect(fig.gender).not.toBe(gender);
        });
      });
    });
  });

  it('resolves the documented worst-case pairings for 6.4 and 6.6', () => {
    expect(getRequiredReferenceConnector('6.4', 'male', 'lock')?.id).toBe('C.3');
    expect(getRequiredReferenceConnector('6.4', 'female', 'lock')?.id).toBe('C.6');
    expect(getRequiredReferenceConnector('6.4', 'male', 'slip')?.id).toBe('C.5');
    expect(getRequiredReferenceConnector('6.4', 'female', 'slip')?.id).toBe('C.2');
    expect(getRequiredReferenceConnector('6.6', 'male', 'lock')?.id).toBe('C.3');
    expect(getRequiredReferenceConnector('6.6', 'female', 'lock')?.id).toBe('C.6');
  });

  it('resolves the nominal pairings for 6.1 / 6.2 / 6.3 / 6.5', () => {
    (['6.1', '6.2', '6.3'] as TestClauseId[]).forEach(id => {
      expect(getRequiredReferenceConnector(id, 'male', 'lock')?.id).toBe('C.1');
      expect(getRequiredReferenceConnector(id, 'female', 'lock')?.id).toBe('C.4');
      expect(getRequiredReferenceConnector(id, 'male', 'slip')?.id).toBe('C.5');
      expect(getRequiredReferenceConnector(id, 'female', 'slip')?.id).toBe('C.2');
    });
    expect(getRequiredReferenceConnector('6.5', 'male', 'lock')?.id).toBe('C.1');
    expect(getRequiredReferenceConnector('6.5', 'female', 'lock')?.id).toBe('C.4');
  });

  it('returns nothing for lock-only clauses asked about a slip connector', () => {
    expect(getRequiredReferenceConnector('6.5', 'male', 'slip')).toBeUndefined();
    expect(getRequiredReferenceConnector('6.5', 'female', 'slip')).toBeUndefined();
    expect(getRequiredReferenceConnector('6.6', 'male', 'slip')).toBeUndefined();
    expect(getRequiredReferenceConnector('6.6', 'female', 'slip')).toBeUndefined();
  });

  it('marks 6.5 and 6.6 fixture summaries as lock only', () => {
    expect(formatClauseFixtureMatrix('6.5', true)).toContain('Lock only');
    expect(formatClauseFixtureMatrix('6.6', true)).toContain('Lock only');
    expect(formatClauseFixtureMatrix('6.4', true)).not.toContain('Lock only');
  });
});

describe('ISO 80369-20:2024 X.4 - pre-assembly differs by connector style', () => {
  it('lock: collar torque 0,08-0,12 N.m then 26,5-27,5 N, hold 5-6 s', () => {
    const p = getPreAssemblySpec('lock');
    expect(p.torqueNm).toEqual({ min: 0.08, max: 0.12 });
    expect(p.axialForceN).toEqual({ min: 26.5, max: 27.5 });
    expect(p.holdSec).toEqual({ min: 5, max: 6 });
    expect(p.maxRotationDeg).toBeUndefined();
  });

  it('slip: axial force first, torque not exceeding 0,10 N.m, rotation not exceeding 90 degrees', () => {
    const p = getPreAssemblySpec('slip');
    expect(p.torqueNm.max).toBe(0.10);
    expect(p.torqueNm.min).toBeUndefined();
    expect(p.axialForceN).toEqual({ min: 26.5, max: 27.5 });
    expect(p.maxRotationDeg).toBe(90);
  });
});

describe('ISO 80369-20:2024 X.5 - test report elements are not uniform', () => {
  it('records the per-annex counts read from the standard', () => {
    const byAnnex = Object.fromEntries(ISO20_REPORT_ELEMENT_COUNTS.map(a => [a.annex, a.count]));
    expect(byAnnex).toEqual({ B: 14, C: 12, D: 13, E: 12, F: 10, G: 11, H: 12, I: 11, K: 13 });
  });

  it('the shipped checklist is Annex B.5, whose 14 items run a) to n)', () => {
    expect(ISO20_MANDATORY_REPORT_ITEMS).toHaveLength(14);
    expect(ISO20_MANDATORY_REPORT_ITEMS[0].id).toBe('a');
    expect(ISO20_MANDATORY_REPORT_ITEMS[13].id).toBe('n');
    // Annex B is leakage by pressure decay; falling-drop liquid leakage is Annex C.
    expect(ISO20_MANDATORY_REPORT_ITEMS[0].exampleValueEn).toContain('pressure decay');
    expect(ISO20_MANDATORY_REPORT_ITEMS[0].exampleValueEn).not.toMatch(/positive pressure liquid/i);
  });
});

describe('ISO 80369-7:2021 clause numbering', () => {
  it('has no Clause 5 subclauses - Clause 5 is not subdivided', () => {
    ISO_TOPICS.forEach(topic => {
      topic.relatedISO7Clauses.forEach(c => {
        expect(c, `topic ${topic.id} cites a non-existent clause`).not.toMatch(/^Clause 5\.\d/);
      });
    });
  });

  it('every clause a topic cites resolves to a real clause record', () => {
    ISO_TOPICS.forEach(topic => {
      expect(resolveTopicClauses(topic).length, `topic ${topic.id}`).toBeGreaterThan(0);
      const fallbackOnly = resolveTopicClauses(topic).every(c => c.id.startsWith('topic-'));
      expect(fallbackOnly, `topic ${topic.id} resolves only to a synthesized clause`).toBe(false);
    });
  });
});

describe('Comparison matrix -> detail drawer bridge', () => {
  const MATRIX_ROW_IDS = [
    'Clause 1', 'Clause 2', 'Clause 3', 'Clause 4', 'Clause 5',
    '6.1', '6.2', '6.3', '6.4', '6.5', '6.6', 'Annex C'
  ];

  it('every performance clause row resolves to an owning topic', () => {
    MATRIX_ROW_IDS.forEach(id => {
      expect(findTopicForClause(id), `no topic owns matrix row "${id}"`).toBeDefined();
    });
  });

  it('prefers the dedicated topic over a cross-cutting one', () => {
    // 6.1 is listed by fluid-leakage, pre-assembly and the statistical-analysis topic.
    expect(findTopicForClause('6.1')?.id).toBe('fluid-leakage');
    expect(findTopicForClause('6.4')?.id).toBe('axial-separation');
    expect(findTopicForClause('6.6')?.id).toBe('overriding-torque');
  });

  it('lands on a clause tab that exists in the drawer', () => {
    MATRIX_ROW_IDS.forEach(id => {
      const topic = findTopicForClause(id);
      if (!topic) return;
      const target = STANDARD_CLAUSE_DETAILS[`iso7-${id.toLowerCase().replace(/\s+/g, '-')}`]
        ? `iso7-${id.toLowerCase().replace(/\s+/g, '-')}`
        : undefined;
      const active = resolveDefaultClauseId(topic, target);
      expect(active, `matrix row "${id}" opens the drawer with no active clause`).toBeTruthy();
      const tabs = resolveTopicClauses(topic).map(c => c.id);
      expect(tabs, `matrix row "${id}" active tab not among drawer tabs`).toContain(active);
    });
  });
});

describe('No surface presents the lock-only pre-assembly as universal', () => {
  // ISO 80369-20:2024 X.4 b) defines a slip branch in every annex except G and H.
  const LOCK_ONLY = new Set(['iso7-6.5', 'iso7-6.6', 'iso20-annex-g', 'iso20-annex-h']);

  it('every dual-type clause record states both assembly branches', () => {
    Object.entries(STANDARD_CLAUSE_DETAILS).forEach(([key, clause]) => {
      if (LOCK_ONLY.has(key)) return;
      const torque = clause.preAssembly?.assemblyTorqueNm;
      if (!torque) return;
      expect(torque, `${key} states only the locking torque`).toMatch(/Slip|滑動/);
    });
  });

  it('lock-only clauses keep the locking sequence alone', () => {
    ['iso7-6.5', 'iso20-annex-h'].forEach(key => {
      const torque = STANDARD_CLAUSE_DETAILS[key]?.preAssembly?.assemblyTorqueNm;
      if (torque) expect(torque, `${key}`).not.toMatch(/Slip|滑動/);
    });
  });

  it('the slip sequence caps torque at 0,10 N.m and rotation at 90 degrees', () => {
    const zh = formatPreAssembly('slip', false);
    const en = formatPreAssembly('slip', true);
    expect(zh).toContain('0.10');
    expect(zh).toContain('90');
    expect(en).toContain('0.10');
    expect(en).toContain('90');
    // The slip branch must not quote the locking collar torque.
    expect(zh).not.toContain('0.08');
    expect(en).not.toContain('0.08');
  });

  it('the lock sequence applies collar torque before axial force', () => {
    const en = formatPreAssembly('lock', true);
    expect(en.indexOf('Collar torque')).toBeLessThan(en.indexOf('axial force'));
    const enSlip = formatPreAssembly('slip', true);
    expect(enSlip.indexOf('Axial force')).toBeLessThan(enSlip.indexOf('rotate'));
  });
});
