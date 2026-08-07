import React, { useState } from 'react';
import { ISO_TOPICS, STANDARD_CLAUSE_DETAILS } from '../data/isoTopicsData';
import { ISO_CLAUSES, ANNEX_C_FIGURES } from '../data/isoData';
import { ISOStandardFigureRenderer } from './ISOStandardFigureRenderer';
import { Table, Search, Download, Filter, Info, CheckCircle2, AlertTriangle, ArrowUpDown, ChevronDown, ChevronUp, Eye, Sparkles } from 'lucide-react';

export const ClauseComparisonMatrix: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedClauseId, setExpandedClauseId] = useState<string | null>('6.1');

  const getClauseSvgKey = (clauseId: string): string => {
    switch (clauseId) {
      case '6.1': return 'ISO20-FIG-B1';
      case '6.2': return 'ISO20-FIG-D1';
      case '6.3': return 'ISO20-FIG-E1';
      case '6.4': return 'ISO20-FIG-F1';
      case '6.5': return 'ISO20-FIG-G1';
      case '6.6': return 'ISO20-FIG-H1';
      case 'Clause 4': return 'ISO20-FIG-J1';
      case 'Clause 5': return 'ISO7-FIG-B3';
      case 'Annex C': return 'ISO7-FIG-C3';
      default: return 'ISO7-FIG-A1';
    }
  };

  const clausesList = [
    {
      id: 'Clause 1',
      title: 'Clause 1 適用範圍 (Scope)',
      iso7: 'Clause 1',
      iso20: 'Clause 1',
      category: 'general',
      categoryZh: '一般',
      type: 'All Connectors',
      assemblyTorque: '-',
      testPressure: '-',
      testForce: '-',
      testTorque: '-',
      holdTime: '-',
      fixture: '法規審查對照表',
      criteria: '明確界定適用於血管（Intravascular）或皮下（Subcutaneous）注射/輸液設備之小口徑魯爾連接器範疇',
      risk: '產品預期用途劃分錯誤致審查退件'
    },
    {
      id: 'Clause 2',
      title: 'Clause 2 規範性引用文件 (Normative References)',
      iso7: 'Clause 2',
      iso20: 'Clause 2',
      category: 'general',
      categoryZh: '一般',
      type: 'All Connectors',
      assemblyTorque: '-',
      testPressure: '-',
      testForce: '-',
      testTorque: '-',
      holdTime: '-',
      fixture: '標準追溯文件',
      criteria: '強制引用 ISO 80369-1 (通用防錯要求) 與 ISO 80369-20 (通用測試方法) 規範版本',
      risk: '引用被廢止之舊版 ISO 594 標準'
    },
    {
      id: 'Clause 3',
      title: 'Clause 3 術語與定義 (Terms & Definitions)',
      iso7: 'Clause 3',
      iso20: 'Clause 3',
      category: 'general',
      categoryZh: '一般',
      type: 'All Connectors',
      assemblyTorque: '-',
      testPressure: '-',
      testForce: '-',
      testTorque: '-',
      holdTime: '-',
      fixture: 'DHF 專有名詞對照表',
      criteria: '精確定義 Luer connector、Luer slip、Luer lock、Reference connector、Leak rate 等法規專有名詞',
      risk: '圖面名詞與國際標準歧異導致審查補件'
    },
    {
      id: 'Clause 4',
      title: 'Clause 4 通用要求與預裝配程序 (General & Pre-assembly)',
      iso7: 'Clause 4',
      iso20: 'Clause 4 & General Procedure',
      category: 'assembly',
      categoryZh: '裝配',
      type: 'Lock & Slip',
      assemblyTorque: '0.08 - 0.12 N·m',
      testPressure: '-',
      testForce: '26.5 - 27.5 N (軸向推力)',
      testTorque: '-',
      holdTime: '5 - 6 秒',
      fixture: '校正定扭矩起子 & 彈簧推力機構',
      criteria: '性能測試前必須執行統一標準預裝配作業，並符合跨領域非互換性防呆要求',
      risk: '預裝配未定量加壓致使假洩漏或螺紋損傷'
    },
    {
      id: 'Clause 5',
      title: 'Clause 5 幾何尺寸與 6% 圓錐度驗證 (Dimensional Requirements)',
      iso7: 'Clause 5 (Figures B.1~B.6)',
      iso20: 'Annex A (幾何量測法)',
      category: 'dimensional',
      categoryZh: '尺寸',
      type: 'Lock & Slip',
      assemblyTorque: '-',
      testPressure: '-',
      testForce: '-',
      testTorque: '-',
      holdTime: '-',
      fixture: '三次元 CMM / 6% 光學投影儀 / 通止規',
      criteria: '圓錐度 6% (1:16.667)、配合長度 ≥ 7.5mm、螺紋 Pitch 2.5mm，完全符合 Figures B.1~B.6 CAD 矩陣',
      risk: '射出保壓不足致錐度偏離 6% 或螺紋厚度超差'
    },
    {
      id: '6.1',
      title: '6.1 流體洩漏 (6.1.2 氣壓衰減法 vs 6.1.3 正壓液體法)',
      iso7: 'Clause 6.1',
      iso20: 'Annex B (氣壓) / Annex C (水壓)',
      category: 'leakage',
      categoryZh: '洩漏',
      type: 'Lock & Slip',
      assemblyTorque: '0.08 - 0.12 N·m (+ 26.5–27.5N)',
      testPressure: '300 - 330 kPa',
      testForce: '-',
      testTorque: '-',
      holdTime: '15–20s (6.1.2氣壓) / 30–35s (6.1.3水壓)',
      fixture: 'Fig.C.1 (母) / Fig.C.4 (公)',
      criteria: '【6.1.2 氣壓】加壓 300~330 kPa 氣壓持壓 15~20s，壓降洩漏率 ≤ 0.005 Pa·m³/s (Annex B)；【6.1.3 水壓】加壓 300~330 kPa 水壓持壓 30~35s，目視無水滴滴落 (Annex C)',
      risk: '射出成型毛邊、6% 錐度縮水變形'
    },
    {
      id: '6.2',
      title: '6.2 負壓空氣洩漏 (Sub-atmospheric Air Leakage)',
      iso7: 'Clause 6.2',
      iso20: 'Annex D (負壓衰減) / Annex K (抽吸水下氣泡)',
      category: 'leakage',
      categoryZh: '洩漏',
      type: 'Lock & Slip',
      assemblyTorque: '0.08 - 0.12 N·m (+ 26.5–27.5N)',
      testPressure: '80.0 - 88.0 kPa 真空',
      testForce: '-',
      testTorque: '-',
      holdTime: '15 - 20 秒',
      fixture: 'Fig.C.1 (母) / Fig.C.4 (公)',
      criteria: '80.0~88.0 kPa 負壓真空下持壓 15~20 秒，空氣洩漏率 ≤ 0.005 Pa·m³/s (Annex D)，或水中連續無氣泡冒出 (Annex K)',
      risk: '負壓時錐面微幅收縮脫離產生微氣孔致氣栓'
    },
    {
      id: '6.3',
      title: '6.3 耐環境應力龜裂 (Stress Cracking)',
      iso7: 'Clause 6.3',
      iso20: 'Annex E (裝配靜置 48h)',
      category: 'durability',
      categoryZh: '耐久',
      type: 'Lock & Slip',
      assemblyTorque: '0.08 - 0.12 N·m (+ 26.5–27.5N)',
      testPressure: '-',
      testForce: '-',
      testTorque: '-',
      holdTime: '≥ 48 小時',
      fixture: 'Fig.C.1 (母) / Fig.C.4 (公)',
      criteria: '裝配於金屬參考接頭於 23°C 空氣中靜置 48 小時 (Annex E) 無龜裂，且隨後須通過 6.1.1 洩漏測試',
      risk: 'PC/PMMA 材質射出殘留內應力高，受長效過盈應力作用發生爆裂'
    },
    {
      id: '6.4',
      title: '6.4 抗軸向負載分離 (Resistance to Separation from Axial Load)',
      iso7: 'Clause 6.4',
      iso20: 'Annex F',
      category: 'mechanical',
      categoryZh: '機械',
      type: 'Lock (32~35N) / Slip (23~25N)',
      assemblyTorque: '0.08 - 0.12 N·m (+ 26.5–27.5N)',
      testPressure: '-',
      testForce: '23 - 25 N (Slip) / 32 - 35 N (Lock)',
      testTorque: '-',
      holdTime: '10 - 15 秒',
      fixture: 'Fig.C.3 (母 2.71mm 窄耳翼極限) / Fig.C.6 (公極限)',
      criteria: '施加 23~25 N (Slip) 或 32~35 N (Lock) 軸向拉力維持 10~15 秒 (加載速率 ≤ 10 N/s)，接頭螺紋與錐面不得脫開分離',
      risk: '螺紋咬合深度不足，耳翼被直接剪切拉平'
    },
    {
      id: '6.5',
      title: '6.5 抗旋鬆分離 (Resistance to Separation from Unscrewing)',
      iso7: 'Clause 6.5',
      iso20: 'Annex G (反旋) / Annex I (拆卸力)',
      category: 'mechanical',
      categoryZh: '機械',
      type: 'Lock only',
      assemblyTorque: '0.08 - 0.12 N·m (+ 26.5–27.5N)',
      testPressure: '-',
      testForce: '-',
      testTorque: '0.018 - 0.020 N·m (反向)',
      holdTime: '10 - 15 秒',
      fixture: 'Fig.C.1 (母) / Fig.C.4 (公)',
      criteria: '施加 0.018~0.020 N·m 反向旋鬆力維持 10~15 秒，錐面與螺紋摩擦力維持自鎖不自動解鎖',
      risk: '材料表面太滑（脫模劑/潤滑劑過量）致自鎖失敗'
    },
    {
      id: '6.6',
      title: '6.6 抗過載滑牙測試 (Resistance to Overriding)',
      iso7: 'Clause 6.6',
      iso20: 'Annex H',
      category: 'mechanical',
      categoryZh: '機械',
      type: 'Lock only',
      assemblyTorque: '直加破壞扭矩',
      testPressure: '-',
      testForce: '-',
      testTorque: '0.15 - 0.17 N·m',
      holdTime: '5 - 10 秒',
      fixture: 'Fig.C.3 (2.71mm 窄耳翼最壞情況) / Fig.C.6',
      criteria: '施加 0.15~0.17 N·m 過旋扭矩維持 5~10 秒，螺紋或耳翼不得越過滑脫（不滑牙）、套環無膨脹脫開',
      risk: 'PP 等低剛性材料環向膨脹 (Hoop Expansion) 脫牙'
    },
    {
      id: 'Annex C',
      title: 'Annex C 金屬標準參考連接器 (Reference Connectors)',
      iso7: 'Annex C (Figures C.1~C.6)',
      iso20: 'General Apparatus Section 4',
      category: 'assembly',
      categoryZh: '夾具',
      type: 'Fig.C.1 ~ Fig.C.6',
      assemblyTorque: '-',
      testPressure: '-',
      testForce: '-',
      testTorque: '-',
      holdTime: '-',
      fixture: '不鏽鋼參考夾具 (≥ 45 HRC)',
      criteria: '製造精密度最高的不鏽鋼金屬測試夾具，Fig.C.3 具備 2.71mm 極限最壞情況耳翼',
      risk: '未定期校正參考夾具尺寸導致全盤測試結果無效'
    },
    {
      id: 'Annex A/D/E',
      title: 'Annex A / D / E 原理說明、防錯評估與測試總覽',
      iso7: 'Annex A, D, E',
      iso20: 'Annex J (修訂歷史)',
      category: 'general',
      categoryZh: '一般',
      type: 'All Connectors',
      assemblyTorque: '-',
      testPressure: '-',
      testForce: '-',
      testTorque: '-',
      holdTime: '-',
      fixture: '法規綜合說明文件',
      criteria: '提供測試參數臨床原理 (Annex A)、跨領域 3D 碰撞防誤接評估 (Annex D) 及完整測試矩陣 (Annex E)',
      risk: '風險管理文件中漏引 Annex A 科學說明'
    }
  ];

  const filteredClauses = clausesList.filter(c => {
    const matchesCat = filterType === 'all' || c.category === filterType;
    const q = searchTerm.toLowerCase();
    const matchesSearch = !q || 
      c.title.toLowerCase().includes(q) ||
      c.iso7.toLowerCase().includes(q) ||
      c.iso20.toLowerCase().includes(q) ||
      c.criteria.toLowerCase().includes(q) ||
      c.fixture.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const exportCSV = () => {
    const headers = ['條文號', 'ISO 80369-7 條文', 'ISO 80369-20 附錄', '適用類型', '裝配扭矩', '測試壓力/力矩/拉力', '保持時間', '指定金屬夾具', '合格標準'];
    const rows = clausesList.map(c => [
      c.id,
      c.iso7,
      c.iso20,
      c.type,
      c.assemblyTorque,
      c.testPressure !== '-' ? c.testPressure : (c.testTorque !== '-' ? c.testTorque : c.testForce),
      c.holdTime,
      c.fixture,
      `"${c.criteria}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'ISO_80369_Comparison_Matrix.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2.5">
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[13px] font-bold px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-2xs">
                <Table className="w-4 h-4 text-emerald-600" />
                標準雙向對照矩陣
              </span>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                ISO 80369-7 (條文) vs ISO 80369-20 (測試細則) 橫向對照與內嵌圖表矩陣
              </h2>
            </div>
            <p className="text-[13px] text-slate-500 mt-1">
              可一目瞭然比較 ISO 80369-7 規範要求與 ISO 80369-20 實驗室測試方法，點擊任一列即可在下方**直接展開內嵌規範 SVG CAD 向量圖表與裝置圖解**。
            </p>
          </div>

          <button
            onClick={exportCSV}
            className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-emerald-600/20 transition-all shrink-0 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>匯出 CSV 對照表</span>
          </button>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-100/80">
          <div className="flex items-center space-x-2 text-[13px] flex-wrap gap-y-1.5">
            <span className="text-slate-400 font-semibold">篩選領域:</span>
            {[
              { id: 'all', label: '全部條文 (Clause 1~6 & Annex)' },
              { id: 'general', label: '📘 通用 (1~4章)' },
              { id: 'dimensional', label: '📐 幾何尺寸 (5章)' },
              { id: 'leakage', label: '💧 洩漏與氣密 (6.1/6.2)' },
              { id: 'mechanical', label: '⚡ 機械強度 (6.4/6.5/6.6)' },
              { id: 'durability', label: '🛡️ 耐久與環境 (6.3)' },
              { id: 'assembly', label: '🔧 預裝配與夾具' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  filterType === f.id ? 'bg-blue-600 text-white shadow-xs font-bold' : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="搜尋矩陣條文..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* Responsive Table Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3 px-4 w-12 text-center">條文</th>
                <th className="py-3 px-4 min-w-[160px]">測試名稱 & 主題</th>
                <th className="py-3 px-4">ISO 80369-7 條文</th>
                <th className="py-3 px-4">ISO 80369-20 附錄</th>
                <th className="py-3 px-4">裝配扭矩</th>
                <th className="py-3 px-4">定量加載條件 (壓力/拉力/扭矩)</th>
                <th className="py-3 px-4">保持時間</th>
                <th className="py-3 px-4 min-w-[150px]">必要金屬參考夾具</th>
                <th className="py-3 px-4 min-w-[200px]">合格 Pass 標準</th>
                <th className="py-3 px-4 w-28 text-center">內嵌圖表</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredClauses.map((clause) => {
                const isExpanded = expandedClauseId === clause.id;
                const svgKey = getClauseSvgKey(clause.id);
                const figInfo = ANNEX_C_FIGURES[svgKey];

                return (
                  <React.Fragment key={clause.id}>
                    <tr 
                      onClick={() => setExpandedClauseId(isExpanded ? null : clause.id)}
                      className={`cursor-pointer transition ${isExpanded ? 'bg-blue-50/70 border-l-4 border-l-blue-600' : 'hover:bg-slate-50'}`}
                    >
                      <td className="py-3 px-4 font-bold font-mono text-center text-blue-700 bg-slate-50/50">
                        {clause.id}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {clause.title}
                      </td>
                      <td className="py-3 px-4 font-mono font-semibold text-blue-800">
                        {clause.iso7}
                      </td>
                      <td className="py-3 px-4 font-mono font-semibold text-purple-800">
                        {clause.iso20}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-800">
                        {clause.assemblyTorque}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">
                        {clause.testPressure !== '-' && <span className="text-blue-600">{clause.testPressure}</span>}
                        {clause.testForce !== '-' && <span className="text-emerald-600">{clause.testForce}</span>}
                        {clause.testTorque !== '-' && <span className="text-amber-600">{clause.testTorque}</span>}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-800">
                        {clause.holdTime}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-800">
                        {clause.fixture}
                      </td>
                      <td className="py-3 px-4 text-slate-700 leading-relaxed bg-slate-50/30">
                        {clause.criteria}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedClauseId(isExpanded ? null : clause.id);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 mx-auto ${
                            isExpanded 
                              ? 'bg-blue-600 text-white shadow-xs' 
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
                          }`}
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{isExpanded ? '收合' : '圖表'}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </td>
                    </tr>

                    {/* Inline Embedded Figure Drawer */}
                    {isExpanded && (
                      <tr className="bg-slate-50/90 border-b-2 border-blue-200">
                        <td colSpan={10} className="p-4 sm:p-6">
                          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-lg space-y-4">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                              <div className="flex items-center space-x-2">
                                <span className="bg-purple-100 text-purple-800 font-mono font-bold text-xs px-2.5 py-1 rounded-md border border-purple-200">
                                  {clause.iso7} 內嵌規範圖示 (SVG CAD / 3D Render)
                                </span>
                                <h4 className="font-bold text-slate-900 text-sm">{clause.title} — 規範實驗裝置與 CAD 圖解</h4>
                              </div>
                              <span className="text-xs text-slate-400 font-mono">
                                研發防呆風險: <strong className="text-rose-600 font-sans">{clause.risk}</strong>
                              </span>
                            </div>

                            {/* Embedded ISO Figure Renderer */}
                            <div className="w-full flex justify-center py-2">
                              <ISOStandardFigureRenderer
                                svgKey={svgKey}
                                titleZh={figInfo?.nameZh || clause.title}
                                titleEn={figInfo?.name || clause.iso7}
                                standard={figInfo?.standardOwner || 'ISO 80369-20:2024'}
                                figureTypeZh={figInfo?.annexGroup || '測試方法圖解'}
                                descriptionZh={figInfo?.descriptionZh || clause.criteria}
                                keyCallouts={figInfo?.svgHighlights}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
