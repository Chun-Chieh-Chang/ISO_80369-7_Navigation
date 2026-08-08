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
  const [activeCalloutId, setActiveCalloutId] = useState<string | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const getBlueprintImagePath = (key: string) => {
    const baseUrl = import.meta.env.BASE_URL || '/';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
    
    // Strict 1-to-1 mapping to extracted ISO 80369-7 Blueprint Folio pages
    // Returns null for ISO 80369-20 physical test clauses and textual clauses (Clauses 1-3) to prevent showing arbitrary fallbacks
    switch (key) {
      case 'ISO7-FIG-B1':
        return `${cleanBase}assets/blueprint/page_2.png`;
      case 'ISO7-FIG-B2':
      case 'ISO7-FIG-B1-B2':
        return `${cleanBase}assets/blueprint/page_3.png`;
      case 'ISO7-FIG-B3':
        return `${cleanBase}assets/blueprint/page_4.png`;
      case 'ISO7-FIG-B4':
        return `${cleanBase}assets/blueprint/page_5.png`;
      case 'ISO7-FIG-B5':
        return `${cleanBase}assets/blueprint/page_6.png`;
      case 'ISO7-FIG-B6':
      case 'ISO7-FIG-B6-A':
      case 'ISO7-FIG-B3-B6':
        return `${cleanBase}assets/blueprint/page_7.png`;
      case 'ISO7-FIG-B6-B':
        return `${cleanBase}assets/blueprint/page_8.png`;
      case 'ISO7-FIG-B6-C':
        return `${cleanBase}assets/blueprint/page_9.png`;
      case 'ISO7-FIG-C1':
        return `${cleanBase}assets/blueprint/page_10.png`;
      case 'ISO7-FIG-C2':
        return `${cleanBase}assets/blueprint/page_11.png`;
      case 'ISO7-FIG-C3':
        return `${cleanBase}assets/blueprint/page_12.png`;
      case 'ISO7-FIG-C4':
        return `${cleanBase}assets/blueprint/page_13.png`;
      case 'ISO7-FIG-C5':
        return `${cleanBase}assets/blueprint/page_14.png`;
      case 'ISO7-FIG-C6':
        return `${cleanBase}assets/blueprint/page_15.png`;
      case 'ISO7-FIG-SML':
        return `${cleanBase}assets/blueprint/page_1.png`;
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
      case 'ISO20-FIG-B2':
        return `${cleanBase}assets/testing_blueprint/test_page_4.png`;
      case 'ISO20-FIG-C1':
        return `${cleanBase}assets/testing_blueprint/test_page_5.png`;
      case 'ISO20-FIG-D1':
      case 'ISO20-FIG-K1':
        return `${cleanBase}assets/testing_blueprint/test_page_6.png`;
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

  const getDiagramImagePath = (key: string) => {
    const baseUrl = import.meta.env.BASE_URL || '/';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
    
    // Strict 1-to-1 mapping for specific ISO 80369-7 and ISO 80369-20 figure keys
    switch (key) {
      case 'ISO7-FIG-B1':
      case 'ISO7-FIG-B1-B2':
        return `${cleanBase}assets/diagrams/iso7_fig_b1_male_slip.png`;
      case 'ISO7-FIG-B2':
        return `${cleanBase}assets/diagrams/iso7_fig_b2_female_slip.png`;
      case 'ISO7-FIG-B3':
      case 'ISO7-FIG-B3-B6':
        return `${cleanBase}assets/diagrams/iso7_fig_b3_male_lock_fixed.png`;
      case 'ISO7-FIG-B4':
        return `${cleanBase}assets/diagrams/iso7_fig_b4_male_lock_rotatable.png`;
      case 'ISO7-FIG-B5':
        return `${cleanBase}assets/diagrams/iso7_fig_b5_female_lock.png`;
      case 'ISO7-FIG-B6':
        return `${cleanBase}assets/diagrams/iso7_fig_b6_female_lock_lugs.png`;
      case 'ISO7-FIG-C1':
        return `${cleanBase}assets/diagrams/iso7_fig_c1_female_ref_lock.png`;
      case 'ISO20-FIG-J1':
        return `${cleanBase}assets/diagrams/iso20_simultaneous_axial_torque.png`;
      case 'ISO20-FIG-B2':
        return `${cleanBase}assets/diagrams/pressure_decay_explanation.png`;
      case 'ISO20-FIG-B1':
      case 'ISO20-FIG-C1':
        return `${cleanBase}assets/diagrams/iso20_pressure_leakage.png`;
      case 'ISO20-FIG-D1':
      case 'ISO20-FIG-K1':
        return `${cleanBase}assets/diagrams/iso20_vacuum_air_leakage.png`;
      case 'ISO20-FIG-E1':
        return `${cleanBase}assets/diagrams/iso20_stress_cracking.png`;
      case 'ISO20-FIG-F1':
      case 'ISO20-FIG-G1':
      case 'ISO20-FIG-H1':
        return `${cleanBase}assets/diagrams/iso20_mechanical_test.png`;
      case 'ISO7-CLAUSE-1':
      case 'ISO7-CLAUSE-2':
      case 'ISO7-CLAUSE-3':
      case 'ISO7-CLAUSE-TEXT':
        return null;
      default:
        return `${cleanBase}assets/diagrams/iso7_luer_lock_cad.png`;
    }
  };

  const currentBlueprintPath = getBlueprintImagePath(svgKey);
  const currentTestingBlueprintPath = getTestingBlueprintImagePath(svgKey);
  const currentImagePath = getDiagramImagePath(svgKey);

  const [displayMode, setDisplayMode] = useState<'official_blueprint' | 'testing_blueprint' | 'hd_render'>(() => {
    if (svgKey === 'ISO20-FIG-B2') return 'hd_render';
    if (currentBlueprintPath) return 'official_blueprint';
    if (currentTestingBlueprintPath) return 'testing_blueprint';
    if (currentImagePath) return 'hd_render';
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
              title={currentTestingBlueprintPath ? "檢視 ISO 80369-20 實驗架設藍圖" : "本條文屬於文字規範或一般說明，無專屬 ISO 80369-20 實驗架設圖面"}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                !currentTestingBlueprintPath
                  ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-60'
                  : displayMode === 'testing_blueprint'
                    ? 'bg-blue-600 text-white shadow-xs cursor-pointer'
                    : 'text-slate-600 hover:text-slate-900 cursor-pointer'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>ISO 80369-20 實驗架設藍圖 {!currentTestingBlueprintPath && '(無圖面)'}</span>
            </button>
            <button
              onClick={() => currentImagePath && setDisplayMode('hd_render')}
              disabled={!currentImagePath}
              title={currentImagePath ? "檢視 3D/HD 精密重構圖" : "本條文屬於文字規範，無 3D 重構圖面"}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                !currentImagePath
                  ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-60'
                  : displayMode === 'hd_render'
                    ? 'bg-blue-600 text-white shadow-xs cursor-pointer'
                    : 'text-slate-600 hover:text-slate-900 cursor-pointer'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>3D/HD 精密重構圖 {!currentImagePath && '(無圖面)'}</span>
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
                    切換至『ISO 80369-20 實驗架設藍圖』
                  </button>
                </div>
              )}
            </div>
          )
        ) : displayMode === 'testing_blueprint' ? (
          currentTestingBlueprintPath ? (
            <div className="w-full relative space-y-3">
              <div className="relative group rounded-2xl overflow-hidden border border-slate-300/80 shadow-lg bg-slate-900">
                <img 
                  src={currentTestingBlueprintPath} 
                  alt={`${titleZh} ISO 80369-20 Testing Rig Blueprint`}
                  className="w-full max-h-[500px] object-contain mx-auto bg-slate-950 transition-transform duration-300 group-hover:scale-[1.01]" 
                />
                
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <span className="bg-indigo-900/80 backdrop-blur-md text-indigo-100 text-xs font-mono font-bold px-3 py-1 rounded-full border border-indigo-400/40 shadow-sm flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-indigo-300" />
                    ISO 80369-20 Testing Rig Apparatus Blueprint
                  </span>
                  <button
                    onClick={() => openZoomModal(currentTestingBlueprintPath, `${titleZh} - ISO 80369-20 實驗架設藍圖`)}
                    className="bg-indigo-700/90 hover:bg-indigo-700 backdrop-blur-md text-white p-1.5 rounded-full border border-white/20 shadow-md transition cursor-pointer"
                    title="放大全螢幕檢視實驗架設藍圖"
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
                <h4 className="text-sm font-bold text-white">本條文為規範文字/術語定義條文，無專屬實驗藍圖</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  本條文（<span className="text-blue-300 font-semibold">{titleZh}</span>）主要規範標準適用範疇、引述採納標準、術語定義或附錄原理說明。ISO 80369-7 與 ISO 80369-20 原廠規範中<strong className="text-amber-300 font-normal">未包含任何幾何尺寸工程藍圖或物理實驗架設圖解</strong>。
                </p>
              </div>
            </div>
          )
        ) : (
          currentImagePath ? (
            <div className="w-full relative space-y-3">
              <div className="relative group rounded-2xl overflow-hidden border border-slate-200/80 shadow-md bg-slate-950">
                <img 
                  src={currentImagePath} 
                  alt={`${titleZh} HD Render`}
                  className="w-full max-h-[460px] object-contain mx-auto transition-transform duration-300 group-hover:scale-[1.02]" 
                />
                
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <span className="bg-black/60 backdrop-blur-md text-white text-[13px] font-mono px-3 py-1 rounded-full border border-white/20 shadow-sm flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    ISO Standard HD Photorealistic
                  </span>
                  <button
                    onClick={() => openZoomModal(currentImagePath, `${titleZh} - 3D/HD 重構圖`)}
                    className="bg-blue-600/90 hover:bg-blue-600 backdrop-blur-md text-white p-1.5 rounded-full border border-white/20 shadow-md transition cursor-pointer"
                    title="放大全螢幕檢視"
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
                <h4 className="text-sm font-bold text-white">本條文為規範文字/術語定義條文，無 3D 重構圖面</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  本條文（<span className="text-blue-300 font-semibold">{titleZh}</span>）主要規範標準適用範疇、引述採納標準與術語定義，無需進行實體接頭物理測試。
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
                : displayMode === 'testing_blueprint'
                  ? 'ISO 80369-20 Testing Rig Blueprint'
                  : 'ISO Photorealistic 3D Model'}
            </span>
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
