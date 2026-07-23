import React, { useState } from 'react';
import { 
  Zap, Info, Maximize2, ShieldAlert, CheckCircle2, Sliders, Droplets, Wind, 
  RotateCw, ArrowDownUp, Ruler, Sparkles, Eye, RefreshCw, Tag, HelpCircle, X
} from 'lucide-react';

interface ISOStandardFigureRendererProps {
  svgKey: string;
  titleZh: string;
  titleEn: string;
  standard: string;
  figureTypeZh: string;
  descriptionZh: string;
  keyCallouts?: { id: string; labelZh: string; valueZh: string }[];
  className?: string;
}

export const ISOStandardFigureRenderer: React.FC<ISOStandardFigureRendererProps> = ({
  svgKey,
  titleZh,
  titleEn,
  standard,
  figureTypeZh,
  descriptionZh,
  keyCallouts,
  className = ""
}) => {
  const [showDimensions, setShowDimensions] = useState(true);
  const [showPhysicsVectors, setShowPhysicsVectors] = useState(true);
  const [activeCalloutId, setActiveCalloutId] = useState<string | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  return (
    <div className={`bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl text-slate-900 ${className}`}>
      {/* Fig.Header Bar */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center space-x-2">
          <span className="bg-blue-100 text-blue-700 border border-blue-200 font-mono font-bold px-2.5 py-0.5 rounded-md">
            {standard}
          </span>
          <div>
            <h4 className="font-bold text-slate-900">{titleZh}</h4>
            <span className="text-xs text-slate-400 font-mono block">{titleEn}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Interactive Toggle Buttons */}
          <button
            onClick={() => setShowDimensions(!showDimensions)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition border flex items-center gap-1 ${
              showDimensions 
                ? 'bg-blue-600 text-white border-blue-500 shadow-xs' 
                : 'bg-slate-100 text-slate-500 border-slate-200 hover:text-slate-800'
            }`}
          >
            <Ruler className="w-3 h-3" />
            <span>標註尺寸</span>
          </button>

          <button
            onClick={() => setShowPhysicsVectors(!showPhysicsVectors)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition border flex items-center gap-1 ${
              showPhysicsVectors 
                ? 'bg-purple-600 text-white border-purple-500 shadow-xs' 
                : 'bg-slate-100 text-slate-500 border-slate-200 hover:text-slate-800'
            }`}
          >
            <Zap className="w-3 h-3" />
            <span>物理應力/流向</span>
          </button>

          {/* Interactive Category Badge */}
          <button
            onClick={() => setShowCategoryModal(true)}
            title="點擊查看此圖號類別定義與規範用途"
            className="bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 text-xs px-2.5 py-1 rounded-lg border border-slate-200 hover:border-slate-300 font-medium transition flex items-center gap-1.5 shadow-xs"
          >
            <Tag className="w-3 h-3 text-blue-600" />
            <span>圖別：{figureTypeZh}</span>
            <HelpCircle className="w-3 h-3 text-slate-400" />
          </button>
        </div>
      </div>

      {/* SVG Canvas Workspace */}
      <div className="p-4 sm:p-6 flex flex-col items-center justify-center bg-white/80 relative min-h-[320px]">
        
        {/* Background Engineering Grid */}
        <div className="w-full flex justify-center">
          {renderSvgContent(svgKey, showDimensions, showPhysicsVectors, activeCalloutId, setActiveCalloutId)}
        </div>

        {/* Dynamic Tooltip / Description Footer */}
        <div className="mt-4 w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold text-blue-600 flex items-center gap-1">
              <Info className="w-3.5 h-3.5" /> 標準規範圖解重點說明
            </span>
            <span className="font-mono text-xs">SVG CAD High-Precision Model</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            {descriptionZh}
          </p>
        </div>

        {/* Key Callouts Grid */}
        {keyCallouts && keyCallouts.length > 0 && (
          <div className="mt-3 w-full grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {keyCallouts.map((c) => (
              <div 
                key={c.id} 
                onMouseEnter={() => setActiveCalloutId(c.id)}
                onMouseLeave={() => setActiveCalloutId(null)}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  activeCalloutId === c.id 
                    ? 'bg-blue-50 border-blue-300 ring-1 ring-blue-300/50' 
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="text-xs text-slate-500 font-medium">{c.labelZh}</div>
                <div className="text-xs font-bold text-blue-700 font-mono mt-0.5">{c.valueZh}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Category Info Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl relative text-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold">ISO 80369-7 圖號分類與規範定義說明</h3>
              </div>
              <button 
                onClick={() => setShowCategoryModal(false)}
                className="text-slate-400 hover:text-slate-900 p-1 rounded-lg hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className={`p-3 rounded-xl border ${figureTypeZh.includes('產品') ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'}`}>
                <div className="font-bold text-blue-700 flex items-center gap-1.5 mb-1">
                  📐 1. 產品 CAD 幾何圖 (Annex B / Fig.B.1 ~ Fig.B.6)
                </div>
                <p className="leading-relaxed text-slate-600">
                  規範醫療器材製造商量產銷售之<strong>商業產品接頭</strong>（例如：針筒、針頭、輸液管線 connector、三向閥等）所需的 6% Luer 錐度、圓弧 R 角與螺紋幾何公差。
                </p>
              </div>

              <div className={`p-3 rounded-xl border ${figureTypeZh.includes('夾具') ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-200'}`}>
                <div className="font-bold text-amber-700 flex items-center gap-1.5 mb-1">
                  🔧 2. 金屬參考夾具件 (Annex C / Fig.C.1 ~ Fig.C.6)
                </div>
                <p className="leading-relaxed text-slate-600">
                  第三方檢驗實驗室進行物理洩漏 (6.1/6.2)、旋鬆扭矩 (6.3) 與拉拔力 (6.4) 等宣告測試時所使用的<strong>硬質不鏽鋼金屬測試規件 (Reference Test Gauges)</strong>，包含標稱件與最壞情況 (Worst-case) 限制件。
                </p>
              </div>

              <div className={`p-3 rounded-xl border ${figureTypeZh.includes('防誤插') ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
                <div className="font-bold text-emerald-700 flex items-center gap-1.5 mb-1">
                  📘 3. 防誤插幾何矩陣 (Annex A / Fig.A.1)
                </div>
                <p className="leading-relaxed text-slate-600">
                  規範 ISO 80369 跨領域小孔徑接頭（如血管 80369-7 vs 腸道 80369-3 ENFit vs 神經軸 80369-6 NRFit）之間互不相容之<strong>防呆幾何矩陣與物理維度隔離要求</strong>。
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowCategoryModal(false)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-4 py-2 rounded-xl transition"
              >
                瞭解並關閉
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * High-Precision Vector SVG Drawings Selector
 */
function renderSvgContent(
  key: string, 
  showDims: boolean, 
  showVectors: boolean, 
  activeCallout: string | null,
  setActiveCallout: (id: string | null) => void
) {
  switch (key) {
    case 'ISO20-FIG-B1':
      return renderPressureDecayApparatus(showDims, showVectors, activeCallout);
    case 'ISO20-FIG-B2':
      return renderPressureDecayCurve(showDims, showVectors, activeCallout);
    case 'ISO20-FIG-C1':
      return renderFallingDropApparatus(showDims, showVectors, activeCallout);
    case 'ISO20-FIG-D1':
      return renderVacuumDecayApparatus(showDims, showVectors, activeCallout);
    case 'ISO20-FIG-K1':
      return renderAspirationSubmergedApparatus(showDims, showVectors, activeCallout);
    case 'ISO20-FIG-H1':
      return renderOverridingTorqueRig(showDims, showVectors, activeCallout);
    case 'ISO20-FIG-F1':
      return renderAxialSeparationRig(showDims, showVectors, activeCallout);
    case 'ISO20-FIG-G1':
      return renderUnscrewingTorqueRig(showDims, showVectors, activeCallout);
    case 'ISO20-FIG-E1':
      return renderStressCrackingApparatus(showDims, showVectors, activeCallout);
    case 'ISO7-FIG-B1':
      return renderFigB1MaleSlipCad(showDims, showVectors, activeCallout);
    case 'ISO7-FIG-B2':
    case 'ISO7-FIG-B1-B2':
      return renderFigB2FemaleSlipCad(showDims, showVectors, activeCallout);
    case 'ISO7-FIG-B3':
      return renderFigB3MaleLockCad(showDims, showVectors, activeCallout);
    case 'ISO7-FIG-B4':
      return renderFigB4FemaleLockCad(showDims, showVectors, activeCallout);
    case 'ISO7-FIG-B5':
      return renderFigB5MaleLockFloatingCad(showDims, showVectors, activeCallout);
    case 'ISO7-FIG-B6':
    case 'ISO7-FIG-B3-B6':
      return renderFigB6FemaleEnvelopeCad(showDims, showVectors, activeCallout);
    case 'ISO7-FIG-C1':
      return renderFigC1FemaleRefNominalCad(showDims, showVectors, activeCallout);
    case 'ISO7-FIG-C2':
      return renderFigC2MaleSlipRefCad(showDims, showVectors, activeCallout);
    case 'ISO7-FIG-C3':
      return renderFigC3FemaleRefWorstCaseCad(showDims, showVectors, activeCallout);
    case 'ISO7-FIG-C4':
      return renderFigC4MaleLockRefNominalCad(showDims, showVectors, activeCallout);
    case 'ISO7-FIG-C5':
      return renderFigC5FemaleSlipRefCad(showDims, showVectors, activeCallout);
    case 'ISO7-FIG-C6':
      return renderFigC6MaleLockRefWorstCaseCad(showDims, showVectors, activeCallout);
    case 'ISO7-FIG-SML':
      return renderFigSmlCad(showDims, showVectors, activeCallout);
    case 'ISO20-FIG-J1':
      return renderPreAssemblyRig(showDims, showVectors, activeCallout);
    case 'ISO7-FIG-A1':
      return renderNonInterchangeabilityMatrix(showDims, showVectors, activeCallout);
    default:
      return renderPressureDecayApparatus(showDims, showVectors, activeCallout);
  }
}

/* =========================================================================
   SVG 1: Pressure Decay Positive Pressure Leakage Apparatus (ISO 80369-20 Annex B)
   ========================================================================= */
function renderPressureDecayApparatus(showDims: boolean, showVectors: boolean, activeCallout: string | null) {
  return (
    <svg viewBox="0 0 680 320" className="w-full max-w-3xl bg-white rounded-xl border border-slate-200 p-2 shadow-2xl">
      <defs>
        <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
        </pattern>
        <linearGradient id="pipeBlue" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>
      <rect width="680" height="320" fill="url(#gridPattern)" rx="8" />

      {/* Main Flow Title */}
      <text x="20" y="25" fill="#94a3b8" fontSize="12" fontFamily="monospace" fontWeight="bold">
        ISO 80369-20 Annex B: Positive Pressure Leakage Test Apparatus (300~330 kPa)
      </text>

      {/* Pressure Air Source Block */}
      <rect x="30" y="110" width="80" height="70" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="70" y="140" fill="#38bdf8" fontSize="12" textAnchor="middle" fontWeight="bold">壓力源 Source</text>
      <text x="70" y="158" fill="#94a3b8" fontSize="12" textAnchor="middle">&gt; 350 kPa</text>

      {/* Connection Pipe 1 */}
      <line x1="110" y1="145" x2="160" y2="145" stroke="url(#pipeBlue)" strokeWidth="6" />
      {showVectors && (
        <path d="M 125 145 L 140 145" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 3" />
      )}

      {/* Precision Regulator */}
      <rect x="160" y="105" width="90" height="80" rx="8" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />
      <circle cx="205" cy="135" r="20" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
      <line x1="205" y1="135" x2="218" y2="125" stroke="#f43f5e" strokeWidth="2" />
      <text x="205" y="172" fill="#e2e8f0" fontSize="12" textAnchor="middle" fontWeight="bold">調壓閥 Regulator</text>

      {/* Pipe 2 */}
      <line x1="250" y1="145" x2="310" y2="145" stroke="url(#pipeBlue)" strokeWidth="6" />

      {/* Digital Gauge Sensor */}
      <rect x="310" y="60" width="80" height="50" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="350" y="82" fill="#38bdf8" fontSize="13" fontFamily="monospace" textAnchor="middle" fontWeight="bold">320.0 kPa</text>
      <text x="350" y="98" fill="#a7f3d0" fontSize="12" textAnchor="middle">精度 ±0.3%</text>
      <line x1="350" y1="110" x2="350" y2="145" stroke="#38bdf8" strokeWidth="2" />

      {/* Shut-off Valve S1 */}
      <polygon points="390,130 420,145 390,160" fill="#f43f5e" />
      <polygon points="420,130 390,145 420,160" fill="#f43f5e" />
      <text x="405" y="120" fill="#f43f5e" fontSize="12" textAnchor="middle" fontWeight="bold">截止閥 S1</text>

      {/* Pipe 3 */}
      <line x1="420" y1="145" x2="480" y2="145" stroke="url(#pipeBlue)" strokeWidth="6" />

      {/* Reference Connector Metal Fixture (Fig.C.1/C.4) */}
      <rect x="480" y="120" width="60" height="50" rx="4" fill="#64748b" stroke="#e2e8f0" strokeWidth="2" />
      <text x="510" y="142" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">金屬夾具</text>
      <text x="510" y="156" fill="#cbd5e1" fontSize="12" textAnchor="middle">Fig.C.1</text>

      {/* Test Sample (Plastic Luer Connector) */}
      <rect x="540" y="128" width="70" height="34" rx="4" fill="#3b82f6" opacity="0.85" stroke="#60a5fa" strokeWidth="1.5" />
      <text x="580" y="275" fill="#f43f5e" fontSize="12">洩漏 (Fail)</text>

      {/* Callout Lines */}
      {showDims && (
        <g>
          <line x1="480" y1="100" x2="610" y2="100" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2 2" />
          <text x="545" y="93" fill="#fbbf24" fontSize="12" textAnchor="middle" fontWeight="bold">保持時間 15~20 秒 (Hold Time)</text>
        </g>
      )}
    </svg>
  );
}

/* =========================================================================
   SVG 2: Falling Drop Positive-Pressure Liquid Leakage (ISO 80369-20 Annex C)
   ========================================================================= */
function renderFallingDropApparatus(showDims: boolean, showVectors: boolean, activeCallout: string | null) {
  return (
    <svg viewBox="0 0 680 320" className="w-full max-w-3xl bg-white rounded-xl border border-slate-200 p-2 shadow-2xl">
      <defs>
        <pattern id="gridPattern2" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="680" height="320" fill="url(#gridPattern2)" rx="8" />

      <text x="20" y="25" fill="#94a3b8" fontSize="12" fontFamily="monospace" fontWeight="bold">
        ISO 80369-20 Annex C: Falling Drop Positive-Pressure Liquid Leakage (300~330 kPa)
      </text>

      {/* Water Reservoir */}
      <rect x="40" y="70" width="100" height="150" rx="8" fill="#0284c7" opacity="0.3" stroke="#38bdf8" strokeWidth="2" />
      <rect x="40" y="110" width="100" height="110" rx="0" fill="#0284c7" opacity="0.6" />
      <text x="90" y="150" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">測試用去離子水</text>
      <text x="90" y="168" fill="#e0f2fe" fontSize="12" textAnchor="middle">De-aerated Water</text>

      {/* Pressurization Inlet at top */}
      <line x1="90" y1="35" x2="90" y2="70" stroke="#38bdf8" strokeWidth="4" />
      <text x="130" y="50" fill="#38bdf8" fontSize="12" fontStyle="italic">空氣加壓 300~330 kPa</text>

      {/* De-aeration Valve */}
      <circle cx="90" cy="80" r="8" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
      <text x="110" y="84" fill="#a7f3d0" fontSize="12">排氣閥 Vent</text>

      {/* Water Outlet Line Horizontal */}
      <line x1="140" y1="180" x2="320" y2="180" stroke="#38bdf8" strokeWidth="8" />

      {/* Specimen Assembly Holder (Horizontal Axis) */}
      <rect x="320" y="160" width="70" height="40" rx="4" fill="#64748b" stroke="#cbd5e1" strokeWidth="2" />
      <text x="355" y="184" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">金屬夾具</text>

      {/* Test Connector Under Test */}
      <rect x="390" y="166" width="80" height="28" rx="4" fill="#3b82f6" stroke="#93c5fd" strokeWidth="1.5" />
      <text x="430" y="183" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">受測魯爾接頭</text>

      {/* Taper Junction Seal Area */}
      <line x1="390" y1="160" x2="390" y2="200" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />
      <text x="390" y="150" fill="#f43f5e" fontSize="12" textAnchor="middle" fontWeight="bold">錐面配合縫隙 Junction</text>

      {/* Droplet Detection Water Drop */}
      {showVectors && (
        <g>
          <path d="M 390 205 C 385 220, 395 220, 390 225 C 385 220, 395 220, 390 205 Z" fill="#38bdf8" stroke="#ffffff" strokeWidth="1" />
          <text x="410" y="222" fill="#f43f5e" fontSize="12" fontWeight="bold">水滴形成 (Falling Drop Risk)</text>
        </g>
      )}

      {/* Catchment Tray / Filter Paper */}
      <rect x="330" y="245" width="160" height="15" rx="3" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="256" fill="#475569" fontSize="12" textAnchor="middle" fontWeight="bold">乾燥無塵紙 (Absorbent Paper)</text>

      {/* Timer Callout */}
      <rect x="520" y="150" width="130" height="80" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="585" y="175" fill="#38bdf8" fontSize="12" textAnchor="middle" fontWeight="bold">水滴法保持時間</text>
      <text x="585" y="200" fill="#a7f3d0" fontSize="18" fontFamily="monospace" textAnchor="middle" fontWeight="bold">30 ~ 35 秒</text>
      <text x="585" y="218" fill="#94a3b8" fontSize="12" textAnchor="middle">判定: 100% 無水滴滴落</text>
    </svg>
  );
}

/* =========================================================================
   SVG 3: Sub-atmospheric Pressure Vacuum Decay Apparatus (ISO 80369-20 Annex D)
   ========================================================================= */
function renderVacuumDecayApparatus(showDims: boolean, showVectors: boolean, activeCallout: string | null) {
  return (
    <svg viewBox="0 0 680 320" className="w-full max-w-3xl bg-white rounded-xl border border-slate-200 p-2 shadow-2xl">
      <defs>
        <pattern id="gridPattern3" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="680" height="320" fill="url(#gridPattern3)" rx="8" />

      <text x="20" y="25" fill="#94a3b8" fontSize="12" fontFamily="monospace" fontWeight="bold">
        ISO 80369-20 Annex D: Sub-atmospheric Air Vacuum Leakage Apparatus (80.0~88.0 kPa Vacuum)
      </text>

      {/* Vacuum Pump */}
      <rect x="40" y="110" width="100" height="80" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
      <circle cx="90" cy="140" r="22" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
      <path d="M 80 140 L 100 140 M 90 130 L 90 150" stroke="#c084fc" strokeWidth="2" />
      <text x="90" y="178" fill="#c084fc" fontSize="12" textAnchor="middle" fontWeight="bold">真空幫浦 Vacuum</text>

      {/* Vacuum Pipe line */}
      <line x1="140" y1="150" x2="230" y2="150" stroke="#a855f7" strokeWidth="6" />

      {/* Digital Vacuum Manometer */}
      <rect x="230" y="60" width="100" height="55" rx="6" fill="#1e293b" stroke="#c084fc" strokeWidth="1.5" />
      <text x="280" y="82" fill="#c084fc" fontSize="13" fontFamily="monospace" textAnchor="middle" fontWeight="bold">-85.0 kPa</text>
      <text x="280" y="100" fill="#a7f3d0" fontSize="12" textAnchor="middle">負壓範圍 80.0~88.0</text>
      <line x1="280" y1="115" x2="280" y2="150" stroke="#c084fc" strokeWidth="2" />

      {/* Isolation Valve */}
      <polygon points="330,135 360,150 330,165" fill="#f43f5e" />
      <polygon points="360,135 330,150 360,165" fill="#f43f5e" />
      <text x="345" y="125" fill="#f43f5e" fontSize="12" textAnchor="middle" fontWeight="bold">關閉閥門 Valve</text>

      {/* Vacuum Line to Specimen */}
      <line x1="360" y1="150" x2="450" y2="150" stroke="#a855f7" strokeWidth="6" />

      {/* Sealed Test Specimen Assembly */}
      <rect x="450" y="125" width="60" height="50" rx="4" fill="#64748b" stroke="#e2e8f0" strokeWidth="2" />
      <rect x="510" y="133" width="70" height="34" rx="4" fill="#3b82f6" stroke="#93c5fd" strokeWidth="1.5" />
      <text x="480" y="154" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">金屬件</text>
      <text x="545" y="154" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">受測接頭</text>

      {/* Air Ingress Vectors */}
      {showVectors && (
        <g>
          <path d="M 510 100 L 510 130" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />
          <polygon points="510,133 506,124 514,124" fill="#f43f5e" />
          <text x="510" y="90" fill="#f43f5e" fontSize="12" textAnchor="middle" fontWeight="bold">外界空氣吸入 (Air Ingress)</text>
          <text x="510" y="210" fill="#a7f3d0" fontSize="12" textAnchor="middle" fontWeight="bold">⚠️ 防止氣栓危害 (Air Embolism Prevention)</text>
        </g>
      )}

      {/* Vacuum Hold Time Box */}
      <rect x="450" y="230" width="200" height="70" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
      <text x="550" y="250" fill="#94a3b8" fontSize="12" textAnchor="middle" fontWeight="bold">真空保持時間 Hold Time</text>
      <text x="550" y="275" fill="#c084fc" fontSize="16" fontFamily="monospace" textAnchor="middle" fontWeight="bold">15 ~ 20 秒</text>
      <text x="550" y="290" fill="#a7f3d0" fontSize="12" textAnchor="middle">洩漏極限 ≤ 0.005 Pa·m³/s</text>
    </svg>
  );
}

/* =========================================================================
   SVG 4: Air Leakage During Aspiration Test (Submerged Water Chamber) (ISO 80369-20:2024 Annex K)
   ========================================================================= */
function renderAspirationSubmergedApparatus(showDims: boolean, showVectors: boolean, activeCallout: string | null) {
  return (
    <svg viewBox="0 0 680 320" className="w-full max-w-3xl bg-white rounded-xl border border-slate-200 p-2 shadow-2xl">
      <defs>
        <pattern id="gridPattern4" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="680" height="320" fill="url(#gridPattern4)" rx="8" />

      <text x="20" y="25" fill="#a7f3d0" fontSize="12" fontFamily="monospace" fontWeight="bold">
        ISO 80369-20:2024 Annex K: Air Leakage During Aspiration (Submerged Water Chamber) [2024最新新增]
      </text>

      {/* Water Container Vessel */}
      <rect x="220" y="70" width="180" height="200" rx="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
      {/* Water Level (1/3 height) */}
      <rect x="222" y="190" width="176" height="78" rx="0" fill="#0284c7" opacity="0.4" />
      <line x1="222" y1="190" x2="398" y2="190" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" />
      <text x="310" y="182" fill="#a7f3d0" fontSize="12" textAnchor="middle">水面高度 Water Line (填充約 1/3)</text>

      {/* Submerged Specimen at bottom */}
      <rect x="270" y="225" width="80" height="30" rx="4" fill="#3b82f6" stroke="#ffffff" strokeWidth="1.5" />
      <text x="310" y="244" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">浸沒受測接頭 Specimen</text>

      {/* Vacuum Line from top of vessel */}
      <line x1="310" y1="70" x2="310" y2="40" stroke="#a855f7" strokeWidth="4" />
      <line x1="310" y1="40" x2="120" y2="40" stroke="#a855f7" strokeWidth="4" />
      <line x1="120" y1="40" x2="120" y2="100" stroke="#a855f7" strokeWidth="4" />

      {/* Vacuum Pump & Gauge */}
      <rect x="70" y="100" width="100" height="60" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="1.5" />
      <text x="120" y="125" fill="#c084fc" fontSize="12" textAnchor="middle" fontWeight="bold">抽真空源</text>
      <text x="120" y="145" fill="#a7f3d0" fontSize="12" textAnchor="middle">80.0~88.0 kPa</text>

      {/* Bubbles visual stream */}
      {showVectors && (
        <g>
          <circle cx="310" cy="210" r="4" fill="#ffffff" opacity="0.9" />
          <circle cx="308" cy="195" r="5" fill="#ffffff" opacity="0.8" />
          <circle cx="312" cy="175" r="6" fill="#ffffff" opacity="0.7" />
          <circle cx="307" cy="150" r="7" fill="#ffffff" opacity="0.6" />
          <text x="420" y="160" fill="#f43f5e" fontSize="12" fontWeight="bold">← 目視氣泡流 (Bubble Stream)</text>
          <text x="420" y="175" fill="#cbd5e1" fontSize="12">20秒初始氣泡停止後持續觀察</text>
        </g>
      )}

      {/* Acceptance Criteria Callout */}
      <rect x="440" y="210" width="210" height="70" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
      <text x="545" y="232" fill="#10b981" fontSize="12" textAnchor="middle" fontWeight="bold">Annex K 合格判定標準</text>
      <text x="545" y="252" fill="#ffffff" fontSize="12" textAnchor="middle">抽吸過程中水容器內</text>
      <text x="545" y="268" fill="#a7f3d0" fontSize="12" textAnchor="middle" fontWeight="bold">無連續產生的氣泡流即 Pass</text>
    </svg>
  );
}

/* =========================================================================
   SVG 5: Resistance to Overriding Torque Test Setup (ISO 80369-20 Annex H)
   ========================================================================= */
function renderOverridingTorqueRig(showDims: boolean, showVectors: boolean, activeCallout: string | null) {
  return (
    <svg viewBox="0 0 680 320" className="w-full max-w-3xl bg-white rounded-xl border border-slate-200 p-2 shadow-2xl">
      <defs>
        <pattern id="gridPattern5" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="680" height="320" fill="url(#gridPattern5)" rx="8" />

      <text x="20" y="25" fill="#f59e0b" fontSize="12" fontFamily="monospace" fontWeight="bold">
        ISO 80369-20 Annex H: Resistance to Overriding Test Rig (0.15 ~ 0.17 N·m)
      </text>

      {/* Motor Driver Base */}
      <rect x="50" y="100" width="120" height="130" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
      <text x="110" y="140" fill="#f59e0b" fontSize="12" textAnchor="middle" fontWeight="bold">伺服扭矩馬達</text>
      <text x="110" y="160" fill="#cbd5e1" fontSize="12" textAnchor="middle">3.0 rpm ± 0.5 rpm</text>

      {/* Rotating Shaft & Torque Sensor */}
      <rect x="170" y="145" width="80" height="40" rx="4" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="210" y="168" fill="#38bdf8" fontSize="12" textAnchor="middle" fontFamily="monospace" fontWeight="bold">扭矩感測器</text>

      {/* Shaft Connection */}
      <line x1="250" y1="165" x2="310" y2="165" stroke="#cbd5e1" strokeWidth="8" />

      {/* Fig.C.3 Metal Fixture (Worst case 2.71mm lug) */}
      <rect x="310" y="130" width="70" height="70" rx="6" fill="#f59e0b" opacity="0.85" stroke="#ffffff" strokeWidth="2" />
      <text x="345" y="160" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">Fig.C.3</text>
      <text x="345" y="176" fill="#fef3c7" fontSize="12" textAnchor="middle">耳翼 2.71 mm</text>

      {/* Plastic Test Connector */}
      <rect x="380" y="140" width="90" height="50" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2" />
      <text x="425" y="168" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">受測公鎖定接頭</text>

      {/* Hoop Stress Expansion Stress Arrows */}
      {showVectors && (
        <g>
          <path d="M 425 125 L 425 105" stroke="#f43f5e" strokeWidth="2" />
          <polygon points="425,100 421,108 429,108" fill="#f43f5e" />
          <path d="M 425 205 L 425 225" stroke="#f43f5e" strokeWidth="2" />
          <polygon points="425,230 421,222 429,222" fill="#f43f5e" />
          <text x="425" y="90" fill="#f43f5e" fontSize="12" textAnchor="middle" fontWeight="bold">環向應力膨脹 (Hoop Stress Expansion)</text>
          <text x="425" y="248" fill="#f43f5e" fontSize="12" textAnchor="middle" fontWeight="bold">跳牙滑脫 (Override Hazard)</text>
        </g>
      )}

      {/* Torque Curve Graph Box */}
      <rect x="490" y="90" width="160" height="160" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1" />
      <text x="570" y="112" fill="#f59e0b" fontSize="12" textAnchor="middle" fontWeight="bold">扭矩-時間曲線 (Torque Curve)</text>
      <path d="M 505 220 L 530 140 L 630 140" fill="none" stroke="#10b981" strokeWidth="2" />
      <path d="M 530 140 L 550 220" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />
      <text x="580" y="132" fill="#10b981" fontSize="12">平穩持壓 (Pass)</text>
      <text x="580" y="185" fill="#f43f5e" fontSize="12">驟降滑牙 (Fail)</text>
      <text x="570" y="240" fill="#94a3b8" fontSize="12" textAnchor="middle">目標扭矩: 0.16 N·m (5~10s)</text>
    </svg>
  );
}

/* =========================================================================
   SVG 6: Resistance to Separation from Axial Load Test Setup (ISO 80369-20 Annex F)
   ========================================================================= */
function renderAxialSeparationRig(showDims: boolean, showVectors: boolean, activeCallout: string | null) {
  return (
    <svg viewBox="0 0 680 320" className="w-full max-w-3xl bg-white rounded-xl border border-slate-200 p-2 shadow-2xl">
      <rect width="680" height="320" fill="#0f172a" rx="8" />
      <text x="20" y="25" fill="#10b981" fontSize="12" fontFamily="monospace" fontWeight="bold">
        ISO 80369-20 Annex F: Resistance to Separation from Axial Load (35 N Tensile Force)
      </text>

      {/* Universal Tensile Testing Frame Columns */}
      <rect x="80" y="50" width="20" height="230" fill="#334155" />
      <rect x="360" y="50" width="20" height="230" fill="#334155" />
      <rect x="60" y="50" width="340" height="20" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1" />

      {/* Load Cell */}
      <rect x="200" y="70" width="60" height="35" rx="4" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
      <text x="230" y="92" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">35 N 荷重計</text>

      {/* Upper Grip with Metal Fixture */}
      <line x1="230" y1="105" x2="230" y2="130" stroke="#cbd5e1" strokeWidth="6" />
      <rect x="190" y="130" width="80" height="40" rx="4" fill="#64748b" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="230" y="154" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">金屬參考夾具</text>

      {/* Lower Specimen */}
      <rect x="200" y="170" width="60" height="50" rx="4" fill="#3b82f6" stroke="#93c5fd" strokeWidth="1.5" />
      <text x="230" y="198" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">受測接頭</text>
      <rect x="180" y="220" width="100" height="30" rx="4" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1" />

      {/* Pull Force Vectors */}
      {showVectors && (
        <g>
          <path d="M 230 115 L 230 75" stroke="#f43f5e" strokeWidth="3" />
          <polygon points="230,70 224,80 236,80" fill="#f43f5e" />
          <text x="260" y="85" fill="#f43f5e" fontSize="12" fontWeight="bold">軸向拉力 F = 35 N (10 N/s)</text>
        </g>
      )}

      {/* Tensile Test Parameter Summary */}
      <rect x="420" y="80" width="230" height="180" rx="12" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
      <text x="535" y="108" fill="#10b981" fontSize="12" textAnchor="middle" fontWeight="bold">軸向分離測試標準參數</text>
      <text x="440" y="138" fill="#cbd5e1" fontSize="12">• 加載速率 Rate: <tspan fill="#ffffff" fontWeight="bold">10 N/s</tspan></text>
      <text x="440" y="162" fill="#cbd5e1" fontSize="12">• 鎖定接頭 Lock: <tspan fill="#a7f3d0" fontWeight="bold">35 N (10~15秒)</tspan></text>
      <text x="440" y="186" fill="#cbd5e1" fontSize="12">• 滑動接頭 Slip: <tspan fill="#38bdf8" fontWeight="bold">25 N (10~15秒)</tspan></text>
      <text x="440" y="210" fill="#cbd5e1" fontSize="12">• 判定基準: <tspan fill="#ffffff" fontWeight="bold">無接頭完全脫離</tspan></text>
    </svg>
  );
}

/* =========================================================================
   SVG 7: Resistance to Separation from Unscrewing Test Setup (ISO 80369-20 Annex G/I)
   ========================================================================= */
function renderUnscrewingTorqueRig(showDims: boolean, showVectors: boolean, activeCallout: string | null) {
  return (
    <svg viewBox="0 0 680 320" className="w-full max-w-3xl bg-white rounded-xl border border-slate-200 p-2 shadow-2xl">
      <rect width="680" height="320" fill="#0f172a" rx="8" />
      <text x="20" y="25" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">
        ISO 80369-20 Annex G &amp; Annex I: Unscrewing &amp; Disconnection Torque Test Setup
      </text>

      {/* Unscrewing Motor Center */}
      <circle cx="200" cy="160" r="70" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
      <circle cx="200" cy="160" r="45" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="200" y="155" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">6% 錐面</text>
      <text x="200" y="172" fill="#38bdf8" fontSize="12" textAnchor="middle">自鎖接觸面</text>

      {/* Counter-clockwise Torque Arrow */}
      {showVectors && (
        <g>
          <path d="M 200 70 A 90 90 0 0 0 110 160" fill="none" stroke="#f43f5e" strokeWidth="4" />
          <polygon points="105,160 115,150 115,170" fill="#f43f5e" />
          <text x="130" y="65" fill="#f43f5e" fontSize="12" fontWeight="bold">反向旋鬆扭矩 0.02 N·m</text>
        </g>
      )}

      {/* Comparison Box Annex G vs Annex I */}
      <rect x="330" y="70" width="320" height="200" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="490" y="98" fill="#38bdf8" fontSize="13" textAnchor="middle" fontWeight="bold">Annex G vs Annex I 雙軌條文對照</text>

      <rect x="345" y="115" width="135" height="135" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
      <text x="412" y="135" fill="#a7f3d0" fontSize="12" textAnchor="middle" fontWeight="bold">Annex G 抗旋鬆</text>
      <text x="355" y="158" fill="#cbd5e1" fontSize="12">• 施加 0.018~0.020 N·m</text>
      <text x="355" y="178" fill="#cbd5e1" fontSize="12">• 保持 10~15 秒</text>
      <text x="355" y="198" fill="#cbd5e1" fontSize="12">• 目的: 防震動意外脫落</text>
      <text x="355" y="228" fill="#a7f3d0" fontSize="12" fontWeight="bold">合格: 無分離</text>

      <rect x="495" y="115" width="140" height="135" rx="8" fill="#0f172a" stroke="#purple-400" strokeWidth="1" />
      <text x="565" y="135" fill="#c084fc" fontSize="12" textAnchor="middle" fontWeight="bold">Annex I 拆卸力</text>
      <text x="505" y="158" fill="#cbd5e1" fontSize="12">• 裝配後靜置 10~15 分</text>
      <text x="505" y="178" fill="#cbd5e1" fontSize="12">• 量測最大峰值扭矩</text>
      <text x="505" y="198" fill="#cbd5e1" fontSize="12">• 目的: 人因工程易拆性</text>
      <text x="505" y="228" fill="#c084fc" fontSize="12" fontWeight="bold">合格: 徒手可順利旋開</text>
    </svg>
  );
}

/* =========================================================================
   SVG 8: Stress Cracking Chemical Exposure Test Setup (ISO 80369-20 Annex E)
   ========================================================================= */
function renderStressCrackingApparatus(showDims: boolean, showVectors: boolean, activeCallout: string | null) {
  return (
    <svg viewBox="0 0 680 320" className="w-full max-w-3xl bg-white rounded-xl border border-slate-200 p-2 shadow-2xl">
      <rect width="680" height="320" fill="#0f172a" rx="8" />
      <text x="20" y="25" fill="#a855f7" fontSize="12" fontFamily="monospace" fontWeight="bold">
        ISO 80369-20 Annex E: Stress Cracking &amp; Chemical Solvent Exposure Test Setup
      </text>

      {/* Assembly Specimen in Chemical Bath */}
      <rect x="60" y="80" width="180" height="180" rx="12" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
      <rect x="62" y="140" width="176" height="118" rx="0" fill="#a855f7" opacity="0.25" />
      <text x="150" y="130" fill="#c084fc" fontSize="12" textAnchor="middle" fontWeight="bold">70% 異丙醇 / 化學試劑</text>
      <text x="150" y="175" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">預裝配組裝件 (0.12 N·m)</text>

      {/* Micro Crack Diagram */}
      <rect x="280" y="80" width="360" height="180" rx="12" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
      <text x="460" y="108" fill="#f43f5e" fontSize="12" textAnchor="middle" fontWeight="bold">塑膠環境應力龜裂 (ESCR) 機制</text>

      {/* Molecular Polymer Chain Visualization */}
      <path d="M 310 140 Q 340 120, 370 140 T 430 140" fill="none" stroke="#38bdf8" strokeWidth="4" />
      <path d="M 310 180 Q 340 200, 370 180 T 430 180" fill="none" stroke="#38bdf8" strokeWidth="4" />

      {/* Crack Line */}
      <line x1="370" y1="120" x2="370" y2="200" stroke="#f43f5e" strokeWidth="3" strokeDasharray="4 2" />
      <text x="370" y="220" fill="#f43f5e" fontSize="12" textAnchor="middle" fontWeight="bold">內應力高 + 酒精誘發龜裂</text>

      <text x="480" y="145" fill="#cbd5e1" fontSize="12">• 靜置時間: <tspan fill="#a7f3d0" fontWeight="bold">≥ 48 小時</tspan></text>
      <text x="480" y="170" fill="#cbd5e1" fontSize="12">• 測試溫度: <tspan fill="#ffffff" fontWeight="bold">20°C ~ 30°C</tspan></text>
      <text x="480" y="195" fill="#cbd5e1" fontSize="12">• 隨後試驗: <tspan fill="#38bdf8" fontWeight="bold">Annex B/C 洩漏測試</tspan></text>
      <text x="480" y="220" fill="#cbd5e1" fontSize="12">• 判定: <tspan fill="#a7f3d0" fontWeight="bold">零裂紋且氣密 Pass</tspan></text>
    </svg>
  );
}

/* =========================================================================
   ISO 80369-7 Fig.B.1: Male Luer Slip Connector (L1) CAD Drawing
   ========================================================================= */
function renderFigB1MaleSlipCad(showDims: boolean, showVectors: boolean, activeCallout: string | null) {
  return (
    <svg viewBox="0 0 700 440" className="w-full max-w-3xl bg-white rounded-xl border border-slate-300 p-4 shadow-xl text-slate-900">
      <defs>
        <pattern id="hatchB1" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#1e293b" strokeWidth="1" />
        </pattern>
        <marker id="arrowB1" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#0f172a" />
        </marker>
      </defs>

      <text x="680" y="25" fill="#475569" fontSize="12" textAnchor="end" fontFamily="sans-serif" fontStyle="italic">
        Dimensions in millimetres unless otherwise indicated
      </text>

      <g transform="translate(40, 50)">
        {/* Male Cone Body */}
        <path d="M 80,60 L 480,95 L 480,118 L 80,100 Z" fill="url(#hatchB1)" stroke="#0f172a" strokeWidth="2" />
        <path d="M 80,260 L 480,225 L 480,202 L 80,220 Z" fill="url(#hatchB1)" stroke="#0f172a" strokeWidth="2" />

        {/* Outer Cone Contour */}
        <line x1="80" y1="100" x2="480" y2="118" stroke="#0f172a" strokeWidth="2" />
        <line x1="80" y1="220" x2="480" y2="202" stroke="#0f172a" strokeWidth="2" />

        {/* Centerline */}
        <line x1="40" y1="160" x2="540" y2="160" stroke="#64748b" strokeWidth="1.2" strokeDasharray="14 3 3 3" />

        {/* Dimensions */}
        <line x1="80" y1="40" x2="80" y2="280" stroke="#0f172a" strokeWidth="0.8" />
        <line x1="480" y1="40" x2="480" y2="280" stroke="#0f172a" strokeWidth="0.8" />

        {/* Length e >= 7.5 mm */}
        <line x1="80" y1="30" x2="480" y2="30" stroke="#0f172a" strokeWidth="1" markerStart="url(#arrowB1)" markerEnd="url(#arrowB1)" />
        <rect x="250" y="20" width="70" height="20" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
        <text x="285" y="34" fill="#0f172a" fontSize="12" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">e ≥ 7,5</text>

        {/* Tip & Base Diameters */}
        <text x="495" y="165" fill="#0f172a" fontSize="13" fontFamily="sans-serif" fontStyle="italic" fontWeight="bold">ØA (Ø3.970~4.072)</text>
        <text x="20" y="165" fill="#0f172a" fontSize="13" textAnchor="end" fontFamily="sans-serif" fontStyle="italic" fontWeight="bold">ØB (Ø4.375~4.477)</text>

        {/* Angle alpha */}
        <path d="M 280,113 A 120,120 0 0 0 280,207" fill="none" stroke="#0f172a" strokeWidth="1" markerStart="url(#arrowB1)" markerEnd="url(#arrowB1)" />
        <text x="260" y="164" fill="#0f172a" fontSize="14" textAnchor="middle" fontFamily="sans-serif" fontStyle="italic" fontWeight="bold">α</text>
      </g>

      <text x="40" y="390" fill="#2563eb" fontSize="12" fontFamily="sans-serif" fontWeight="bold">
        Table B.1 contains the dimensions for this figure.
      </text>
      <text x="350" y="420" fill="#0f172a" fontSize="13" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">
        Fig.B.1 — Male Luer slip connector (L1)
      </text>
    </svg>
  );
}

/* =========================================================================
   ISO 80369-7 Fig.B.2: Female Luer Slip Connector (L1) CAD Drawing
   ========================================================================= */
function renderFigB2FemaleSlipCad(showDims: boolean, showVectors: boolean, activeCallout: string | null) {
  return (
    <svg viewBox="0 0 700 440" className="w-full max-w-3xl bg-white rounded-xl border border-slate-300 p-4 shadow-xl text-slate-900">
      <defs>
        <pattern id="hatchB2" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#1e293b" strokeWidth="1" />
        </pattern>
        <marker id="arrowB2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#0f172a" />
        </marker>
      </defs>

      <text x="680" y="25" fill="#475569" fontSize="12" textAnchor="end" fontFamily="sans-serif" fontStyle="italic">
        Dimensions in millimetres unless otherwise indicated
      </text>

      <g transform="translate(40, 50)">
        {/* Upper Wall Section (Hatched) */}
        <path
          d="M 80,60 L 520,60 L 520,95 Q 518,95 515,98 L 470,105 L 80,118 Z"
          fill="url(#hatchB2)"
          stroke="#0f172a"
          strokeWidth="2"
        />

        {/* Lower Wall Section (Hatched) */}
        <path
          d="M 80,260 L 520,260 L 520,225 Q 518,225 515,222 L 470,215 L 80,202 Z"
          fill="url(#hatchB2)"
          stroke="#0f172a"
          strokeWidth="2"
        />

        {/* Outer Wall Boundaries */}
        <line x1="80" y1="60" x2="520" y2="60" stroke="#0f172a" strokeWidth="2" />
        <line x1="80" y1="260" x2="520" y2="260" stroke="#0f172a" strokeWidth="2" />

        {/* Break Line on Left */}
        <path d="M 80,60 Q 70,110 85,160 Q 70,210 80,260" fill="none" stroke="#0f172a" strokeWidth="1.5" />

        {/* Inner Taper Cone Lines */}
        <line x1="80" y1="118" x2="470" y2="105" stroke="#0f172a" strokeWidth="2" />
        <line x1="80" y1="202" x2="470" y2="215" stroke="#0f172a" strokeWidth="2" />

        {/* Entry Chamfer/Lead-in */}
        <path d="M 470,105 L 515,98 Q 518,95 520,95" fill="none" stroke="#0f172a" strokeWidth="2" />
        <path d="M 470,215 L 515,222 Q 518,225 520,225" fill="none" stroke="#0f172a" strokeWidth="2" />

        {/* Centerline (dash-dot) */}
        <line x1="40" y1="160" x2="560" y2="160" stroke="#64748b" strokeWidth="1.2" strokeDasharray="14 3 3 3" />

        {/* Vertical Reference Extension Lines */}
        <line x1="80" y1="50" x2="80" y2="295" stroke="#0f172a" strokeWidth="0.8" />
        <line x1="125" y1="20" x2="125" y2="120" stroke="#0f172a" strokeWidth="0.8" strokeDasharray="4 2" />
        <line x1="470" y1="20" x2="470" y2="105" stroke="#0f172a" strokeWidth="0.8" strokeDasharray="4 2" />
        <line x1="520" y1="20" x2="520" y2="295" stroke="#0f172a" strokeWidth="0.8" />

        {/* Top Dimensions */}
        {/* 7,5 Boxed Dimension */}
        <line x1="125" y1="30" x2="520" y2="30" stroke="#0f172a" strokeWidth="1" markerStart="url(#arrowB2)" markerEnd="url(#arrowB2)" />
        <rect x="300" y="20" width="40" height="20" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
        <text x="320" y="34" fill="#0f172a" fontSize="12" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">7,5</text>

        {/* 0,75 Boxed Dimension */}
        <line x1="470" y1="50" x2="520" y2="50" stroke="#0f172a" strokeWidth="1" markerStart="url(#arrowB2)" markerEnd="url(#arrowB2)" />
        <rect x="478" y="40" width="34" height="18" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
        <text x="495" y="53" fill="#0f172a" fontSize="12" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">0,75</text>

        {/* Diameter Dimensions */}
        {/* ØG at Base */}
        <line x1="80" y1="118" x2="15" y2="85" stroke="#0f172a" strokeWidth="1" />
        <line x1="80" y1="202" x2="15" y2="235" stroke="#0f172a" strokeWidth="1" />
        <line x1="18" y1="88" x2="18" y2="232" stroke="#0f172a" strokeWidth="1" markerStart="url(#arrowB2)" markerEnd="url(#arrowB2)" />
        <text x="10" y="165" fill="#0f172a" fontSize="13" textAnchor="end" fontFamily="sans-serif" fontStyle="italic" fontWeight="bold">ØG</text>

        {/* ØD at Entry */}
        <line x1="470" y1="105" x2="590" y2="60" stroke="#0f172a" strokeWidth="1" />
        <line x1="470" y1="215" x2="590" y2="260" stroke="#0f172a" strokeWidth="1" />
        <line x1="585" y1="63" x2="585" y2="257" stroke="#0f172a" strokeWidth="1" markerStart="url(#arrowB2)" markerEnd="url(#arrowB2)" />
        <text x="600" y="165" fill="#0f172a" fontSize="13" textAnchor="start" fontFamily="sans-serif" fontStyle="italic" fontWeight="bold">ØD</text>

        {/* ØJ Outer Diameter */}
        <line x1="520" y1="60" x2="650" y2="60" stroke="#0f172a" strokeWidth="1" />
        <line x1="520" y1="260" x2="650" y2="260" stroke="#0f172a" strokeWidth="1" />
        <line x1="645" y1="60" x2="645" y2="260" stroke="#0f172a" strokeWidth="1" markerStart="url(#arrowB2)" markerEnd="url(#arrowB2)" />
        <text x="660" y="165" fill="#0f172a" fontSize="13" textAnchor="start" fontFamily="sans-serif" fontStyle="italic" fontWeight="bold">ØJ</text>

        {/* Taper Angle α Arc */}
        <path d="M 280,113 A 120,120 0 0 0 280,207" fill="none" stroke="#0f172a" strokeWidth="1" markerStart="url(#arrowB2)" markerEnd="url(#arrowB2)" />
        <text x="260" y="164" fill="#0f172a" fontSize="14" textAnchor="middle" fontFamily="sans-serif" fontStyle="italic" fontWeight="bold">α</text>

        {/* Radius R */}
        <line x1="518" y1="223" x2="550" y2="245" stroke="#0f172a" strokeWidth="1" markerStart="url(#arrowB2)" />
        <text x="560" y="252" fill="#0f172a" fontSize="13" fontFamily="sans-serif" fontStyle="italic" fontWeight="bold">R</text>

        {/* Bottom Total Length E */}
        <line x1="80" y1="285" x2="520" y2="285" stroke="#0f172a" strokeWidth="1" markerStart="url(#arrowB2)" markerEnd="url(#arrowB2)" />
        <text x="300" y="280" fill="#0f172a" fontSize="13" textAnchor="middle" fontFamily="sans-serif" fontStyle="italic" fontWeight="bold">E</text>
      </g>

      {/* Bottom Text Footer */}
      <text x="40" y="390" fill="#2563eb" fontSize="12" fontFamily="sans-serif" fontWeight="bold">
        Table B.2 contains the dimensions for this figure.
      </text>
      <text x="350" y="420" fill="#0f172a" fontSize="13" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">
        Fig.B.2 — Female Luer slip connector (L1)
      </text>
    </svg>
  );
}

/* =========================================================================
   ISO 80369-7 Fig.B.3: Male Luer Lock Connector with Rigid Thread Collar
   ========================================================================= */
function renderFigB3MaleLockCad(showDims: boolean, showVectors: boolean, activeCallout: string | null) {
  return (
    <svg viewBox="0 0 700 440" className="w-full max-w-3xl bg-white rounded-xl border border-slate-300 p-4 shadow-xl text-slate-900">
      <defs>
        <pattern id="hatchB3" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#1e293b" strokeWidth="1" />
        </pattern>
        <marker id="arrowB3" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#0f172a" />
        </marker>
      </defs>

      <text x="680" y="25" fill="#475569" fontSize="12" textAnchor="end" fontFamily="sans-serif" fontStyle="italic">
        Dimensions in millimetres unless otherwise indicated
      </text>

      <g transform="translate(40, 50)">
        {/* Rigid Collar & Inner Taper */}
        <rect x="80" y="50" width="400" height="220" rx="4" fill="none" stroke="#0f172a" strokeWidth="2" />

        {/* Threads on collar interior */}
        <path d="M 120,50 L 140,80 L 160,50 M 220,50 L 240,80 L 260,50" fill="url(#hatchB3)" stroke="#0f172a" strokeWidth="1.5" />
        <path d="M 120,270 L 140,240 L 160,270 M 220,270 L 240,240 L 260,270" fill="url(#hatchB3)" stroke="#0f172a" strokeWidth="1.5" />

        {/* Centerline */}
        <line x1="40" y1="160" x2="520" y2="160" stroke="#64748b" strokeWidth="1.2" strokeDasharray="14 3 3 3" />

        {/* Thread Pitch Callout Pitch = 2.5 mm */}
        <line x1="140" y1="35" x2="240" y2="35" stroke="#0f172a" strokeWidth="1" markerStart="url(#arrowB3)" markerEnd="url(#arrowB3)" />
        <text x="190" y="30" fill="#0f172a" fontSize="12" textAnchor="middle" fontWeight="bold">Pitch = 2,5</text>

        {/* Projection c >= 2.1 mm */}
        <text x="350" y="140" fill="#2563eb" fontSize="12" textAnchor="middle" fontWeight="bold">c ≥ 2,1 mm (Projection)</text>
        <text x="350" y="180" fill="#2563eb" fontSize="12" textAnchor="middle" fontWeight="bold">t ≤ 3,2 mm (1st Thread)</text>
      </g>

      <text x="40" y="390" fill="#2563eb" fontSize="12" fontFamily="sans-serif" fontWeight="bold">
        Table B.3 contains the dimensions for this figure.
      </text>
      <text x="350" y="420" fill="#0f172a" fontSize="13" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">
        Fig.B.3 — Male Luer lock connector with rigid thread collar
      </text>
    </svg>
  );
}

/* =========================================================================
   ISO 80369-7 Fig.B.4: Female Luer Lock Connector with Rigid Lugs
   ========================================================================= */
function renderFigB4FemaleLockCad(showDims: boolean, showVectors: boolean, activeCallout: string | null) {
  return (
    <svg viewBox="0 0 700 440" className="w-full max-w-3xl bg-white rounded-xl border border-slate-300 p-4 shadow-xl text-slate-900">
      <defs>
        <pattern id="hatchB4" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#1e293b" strokeWidth="1" />
        </pattern>
        <marker id="arrowB4" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#0f172a" />
        </marker>
      </defs>

      <text x="680" y="25" fill="#475569" fontSize="12" textAnchor="end" fontFamily="sans-serif" fontStyle="italic">
        Dimensions in millimetres unless otherwise indicated
      </text>

      <g transform="translate(40, 50)">
        {/* Body with top/bottom Lugs */}
        <rect x="100" y="80" width="360" height="160" fill="none" stroke="#0f172a" strokeWidth="2" />

        {/* Top Lug */}
        <polygon points="400,80 460,80 440,30 380,30" fill="url(#hatchB4)" stroke="#0f172a" strokeWidth="2" />
        {/* Bottom Lug */}
        <polygon points="400,240 460,240 440,290 380,290" fill="url(#hatchB4)" stroke="#0f172a" strokeWidth="2" />

        {/* Centerline */}
        <line x1="40" y1="160" x2="520" y2="160" stroke="#64748b" strokeWidth="1.2" strokeDasharray="14 3 3 3" />

        {/* Lug width 3.50 mm */}
        <line x1="380" y1="20" x2="440" y2="20" stroke="#0f172a" strokeWidth="1" markerStart="url(#arrowB4)" markerEnd="url(#arrowB4)" />
        <text x="410" y="15" fill="#0f172a" fontSize="12" textAnchor="middle" fontWeight="bold">3,50 mm</text>

        {/* Back flank angle 25 deg */}
        <text x="460" y="55" fill="#2563eb" fontSize="12" fontWeight="bold">25° Flank Angle</text>
      </g>

      <text x="40" y="390" fill="#2563eb" fontSize="12" fontFamily="sans-serif" fontWeight="bold">
        Table B.4 contains the dimensions for this figure.
      </text>
      <text x="350" y="420" fill="#0f172a" fontSize="13" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">
        Fig.B.4 — Female Luer lock connector with rigid lugs
      </text>
    </svg>
  );
}

/* =========================================================================
   ISO 80369-7 Fig.B.5: Male Luer Lock Connector with Floating Ring
   ========================================================================= */
function renderFigB5MaleLockFloatingCad(showDims: boolean, showVectors: boolean, activeCallout: string | null) {
  return (
    <svg viewBox="0 0 700 440" className="w-full max-w-3xl bg-white rounded-xl border border-slate-300 p-4 shadow-xl text-slate-900">
      <defs>
        <pattern id="hatchB5" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#1e293b" strokeWidth="1" />
        </pattern>
      </defs>

      <g transform="translate(40, 50)">
        <rect x="100" y="70" width="360" height="180" fill="none" stroke="#0f172a" strokeWidth="2" />
        {/* Floating Ring Gap */}
        <rect x="220" y="50" width="140" height="220" fill="url(#hatchB5)" stroke="#2563eb" strokeWidth="2" strokeDasharray="6 3" />
        <line x1="40" y1="160" x2="520" y2="160" stroke="#64748b" strokeWidth="1.2" strokeDasharray="14 3 3 3" />

        <text x="290" y="165" fill="#0f172a" fontSize="13" textAnchor="middle" fontWeight="bold">
          360° Free Floating Rotating Collar (旋轉套環)
        </text>
      </g>

      <text x="350" y="420" fill="#0f172a" fontSize="13" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">
        Fig.B.5 — Male Luer lock connector with floating ring
      </text>
    </svg>
  );
}

/* =========================================================================
   ISO 80369-7 Fig.B.6: Female Luer Lock Dimensional Envelope
   ========================================================================= */
function renderFigB6FemaleEnvelopeCad(showDims: boolean, showVectors: boolean, activeCallout: string | null) {
  return (
    <svg viewBox="0 0 700 440" className="w-full max-w-3xl bg-white rounded-xl border border-slate-300 p-4 shadow-xl text-slate-900">
      <g transform="translate(150, 60)">
        {/* Outer Cylinder Envelope Circle */}
        <circle cx="200" cy="150" r="120" fill="#f1f5f9" stroke="#2563eb" strokeWidth="2" strokeDasharray="6 4" />
        <circle cx="200" cy="150" r="75" fill="#e2e8f0" stroke="#0f172a" strokeWidth="2" />

        <text x="200" y="155" fill="#0f172a" fontSize="14" textAnchor="middle" fontWeight="bold">
          Envelope Limit Ø7,80 mm Max
        </text>
      </g>

      <text x="350" y="420" fill="#0f172a" fontSize="13" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">
        Fig.B.6 — Female Luer lock connector dimensional envelope
      </text>
    </svg>
  );
}

/* =========================================================================
   ISO 80369-7 Annex C Reference Gauge Figures (C.1 ~ C.6 & SML)
   ========================================================================= */
function renderFigC1FemaleRefNominalCad(showDims: boolean, showVectors: boolean, activeCallout: string | null) {
  return (
    <svg viewBox="0 0 700 440" className="w-full max-w-3xl bg-white rounded-xl border border-slate-200 p-4 shadow-xl text-slate-900">
      <g transform="translate(40, 50)">
        <rect x="80" y="60" width="400" height="200" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
        <text x="280" y="140" fill="#38bdf8" fontSize="16" textAnchor="middle" fontWeight="bold">ISO 80369-7 Fig.C.1</text>
        <text x="280" y="170" fill="#cbd5e1" fontSize="13" textAnchor="middle">Female Reference Luer Lock Connector (Nominal)</text>
        <text x="280" y="200" fill="#a7f3d0" fontSize="12" textAnchor="middle">Lug Width = 3.50 mm | Flank Angle = 25°</text>
      </g>
      <text x="350" y="420" fill="#38bdf8" fontSize="13" textAnchor="middle" fontWeight="bold">
        Fig.C.1 — Female reference Luer lock connector (3.50mm Nominal)
      </text>
    </svg>
  );
}

function renderFigC2MaleSlipRefCad(showDims: boolean, showVectors: boolean, activeCallout: string | null) {
  return (
    <svg viewBox="0 0 700 440" className="w-full max-w-3xl bg-white rounded-xl border border-slate-200 p-4 shadow-xl text-slate-900">
      <g transform="translate(40, 50)">
        <polygon points="100,100 420,80 420,240 100,220" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
        <text x="260" y="150" fill="#38bdf8" fontSize="16" textAnchor="middle" fontWeight="bold">ISO 80369-7 Fig.C.2</text>
        <text x="260" y="180" fill="#cbd5e1" fontSize="13" textAnchor="middle">Male Reference Luer Slip Connector</text>
      </g>
      <text x="350" y="420" fill="#38bdf8" fontSize="13" textAnchor="middle" fontWeight="bold">
        Fig.C.2 — Male reference Luer slip connector
      </text>
    </svg>
  );
}

function renderFigC3FemaleRefWorstCaseCad(showDims: boolean, showVectors: boolean, activeCallout: string | null) {
  return (
    <svg viewBox="0 0 700 440" className="w-full max-w-3xl bg-white rounded-xl border border-rose-200 p-4 shadow-xl text-slate-900">
      <g transform="translate(40, 50)">
        <rect x="80" y="60" width="400" height="200" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2.5" />
        <text x="280" y="130" fill="#f43f5e" fontSize="16" textAnchor="middle" fontWeight="bold">ISO 80369-7 Fig.C.3 (WORST-CASE)</text>
        <text x="280" y="160" fill="#fca5a5" fontSize="13" textAnchor="middle">Narrowed Lug Width = 2.71 mm (縮窄 22%)</text>
        <text x="280" y="190" fill="#fca5a5" fontSize="13" textAnchor="middle">Steeper Flank Angle = 30° (外撐力加大)</text>
        <text x="280" y="220" fill="#ffffff" fontSize="12" textAnchor="middle">專用於 6.4 拉拔與 6.6 抗滑牙/過旋破壞測試</text>
      </g>
      <text x="350" y="420" fill="#f43f5e" fontSize="13" textAnchor="middle" fontWeight="bold">
        Fig.C.3 — Female reference Luer lock connector (2.71mm Worst-Case)
      </text>
    </svg>
  );
}

function renderFigC4MaleLockRefNominalCad(showDims: boolean, showVectors: boolean, activeCallout: string | null) {
  return (
    <svg viewBox="0 0 700 440" className="w-full max-w-3xl bg-white rounded-xl border border-slate-200 p-4 shadow-xl text-slate-900">
      <g transform="translate(40, 50)">
        <rect x="80" y="60" width="400" height="200" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
        <text x="280" y="140" fill="#f59e0b" fontSize="16" textAnchor="middle" fontWeight="bold">ISO 80369-7 Fig.C.4</text>
        <text x="280" y="170" fill="#cbd5e1" fontSize="13" textAnchor="middle">Male Reference Luer Lock Connector (Nominal)</text>
      </g>
      <text x="350" y="420" fill="#f59e0b" fontSize="13" textAnchor="middle" fontWeight="bold">
        Fig.C.4 — Male reference Luer lock connector (Nominal)
      </text>
    </svg>
  );
}

function renderFigC5FemaleSlipRefCad(showDims: boolean, showVectors: boolean, activeCallout: string | null) {
  return (
    <svg viewBox="0 0 700 440" className="w-full max-w-3xl bg-white rounded-xl border border-slate-200 p-4 shadow-xl text-slate-900">
      <g transform="translate(40, 50)">
        <rect x="80" y="60" width="400" height="200" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
        <text x="280" y="150" fill="#38bdf8" fontSize="16" textAnchor="middle" fontWeight="bold">ISO 80369-7 Fig.C.5</text>
        <text x="280" y="180" fill="#cbd5e1" fontSize="13" textAnchor="middle">Female Reference Luer Slip Connector</text>
      </g>
      <text x="350" y="420" fill="#38bdf8" fontSize="13" textAnchor="middle" fontWeight="bold">
        Fig.C.5 — Female reference Luer slip connector
      </text>
    </svg>
  );
}

function renderFigC6MaleLockRefWorstCaseCad(showDims: boolean, showVectors: boolean, activeCallout: string | null) {
  return (
    <svg viewBox="0 0 700 440" className="w-full max-w-3xl bg-white rounded-xl border border-rose-200 p-4 shadow-xl text-slate-900">
      <g transform="translate(40, 50)">
        <rect x="80" y="60" width="400" height="200" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2.5" />
        <text x="280" y="140" fill="#f43f5e" fontSize="16" textAnchor="middle" fontWeight="bold">ISO 80369-7 Fig.C.6 (WORST-CASE)</text>
        <text x="280" y="170" fill="#fca5a5" fontSize="13" textAnchor="middle">Male Reference Luer Lock Connector (Worst-Case)</text>
      </g>
      <text x="350" y="420" fill="#f43f5e" fontSize="13" textAnchor="middle" fontWeight="bold">
        Fig.C.6 — Male reference Luer lock connector (Worst-Case)
      </text>
    </svg>
  );
}

function renderFigSmlCad(showDims: boolean, showVectors: boolean, activeCallout: string | null) {
  return (
    <svg viewBox="0 0 700 440" className="w-full max-w-3xl bg-white rounded-xl border border-amber-200 p-4 shadow-xl text-slate-900">
      <g transform="translate(40, 50)">
        <rect x="80" y="60" width="400" height="200" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
        <text x="280" y="130" fill="#f59e0b" fontSize="16" textAnchor="middle" fontWeight="bold">Commercial SML Full-Thread Connector</text>
        <text x="280" y="170" fill="#fca5a5" fontSize="12" textAnchor="middle">⚠️ 非 ISO 80369-7 認可參考夾具</text>
        <text x="280" y="200" fill="#cbd5e1" fontSize="12" textAnchor="middle">360° 全螺紋分散應力，無法代表法規最壞情況審查</text>
      </g>
      <text x="350" y="420" fill="#f59e0b" fontSize="13" textAnchor="middle" fontWeight="bold">
        Commercial SML Connector (Non-ISO Standard)
      </text>
    </svg>
  );
}

/* =========================================================================
   SVG 11: Standard Pre-assembly Assembly Procedure Rig (ISO 80369-20 General Procedure)
   ========================================================================= */
function renderPreAssemblyRig(showDims: boolean, showVectors: boolean, activeCallout: string | null) {
  return (
    <svg viewBox="0 0 680 320" className="w-full max-w-3xl bg-white rounded-xl border border-slate-200 p-2 shadow-2xl">
      <rect width="680" height="320" fill="#0f172a" rx="8" />
      <text x="20" y="25" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">
        ISO 80369-20 General Test Procedure: Standard Pre-assembly Rig (0.08~0.12 N·m + 27.5 N)
      </text>

      {/* Torque Driver */}
      <rect x="60" y="100" width="120" height="90" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
      <text x="120" y="135" fill="#38bdf8" fontSize="12" textAnchor="middle" fontWeight="bold">定扭矩起子 Driver</text>
      <text x="120" y="155" fill="#a7f3d0" fontSize="12" textAnchor="middle" fontWeight="bold">0.08 ~ 0.12 N·m</text>

      {/* Axial Force Spring */}
      <line x1="180" y1="145" x2="300" y2="145" stroke="#cbd5e1" strokeWidth="6" />
      <path d="M 200 130 L 210 160 L 220 130 L 230 160 L 240 130 L 250 160" fill="none" stroke="#f59e0b" strokeWidth="3" />
      <text x="230" y="115" fill="#f59e0b" fontSize="12" textAnchor="middle" fontWeight="bold">推力彈簧 Axial Push: 26.5 ~ 27.5 N</text>

      {/* Connector Fixture Interface */}
      <rect x="300" y="120" width="60" height="50" rx="4" fill="#64748b" stroke="#ffffff" strokeWidth="1.5" />
      <rect x="360" y="128" width="70" height="34" rx="4" fill="#3b82f6" stroke="#93c5fd" strokeWidth="1.5" />

      {/* Hold Time Clock */}
      <rect x="470" y="90" width="170" height="130" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="555" y="118" fill="#38bdf8" fontSize="12" textAnchor="middle" fontWeight="bold">預裝配保持時間</text>
      <text x="555" y="150" fill="#a7f3d0" fontSize="24" fontFamily="monospace" textAnchor="middle" fontWeight="bold">5 ~ 6 秒</text>
      <text x="555" y="180" fill="#cbd5e1" fontSize="12" textAnchor="middle">確保靜態接觸應力達到平衡</text>
      <text x="555" y="198" fill="#cbd5e1" fontSize="12" textAnchor="middle">所有 6.1~6.5 測試前之標準步驟</text>
    </svg>
  );
}

/* =========================================================================
   SVG 12: Non-Interchangeability & Lug Corner Interference (ISO 80369-7 Annex A)
   ========================================================================= */
function renderNonInterchangeabilityMatrix(showDims: boolean, showVectors: boolean, activeCallout: string | null) {
  return (
    <svg viewBox="0 0 680 320" className="w-full max-w-3xl bg-white rounded-xl border border-slate-200 p-2 shadow-2xl">
      <rect width="680" height="320" fill="#0f172a" rx="8" />
      <text x="20" y="25" fill="#f43f5e" fontSize="12" fontFamily="monospace" fontWeight="bold">
        ISO 80369 Small-Bore Connectors Non-Interchangeability Family Architecture
      </text>

      {/* Family Cards Grid */}
      <g transform="translate(30, 60)">
        {/* ISO 80369-7 Luer */}
        <rect x="0" y="0" width="130" height="180" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
        <text x="65" y="30" fill="#38bdf8" fontSize="12" textAnchor="middle" fontWeight="bold">ISO 80369-7</text>

        <text x="65" y="50" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">血管/皮下注射</text>
        <text x="65" y="70" fill="#cbd5e1" fontSize="12" textAnchor="middle">Intravascular / SubQ</text>

        <rect x="15" y="90" width="100" height="40" rx="4" fill="#0284c7" />
        <text x="65" y="115" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">6% Luer 圓錐</text>
        <text x="65" y="155" fill="#a7f3d0" fontSize="12" textAnchor="middle">關鍵幾何界限</text>
      </g>

      <g transform="translate(180, 60)">
        {/* ISO 80369-3 Enteral */}
        <rect x="0" y="0" width="130" height="180" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
        <text x="65" y="30" fill="#f59e0b" fontSize="12" textAnchor="middle" fontWeight="bold">ISO 80369-3</text>
        <text x="65" y="50" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">腸道餵食 (ENFit)</text>
        <text x="65" y="70" fill="#cbd5e1" fontSize="12" textAnchor="middle">Enteral Applications</text>
        <rect x="15" y="90" width="100" height="40" rx="4" fill="#d97706" />
        <text x="65" y="115" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">反向幾何構造</text>
        <text x="65" y="155" fill="#fef3c7" fontSize="12" textAnchor="middle">阻絕與 Luer 誤插</text>
      </g>

      <g transform="translate(330, 60)">
        {/* ISO 80369-6 Neuraxial */}
        <rect x="0" y="0" width="130" height="180" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
        <text x="65" y="30" fill="#a855f7" fontSize="12" textAnchor="middle" fontWeight="bold">ISO 80369-6</text>
        <text x="65" y="50" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">神經軸麻醉 (NRFit)</text>
        <text x="65" y="70" fill="#cbd5e1" fontSize="12" textAnchor="middle">Neuraxial Applications</text>
        <rect x="15" y="90" width="100" height="40" rx="4" fill="#7e22ce" />
        <text x="65" y="115" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">20% 大錐度</text>
        <text x="65" y="155" fill="#c084fc" fontSize="12" textAnchor="middle">物理維度互斥</text>
      </g>

      <g transform="translate(480, 60)">
        {/* ISO 80369-2 Respiratory */}
        <rect x="0" y="0" width="160" height="180" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
        <text x="80" y="30" fill="#10b981" fontSize="12" textAnchor="middle" fontWeight="bold">ISO 80369-2</text>
        <text x="80" y="50" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">呼吸與氣體驅動</text>
        <text x="80" y="70" fill="#cbd5e1" fontSize="12" textAnchor="middle">Respiratory / Gas Driven</text>
        <rect x="15" y="90" width="130" height="40" rx="4" fill="#059669" />
        <text x="80" y="115" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">特定鎖扣結構</text>
        <text x="80" y="155" fill="#a7f3d0" fontSize="12" textAnchor="middle">防止誤接氧化氣體</text>
      </g>

      {/* Safety Red Line across bottom */}
      <rect x="30" y="260" width="610" height="40" rx="8" fill="#881337" stroke="#f43f5e" strokeWidth="1.5" />
      <text x="335" y="285" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">
        🚨 法規防呆目標：確保不同醫療用途之小口徑連接器 100% 物理無法相互旋合插入，防止致死錯接事故
      </text>
    </svg>
  );
}

/* =========================================================================
   SVG 13: Pressure Decay Curve (4 Stages)
   ========================================================================= */
function renderPressureDecayCurve(showDims: boolean, showVectors: boolean, activeCallout: string | null) {
  return (
    <svg viewBox="0 0 850 500" className="w-full max-w-5xl bg-[#f8f9fa] rounded-xl border border-slate-200 shadow-sm text-slate-900">
      {/* Background areas */}
      <rect x="100" y="100" width="150" height="300" fill="#f1f5f9" /> {/* Fill */}
      <rect x="250" y="100" width="130" height="300" fill="#f8fafc" /> {/* Stabilize */}
      <rect x="380" y="100" width="260" height="300" fill="#dcfce7" opacity="0.5" /> {/* Test Time */}
      <rect x="640" y="100" width="140" height="300" fill="#f3e8ff" opacity="0.4" /> {/* Exhaust */}

      {/* Target Pressure Window (Green shaded region) */}
      <rect x="380" y="154" width="260" height="66" fill="#10b981" opacity="0.2" />
      {/* Horizontal Dashed Lines */}
      <line x1="380" y1="154" x2="700" y2="154" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="380" y1="220" x2="700" y2="220" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 4" />
      
      {/* Grid Lines Y */}
      {[0, 50, 100, 150, 200, 250, 300, 350, 400].map((val, i) => (
        <g key={i}>
          <text x="80" y={400 - val * 0.71 + 5} fill="#475569" fontSize="14" textAnchor="end">{val}</text>
        </g>
      ))}

      {/* Grid Lines X (Vertical separators) */}
      <line x1="250" y1="100" x2="250" y2="410" stroke="#0f172a" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="380" y1="100" x2="380" y2="410" stroke="#0f172a" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="640" y1="100" x2="640" y2="410" stroke="#0f172a" strokeWidth="1.5" strokeDasharray="4 4" />
      
      {/* X Axis Labels */}
      <g transform="translate(0, 420)">
        <text x="250" y="15" fill="#ef4444" fontSize="16" fontWeight="bold" textAnchor="middle">5s</text>
        <text x="380" y="15" fill="#ef4444" fontSize="16" fontWeight="bold" textAnchor="middle">15s</text>
        <text x="640" y="15" fill="#ef4444" fontSize="16" fontWeight="bold" textAnchor="middle">35s</text>
      </g>

      {/* Axes */}
      <line x1="100" y1="100" x2="100" y2="400" stroke="#0f172a" strokeWidth="2" />
      <line x1="100" y1="400" x2="780" y2="400" stroke="#0f172a" strokeWidth="2" />
      
      {/* Axis Labels */}
      <text x="40" y="250" fill="#0f172a" fontSize="18" textAnchor="middle" transform="rotate(-90, 40, 250)">壓力 (Pressure)</text>
      <text x="440" y="460" fill="#0f172a" fontSize="18" textAnchor="middle">時間 (Time)</text>

      {/* The Main Curve */}
      {/* 345 pressure = 400 - 345*0.71 = 155.05 -> 154 */}
      {/* 280 pressure = 400 - 280*0.71 = 201.2 -> 200 */}
      <path d="M 100 400 Q 150 154 250 154 L 380 154 Q 500 180 640 200 Q 660 200 680 400 L 780 400" fill="none" stroke="#1d4ed8" strokeWidth="4" />

      {/* Title */}
      <text x="425" y="50" fill="#0f172a" fontSize="26" fontWeight="bold" textAnchor="middle">標題："儀器如何執行標準？解構壓力衰減測試的四個階段"</text>

      {/* Test Time Arrow */}
      <line x1="385" y1="120" x2="635" y2="120" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow)" markerStart="url(#arrow)" />
      <text x="510" y="110" fill="#334155" fontSize="14" textAnchor="middle">Test Time</text>

      {/* Target Pressure Window Label */}
      <text x="710" y="170" fill="#ef4444" fontSize="14" fontWeight="bold">Target Pressure</text>
      <text x="710" y="190" fill="#ef4444" fontSize="14" fontWeight="bold">Window</text>
      <line x1="695" y1="156" x2="695" y2="218" stroke="#ef4444" strokeWidth="1.5" markerStart="url(#arrow-red-start)" markerEnd="url(#arrow-red)" />

      {/* Curve Callouts */}
      <text x="225" y="135" fill="#ef4444" fontSize="16" fontWeight="bold" textAnchor="end">FPR</text>
      <line x1="230" y1="138" x2="245" y2="150" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrow-red)" />
      
      {/* Pt 線段的指向 */}
      <text x="665" y="135" fill="#ef4444" fontSize="16" fontWeight="bold">Pt</text>
      <line x1="660" y1="138" x2="640" y2="154" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrow-red)" />
      {/* Horizontal line extending left from curve at 35s */}
      <line x1="380" y1="200" x2="640" y2="200" stroke="#ef4444" strokeWidth="1.0" strokeDasharray="4 4" />

      {/* PL (Pressure Drop) Marker */}
      <line x1="430" y1="158" x2="430" y2="196" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrow-red)" markerStart="url(#arrow-red-start)" />
      <text x="440" y="182" fill="#ef4444" fontSize="16" fontWeight="bold">PL</text>

      {/* Info Boxes */}
      {/* Box 1: Fill */}
      <g transform="translate(110, 275)">
        <rect x="0" y="0" width="160" height="120" rx="8" fill="transparent" stroke="#94a3b8" strokeWidth="1" />
        <text x="10" y="20" fill="#0f172a" fontSize="14" fontWeight="bold">1. 充氣 (Fill)</text>
        <foreignObject x="10" y="28" width="140" height="90">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ fontSize: '11px', color: '#0f172a', lineHeight: 1.3 }}>
            <span style={{ fontWeight: 'bold' }}>儀器動作:</span> 儀器快速向待測件充氣，使其壓力達到目標壓力設定值。<br/>
            <span style={{ fontWeight: 'bold' }}>對應ISO:</span> 對應ISO 80369-20 Annex B.4 c)「施加壓力」。
          </div>
        </foreignObject>
        {/* Arrow pointing to curve */}
        <line x1="80" y1="0" x2="70" y2="-25" stroke="#64748b" strokeWidth="1" markerEnd="url(#arrow-gray)" />
      </g>

      {/* Box 2: Stabilize */}
      <g transform="translate(275, 210)">
        <rect x="0" y="0" width="160" height="185" rx="8" fill="transparent" stroke="#94a3b8" strokeWidth="1" />
        <text x="10" y="20" fill="#0f172a" fontSize="14" fontWeight="bold">2. 穩定 (Stabilize)</text>
        <foreignObject x="10" y="28" width="140" height="155">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ fontSize: '11px', color: '#0f172a', lineHeight: 1.3 }}>
            <span style={{ fontWeight: 'bold' }}>儀器動作:</span> 儀器隔離氣源，讓待測件內的壓力因溫度變化、材料變形（蠕變）等物理效應而逐漸穩定。此階段對測試的重複性至關重要。<br/>
            <span style={{ fontWeight: 'bold' }}>對應ISO:</span> 雖然ISO標準未明確分出此階段，但這是獲得可信壓力讀數的必要物理過程，是高精度測試的體現。
          </div>
        </foreignObject>
        <line x1="50" y1="0" x2="50" y2="-56" stroke="#64748b" strokeWidth="1" markerEnd="url(#arrow-gray)" />
      </g>

      {/* Box 3: Test */}
      <g transform="translate(440, 220)">
        <rect x="0" y="0" width="210" height="175" rx="8" fill="transparent" stroke="#94a3b8" strokeWidth="1" />
        <text x="10" y="20" fill="#0f172a" fontSize="14" fontWeight="bold">3. 測試 (Test)</text>
        <foreignObject x="10" y="28" width="190" height="145">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ fontSize: '11px', color: '#0f172a', lineHeight: 1.3 }}>
            <span style={{ fontWeight: 'bold' }}>儀器動作:</span> 在一個精確計時的區間內，儀器測量待測件內的壓力變化（ΔP）。這個壓力降完全由洩漏造成。<br/>
            <span style={{ fontWeight: 'bold' }}>對應ISO:</span> 精確對應ISO 80369-20 Annex B.4 d) 和 e) 的「記錄起始壓力」、「保持測試時間」、「記錄結束壓力」。<br/>
            <span style={{ fontWeight: 'bold' }}>判定基準:</span> 壓力衰減量透過換算須滿足洩漏率 ≤ 0.005 Pa·m³/s 的要求。
          </div>
        </foreignObject>
        <line x1="100" y1="0" x2="100" y2="-40" stroke="#64748b" strokeWidth="1" markerEnd="url(#arrow-gray)" />
      </g>

      {/* Box 4: Exhaust */}
      <g transform="translate(690, 280)">
        <rect x="0" y="0" width="160" height="115" rx="8" fill="transparent" stroke="#94a3b8" strokeWidth="1" />
        <text x="10" y="20" fill="#0f172a" fontSize="14" fontWeight="bold">4. 排氣 (Exhaust)</text>
        <foreignObject x="10" y="30" width="140" height="80">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ fontSize: '11px', color: '#0f172a', lineHeight: 1.3 }}>
            <span style={{ fontWeight: 'bold' }}>儀器動作:</span> 測試完成後，儀器將待測件內的壓力釋放，準備下一個測試循環。<br/>
            <span style={{ fontWeight: 'bold' }}>對應ISO:</span> 測試結束後的洩壓步驟。
          </div>
        </foreignObject>
        <line x1="0" y="20" x2="-20" y2="20" stroke="#64748b" strokeWidth="1" markerEnd="url(#arrow-gray)" />
      </g>
      
      {/* Arrow marker definition */}
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569" />
        </marker>
        <marker id="arrow-start" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 10 0 L 0 5 L 10 10 z" fill="#64748b" />
        </marker>
        <marker id="arrow-red" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
        </marker>
        <marker id="arrow-red-start" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
          <path d="M 10 0 L 0 5 L 10 10 z" fill="#ef4444" />
        </marker>
        <marker id="arrow-gray" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
        </marker>
      </defs>
    </svg>
  );
}
