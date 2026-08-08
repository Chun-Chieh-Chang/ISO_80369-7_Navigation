import React, { useState } from 'react';
import { 
  Zap, Info, Maximize2, ShieldAlert, CheckCircle2, Sliders, Droplets, Wind, 
  RotateCw, ArrowDownUp, Ruler, Sparkles, Eye, RefreshCw, Tag, HelpCircle, X, Activity, FileText
} from 'lucide-react';

interface ISOStandardFigureRendererProps {
  svgKey: string;
  titleZh: string;
  titleEn: string;
  standard: string;
  figureTypeZh: string;
  descriptionZh: string;
  selectionReasonZh?: string;
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
  selectionReasonZh,
  keyCallouts,
  className = ""
}) => {
  const [activeCalloutId, setActiveCalloutId] = useState<string | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const getBlueprintImagePath = (key: string) => {
    const baseUrl = import.meta.env.BASE_URL || '/';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
    
    // Strict 1-to-1 mapping to extracted ISO 80369-7 Blueprint Folio pages
    // Returns null for ISO 80369-20 physical test clauses and textual clauses (Clauses 1-3) to prevent showing arbitrary fallbacks
    switch (key) {
      case 'ISO7-FIG-B1':
      case 'ISO7-FIG-SML':
        return `${cleanBase}assets/blueprint/page_1.png`;
      case 'ISO7-FIG-B2':
      case 'ISO7-FIG-B1-B2':
        return `${cleanBase}assets/blueprint/page_2.png`;
      case 'ISO7-FIG-B3':
        return `${cleanBase}assets/blueprint/page_3.png`;
      case 'ISO7-FIG-B4':
        return `${cleanBase}assets/blueprint/page_4.png`;
      case 'ISO7-FIG-B5':
        return `${cleanBase}assets/blueprint/page_5.png`;
      case 'ISO7-FIG-B6':
      case 'ISO7-FIG-B6-A':
      case 'ISO7-FIG-B3-B6':
        return `${cleanBase}assets/blueprint/page_6.png`;
      case 'ISO7-FIG-B6-B':
      case 'ISO7-FIG-B7':
        return `${cleanBase}assets/blueprint/page_7.png`;
      case 'ISO7-FIG-B6-C':
      case 'ISO7-FIG-B8':
        return `${cleanBase}assets/blueprint/page_8.png`;
      case 'ISO7-FIG-C1':
        return `${cleanBase}assets/blueprint/page_9.png`;
      case 'ISO7-FIG-C2':
        return `${cleanBase}assets/blueprint/page_10.png`;
      case 'ISO7-FIG-C3':
        return `${cleanBase}assets/blueprint/page_11.png`;
      case 'ISO7-FIG-C4':
        return `${cleanBase}assets/blueprint/page_12.png`;
      case 'ISO7-FIG-C5':
        return `${cleanBase}assets/blueprint/page_13.png`;
      case 'ISO7-FIG-C6':
        return `${cleanBase}assets/blueprint/page_14.png`;
      default:
        // No dedicated ISO 80369-7 dimensional drawing for textual clauses (Clauses 1-3) or physical test methods
        return null;
    }
  };

  const getTestingBlueprintImagePath = (key: string) => {
    const baseUrl = import.meta.env.BASE_URL || '/';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
    
    // Strict 1-to-1 mapping to extracted ISO 80369-7 / ISO 80369-20 Testing Rig Blueprint pages
    switch (key) {
      case 'ISO20-FIG-J1':
        return `${cleanBase}assets/testing_blueprint/test_page_2.png`;
      case 'ISO20-FIG-B1':
        return `${cleanBase}assets/testing_blueprint/test_page_4.png`;
      case 'ISO20-FIG-B2':
        return `${cleanBase}assets/diagrams/pressure_decay_explanation.png`;
      case 'ISO20-FIG-C1':
        return `${cleanBase}assets/testing_blueprint/test_page_5.png`;
      case 'ISO20-FIG-D1':
        return `${cleanBase}assets/diagrams/iso20_fig_d1_official.png`;
      case 'ISO20-FIG-K1':
        return `${cleanBase}assets/diagrams/iso20_fig_k1_official.png`;
      case 'ISO20-FIG-E1':
        return `${cleanBase}assets/testing_blueprint/test_page_7.png`;
      case 'ISO20-FIG-F1':
        return `${cleanBase}assets/testing_blueprint/test_page_8.png`;
      case 'ISO20-FIG-G1':
        return `${cleanBase}assets/testing_blueprint/test_page_9.png`;
      case 'ISO20-FIG-H1':
        return `${cleanBase}assets/testing_blueprint/test_page_10.png`;
      case 'ISO7-FIG-B1':
      case 'ISO7-FIG-B2':
      case 'ISO7-FIG-B1-B2':
      case 'ISO7-FIG-B3':
      case 'ISO7-FIG-B4':
      case 'ISO7-FIG-B5':
      case 'ISO7-FIG-B6':
      case 'ISO7-FIG-B3-B6':
      case 'ISO7-FIG-C1':
      case 'ISO7-FIG-C2':
      case 'ISO7-FIG-C3':
      case 'ISO7-FIG-C4':
      case 'ISO7-FIG-C5':
      case 'ISO7-FIG-C6':
        return `${cleanBase}assets/testing_blueprint/test_page_3.png`;
      default:
        return null;
    }
  };

  const currentBlueprintPath = getBlueprintImagePath(svgKey);
  const currentTestingBlueprintPath = getTestingBlueprintImagePath(svgKey);

  const [displayMode, setDisplayMode] = useState<'official_blueprint' | 'testing_blueprint'>(() => {
    if (currentBlueprintPath) return 'official_blueprint';
    if (currentTestingBlueprintPath) return 'testing_blueprint';
    return 'official_blueprint';
  });

  const [showZoomModal, setShowZoomModal] = useState(false);
  const [zoomImageSrc, setZoomImageSrc] = useState<string>('');
  const [zoomImageTitle, setZoomImageTitle] = useState<string>('');

  const openZoomModal = (src: string, title: string) => {
    setZoomImageSrc(src);
    setZoomImageTitle(title);
    setShowZoomModal(true);
  };

  return (
    <div className={`bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xl text-slate-900 ${className}`}>
      {/* Fig.Header Bar */}
      <div className="bg-slate-50/90 border-b border-slate-200 px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center space-x-2.5">
          <span className="bg-blue-100/90 text-blue-800 border border-blue-200/80 font-mono font-bold px-2.5 py-0.5 rounded-md shadow-2xs">
            {standard}
          </span>
          <div>
            <h4 className="font-bold text-slate-900">{titleZh}</h4>
            <span className="text-[13px] text-slate-400 font-mono block">{titleEn}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Display Mode Toggle */}
          <div className="flex items-center bg-slate-200/60 p-0.5 rounded-xl border border-slate-300/60">
            <button
              onClick={() => currentBlueprintPath && setDisplayMode('official_blueprint')}
              disabled={!currentBlueprintPath}
              title={currentBlueprintPath ? "檢視 ISO 80369-7 幾何尺寸藍圖" : "本條文屬於文字規範或物理試驗，無專屬 ISO 80369-7 幾何尺寸藍圖"}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                !currentBlueprintPath
                  ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-60'
                  : displayMode === 'official_blueprint'
                    ? 'bg-blue-600 text-white shadow-xs cursor-pointer'
                    : 'text-slate-600 hover:text-slate-900 cursor-pointer'
              }`}
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>ISO 80369-7 幾何尺寸藍圖 {!currentBlueprintPath && '(無圖面)'}</span>
            </button>
            <button
              onClick={() => currentTestingBlueprintPath && setDisplayMode('testing_blueprint')}
              disabled={!currentTestingBlueprintPath}
              title={currentTestingBlueprintPath ? (svgKey === 'ISO20-FIG-B2' ? "檢視壓降測試曲線圖" : "檢視 ISO 80369-20 實驗架設藍圖") : "本條文屬於文字規範或一般說明，無專屬圖面"}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                !currentTestingBlueprintPath
                  ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-60'
                  : displayMode === 'testing_blueprint'
                    ? 'bg-blue-600 text-white shadow-xs cursor-pointer'
                    : 'text-slate-600 hover:text-slate-900 cursor-pointer'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>{svgKey === 'ISO20-FIG-B2' ? '壓降測試曲線圖' : 'ISO 80369-20 實驗架設藍圖'} {!currentTestingBlueprintPath && '(無圖面)'}</span>
            </button>
          </div>

          {/* Interactive Category Badge */}
          <button
            onClick={() => setShowCategoryModal(true)}
            title="點擊查看此圖號類別定義與規範用途"
            className="bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 text-xs px-2.5 py-1 rounded-lg border border-slate-200 hover:border-slate-300 font-medium transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Tag className="w-3 h-3 text-blue-600" />
            <span>圖別：{figureTypeZh}</span>
            <HelpCircle className="w-3 h-3 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Canvas / Image Display Workspace */}
      <div className="p-4 sm:p-6 flex flex-col items-center justify-center bg-white/80 relative min-h-[360px]">
        
        {displayMode === 'official_blueprint' ? (
          currentBlueprintPath ? (
            <div className="w-full relative space-y-3">
              <div className="relative group rounded-2xl overflow-hidden border border-slate-300/80 shadow-lg bg-slate-900">
                <img 
                  src={currentBlueprintPath} 
                  alt={`${titleZh} Official Standard Blueprint`}
                  className="w-full max-h-[500px] object-contain mx-auto bg-slate-950 transition-transform duration-300 group-hover:scale-[1.01]" 
                />
                
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <span className="bg-blue-900/80 backdrop-blur-md text-blue-100 text-xs font-mono font-bold px-3 py-1 rounded-full border border-blue-400/40 shadow-sm flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5 text-blue-300" />
                    ISO 80369-7:2021 Precision Blueprint Guide
                  </span>
                  <button
                    onClick={() => openZoomModal(currentBlueprintPath, `${titleZh} - ISO 80369-7 幾何尺寸藍圖`)}
                    className="bg-blue-600/90 hover:bg-blue-600 backdrop-blur-md text-white p-1.5 rounded-full border border-white/20 shadow-md transition cursor-pointer"
                    title="放大全螢幕檢視幾何尺寸藍圖"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full relative py-12 px-6 bg-slate-900/90 rounded-2xl border border-slate-700 shadow-xl flex flex-col items-center justify-center text-center space-y-4">
              <div className="p-4 bg-slate-800 rounded-full border border-slate-600 text-blue-400">
                {svgKey.startsWith('ISO7-CLAUSE-') ? <FileText className="w-10 h-10" /> : <ShieldAlert className="w-10 h-10 text-amber-400" />}
              </div>
              <div className="space-y-1.5 max-w-md">
                <h4 className="text-sm font-bold text-white">
                  {svgKey.startsWith('ISO7-CLAUSE-') ? '本條文為規範文字/術語定義條文，無專屬圖面' : '本主題無 ISO 80369-7 幾何尺寸藍圖'}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {svgKey.startsWith('ISO7-CLAUSE-') ? (
                    <>本條文（<span className="text-blue-300 font-semibold">{titleZh}</span>）主要規範標準適用範疇、引述採納標準與術語定義，ISO 80369-7 與 ISO 80369-20 原廠規範中<strong className="text-amber-300 font-normal">未包含任何幾何尺寸工程藍圖或物理實驗架設圖解</strong>。</>
                  ) : (
                    <>本條文（<span className="text-amber-300 font-semibold">{titleZh}</span>）屬於 ISO 80369-20 之物理性能試驗方法，ISO 80369-7 標準未定義專屬幾何尺寸圖面。</>
                  )}
                </p>
              </div>
              {!svgKey.startsWith('ISO7-CLAUSE-') && (
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setDisplayMode('testing_blueprint')}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    <Activity className="w-4 h-4" />
                    切換至『{svgKey === 'ISO20-FIG-B2' ? '壓降測試曲線圖' : 'ISO 80369-20 實驗架設藍圖'}』
                  </button>
                </div>
              )}
            </div>
          )
        ) : (
          currentTestingBlueprintPath ? (
            <div className="w-full relative space-y-3">
              <div className="relative group rounded-2xl overflow-hidden border border-slate-300/80 shadow-lg bg-slate-900">
                <img 
                  src={currentTestingBlueprintPath} 
                  alt={`${titleZh} ${svgKey === 'ISO20-FIG-B2' ? '壓降測試曲線圖' : 'ISO 80369-20 Testing Rig Blueprint'}`}
                  className="w-full max-h-[500px] object-contain mx-auto bg-slate-950 transition-transform duration-300 group-hover:scale-[1.01]" 
                />
                
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <span className="bg-indigo-900/80 backdrop-blur-md text-indigo-100 text-xs font-mono font-bold px-3 py-1 rounded-full border border-indigo-400/40 shadow-sm flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-indigo-300" />
                    {svgKey === 'ISO20-FIG-B2' ? 'ISO 80369-20 Annex B.4 Pressure Decay Curve' : 'ISO 80369-20 Testing Rig Apparatus Blueprint'}
                  </span>
                  <button
                    onClick={() => openZoomModal(currentTestingBlueprintPath, `${titleZh} - ${svgKey === 'ISO20-FIG-B2' ? '壓降測試曲線圖' : 'ISO 80369-20 實驗架設藍圖'}`)}
                    className="bg-indigo-700/90 hover:bg-indigo-700 backdrop-blur-md text-white p-1.5 rounded-full border border-white/20 shadow-md transition cursor-pointer"
                    title={svgKey === 'ISO20-FIG-B2' ? "放大全螢幕檢視壓降測試曲線圖" : "放大全螢幕檢視實驗架設藍圖"}
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full relative py-12 px-6 bg-slate-900/95 rounded-2xl border border-slate-700 shadow-xl flex flex-col items-center justify-center text-center space-y-4">
              <div className="p-4 bg-slate-800 rounded-full border border-slate-600 text-blue-400">
                <FileText className="w-10 h-10" />
              </div>
              <div className="space-y-2 max-w-lg">
                <h4 className="text-sm font-bold text-white">本條文為規範文字/術語定義條文，無專屬圖面</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  本條文（<span className="text-blue-300 font-semibold">{titleZh}</span>）主要規範標準適用範疇、引述採納標準、術語定義或附錄原理說明。ISO 80369-7 與 ISO 80369-20 原廠規範中<strong className="text-amber-300 font-normal">未包含任何幾何尺寸工程藍圖或物理實驗架設圖解</strong>。
                </p>
              </div>
            </div>
          )
        )}

        {/* Dynamic Tooltip / Description Footer */}
        <div className="mt-4 w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold text-blue-600 flex items-center gap-1">
              <Info className="w-3.5 h-3.5" /> 標準規範圖解重點說明
            </span>
            <span className="font-mono text-xs">
              {displayMode === 'official_blueprint' 
                ? 'ISO 80369-7 Dimension Blueprint' 
                : (svgKey === 'ISO20-FIG-B2' ? 'ISO 80369-20 Pressure Decay Curve' : 'ISO 80369-20 Testing Rig Blueprint')}
            </span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            {descriptionZh}
          </p>
        </div>

        {/* Selection Reason / Rationale Callout Box */}
        {selectionReasonZh && (
          <div className="mt-3 w-full bg-blue-50/90 border border-blue-200/90 p-3.5 rounded-xl text-xs space-y-1.5 shadow-2xs">
            <div className="flex items-center justify-between text-blue-900 font-bold">
              <span className="flex items-center gap-1.5 text-blue-800">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>圖號入選此主題之法規關聯邏輯與角色定位：</span>
              </span>
              <span className="bg-blue-100 text-blue-800 text-[11px] font-mono font-bold px-2 py-0.5 rounded-md border border-blue-300/80">
                ISO Selection Rationale
              </span>
            </div>
            <p className="text-slate-700 leading-relaxed text-[13px]">
              {selectionReasonZh}
            </p>
          </div>
        )}

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

      {/* Fullscreen Zoom Modal for Blueprint or HD Image */}
      {showZoomModal && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4">
          <div className="absolute top-4 right-4 flex items-center gap-3 z-10">
            <span className="text-white text-xs font-mono bg-white/10 px-3 py-1 rounded-full border border-white/20">
              {zoomImageTitle || titleZh} ({standard})
            </span>
            <button
              onClick={() => setShowZoomModal(false)}
              className="bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="max-w-7xl w-full max-h-[90vh] flex items-center justify-center overflow-auto p-2">
            <img 
              src={zoomImageSrc || currentBlueprintPath} 
              alt={zoomImageTitle || titleZh}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border border-white/20 bg-slate-950" 
            />
          </div>
        </div>
      )}

      {/* Category Info Modal - Dynamic & Figure-Specific */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl relative text-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="text-base font-bold text-slate-900">法規圖號分類與圖別定義專屬說明</h3>
                  <span className="text-xs text-blue-600 font-mono font-semibold">Current Figure: {standard} {titleZh}</span>
                </div>
              </div>
              <button 
                onClick={() => setShowCategoryModal(false)}
                className="text-slate-400 hover:text-slate-900 p-1 rounded-lg hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              {/* Dynamic Active Hero Banner */}
              <div className="p-3.5 bg-blue-600 text-white rounded-xl shadow-sm space-y-1">
                <div className="text-xs font-bold text-blue-100 flex items-center justify-between">
                  <span>🎯 當前卡片專屬圖別標籤：</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded font-mono">{figureTypeZh}</span>
                </div>
                <div className="text-sm font-extrabold">{titleZh} ({standard})</div>
                <p className="text-xs text-blue-100/90 leading-relaxed pt-1">
                  {figureTypeZh.includes('測試裝置') || figureTypeZh.includes('apparatus') ? (
                    <>本圖號屬於 <strong>ISO 80369-20 實驗室物理測試裝置藍圖</strong>。專門規範物理性能試驗時之機台架設、流體/氣體管路、閥門與感測器配置。</>
                  ) : figureTypeZh.includes('CAD') || figureTypeZh.includes('幾何') ? (
                    <>本圖號屬於 <strong>ISO 80369-7 量產商業產品接頭 CAD 幾何圖</strong>。規範醫療器材製造商量產銷售之 6% 魯爾錐度、螺紋 Pitch 與耳翼公差。</>
                  ) : figureTypeZh.includes('夾具') || figureTypeZh.includes('參考') ? (
                    <>本圖號屬於 <strong>ISO 80369-7 附錄 C 硬化不鏽鋼測試專用金屬參考件 (C.1~C.6)</strong>。規範第三方驗證實驗室進行物理性能測試時之標準夾具。</>
                  ) : (
                    <>本圖號屬於 <strong>ISO 80369 物理機構與防誤插互斥矩陣圖解</strong>。規範跨領域小口徑連接器防呆隔離與受力失效機構。</>
                  )}
                </p>
              </div>

              {/* Distinction Comparison Grid */}
              <div className="text-xs font-bold text-slate-800 pt-1">📊 ISO 80369 4 大圖號類別完整辨識與定義指南：</div>
              
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                <div className={`p-2.5 rounded-xl border transition ${figureTypeZh.includes('測試裝置') ? 'bg-blue-50 border-blue-300 ring-1 ring-blue-300/60' : 'bg-slate-50 border-slate-200 opacity-70'}`}>
                  <div className="font-bold text-blue-700 flex items-center justify-between mb-0.5">
                    <span>🛠️ 1. 物理測試架設藍圖 (ISO 80369-20 Annex B ~ Annex K)</span>
                    {figureTypeZh.includes('測試裝置') && <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.2 rounded">當前選擇</span>}
                  </div>
                  <p className="leading-relaxed text-[11px] text-slate-600">
                    規範第三方實驗室執行洩漏 (B/D/K)、拉力 (F)、扭矩 (H) 等物理測試之機台架設、氣體/水流介質與傳感器連接。
                  </p>
                </div>

                <div className={`p-2.5 rounded-xl border transition ${figureTypeZh.includes('CAD') || figureTypeZh.includes('幾何') ? 'bg-blue-50 border-blue-300 ring-1 ring-blue-300/60' : 'bg-slate-50 border-slate-200 opacity-70'}`}>
                  <div className="font-bold text-blue-700 flex items-center justify-between mb-0.5">
                    <span>📐 2. 產品 CAD 幾何圖 (ISO 80369-7 Fig.B.1 ~ Fig.B.6)</span>
                    {(figureTypeZh.includes('CAD') || figureTypeZh.includes('幾何')) && <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.2 rounded">當前選擇</span>}
                  </div>
                  <p className="leading-relaxed text-[11px] text-slate-600">
                    規範醫療器材製造商量產銷售之商業產品接頭（針筒、輸液管等）所需的 6% Luer 錐度、圓弧 R 角與螺紋公差。
                  </p>
                </div>

                <div className={`p-2.5 rounded-xl border transition ${figureTypeZh.includes('夾具') || figureTypeZh.includes('參考') ? 'bg-amber-50 border-amber-300 ring-1 ring-amber-300/60' : 'bg-slate-50 border-slate-200 opacity-70'}`}>
                  <div className="font-bold text-amber-800 flex items-center justify-between mb-0.5">
                    <span>🔧 3. 金屬參考夾具件 (ISO 80369-7 Annex C / Fig.C.1 ~ Fig.C.6)</span>
                    {(figureTypeZh.includes('夾具') || figureTypeZh.includes('參考')) && <span className="bg-amber-600 text-white text-[10px] px-1.5 py-0.2 rounded">當前選擇</span>}
                  </div>
                  <p className="leading-relaxed text-[11px] text-slate-600">
                    實驗室進行物理洩漏、旋鬆與拉拔力測試時所使用之高硬度不鏽鋼規件，包含標稱件與最壞情況 (Worst-case) 限制件。
                  </p>
                </div>

                <div className={`p-2.5 rounded-xl border transition ${figureTypeZh.includes('機構') || figureTypeZh.includes('防誤插') ? 'bg-emerald-50 border-emerald-300 ring-1 ring-emerald-300/60' : 'bg-slate-50 border-slate-200 opacity-70'}`}>
                  <div className="font-bold text-emerald-800 flex items-center justify-between mb-0.5">
                    <span>📘 4. 防誤插與物理機構圖 (ISO 80369 Series)</span>
                    {(figureTypeZh.includes('機構') || figureTypeZh.includes('防誤插')) && <span className="bg-emerald-600 text-white text-[10px] px-1.5 py-0.2 rounded">當前選擇</span>}
                  </div>
                  <p className="leading-relaxed text-[11px] text-slate-600">
                    規範 ISO 80369 跨領域小孔徑接頭（血管 -7 vs 腸道 -3 vs 神經軸 -6）互不相容之防呆幾何矩陣與受力失效機構。
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowCategoryModal(false)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer shadow-sm"
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
