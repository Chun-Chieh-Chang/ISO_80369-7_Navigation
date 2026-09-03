/**
 * ISO 80369-7 Medical Luer Connector Testing Data Models & Types
 */

export type ConnectorGender = 'male' | 'female';
export type ConnectorType = 'lock' | 'slip';
export type DeviceType = 'standard' | 't-port' | 'stopcock' | 'syringe';

export type TestClauseId = '6.1' | '6.2' | '6.3' | '6.4' | '6.5' | '6.6';

export type AnnexCFigureId =
  | 'A.1' | 'B.1' | 'B.2' | 'B.3' | 'B.4' | 'B.5' | 'B.6'
  | 'C.1' | 'C.2' | 'C.3' | 'C.4' | 'C.5' | 'C.6'
  | 'SML'
  | 'ISO20-B.1' | 'ISO20-B.2' | 'ISO20-C.1' | 'ISO20-D.1' | 'ISO20-E.1'
  | 'ISO20-F.1' | 'ISO20-G.1' | 'ISO20-H.1' | 'ISO20-J.1' | 'ISO20-K.1';

export interface ISOClauseInfo {
  id: TestClauseId;
  title: string;
  titleZh: string;
  category: 'leakage' | 'durability' | 'mechanical';
  applicableTypes: ConnectorType[];
  assemblyTorqueNm: { min: number; max: number };
  assemblyAxialForceN?: { min: number; max: number };
  testTorqueNm?: { min: number; max: number };
  testForceN?: { min: number; max: number };
  holdTimeSec: { min: number; max: number };
  requiredMaleRef: AnnexCFigureId;
  requiredFemaleRef: AnnexCFigureId;
  passCriteria: string;
  passCriteriaZh: string;
  keyPhysics: string;
  keyPhysicsZh: string;
  /** ISO 80369-20 Annex H.4 a) pre-assembly: hold 5-6s then release */
  preAssemblyHoldSec?: { min: number; max: number };
}

export interface AnnexCFigureInfo {
  id: AnnexCFigureId;
  figureNumber: string;
  standardOwner?: 'ISO 80369-7' | 'ISO 80369-20' | 'Commercial';
  annexGroup: 'Annex A' | 'Annex B' | 'Annex C' | 'ISO 80369-20' | 'Commercial';
  name: string;
  nameZh?: string;
  gender?: ConnectorGender;
  type?: ConnectorType;
  tabWidthMm?: number;
  backFlankAngleDeg?: number;
  description: string;
  descriptionZh: string;
  intendedClauses: TestClauseId[];
  isWorstCase: boolean;
  worstCaseReasonZh: string;
  worstCaseReasonEn?: string;
  svgHighlights: {
    title: string;
    value: string;
  }[];
  svgKey?: string;
}

export interface PlasticMaterial {
  id: string;
  name: string;
  flexuralModulusMpa: number;
  yieldStrengthMpa: number;
  creepResistanceScore: 'Low' | 'Medium' | 'High' | 'Very High';
  recommendationZh: string;
}

export interface TestConfigState {
  deviceType: DeviceType;
  connectorGender: ConnectorGender;
  connectorType: ConnectorType;
  selectedClauseId: TestClauseId;
  selectedRefConnectorId: AnnexCFigureId;
  appliedAssemblyTorqueNm: number;
  appliedTestTorqueNm: number;
  appliedTestForceN: number;
  appliedHoldTimeSec: number;
  selectedMaterialId: string;
  collarWallThicknessMm: number;
  collarOuterDiameterMm: number;
  tPortAsymmetryFactor: number;
}

export interface ComplianceAuditResult {
  isCompliant: boolean;
  statusLevel: 'compliant' | 'warning' | 'non-compliant' | 'wrong-connector';
  overallScore: number;
  clauseName: string;
  correctRefConnector: AnnexCFigureId;
  connectorMatch: boolean;
  assemblyTorqueValid: boolean;
  testTorqueValid: boolean;
  testForceValid: boolean;
  holdTimeValid: boolean;
  materialStrengthValid: boolean;
  calculatedHoopStressMpa: number;
  calculatedSafetyFactor: number;
  calculatedCreepRisk: 'Low' | 'Moderate' | 'High' | 'Critical (Override Imminent)';
  issuesZh: string[];
  recommendationsZh: string[];
}

export interface FailureModeInfo {
  id: string;
  title: string;
  titleZh: string;
  subtitleZh: string;
  iconName: string;
  mechanismZh: string;
  visualMetaphorZh: string;
  keyFormulaZh: string;
  countermeasuresZh: string[];
}

export type TopicCategory = 'leakage' | 'mechanical' | 'durability' | 'dimensional' | 'assembly' | 'general';

export interface ISOTopicFigure {
  id: string;
  titleZh: string;
  titleEn: string;
  standard: string;
  figureType: 'apparatus' | 'connector_cad' | 'fixture' | 'mechanism' | 'analysis';
  figureTypeZh: string;
  descriptionZh: string;
  selectionReasonZh?: string; // 入選此主題之法規與第一性原理關聯邏輯說明
  svgKey: string;
  keyCallouts?: { id: string; labelZh: string; valueZh: string }[];
}

export interface ISOTopic {
  id: string;
  titleZh: string;
  titleEn: string;
  category: TopicCategory;
  categoryZh: string;
  iconName: string;
  shortSummaryZh: string;
  detailedDescriptionZh: string;
  keyParameters: { label: string; value: string; unit?: string }[];
  relatedISO7Clauses: string[];
  relatedISO20Annexes: string[];
  relatedRefConnectors: AnnexCFigureId[];
  engineeringRiskZh: string;
  auditFocusZh: string;
  tags: string[];
  figures?: ISOTopicFigure[];
}

export interface PreAssemblyCondition {
  status: 'standard_lock' | 'slip' | 'direct_overload' | 'not_applicable' | 'custom';
  labelZh: string;
  labelEn?: string;
  assemblyTorqueNm?: string;
  assemblyAxialForceN?: string;
  holdTimeSec?: string;
  descriptionZh?: string;
  descriptionEn?: string;
  apparatusZh?: string;
  apparatusEn?: string;
}

export interface StandardClauseDetail {
  id: string;
  standard: 'ISO 80369-7:2021' | 'ISO 80369-20:2015' | 'ISO 80369-20:2024' | string;
  clauseNumber: string;
  titleEn: string;
  titleZh: string;
  type: 'requirement' | 'test_method' | 'reference_fixture' | 'general_principle';
  typeZh: string;
  objectiveZh: string;
  appliesToZh: string;
  preAssembly?: PreAssemblyCondition;
  quantitativeConditions: {
    assemblyTorqueNm?: string;
    assemblyAxialForceN?: string;
    testTorqueNm?: string;
    testForceN?: string;
    testPressureKpa?: string;
    holdTimeSec?: string;
    temperatureC?: string;
    media?: string;
    restTimeMin?: string;
    holdTimeHours?: string;
    maxAllowedUnscrewingTorque?: string;
    [key: string]: string | undefined;
  };
  fixtureRequiredZh: string;
  testProcedureStepsZh: string[];
  acceptanceCriteriaZh: string[];
  commonNonConformancesZh: string[];
  regulatoryTipZh: string;
}

export interface StandardMappingNode {
  id: string;
  label: string;
  standard: 'ISO 80369-7' | 'ISO 80369-20' | 'Topic' | 'Fixture';
  category: string;
  type: 'topic' | 'iso7_clause' | 'iso20_annex' | 'fixture';
}

export interface StandardMappingEdge {
  source: string;
  target: string;
  relationshipZh: string;
}
