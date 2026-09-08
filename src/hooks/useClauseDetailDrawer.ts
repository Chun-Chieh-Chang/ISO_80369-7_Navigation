import { useCallback, useMemo, useState } from 'react';
import { ISO_TOPICS, STANDARD_CLAUSE_DETAILS } from '../data/isoTopicsData';
import { ISOTopic, StandardClauseDetail } from '../types';

/**
 * Shared plumbing for the Level-3 clause detail drawer.
 *
 * Both the topic explorer (topic-centric) and the comparison matrix (clause-centric)
 * open the same drawer, so the topic -> clause resolution lives here instead of being
 * duplicated per screen.
 */

/** `'Clause 5'` -> `'iso7-clause-5'`, `'6.4'` -> `'iso7-6.4'`. */
const iso7Key = (clause: string) => `iso7-${clause.toLowerCase().replace(/\s+/g, '-')}`;

/** `'Annex B'` -> `'iso20-annex-b'`. */
const iso20Key = (annex: string) =>
  `iso20-annex-${annex.replace(/annex\s*/i, '').trim().toLowerCase().replace(/\s+/g, '-')}`;

/** First key that exists in STANDARD_CLAUSE_DETAILS, or undefined. */
const firstKnown = (...keys: string[]) => keys.find(k => Boolean(STANDARD_CLAUSE_DETAILS[k]));

/**
 * Every clause detail linked to a topic, ISO 80369-7 clauses first then the
 * ISO 80369-20 test-method annexes. Never returns an empty list: a topic with no
 * matching clause record yields one synthesized entry so the drawer still opens.
 */
export const resolveTopicClauses = (topic: ISOTopic | null): StandardClauseDetail[] => {
  if (!topic) return [];
  const list: StandardClauseDetail[] = [];

  topic.relatedISO7Clauses.forEach(c => {
    const key = firstKnown(iso7Key(c), c, c.toLowerCase().replace(/\s+/g, '-'));
    if (key) list.push(STANDARD_CLAUSE_DETAILS[key]);
  });

  topic.relatedISO20Annexes.forEach(a => {
    const key = firstKnown(iso20Key(a), a);
    if (key) {
      list.push(STANDARD_CLAUSE_DETAILS[key]);
    } else if (/section 4|general/i.test(a) && STANDARD_CLAUSE_DETAILS['iso20-general-procedure']) {
      list.push(STANDARD_CLAUSE_DETAILS['iso20-general-procedure']);
    }
  });

  if (list.length === 0) {
    list.push({
      id: `topic-${topic.id}`,
      standard: 'ISO 80369-7 / ISO 80369-20',
      clauseNumber: topic.relatedISO7Clauses[0] || 'Specification',
      titleEn: topic.titleEn,
      titleZh: topic.titleZh,
      type: 'requirement',
      typeZh: topic.categoryZh,
      objectiveZh: topic.detailedDescriptionZh,
      appliesToZh: topic.shortSummaryZh,
      quantitativeConditions: {},
      fixtureRequiredZh: topic.relatedRefConnectors.map(c => `Fig.${c}`).join(', ') || '依受測件型別指定',
      testProcedureStepsZh: [
        '檢驗受測樣品與金屬參考夾具規格。',
        '執行溫濕度環境預調理與依規裝配。',
        '依照標準規範執行考驗負載並判定。'
      ],
      acceptanceCriteriaZh: ['符合 ISO 80369 系列標準法定合格門檻。'],
      commonNonConformancesZh: [topic.engineeringRiskZh],
      regulatoryTipZh: topic.auditFocusZh,
      figureKey: topic.figures?.[0]?.svgKey
    });
  }

  return list;
};

/** Clause tab the drawer should land on when a topic is opened without an explicit target. */
export const resolveDefaultClauseId = (topic: ISOTopic, explicitClauseId?: string): string | null => {
  if (explicitClauseId) return explicitClauseId;
  const iso7 = topic.relatedISO7Clauses[0];
  if (iso7) {
    const key = firstKnown(iso7Key(iso7), iso7);
    if (key) return key;
  }
  const annex = topic.relatedISO20Annexes[0];
  if (annex) {
    const key = firstKnown(iso20Key(annex));
    if (key) return key;
  }
  return null;
};

/**
 * Reverse lookup used by the clause-centric comparison matrix: given a matrix row id
 * (`'6.4'`, `'Clause 5'`, `'Annex C'`, ...), find the topic that owns it.
 *
 * A topic dedicated to exactly that clause wins over a cross-cutting topic that merely
 * lists it (pre-assembly and the statistical-analysis topic both reference 6.1-6.5).
 */
export const findTopicForClause = (clauseId: string): ISOTopic | undefined => {
  const dedicated = ISO_TOPICS.find(
    t => t.relatedISO7Clauses.length === 1 && t.relatedISO7Clauses[0] === clauseId
  );
  if (dedicated) return dedicated;
  return ISO_TOPICS.find(t => t.relatedISO7Clauses.includes(clauseId));
};

export interface ClauseDetailDrawerController {
  isOpen: boolean;
  topic: ISOTopic | null;
  activeClauseId: string | null;
  relatedClauses: StandardClauseDetail[];
  openTopic: (topic: ISOTopic, clauseId?: string) => void;
  /** Opens the drawer from a comparison-matrix row id; no-op when no topic owns it. */
  openClause: (clauseId: string) => boolean;
  setActiveClauseId: (id: string) => void;
  close: () => void;
}

export const useClauseDetailDrawer = (): ClauseDetailDrawerController => {
  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState<ISOTopic | null>(null);
  const [activeClauseId, setActiveClauseId] = useState<string | null>(null);

  const openTopic = useCallback((next: ISOTopic, clauseId?: string) => {
    setTopic(next);
    setActiveClauseId(resolveDefaultClauseId(next, clauseId));
    setIsOpen(true);
  }, []);

  const openClause = useCallback((clauseId: string) => {
    const owner = findTopicForClause(clauseId);
    if (!owner) return false;
    const target = firstKnown(iso7Key(clauseId), clauseId);
    openTopic(owner, target);
    return true;
  }, [openTopic]);

  const close = useCallback(() => setIsOpen(false), []);
  const relatedClauses = useMemo(() => resolveTopicClauses(topic), [topic]);

  return { isOpen, topic, activeClauseId, relatedClauses, openTopic, openClause, setActiveClauseId, close };
};
