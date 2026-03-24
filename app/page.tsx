'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Settings, 
  FileText, 
  Users, 
  ShieldCheck, 
  ChevronRight, 
  ChevronDown, 
  Printer, 
  Send, 
  X, 
  MessageSquare, 
  Trash2, 
  Edit, 
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
  Eye,
  Calendar,
  Lock
} from 'lucide-react';

function GlobalSettingsRow({ topic }: { topic: string }) {
  const [downloadOn, setDownloadOn] = useState(true);
  const [commentOn, setCommentOn] = useState(true);

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="py-4 px-6 font-medium text-gray-800">{topic}</td>
      <td className="py-4 px-6 text-center">
        <div className="inline-flex items-center justify-center gap-1 text-gray-400 bg-gray-100 px-3 py-1 rounded-full text-xs font-bold">
          <Lock size={12} /> 必選
        </div>
      </td>
      <td className="py-4 px-6 text-center">
        <div 
          onClick={() => setDownloadOn(!downloadOn)}
          className={`inline-block w-11 h-6 rounded-full relative cursor-pointer transition-colors duration-200 ${downloadOn ? 'bg-[#1890FF]' : 'bg-gray-300'}`}
        >
          <motion.div 
            animate={{ x: downloadOn ? 20 : 0 }}
            className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"
          />
        </div>
      </td>
      <td className="py-4 px-6 text-center">
        <div 
          onClick={() => setCommentOn(!commentOn)}
          className={`inline-block w-11 h-6 rounded-full relative cursor-pointer transition-colors duration-200 ${commentOn ? 'bg-[#1890FF]' : 'bg-gray-300'}`}
        >
          <motion.div 
            animate={{ x: commentOn ? 20 : 0 }}
            className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"
          />
        </div>
      </td>
      <td className="py-4 px-6">
        <select className="border border-gray-300 rounded-lg p-2 text-sm bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#1890FF] outline-none transition-all">
          <option>不設限</option>
          <option>3天</option>
          <option>7天</option>
          <option>14天</option>
        </select>
      </td>
    </tr>
  );
}

