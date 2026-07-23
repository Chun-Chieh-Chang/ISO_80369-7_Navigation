import React, { useState } from 'react';
import { ISO_TOPICS, STANDARD_CLAUSE_DETAILS } from '../data/isoTopicsData';
import { ISO_CLAUSES } from '../data/isoData';
import { Table, Search, Download, Filter, Info, CheckCircle2, AlertTriangle, ArrowUpDown } from 'lucide-react';

export const ClauseComparisonMatrix: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

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
      title: '6.1 正壓流體洩漏 (Fluid Leakage)',
      iso7: 'Clause 6.1',
      iso20: 'Annex B (壓降) / Annex C (水滴)',
      category: 'leakage',
      categoryZh: '洩漏',
      type: 'Lock & Slip',
      assemblyTorque: '0.08 - 0.12 N·m',
      testPressure: '300 - 330 kPa',
      testForce: '-',
      testTorque: '-',
      holdTime: '≥ 10 秒 (壓降) / 30 秒 (水滴)',
      fixture: 'Fig.C.1 (母) / Fig.C.4 (公)',
      criteria: '加壓 300~330 kPa 保持 10 秒無水滴滲漏，或壓降洩漏率 < 0.005 Pa·m³/s',
      risk: '射出成型毛邊、6% 錐度縮水變形'
    },
    {
      id: '6.2',
      title: '6.2 負壓空氣與抽吸洩漏 (Sub-atmospheric Air Leakage)',
      iso7: 'Clause 6.2',
      iso20: 'Annex D (負壓衰減) / Annex K (水下氣泡)',
      category: 'leakage',
      categoryZh: '洩漏',
      type: 'Lock & Slip',
      assemblyTorque: '0.08 - 0.12 N·m',
      testPressure: '80 - 88 kPa 真空',
      testForce: '-',
      testTorque: '-',
      holdTime: '10 - 15 秒',
      fixture: 'Fig.C.1 (母) / Fig.C.4 (公)',
      criteria: '80~88 kPa 負壓真空下空氣洩漏率 < 0.005 Pa·m³/s，或水下無連續氣泡冒出',
      risk: '負壓時錐面微幅收縮脫離產生微氣孔致氣栓'
    },
    {
      id: '6.3',
      title: '6.3 耐環境應力龜裂 (Environmental Stress Cracking)',
      iso7: 'Clause 6.3',
      iso20: 'Annex E',
      category: 'durability',
      categoryZh: '耐久',
      type: 'Lock & Slip',
      assemblyTorque: '0.08 - 0.12 N·m',
      testPressure: '-',
      testForce: '-',
      testTorque: '-',
      holdTime: '48 小時',
      fixture: 'Fig.C.1 (母) / Fig.C.4 (公)',
      criteria: '裝配後浸泡於 70% IPA 異丙醇等化學介質靜置 48 小時無結構爆裂或龜裂',
      risk: 'PC 材質射出殘留內應力高，接觸酒精發生應力爆裂'
    },
    {
      id: '6.4',
      title: '6.4 抗軸向負載分離 (Resistance to Separation from Axial Load)',
      iso7: 'Clause 6.4',
      iso20: 'Annex F',
      category: 'mechanical',
      categoryZh: '機械',
      type: 'Lock (35N) / Slip (25N)',
      assemblyTorque: '0.08 - 0.12 N·m',
      testPressure: '-',
      testForce: '32 - 35 N (Lock) / 23 - 25 N (Slip)',
      testTorque: '-',
      holdTime: '10 - 15 秒',
      fixture: 'Fig.C.3 (母極限) / Fig.C.6 (公極限)',
      criteria: '承受 35 N 軸向拉力 10~15 秒，接頭螺紋與錐面不得被拉拔分離',
      risk: '螺紋咬合深度不足，耳翼被直接剪切拉平'
    },
    {
      id: '6.5',
      title: '6.5 抗旋鬆分離與拆卸測試 (Resistance to Unscrewing)',
      iso7: 'Clause 6.5',
      iso20: 'Annex G (反旋) / Annex I (拆卸)',
      category: 'mechanical',
      categoryZh: '機械',
      type: 'Lock only',
      assemblyTorque: '0.08 - 0.12 N·m',
      testPressure: '-',
      testForce: '-',
      testTorque: '0.018 - 0.020 N·m (反向)',
      holdTime: '10 - 15 秒',
      fixture: 'Fig.C.1 (母) / Fig.C.4 (公)',
      criteria: '施加 0.02 N·m 反向旋鬆力 10~15 秒，錐面摩擦力維持自鎖不自動解鎖',
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
      fixture: 'Fig.C.3 (2.71mm 窄耳翼最壞情況)',
      criteria: '0.15~0.17 N·m 高扭力下維持 5~10 秒無滑牙、套環無膨脹脫開',
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
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                <Table className="w-3.5 h-3.5" />
                標準雙向對照矩陣
              </span>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                ISO 80369-7 (條文) vs ISO 80369-20 (測試細則) 橫向對照矩陣
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              可一目瞭然比較 ISO 80369-7 規範要求與 ISO 80369-20 實驗室測試方法之間的裝配扭力、加壓/加力數值、保持時間與必備 Annex C 金屬參考夾具。
            </p>
          </div>

          <button
            onClick={exportCSV}
            className="flex items-center space-x-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>匯出 CSV 對照表</span>
          </button>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400 font-medium">篩選領域:</span>
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
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  filterType === f.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="搜尋矩陣條文..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Responsive Table Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
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
                <th className="py-3 px-4 min-w-[220px]">合格 Pass 標準</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredClauses.map((clause) => (
                <tr key={clause.id} className="hover:bg-blue-50/40 transition">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