export default function AssessmentSystem() {
  const [publishModalState, setPublishModalState] = React.useState<string | null>(null);
  const [showSettingsModal, setShowSettingsModal] = React.useState(false);
  const [isListExpanded, setIsListExpanded] = React.useState(false);

  // Navigation State
  const [activeTab, setActiveTab] = useState<'print' | 'tasks' | 'settings' | 'report-list'>('settings');
  
  // Modal State
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [isDownloadOn, setIsDownloadOn] = useState(true);
  const [isCommentOn, setIsCommentOn] = useState(true);
  const [publishMode, setPublishMode] = useState<'immediate' | 'scheduled'>('immediate');
  
  // Report Generation Modal State
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('professional');
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  
  // Publish Confirm Modal State
  const [isPublishConfirmModalOpen, setIsPublishConfirmModalOpen] = useState(false);
  
  // Side Panel State
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  
  // Mock Data for Modal Context
  const [modalContext, setModalContext] = useState({ task: '巴特一家的新生活', target: '上午高班 A' });

  const mockStudents = [
    { id: 1, name: '陳凱晴', published: false },
    { id: 2, name: '陳柏皓', published: false },
    { id: 3, name: '陳雅琳', published: false },
    { id: 4, name: '張爾庭', published: false },
    { id: 5, name: '鍾佳殷', published: false },
    { id: 6, name: '馮柏淳', published: false },
    { id: 7, name: '馮奕燊', published: false },
    { id: 8, name: '何奕梆', published: true },
    { id: 9, name: '葉芊柔', published: false },
    { id: 10, name: '古珞辰', published: false },
  ];

  const handleSelectAllStudents = () => setSelectedStudents(mockStudents.map(s => s.id));
  const handleDeselectAllStudents = () => setSelectedStudents([]);
  const handleSelectUnpublished = () => setSelectedStudents(mockStudents.filter(s => !s.published).map(s => s.id));
  const handleToggleStudent = (id: number) => {
    setSelectedStudents(prev => prev.includes(id) ? prev.filter(sId => sId !== id) : [...prev, id]);
  };

  const handleUnpublish = () => {
    alert("確定要將此評估下架？下架後家長將無法繼續查看此報告。");
  };

  const openPublishModal = (task: string, target: string) => {
    setModalContext({ task, target });
    setIsPublishModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 font-sans overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0 z-30">
        <div className="p-4 flex items-center gap-3 border-b border-gray-100">
          <div className="w-8 h-8 bg-blue-100 text-[#1890FF] rounded-full flex items-center justify-center font-bold text-lg">K</div>
          <div>
            <h1 className="font-bold text-sm text-gray-800">EVI 行政管理平台</h1>
            <p className="text-[10px] text-gray-500 leading-tight mt-0.5">中華基督教會元朗堂真光幼稚園<br/>(正校及二校)</p>
          </div>
        </div>

        <div className="m-4 p-3 bg-gray-50 rounded-lg flex items-center gap-3 border border-gray-100">
          <div className="w-10 h-10 bg-pink-200 rounded-full flex-shrink-0"></div>
          <div className="text-xs">
            <p className="font-bold text-gray-800">admin</p>
            <p className="text-gray-600">高班測試班別</p>
            <p className="text-gray-500">系統管理員</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto custom-scrollbar">
          <div className="pt-2 pb-1 px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">主選單</div>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <LayoutDashboard size={18} /> 主頁面
          </button>
          
          <div className="pt-4 pb-1 px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">基本設置</div>
          <button 
            onClick={() => setActiveTab('tasks')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ${activeTab === 'tasks' ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <ClipboardList size={18} /> 評估任務列表
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <Settings size={18} /> 分值方案設定
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <ShieldCheck size={18} /> FamilyApp 發佈設定
          </button>

          <div className="pt-4 pb-1 px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">進行評分</div>
          <button 
            onClick={() => setActiveTab('report-list')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ${activeTab === 'report-list' || activeTab === 'print' ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <FileText size={18} /> 生成整合式評量報告
          </button>
          
          <div className="pt-4 pb-1 px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">帳號管理</div>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <Users size={18} /> 教職員管理
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <ShieldCheck size={18} /> 權限管理
          </button>
        </nav>
        <div className="p-4 text-[10px] text-gray-400 border-t border-gray-100">Version: 1.0.97</div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-8 flex-shrink-0">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>首頁</span>
            <ChevronRight size={14} />
            <span className="text-gray-800 font-medium">
              {activeTab === 'print' || activeTab === 'report-list' ? '生成整合式評量報告' : activeTab === 'tasks' ? '評估任務列表' : 'FamilyApp 發佈設定'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-gray-600">繁</button>
            <div className="w-8 h-8 bg-pink-200 rounded-full"></div>
          </div>
        </header>

        {/* View Container */}
        <div className="flex-1 overflow-hidden flex flex-col">
          
          {/* TAB 0: Report List Page */}
          {activeTab === 'report-list' && (
            <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">生成整合式評量報告</h2>
              </div>

              {/* Filters */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-wrap gap-4 items-end">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400">學年</label>
                  <select className="border border-gray-200 rounded-lg p-2 text-sm w-40 bg-gray-50">
                    <option>2025-2026</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400">學期</label>
                  <select className="border border-gray-200 rounded-lg p-2 text-sm w-40 bg-gray-50">
                    <option>下學期</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400">年級</label>
                  <select className="border border-gray-200 rounded-lg p-2 text-sm w-40 bg-gray-50">
                    <option>高班</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400">班級</label>
                  <select className="border border-gray-200 rounded-lg p-2 text-sm w-40 bg-gray-50">
                    <option>全部</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400">任務類別</label>
                  <select className="border border-gray-200 rounded-lg p-2 text-sm w-40 bg-gray-50">
                    <option>主題</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400">任務狀態</label>
                  <select className="border border-gray-200 rounded-lg p-2 text-sm w-40 bg-gray-50">
                    <option>全部</option>
                  </select>
                </div>
                <div className="flex-1 min-w-[200px] space-y-1">
                  <label className="text-xs font-bold text-gray-400">搜尋</label>
                  <input type="text" placeholder="搜尋..." className="w-full border border-gray-200 rounded-lg p-2 text-sm bg-gray-50" />
                </div>
                <button className="bg-[#1890FF] text-white px-8 py-2 rounded-lg font-bold hover:bg-blue-600 transition-colors">查詢</button>
              </div>

              {/* Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
                    <tr>
                      <th className="py-4 px-6">評估任務名稱(中文)</th>
                      <th className="py-4 px-6">類別</th>
                      <th className="py-4 px-6">評估對象</th>
                      <th className="py-4 px-6">狀態</th>
                      <th className="py-4 px-6">評估日期</th>
                      <th className="py-4 px-6 text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { target: '高班 測試班別' },
                      { target: '高班 下午高班善班' },
                      { target: '高班 上午高班善班' },
                      { target: '高班 下午高班愛班' },
                      { target: '高班 上午高班愛班' },
                      { target: '高班 下午高班望班' },
                      { target: '高班 上午高班望班' },
                      { target: '高班 下午高班信班' },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6 text-[#1890FF] font-medium">我上小學了</td>
                        <td className="py-4 px-6">主題</td>
                        <td className="py-4 px-6 font-medium">{row.target}</td>
                        <td className="py-4 px-6 font-medium">進行中</td>
                        <td className="py-4 px-6">15/06/2026 - 26/06/2026</td>
                        <td className="py-4 px-6">
                          <div className="flex justify-end gap-2">
                            <button className="bg-[#1890FF] text-white px-4 py-1.5 rounded-md text-xs font-bold hover:bg-blue-600 transition-colors flex items-center gap-1">
                              <Edit size={14} /> 其他評量資訊
                            </button>
                            <button 
                              onClick={() => setIsReportModalOpen(true)}
                              className="bg-[#1890FF] text-white px-4 py-1.5 rounded-md text-xs font-bold hover:bg-blue-600 transition-colors flex items-center gap-1"
                            >
                              <Printer size={14} /> 列印與發佈
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 1: Print Preview Page */}
          {activeTab === 'print' && (
            <div className="flex-1 flex overflow-hidden">
              {/* Left: PDF Preview */}
              <div className="flex-1 bg-gray-200 p-8 overflow-y-auto flex justify-center custom-scrollbar">
                <div className="bg-white w-[794px] min-h-[1123px] shadow-xl p-12 relative flex flex-col">
                  {/* PDF Header */}
                  <div className="flex justify-between items-start border-b-2 border-black pb-4 mb-6">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 bg-green-800 rounded-full flex items-center justify-center text-white font-bold text-2xl">光真</div>
                      <div>
                        <h2 className="text-xl font-bold">中華基督教會元朗堂真光幼稚園</h2>
                        <p className="text-sm text-gray-600">Yuen Long Church (CCC) Chan Kwong Kindergarten</p>
                      </div>
                    </div>
                    <div className="border border-black px-3 py-1 text-sm font-bold">下學期</div>
                  </div>

                  {/* PDF Title */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold tracking-widest">教師評估：我上小學了</h3>
                    <p className="text-sm mt-2">評估日期：15-06-2026 - 26-06-2026</p>
                  </div>

                  {/* Student Info */}
                  <div className="flex justify-end gap-12 mb-6 text-sm">
                    <p><span className="font-bold">學生姓名：</span> 陳柏皓</p>
                    <p><span className="font-bold">班別：</span> 下午高班善班</p>
                  </div>

                  {/* Table Content (Simplified) */}
                  <table className="w-full border-collapse border border-black text-xs">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-black p-2 w-24">項目</th>
                        <th className="border border-black p-2">內容</th>
                        <th className="border border-black p-2 w-12 text-center">🚲</th>
                        <th className="border border-black p-2 w-12 text-center">🚗</th>
                        <th className="border border-black p-2 w-12 text-center">🚆</th>
                        <th className="border border-black p-2 w-12 text-center">🚀</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td rowSpan={3} className="border border-black p-2 font-bold text-center">體能與健康</td>
                        <td className="border border-black p-2">能掌握單手運球的動作</td>
                        <td className="border border-black p-2"></td><td className="border border-black p-2"></td><td className="border border-black p-2"></td><td className="border border-black p-2"></td>
                      </tr>
                      <tr>
                        <td className="border border-black p-2">能在 1.5厘米方格內寫字不出界</td>
                        <td className="border border-black p-2"></td><td className="border border-black p-2"></td><td className="border border-black p-2"></td><td className="border border-black p-2"></td>
                      </tr>
                      <tr>
                        <td className="border border-black p-2">懂得在危險情況下求助</td>
                        <td className="border border-black p-2"></td><td className="border border-black p-2"></td><td className="border border-black p-2"></td><td className="border border-black p-2"></td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td rowSpan={3} className="border border-black p-2 font-bold text-center">語文</td>
                        <td className="border border-black p-2">能模仿角色朗讀故事</td>
                        <td className="border border-black p-2"></td><td className="border border-black p-2"></td><td className="border border-black p-2"></td><td className="border border-black p-2"></td>
                      </tr>
                      <tr>
                        <td className="border border-black p-2">能認讀字詞：「課本」、「文具」、「小學」和「畢業」</td>
                        <td className="border border-black p-2"></td><td className="border border-black p-2"></td><td className="border border-black p-2"></td><td className="border border-black p-2"></td>
                      </tr>
                      <tr>
                        <td className="border border-black p-2">能運用句式：「操場上有有的學生______，有的學生______。」</td>
                        <td className="border border-black p-2"></td><td className="border border-black p-2"></td><td className="border border-black p-2"></td><td className="border border-black p-2"></td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <div className="mt-auto pt-8 flex justify-between items-end border-t border-gray-100">
                    <p className="text-[10px] text-gray-400 italic">「教養孩童，使他走當行的道，就是到老他也不偏離。」—— 箴言 22:6</p>
                    <div className="text-right">
                      <p className="text-xs font-bold">校長簽署：____________________</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Settings Panel */}
              <div className="w-80 bg-gray-100 border-l border-gray-200 p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
                <h4 className="font-bold text-gray-800">列印設定</h4>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
                    <span className="text-sm">分頁設定</span>
                    <div className="w-10 h-5 bg-gray-300 rounded-full relative cursor-pointer">
                      <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
                    <span className="text-sm">雙面列印</span>
                    <div className="w-10 h-5 bg-gray-300 rounded-full relative cursor-pointer">
                      <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">字體大小</label>
                  <select className="w-full bg-white border border-gray-300 rounded-lg p-2 text-sm">
                    <option>11</option>
                    <option>12</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">列印字型</label>
                  <select className="w-full bg-white border border-gray-300 rounded-lg p-2 text-sm">
                    <option>Arial, 微軟正黑體</option>
                  </select>
                </div>

                <div className="mt-auto space-y-3">
                  <button className="w-full bg-[#1890FF] text-white py-3 rounded-lg font-bold shadow-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                    <Printer size={18} /> 列印
                  </button>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => setShowSettingsModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors w-full">發佈至 FamilyApp</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Task List */}
          {activeTab === 'tasks' && (
            <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">任務列表</h2>
                <button className="bg-[#1890FF] text-white px-6 py-2 rounded-lg font-bold shadow-sm hover:bg-blue-600 transition-colors">
                  + 新任務
                </button>
              </div>

              {/* Filters */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-wrap gap-4 items-end">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400">學年</label>
                  <select className="border border-gray-200 rounded-lg p-2 text-sm w-40 bg-gray-50">
                    <option>2025-2026</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400">學期</label>
                  <select className="border border-gray-200 rounded-lg p-2 text-sm w-40 bg-gray-50">
                    <option>下學期</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400">年級</label>
                  <select className="border border-gray-200 rounded-lg p-2 text-sm w-40 bg-gray-50">
                    <option>高班</option>
                  </select>
                </div>
                <div className="flex-1 min-w-[200px] space-y-1">
                  <label className="text-xs font-bold text-gray-400">搜尋</label>
                  <input type="text" placeholder="搜尋任務名稱..." className="w-full border border-gray-200 rounded-lg p-2 text-sm bg-gray-50" />
                </div>
                <button className="bg-[#1890FF] text-white px-8 py-2 rounded-lg font-bold hover:bg-blue-600 transition-colors">查詢</button>
              </div>

              {/* Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
                    <tr>
                      <th className="py-4 px-6">評估對象</th>
                      <th className="py-4 px-6">評估任務名稱</th>
                      <th className="py-4 px-6">狀態</th>
                      <th className="py-4 px-6">建立時間</th>
                      <th className="py-4 px-6 text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {/* Row 1: Not Published */}
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-medium">上午高班 A</td>
                      <td className="py-4 px-6">巴特一家的新生活</td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">未發佈</span>
                      </td>
                      <td className="py-4 px-6 text-gray-400">2026-03-11 15:42</td>
                      <td className="py-4 px-6">
                        <div className="flex justify-end gap-2">
                        </div>
                      </td>
                    </tr>

                    {/* Row 2: Published */}
                    <tr className="hover:bg-gray-50 transition-colors bg-blue-50/20">
                      <td className="py-4 px-6 font-medium">下午高班 B</td>
                      <td className="py-4 px-6">拯救小海豚</td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">已發佈</span>
                      </td>
                      <td className="py-4 px-6 text-gray-400">2026-03-11 15:30</td>
                      <td className="py-4 px-6">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => setIsSidePanelOpen(true)}
                            className="bg-[#1890FF] text-white px-4 py-1.5 rounded-md text-xs font-bold hover:bg-blue-600 transition-colors"
                          >
                            互動追蹤 (20/30)
                          </button>
                          <button 
                            onClick={handleUnpublish}
                            className="bg-white border border-gray-300 text-gray-600 px-4 py-1.5 rounded-md text-xs font-bold hover:bg-gray-50 transition-colors"
                          >
                            下架
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: Global Settings */}
          {activeTab === 'settings' && (
            <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">FamilyApp 發佈設定</h2>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
                    <tr>
                      <th className="py-4 px-6">主題</th>
                      <th className="py-4 px-6 text-center">允許預覽</th>
                      <th className="py-4 px-6 text-center">允許下載</th>
                      <th className="py-4 px-6 text-center">允許留言</th>
                      <th className="py-4 px-6">預設留言截止</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    <GlobalSettingsRow topic="自動化總評" />
                    <GlobalSettingsRow topic="獨立總評" />
                    <GlobalSettingsRow topic="持續性評估" />
                  </tbody>
                </table>
              </div>

              {/* Office Hours Setting */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mt-8 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-1">辦公時間設定</h2>
                <p className="text-sm text-gray-500 mb-5">設定老師的預設辦公時間。於非辦公時間，家長端將顯示延遲回覆提示，降低家長等待焦慮。</p>
                
                <div className="bg-gray-50/50 p-5 rounded-lg border border-gray-200 flex flex-col gap-4">
                  {/* Row 1 (Weekdays - Full Day) */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                      <span className="font-medium text-gray-700">星期一 至 星期五</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="time" defaultValue="08:00" className="border border-gray-300 rounded-md px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                      <span className="text-gray-500 text-sm">至</span>
                      <input type="time" defaultValue="17:00" className="border border-gray-300 rounded-md px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>

                  {/* Row 2 (Saturday - Half Day) */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                      <span className="font-medium text-gray-700">星期六</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="time" defaultValue="09:00" className="border border-gray-300 rounded-md px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                      <span className="text-gray-500 text-sm">至</span>
                      <input type="time" defaultValue="13:00" className="border border-gray-300 rounded-md px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>

                  {/* Row 3 (Sunday - Closed) */}
                  <div className="flex items-center justify-between opacity-60">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                      <span className="font-medium text-gray-700">星期日</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 mr-2">(休息日)</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">儲存設定</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ========================================== */}
        {/* OVERLAY 1: Publish Modal                   */}
        {/* ========================================== */}
        <AnimatePresence>
          {isPublishModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-white rounded-2xl shadow-2xl w-[540px] max-w-full overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">發佈至 FamilyApp</h2>
                      <p className="text-sm text-gray-500 mt-1">設定家長端的可見權限與發佈時間</p>
                    </div>
                    <button 
                      onClick={() => setIsPublishModalOpen(false)} 
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-[#1890FF] shadow-sm flex-shrink-0">
                      <FileText size={20} />
                    </div>
                    <p className="text-sm text-blue-800 leading-relaxed">
                      系統已自動套用全校預設，將發佈 <span className="font-bold">【{modalContext.task}】</span> 給 <span className="font-bold">【{modalContext.target}】</span> 的家長。
                    </p>
                  </div>

                  {/* Accordion Area */}
                  <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm mb-6">
                    <motion.div 
                      initial={false}
                      animate={{ height: isAdvancedOpen ? 'auto' : 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 bg-gray-50 space-y-6">
                        {/* Toggles */}
                        <div className="grid grid-cols-1 gap-4">
                          <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg border border-green-100">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                                <CheckCircle2 size={16} />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-green-800">✅ 家長將可於 FamilyApp 內預覽此報告</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
                                <Download size={16} />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-gray-700">允許下載</p>
                                <p className="text-[10px] text-gray-400">家長可下載 PDF 存檔</p>
                              </div>
                            </div>
                            <div 
                              onClick={() => setIsDownloadOn(!isDownloadOn)}
                              className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors duration-200 ${isDownloadOn ? 'bg-[#1890FF]' : 'bg-gray-300'}`}
                            >
                              <motion.div 
                                animate={{ x: isDownloadOn ? 20 : 0 }}
                                className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                                <MessageSquare size={16} />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-gray-700">允許留言</p>
                                <p className="text-[10px] text-gray-400">家長可針對評估進行回饋</p>
                              </div>
                            </div>
                            <div 
                              onClick={() => setIsCommentOn(!isCommentOn)}
                              className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors duration-200 ${isCommentOn ? 'bg-[#1890FF]' : 'bg-gray-300'}`}
                            >
                              <motion.div 
                                animate={{ x: isCommentOn ? 20 : 0 }}
                                className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Dynamic Comment Date */}
                        <AnimatePresence>
                          {isCommentOn && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pt-4 border-t border-gray-200"
                            >
                              <div className="flex items-center justify-between">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                  <Calendar size={16} className="text-gray-400" />
                                  留言截止日期
                                </label>
                                <input 
                                  type="date" 
                                  defaultValue="2026-03-20" 
                                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#1890FF] outline-none transition-all" 
                                />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Schedule Area */}
                        <div className="pt-4 border-t border-gray-200 space-y-4">
                          <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <Clock size={16} className="text-gray-400" />
                            發佈時間設定
                          </label>
                          <div className="flex bg-white border border-gray-200 rounded-xl p-1 shadow-inner">
                            <button 
                              onClick={() => setPublishMode('immediate')}
                              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${publishMode === 'immediate' ? 'bg-[#1890FF] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                            >
                              立即發佈
                            </button>
                            <button 
                              onClick={() => setPublishMode('scheduled')}
                              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${publishMode === 'scheduled' ? 'bg-[#1890FF] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                            >
                              排程發佈
                            </button>
                          </div>
                          <AnimatePresence>
                            {publishMode === 'scheduled' && (
                              <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="pt-2"
                              >
                                <input 
                                  type="datetime-local" 
                                  className="w-full border border-gray-300 rounded-xl p-3 text-sm bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#1890FF] outline-none transition-all" 
                                />
                                <p className="text-[10px] text-gray-400 mt-2 px-1">系統將於指定時間自動推送通知給家長</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="mt-8 flex justify-between items-center">
                    <button 
                      onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                      className="text-sm font-bold text-[#1890FF] flex items-center gap-2 hover:text-blue-600 transition-colors"
                    >
                      {isAdvancedOpen ? '[-] 收起進階設定' : '[+] 展開進階設定'}
                    </button>
                    <button 
                      onClick={() => {
                        alert("發佈成功！");
                        setIsPublishModalOpen(false);
                      }}
                      className="bg-[#1890FF] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-600 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <Send size={18} />
                      {publishMode === 'immediate' ? '立即發佈' : '確認排程'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================== */}
        {/* OVERLAY 2: Side Panel Tracking             */}
        {/* ========================================== */}
        <motion.div 
          initial={false}
          animate={{ x: isSidePanelOpen ? 0 : '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-y-0 right-0 w-[640px] bg-white shadow-2xl z-40 flex flex-col"
        >
          {/* Panel Header */}
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white flex-shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-[#1890FF] rounded-xl flex items-center justify-center">
                <LayoutDashboard size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">互動追蹤：下午高班 B</h3>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <FileText size={12} /> 任務：拯救小海豚
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsSidePanelOpen(false)} 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
            >
              <X size={24} className="text-gray-400 group-hover:text-gray-600" />
            </button>
          </div>

          {/* Panel Content (Scrollable) */}
          <div className="flex-1 overflow-y-auto custom-scrollbar bg-gray-50 flex flex-col">
            {/* Stats Summary */}
            <div className="grid grid-cols-3 gap-4 p-6">
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-[10px] font-bold text-gray-400 uppercase">已讀率</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">85%</p>
                <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                  <div className="w-[85%] h-full bg-blue-500"></div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-[10px] font-bold text-gray-400 uppercase">下載率</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">42%</p>
                <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                  <div className="w-[42%] h-full bg-green-500"></div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-[10px] font-bold text-gray-400 uppercase">待回覆</p>
                <p className="text-2xl font-bold text-red-500 mt-1">3</p>
                <p className="text-[10px] text-gray-400 mt-2">需要老師關注</p>
              </div>
            </div>

            {/* Student Table */}
            <div className="px-6 pb-6">
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
                    <tr>
                      <th className="py-4 px-6">學生姓名</th>
                      <th className="py-4 px-6">已讀時間</th>
                      <th className="py-4 px-6">下載時間</th>
                      <th className="py-4 px-6">留言狀態</th>
                      <th className="py-4 px-6 text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    <tr className="hover:bg-blue-50/30 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold">陳</div>
                          <span className="font-bold text-gray-700">陳小明</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-500">03-16 10:30</td>
                      <td className="py-4 px-6 text-gray-400">-</td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> 待回覆
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button className="text-[#1890FF] font-bold hover:underline flex items-center gap-1 ml-auto">
                          查看對話 <ChevronRight size={14} />
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-50/30 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">李</div>
                          <span className="font-bold text-gray-700">李心怡</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-400">-</td>
                      <td className="py-4 px-6 text-gray-400">-</td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-400 text-[10px] font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> 無留言
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button disabled className="text-gray-300 cursor-not-allowed">查看對話</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-50/30 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">王</div>
                          <span className="font-bold text-gray-700">王大文</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-500">03-16 09:15</td>
                      <td className="py-4 px-6 text-gray-500">03-16 09:20</td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-[10px] font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> 已回覆
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button className="text-[#1890FF] font-bold hover:underline flex items-center gap-1 ml-auto">
                          查看對話 <ChevronRight size={14} />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Chat Box Area */}
            <div className="px-6 pb-8 mt-auto">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg flex flex-col h-[450px] overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold">陳</div>
                    <div>
                      <span className="text-sm font-bold text-gray-800 block">陳小明 家長</span>
                      <span className="text-[10px] text-green-500 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> 線上
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400"><Settings size={16} /></button>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="flex-1 p-6 overflow-y-auto space-y-6 custom-scrollbar bg-[#F0F2F5]">
                  <div className="flex justify-center">
                    <span className="bg-white/90 text-[10px] px-3 py-1 rounded-full shadow-sm text-gray-500 font-medium">2026年3月16日</span>
                  </div>
                  
                  {/* Parent Message */}
                  <div className="flex justify-start items-end gap-2">
                    <div className="w-6 h-6 bg-pink-100 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] text-pink-600 font-bold">陳</div>
                    <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm max-w-[85%] relative">
                      <p className="text-sm text-gray-800 leading-relaxed">老師您好，想請問這個項目的意思，小明在家裡需要特別準備什麼材料嗎？</p>
                      <span className="text-[10px] text-gray-400 block text-right mt-2">10:35</span>
                    </div>
                  </div>

                  {/* Teacher Message */}
                  <div className="flex justify-end items-end gap-2">
                    <div className="bg-[#DCF8C6] p-4 rounded-2xl rounded-br-none shadow-sm max-w-[85%] relative">
                      <p className="text-sm text-gray-800 leading-relaxed">家長您好，這是指下週的勞作課，只需要準備幾個空的紙盒即可，不用特別購買材料喔！</p>
                      <div className="flex items-center justify-end gap-1 mt-2">
                        <span className="text-[10px] text-gray-500">10:42</span>
                        <CheckCircle2 size={12} className="text-blue-500" />
                      </div>
                    </div>
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] text-blue-600 font-bold">師</div>
                  </div>
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-gray-100">
                  <div className="flex gap-3 items-end">
                    <div className="flex-1 relative">
                      <textarea 
                        placeholder="輸入回覆內容..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-3 pr-10 text-sm resize-none h-12 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#1890FF] transition-all"
                      ></textarea>
                      <button className="absolute right-3 bottom-3 text-gray-400 hover:text-gray-600">
                        <AlertCircle size={18} />
                      </button>
                    </div>
                    <button className="bg-[#1890FF] text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all shadow-lg shadow-blue-100 active:scale-95">
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Overlay Backdrop for Side Panel */}
        <AnimatePresence>
          {isSidePanelOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidePanelOpen(false)}
              className="fixed inset-0 bg-black/30 z-30 backdrop-blur-[2px]"
            />
          )}
        </AnimatePresence>

        {/* ========================================== */}
        {/* OVERLAY 3: Report Generation Modal         */}
        {/* ========================================== */}
        <AnimatePresence>
          {isReportModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-white rounded-2xl shadow-2xl w-[900px] max-w-full overflow-hidden flex flex-col max-h-[90vh]"
              >
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white flex-shrink-0">
                  <h2 className="text-xl font-bold text-gray-900">列印報告</h2>
                  <button 
                    onClick={() => setIsReportModalOpen(false)} 
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="flex flex-1 overflow-hidden">
                  {/* Left Side: Templates */}
                  <div className="w-1/2 p-6 border-r border-gray-100 overflow-y-auto custom-scrollbar bg-gray-50/50">
                    <h3 className="text-sm font-bold text-gray-700 mb-4">選擇列印模版</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Template 1 */}
                      <div 
                        onClick={() => setSelectedTemplate('basic')}
                        className={`cursor-pointer rounded-xl border-2 transition-all overflow-hidden bg-white ${selectedTemplate === 'basic' ? 'border-[#1890FF] shadow-md relative' : 'border-transparent shadow-sm hover:border-blue-200'}`}
                      >
                        {selectedTemplate === 'basic' && (
                          <div className="absolute top-0 left-0 bg-[#1890FF] text-white text-[10px] font-bold px-2 py-1 rounded-br-lg z-10">
                            已選擇
                          </div>
                        )}
                        <div className="h-48 bg-gray-100 p-2 relative">
                          {/* Mock Template Image */}
                          <div className="w-full h-full bg-white border border-gray-200 shadow-sm flex flex-col text-[4px] p-2 opacity-80">
                            <div className="h-2 bg-pink-200 mb-1 w-1/2"></div>
                            <div className="h-1 bg-gray-200 mb-2 w-1/3"></div>
                            <div className="flex-1 border border-gray-200 flex flex-col">
                              <div className="h-2 bg-green-100 border-b border-gray-200"></div>
                              <div className="flex-1 flex">
                                <div className="w-1/4 border-r border-gray-200 bg-purple-50"></div>
                                <div className="flex-1 bg-white"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 text-center border-t border-gray-100">
                          <p className="text-sm font-bold text-[#1890FF]">主題模版</p>
                        </div>
                      </div>

                      {/* Template 2 */}
                      <div 
                        onClick={() => setSelectedTemplate('professional')}
                        className={`cursor-pointer rounded-xl border-2 transition-all overflow-hidden bg-white ${selectedTemplate === 'professional' ? 'border-[#1890FF] shadow-md relative' : 'border-transparent shadow-sm hover:border-blue-200'}`}
                      >
                        {selectedTemplate === 'professional' && (
                          <div className="absolute top-0 left-0 bg-[#1890FF] text-white text-[10px] font-bold px-2 py-1 rounded-br-lg z-10">
                            已選擇
                          </div>
                        )}
                        <div className="h-48 bg-gray-100 p-2 relative">
                          <div className="w-full h-full bg-white border border-gray-200 shadow-sm flex flex-col text-[4px] p-2 opacity-80">
                            <div className="h-2 bg-blue-200 mb-1 w-1/2"></div>
                            <div className="h-1 bg-gray-200 mb-2 w-1/3"></div>
                            <div className="flex-1 border border-gray-200 flex flex-col">
                              <div className="h-2 bg-yellow-100 border-b border-gray-200"></div>
                              <div className="flex-1 flex">
                                <div className="w-1/4 border-r border-gray-200 bg-blue-50"></div>
                                <div className="flex-1 bg-white"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 text-center border-t border-gray-100 flex justify-between items-center">
                          <p className="text-sm font-bold text-[#1890FF]">專業版主題模版<br/>(正校)</p>
                          <button className="bg-[#1890FF] text-white text-[10px] px-2 py-1 rounded">編輯</button>
                        </div>
                      </div>

                      {/* Template 3 */}
                      <div 
                        onClick={() => setSelectedTemplate('professional2')}
                        className={`cursor-pointer rounded-xl border-2 transition-all overflow-hidden bg-white ${selectedTemplate === 'professional2' ? 'border-[#1890FF] shadow-md relative' : 'border-transparent shadow-sm hover:border-blue-200'}`}
                      >
                        {selectedTemplate === 'professional2' && (
                          <div className="absolute top-0 left-0 bg-[#1890FF] text-white text-[10px] font-bold px-2 py-1 rounded-br-lg z-10">
                            已選擇
                          </div>
                        )}
                        <div className="h-48 bg-gray-100 p-2 relative">
                          <div className="w-full h-full bg-white border border-gray-200 shadow-sm flex flex-col text-[4px] p-2 opacity-80">
                            <div className="h-2 bg-green-200 mb-1 w-1/2"></div>
                            <div className="h-1 bg-gray-200 mb-2 w-1/3"></div>
                            <div className="flex-1 border border-gray-200 flex flex-col">
                              <div className="h-2 bg-red-100 border-b border-gray-200"></div>
                              <div className="flex-1 flex">
                                <div className="w-1/4 border-r border-gray-200 bg-green-50"></div>
                                <div className="flex-1 bg-white"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 text-center border-t border-gray-100">
                          <p className="text-sm font-bold text-[#1890FF]">專業版主題模版<br/>(二校)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Students */}
                  <div className="w-1/2 p-6 flex flex-col bg-white">
                    <h3 className="text-sm font-bold text-gray-700 mb-4">選擇學生:</h3>
                    
                    <div className="flex gap-2 mb-4">
                      <button 
                        onClick={handleSelectAllStudents}
                        className="bg-[#1890FF] text-white px-4 py-1.5 rounded-md text-xs font-bold hover:bg-blue-600 transition-colors"
                      >
                        全部選擇
                      </button>
                      <button 
                        onClick={handleDeselectAllStudents}
                        className="bg-white border border-[#1890FF] text-[#1890FF] px-4 py-1.5 rounded-md text-xs font-bold hover:bg-blue-50 transition-colors"
                      >
                        全部取消
                      </button>
                      <button 
                        onClick={handleSelectUnpublished}
                        className="bg-gray-100 text-gray-700 px-4 py-1.5 rounded-md text-xs font-bold hover:bg-gray-200 transition-colors ml-auto"
                      >
                        一鍵勾選未發佈
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar border border-gray-200 rounded-lg p-2">
                      {mockStudents.map(student => (
                        <div 
                          key={student.id} 
                          className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                          onClick={() => handleToggleStudent(student.id)}
                        >
                          <input 
                            type="checkbox" 
                            checked={selectedStudents.includes(student.id)}
                            onChange={() => {}} // Handled by parent div click
                            className="w-4 h-4 text-[#1890FF] rounded border-gray-300 focus:ring-[#1890FF]"
                          />
                          <span className="text-sm text-gray-700">{student.name}</span>
                          {student.published && (
                            <span className="ml-auto text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                              ✅ 已發佈
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 flex-shrink-0">
                  <button 
                    onClick={() => setIsReportModalOpen(false)}
                    className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors"
                  >
                    取消
                  </button>
                  <button 
                    onClick={() => {
                      setIsReportModalOpen(false);
                      setActiveTab('print');
                    }}
                    className="px-6 py-2 bg-[#1890FF] text-white rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors flex items-center gap-2 shadow-md"
                  >
                    <Printer size={16} /> 預覽
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* ========================================== */}
        {/* OVERLAY 4: Publish Confirm Modal           */}
        {/* ========================================== */}
        <AnimatePresence>
          {isPublishConfirmModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-white rounded-2xl shadow-2xl w-[500px] max-w-full overflow-hidden p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">發佈確認</h3>
                <p className="text-sm text-gray-600 mb-2">即將以 <span className="font-semibold text-blue-600">中文主題模版</span> 發佈至 FamilyApp。</p>
                <p className="text-sm text-gray-600 mb-4">本次發佈對象共 <span className="font-bold">20</span> 位學生：</p>
                
                <div className="bg-gray-50 h-24 overflow-y-auto p-2 rounded text-sm text-gray-600 mb-4 custom-scrollbar">
                  歐陽曉鋒, 陳玥晴, 周若澄, 蔡曜賢, 鍾靜依... 等20人
                </div>

                <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-md mb-6 flex items-start gap-2">
                  <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                  <span>⚠️ 注意：其中 5 位學生已有發佈紀錄，繼續操作將會以目前模版覆蓋他們舊有的報告版本！</span>
                </div>

                <div className="flex justify-end gap-3">
                  <button 
                    onClick={() => setIsPublishConfirmModalOpen(false)}
                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors"
                  >
                    取消
                  </button>
                  <button 
                    onClick={() => {
                      setIsPublishConfirmModalOpen(false);
                      openPublishModal('我上小學了', '下午高班善班');
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition-colors shadow-md"
                  >
                    確定發佈並覆蓋
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">FamilyApp 發佈設定確認</h3>
            <p className="text-sm text-gray-600 mb-4">
              此發佈將會按 FamilyApp 預設的發佈設定進行。如需修改，請點擊下方展開選單修改。
            </p>
            
            {/* 展開選單區塊 */}
            <details className="mb-6 border border-gray-200 rounded-md p-3 group">
              <summary className="text-sm font-medium text-blue-600 cursor-pointer list-none flex items-center justify-between">
                <span>🔽 展開發佈權限設定</span>
              </summary>
              <div className="mt-4 space-y-3 text-sm text-gray-700">
                <div className="flex justify-between items-center">
                  <span>允許家長下載 PDF</span>
                  <input type="checkbox" defaultChecked className="toggle-checkbox" />
                </div>
                <div className="flex justify-between items-center">
                  <span>允許家長留言</span>
                  <input type="checkbox" defaultChecked className="toggle-checkbox" />
                </div>
                <div className="flex justify-between items-center">
                  <span>預設留言截止</span>
                  <select className="border border-gray-300 rounded px-2 py-1 text-xs">
                    <option>不設限</option>
                    <option>7 天</option>
                    <option>14 天</option>
                  </select>
                </div>
              </div>
            </details>

            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                取消
              </button>
              <button 
                onClick={() => {
                  setShowSettingsModal(false);
                  setPublishModalState('WARNING');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
              >
                確定並下一步
              </button>
            </div>
          </div>
        </div>
      )}

      {publishModalState && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
           <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
               <h3 className="text-lg font-bold text-gray-900 mb-4">發佈確認</h3>
               <p className="text-sm text-gray-600 mb-2">即將以 <span className="font-semibold text-blue-600">中文主題模版</span> 發佈至 FamilyApp。</p>
               <p className="text-sm text-gray-600 mb-4">本次發佈對象共 <span className="font-bold">25</span> 位學生：</p>
               
               {!isListExpanded ? (
                  <div>
                    <p className="text-sm text-gray-500">歐陽曉鋒, 陳玥晴, 周若澄, 蔡曜賢, 鍾靜依...</p>
                    <button onClick={() => setIsListExpanded(true)} className="text-blue-500 text-xs mt-1 hover:underline">[ 🔽 展開顯示全部 25 位學生 ]</button>
                  </div>
               ) : (
                  <div>
                    <div className="bg-gray-50 border border-gray-200 h-32 overflow-y-auto p-2 rounded text-sm text-gray-600 leading-relaxed">
                       歐陽曉鋒, 陳玥晴, 周若澄, 蔡曜賢, 鍾靜依, 張子健, 林心穎, 王宇軒, 李芷晴, 何卓霖, 郭可盈, 鄭梓洋, 吳雨霏, 黃浩然, 馮紫晴, 曾宇翔, 蔡欣妍, 鄧浩賢, 梁凱琳, 羅梓鋒, 彭芷晴, 蘇浩宇, 葉心語, 鍾宇軒, 賴穎恩
                    </div>
                    <button onClick={() => setIsListExpanded(false)} className="text-blue-500 text-xs mt-2 hover:underline">[ 🔼 收起名單 ]</button>
                  </div>
               )}

               {publishModalState === 'WARNING' && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-md mt-4">
                    ⚠️ 注意：其中 5 位學生已有發佈紀錄，繼續操作將會以目前模版覆蓋他們舊有的報告版本！
                  </div>
               )}

               <div className="mt-6 flex justify-end gap-3">
                  <button onClick={() => setPublishModalState(null)} className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 text-sm">取消</button>
                  <button onClick={() => setPublishModalState(null)} className={`px-4 py-2 text-white rounded text-sm ${publishModalState === 'WARNING' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
                    {publishModalState === 'WARNING' ? '確定發佈並覆蓋' : '確定發佈'}
                  </button>
               </div>
           </div>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #D1D5DB;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}
