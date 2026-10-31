import React, { useState } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  MessageSquare,
  Users,
  Bell,
  Settings,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  Search,
  ExternalLink,
  Save,
  RotateCcw,
  Sparkles,
  BarChart3,
  Image as ImageIcon
} from 'lucide-react';
import {
  EducationalResource,
  QuestionPaper,
  StudentReview,
  ContactEnquiry,
  Announcement,
  SiteSettings,
  AcademicStandard,
  SubjectCategory,
  ResourceType
} from '../types';

interface AdminDashboardProps {
  resources: EducationalResource[];
  questionPapers: QuestionPaper[];
  reviews: StudentReview[];
  enquiries: ContactEnquiry[];
  announcements: Announcement[];
  settings: SiteSettings;
  analytics: {
    totalResources: number;
    publishedResources: number;
    totalQuestionPapers: number;
    totalDownloads: number;
    totalViews: number;
    approvedReviews: number;
    pendingReviews: number;
    totalEnquiries: number;
    newEnquiries: number;
  };
  onClose: () => void;
  onAddResource: (resource: Omit<EducationalResource, 'id' | 'updatedAt' | 'downloadsCount' | 'viewsCount'>) => void;
  onUpdateResource: (id: string, updates: Partial<EducationalResource>) => void;
  onDeleteResource: (id: string) => void;
  onAddQuestionPaper: (paper: Omit<QuestionPaper, 'id'>) => void;
  onDeleteQuestionPaper: (id: string) => void;
  onToggleReview: (id: string) => void;
  onDeleteReview: (id: string) => void;
  onUpdateEnquiryStatus: (id: string, status: 'New' | 'Contacted' | 'Resolved') => void;
  onUpdateAnnouncements: (announcements: Announcement[]) => void;
  onUpdateSettings: (settings: Partial<SiteSettings>) => void;
  onResetData: () => void;
}

type AdminTab =
  | 'overview'
  | 'resources'
  | 'question-papers'
  | 'reviews'
  | 'enquiries'
  | 'announcements'
  | 'media'
  | 'settings';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  resources,
  questionPapers,
  reviews,
  enquiries,
  announcements,
  settings,
  analytics,
  onClose,
  onAddResource,
  onUpdateResource,
  onDeleteResource,
  onAddQuestionPaper,
  onDeleteQuestionPaper,
  onToggleReview,
  onDeleteReview,
  onUpdateEnquiryStatus,
  onUpdateAnnouncements,
  onUpdateSettings,
  onResetData
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [resourceModalOpen, setResourceModalOpen] = useState(false);
  const [paperModalOpen, setPaperModalOpen] = useState(false);

  // New Resource Form State
  const [resTitle, setResTitle] = useState('');
  const [resStandard, setResStandard] = useState<AcademicStandard>('HSC 12th');
  const [resSubject, setResSubject] = useState<SubjectCategory>('Bookkeeping & Accountancy');
  const [resType, setResType] = useState<ResourceType>('Study Notes');
  const [resCategory, setResCategory] = useState<'SSC' | 'HSC' | 'Commerce' | 'Writing Skills' | 'Question Papers'>('Commerce');
  const [resDescription, setResDescription] = useState('');
  const [resContent, setResContent] = useState('');
  const [resFileSize, setResFileSize] = useState('2.5 MB');
  const [resPages, setResPages] = useState(16);

  // New Paper Form State
  const [paperTitle, setPaperTitle] = useState('');
  const [paperStandard, setPaperStandard] = useState<'SSC 10th' | 'HSC 12th'>('HSC 12th');
  const [paperSubject, setPaperSubject] = useState<SubjectCategory>('Bookkeeping & Accountancy');
  const [paperYear, setPaperYear] = useState('March 2024');
  const [paperMarks, setPaperMarks] = useState(80);
  const [paperDuration, setPaperDuration] = useState('3 Hours');
  const [paperSummary, setPaperSummary] = useState('');

  // Settings Form State
  const [siteSettingsState, setSiteSettingsState] = useState(settings);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Filter in Resource Table
  const [resourceSearch, setResourceSearch] = useState('');

  const handleCreateResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resTitle.trim() || !resContent.trim()) return;

    onAddResource({
      title: resTitle.trim(),
      standard: resStandard,
      subject: resSubject,
      type: resType,
      category: resCategory,
      description: resDescription.trim() || 'Curated board study guide.',
      content: resContent.trim(),
      fileSize: resFileSize,
      pages: Number(resPages) || 10,
      isPublished: true,
      summaryPoints: ['Comprehensive syllabus topic breakdown', 'Verified against board standards']
    });

    // Reset Form
    setResTitle('');
    setResDescription('');
    setResContent('');
    setResourceModalOpen(false);
  };

  const handleCreatePaper = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paperTitle.trim()) return;

    onAddQuestionPaper({
      title: paperTitle.trim(),
      standard: paperStandard,
      subject: paperSubject,
      year: paperYear,
      session: 'March',
      marks: Number(paperMarks) || 80,
      duration: paperDuration,
      solutionAvailable: true,
      solutionSummary: paperSummary.trim() || 'Verified step-by-step board answer key with working notes.',
      questionsCount: 7
    });

    setPaperTitle('');
    setPaperSummary('');
    setPaperModalOpen(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(siteSettingsState);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2000);
  };

  const filteredResources = resources.filter((r) => {
    if (!resourceSearch.trim()) return true;
    const q = resourceSearch.toLowerCase();
    return r.title.toLowerCase().includes(q) || r.subject.toLowerCase().includes(q);
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#061426]/85 backdrop-blur-md flex flex-col overflow-hidden animate-in fade-in duration-200">
      
      {/* Top Admin Navigation Header */}
      <div className="h-16 px-6 bg-[#081B33] border-b border-[#123D70] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#D6B46A] text-[#081B33] font-bold flex items-center justify-center font-['Plus_Jakarta_Sans']">
            Ω
          </div>
          <div>
            <h2 className="text-sm font-bold text-white font-['Plus_Jakarta_Sans'] flex items-center gap-2">
              <span>OMTEX CLASSES</span>
              <span className="text-[10px] text-[#D6B46A] bg-[#123D70] px-2 py-0.5 rounded font-mono uppercase">
                Academic Management Suite
              </span>
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (confirm('Reset demo data to initial Maharashtra Board syllabus defaults?')) {
                onResetData();
              }
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10"
            title="Reset storage to original defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-[#2864DC] hover:bg-[#1e52bc] rounded-lg shadow-sm transition-colors"
          >
            Exit to Public Website
          </button>
        </div>
      </div>

      {/* Main Admin Workspace */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Admin Sidebar Tabs */}
        <aside className="w-64 bg-[#081B33] border-r border-[#123D70]/80 p-4 flex flex-col justify-between overflow-y-auto shrink-0">
          <div className="space-y-1">
            <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase px-3 py-2">
              Core Management
            </div>

            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors text-left ${
                activeTab === 'overview'
                  ? 'bg-[#123D70] text-[#D6B46A] font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('resources')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors text-left ${
                activeTab === 'resources'
                  ? 'bg-[#123D70] text-[#D6B46A] font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4" />
                <span>Study Materials</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">{resources.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('question-papers')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors text-left ${
                activeTab === 'question-papers'
                  ? 'bg-[#123D70] text-[#D6B46A] font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4" />
                <span>Question Papers</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">{questionPapers.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors text-left ${
                activeTab === 'reviews'
                  ? 'bg-[#123D70] text-[#D6B46A] font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4" />
                <span>Student Reviews</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">{reviews.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('enquiries')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors text-left ${
                activeTab === 'enquiries'
                  ? 'bg-[#123D70] text-[#D6B46A] font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>Contact Enquiries</span>
              </div>
              {analytics.newEnquiries > 0 && (
                <span className="text-[10px] font-bold bg-[#2864DC] text-white px-1.5 py-0.5 rounded-full">
                  {analytics.newEnquiries}
                </span>
              )}
            </button>

            <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase px-3 py-2 pt-4">
              Platform Configuration
            </div>

            <button
              onClick={() => setActiveTab('announcements')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors text-left ${
                activeTab === 'announcements'
                  ? 'bg-[#123D70] text-[#D6B46A] font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>Announcements</span>
            </button>

            <button
              onClick={() => setActiveTab('media')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors text-left ${
                activeTab === 'media'
                  ? 'bg-[#123D70] text-[#D6B46A] font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Media Library</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors text-left ${
                activeTab === 'settings'
                  ? 'bg-[#123D70] text-[#D6B46A] font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>SEO & Site Settings</span>
            </button>
          </div>

          <div className="pt-4 border-t border-[#123D70]/60 text-xs text-slate-400">
            <div>Live Database Mode</div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Persistent & Reactive</span>
            </div>
          </div>
        </aside>

        {/* Right Tab Content Area */}
        <main className="flex-1 bg-[#FAFBFD] overflow-y-auto p-6 sm:p-8 text-[#081B33]">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 max-w-6xl">
              <div>
                <h1 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#081B33]">
                  Institute Executive Overview
                </h1>
                <p className="text-xs sm:text-sm text-[#667085]">
                  Real-time status of published syllabus assets, student engagements, and question paper downloads.
                </p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-[#E5EAF1] shadow-sm">
                  <div className="text-xs text-[#667085] mb-1">Total Study Resources</div>
                  <div className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#081B33] tabular-nums">
                    {analytics.totalResources}
                  </div>
                  <div className="text-[11px] text-emerald-600 font-medium mt-1">
                    {analytics.publishedResources} Published Online
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#E5EAF1] shadow-sm">
                  <div className="text-xs text-[#667085] mb-1">Total Question Papers</div>
                  <div className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#123D70] tabular-nums">
                    {analytics.totalQuestionPapers}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    SSC & HSC 2020-2024
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#E5EAF1] shadow-sm">
                  <div className="text-xs text-[#667085] mb-1">Student Downloads</div>
                  <div className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#2864DC] tabular-nums">
                    {analytics.totalDownloads.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Across all study sheets
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#E5EAF1] shadow-sm">
                  <div className="text-xs text-[#667085] mb-1">Student Enquiries</div>
                  <div className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#D6B46A] tabular-nums">
                    {analytics.totalEnquiries}
                  </div>
                  <div className="text-[11px] text-amber-600 font-medium mt-1">
                    {analytics.newEnquiries} Pending Follow-up
                  </div>
                </div>
              </div>

              {/* Quick Actions & Recent Stream */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Quick Add Resource */}
                <div className="bg-white p-6 rounded-2xl border border-[#E5EAF1] shadow-sm">
                  <h3 className="text-sm font-bold font-['Plus_Jakarta_Sans'] text-[#081B33] mb-3 flex items-center justify-between">
                    <span>Quick Management Actions</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <button
                      onClick={() => setResourceModalOpen(true)}
                      className="p-3 bg-[#EAF1FF] hover:bg-[#d8e6ff] text-[#123D70] font-semibold rounded-xl text-left transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4 text-[#2864DC]" />
                      <span>Add Study Resource</span>
                    </button>
                    <button
                      onClick={() => setPaperModalOpen(true)}
                      className="p-3 bg-slate-100 hover:bg-slate-200 text-[#081B33] font-semibold rounded-xl text-left transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4 text-[#123D70]" />
                      <span>Add Board Paper</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('enquiries')}
                      className="p-3 bg-slate-100 hover:bg-slate-200 text-[#081B33] font-semibold rounded-xl text-left transition-colors flex items-center gap-2"
                    >
                      <Users className="w-4 h-4 text-[#2864DC]" />
                      <span>View Inquiries ({analytics.newEnquiries})</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('reviews')}
                      className="p-3 bg-slate-100 hover:bg-slate-200 text-[#081B33] font-semibold rounded-xl text-left transition-colors flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4 text-[#D6B46A]" />
                      <span>Moderate Reviews</span>
                    </button>
                  </div>
                </div>

                {/* Recent Resource Catalog */}
                <div className="bg-white p-6 rounded-2xl border border-[#E5EAF1] shadow-sm">
                  <h3 className="text-sm font-bold font-['Plus_Jakarta_Sans'] text-[#081B33] mb-3 flex items-center justify-between">
                    <span>Recent Published Materials</span>
                    <button
                      onClick={() => setActiveTab('resources')}
                      className="text-xs text-[#2864DC] hover:underline"
                    >
                      View all ({resources.length})
                    </button>
                  </h3>
                  <div className="space-y-2.5">
                    {resources.slice(0, 4).map((r) => (
                      <div
                        key={r.id}
                        className="p-2.5 rounded-lg bg-[#FAFBFD] border border-[#E5EAF1] flex items-center justify-between text-xs"
                      >
                        <div className="truncate mr-3">
                          <span className="font-semibold text-[#123D70]">{r.subject}: </span>
                          <span className="text-[#081B33]">{r.title}</span>
                        </div>
                        <span className="shrink-0 text-[10px] text-slate-500 font-mono">
                          {r.updatedAt}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: STUDY MATERIALS */}
          {activeTab === 'resources' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-[#081B33]">
                    Study Materials Management
                  </h1>
                  <p className="text-xs text-[#667085]">
                    Add, edit, publish or unpublish educational study guides. Updates appear immediately on the public website.
                  </p>
                </div>

                <button
                  onClick={() => setResourceModalOpen(true)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#2864DC] hover:bg-[#1e52bc] rounded-xl flex items-center gap-2 transition-colors shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create New Resource</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="w-4 h-4 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={resourceSearch}
                  onChange={(e) => setResourceSearch(e.target.value)}
                  placeholder="Filter by title or subject..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#E5EAF1] rounded-xl text-[#081B33] focus:outline-none focus:ring-2 focus:ring-[#2864DC]"
                />
              </div>

              {/* Table */}
              <div className="bg-white rounded-2xl border border-[#E5EAF1] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAFBFD] border-b border-[#E5EAF1] text-[#667085] uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="px-5 py-3.5 font-bold">Resource Title & Subject</th>
                        <th className="px-5 py-3.5 font-bold">Standard</th>
                        <th className="px-5 py-3.5 font-bold">Type</th>
                        <th className="px-5 py-3.5 font-bold">Status</th>
                        <th className="px-5 py-3.5 font-bold">Downloads</th>
                        <th className="px-5 py-3.5 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5EAF1]">
                      {filteredResources.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-5 py-3.5 max-w-xs">
                            <div className="font-semibold text-[#081B33] truncate">{item.title}</div>
                            <div className="text-[11px] text-[#123D70]">{item.subject}</div>
                          </td>
                          <td className="px-5 py-3.5 whitespace-nowrap text-[#344054]">
                            {item.standard}
                          </td>
                          <td className="px-5 py-3.5 whitespace-nowrap text-[#667085]">
                            {item.type}
                          </td>
                          <td className="px-5 py-3.5 whitespace-nowrap">
                            <button
                              onClick={() => onUpdateResource(item.id, { isPublished: !item.isPublished })}
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold ${
                                item.isPublished
                                  ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              {item.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                              <span>{item.isPublished ? 'Published' : 'Draft'}</span>
                            </button>
                          </td>
                          <td className="px-5 py-3.5 whitespace-nowrap font-mono tabular-nums text-[#667085]">
                            {item.downloadsCount.toLocaleString()}
                          </td>
                          <td className="px-5 py-3.5 whitespace-nowrap text-right space-x-2">
                            <button
                              onClick={() => {
                                const newTitle = prompt('Edit Resource Title:', item.title);
                                if (newTitle && newTitle.trim()) {
                                  onUpdateResource(item.id, { title: newTitle.trim() });
                                }
                              }}
                              className="p-1.5 text-slate-500 hover:text-[#2864DC] hover:bg-slate-100 rounded"
                              title="Edit Title"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete "${item.title}"?`)) {
                                  onDeleteResource(item.id);
                                }
                              }}
                              className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-slate-100 rounded"
                              title="Delete Resource"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: QUESTION PAPERS */}
          {activeTab === 'question-papers' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-[#081B33]">
                    Question Papers Archive Management
                  </h1>
                  <p className="text-xs text-[#667085]">
                    Maintain official Maharashtra Board Question Papers and solutions.
                  </p>
                </div>

                <button
                  onClick={() => setPaperModalOpen(true)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#123D70] hover:bg-[#081B33] rounded-xl flex items-center gap-2 transition-colors shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Upload / Add Board Paper</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questionPapers.map((qp) => (
                  <div
                    key={qp.id}
                    className="bg-white p-5 rounded-2xl border border-[#E5EAF1] shadow-sm flex items-start justify-between"
                  >
                    <div>
                      <div className="text-[11px] text-[#123D70] font-semibold mb-1">
                        {qp.standard} · {qp.year} ({qp.marks} Marks)
                      </div>
                      <h4 className="text-sm font-bold text-[#081B33] mb-1 font-['Plus_Jakarta_Sans']">
                        {qp.title}
                      </h4>
                      <p className="text-xs text-[#667085] line-clamp-2">
                        {qp.solutionSummary}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm(`Remove board paper "${qp.title}"?`)) {
                          onDeleteQuestionPaper(qp.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded ml-3 shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 max-w-6xl">
              <div>
                <h1 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-[#081B33]">
                  Student Testimonial Moderation
                </h1>
                <p className="text-xs text-[#667085]">
                  Moderate authentic reviews submitted by students and alumni.
                </p>
              </div>

              <div className="space-y-3">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-white p-5 rounded-2xl border border-[#E5EAF1] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-[#081B33]">{rev.studentName}</span>
                        <span className="text-xs text-[#667085]">({rev.standard})</span>
                        <span className="text-[11px] text-[#D6B46A] font-bold">★ {rev.rating}/5</span>
                      </div>
                      <p className="text-xs text-[#344054] italic mb-1">
                        &ldquo;{rev.reviewText}&rdquo;
                      </p>
                      <div className="text-[11px] text-[#667085]">
                        {rev.collegeOrSchool} · {rev.date}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onToggleReview(rev.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                          rev.status === 'approved'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {rev.status === 'approved' ? 'Approved' : 'Pending Approval'}
                      </button>
                      <button
                        onClick={() => onDeleteReview(rev.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CONTACT ENQUIRIES */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6 max-w-6xl">
              <div>
                <h1 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-[#081B33]">
                  Student Counseling & Contact Inquiries
                </h1>
                <p className="text-xs text-[#667085]">
                  Manage incoming student admissions, test series enquiries, and counseling requests.
                </p>
              </div>

              <div className="space-y-3">
                {enquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="bg-white p-5 rounded-2xl border border-[#E5EAF1] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-[#081B33]">{enq.fullName}</span>
                        <span className="text-xs text-[#123D70] font-medium">({enq.standard})</span>
                        <span className="text-[11px] text-slate-400 font-mono">{enq.createdAt}</span>
                      </div>
                      <div className="text-xs text-[#667085] mb-2 flex items-center gap-3">
                        <span>📞 {enq.phone}</span>
                        <span>✉️ {enq.email}</span>
                        <span>Focus: {enq.subjectInterest}</span>
                      </div>
                      <p className="text-xs text-[#344054] bg-[#FAFBFD] p-3 rounded-lg border border-[#E5EAF1]">
                        {enq.message}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <select
                        value={enq.status}
                        onChange={(e) =>
                          onUpdateEnquiryStatus(enq.id, e.target.value as 'New' | 'Contacted' | 'Resolved')
                        }
                        className="px-2.5 py-1.5 text-xs border border-[#E5EAF1] rounded-lg bg-white font-semibold text-[#081B33]"
                      >
                        <option value="New">Status: New</option>
                        <option value="Contacted">Status: Contacted</option>
                        <option value="Resolved">Status: Resolved</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: ANNOUNCEMENTS */}
          {activeTab === 'announcements' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h1 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-[#081B33]">
                  Website Announcements Banner
                </h1>
                <p className="text-xs text-[#667085]">
                  Control the prominent top notice banner shown across the website.
                </p>
              </div>

              {announcements.map((ann, idx) => (
                <div key={ann.id} className="bg-white p-6 rounded-2xl border border-[#E5EAF1] shadow-sm space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#081B33] mb-1">Badge Text:</label>
                    <input
                      type="text"
                      value={ann.badge}
                      onChange={(e) => {
                        const copy = [...announcements];
                        copy[idx].badge = e.target.value;
                        onUpdateAnnouncements(copy);
                      }}
                      className="w-full px-3 py-2 text-xs border border-[#E5EAF1] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#081B33] mb-1">Announcement Title:</label>
                    <input
                      type="text"
                      value={ann.title}
                      onChange={(e) => {
                        const copy = [...announcements];
                        copy[idx].title = e.target.value;
                        onUpdateAnnouncements(copy);
                      }}
                      className="w-full px-3 py-2 text-xs border border-[#E5EAF1] rounded-lg"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 text-xs font-semibold text-[#081B33] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={ann.isActive}
                        onChange={(e) => {
                          const copy = [...announcements];
                          copy[idx].isActive = e.target.checked;
                          onUpdateAnnouncements(copy);
                        }}
                        className="rounded text-[#2864DC]"
                      />
                      <span>Active Banner on Website</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 7: MEDIA LIBRARY */}
          {activeTab === 'media' && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h1 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-[#081B33]">
                  Media Library & Visual Assets
                </h1>
                <p className="text-xs text-[#667085]">
                  Approved educational photography and institutional renders.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: 'Cinematic Modern Study Library', path: '/src/assets/images/omtex_hero_library_1793469110394.jpg', type: 'Hero 16:9' },
                  { title: 'Board Exam Preparation Study Desk', path: '/src/assets/images/omtex_exam_prep_1793469110686.jpg', type: 'Feature 4:3' },
                  { title: 'Commerce Ledger & Economics Reference Desk', path: '/src/assets/images/omtex_commerce_desk_1793469111096.jpg', type: 'Commerce 4:3' },
                  { title: 'Contemporary Educational Academy Commons', path: '/src/assets/images/omtex_campus_architecture_1793469110684.jpg', type: 'Campus 16:9' },
                ].map((img, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-[#E5EAF1] overflow-hidden shadow-sm">
                    <img src={img.path} alt={img.title} className="w-full h-48 object-cover object-center" />
                    <div className="p-4">
                      <div className="text-[11px] text-[#2864DC] font-semibold uppercase tracking-wider">{img.type}</div>
                      <div className="text-xs font-bold text-[#081B33] mt-0.5">{img.title}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-1 truncate">{img.path}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: SEO & SITE SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h1 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-[#081B33]">
                  SEO & Website Configuration
                </h1>
                <p className="text-xs text-[#667085]">
                  Update public contact info, center address, and meta tags.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="bg-white p-6 rounded-2xl border border-[#E5EAF1] shadow-sm space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#081B33] mb-1">Institution Name:</label>
                  <input
                    type="text"
                    value={siteSettingsState.instituteName}
                    onChange={(e) => setSiteSettingsState({ ...siteSettingsState, instituteName: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#E5EAF1] rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#081B33] mb-1">Tagline:</label>
                  <input
                    type="text"
                    value={siteSettingsState.tagline}
                    onChange={(e) => setSiteSettingsState({ ...siteSettingsState, tagline: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#E5EAF1] rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#081B33] mb-1">Contact Phone:</label>
                    <input
                      type="text"
                      value={siteSettingsState.contactPhone}
                      onChange={(e) => setSiteSettingsState({ ...siteSettingsState, contactPhone: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-[#E5EAF1] rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#081B33] mb-1">Contact Email:</label>
                    <input
                      type="email"
                      value={siteSettingsState.contactEmail}
                      onChange={(e) => setSiteSettingsState({ ...siteSettingsState, contactEmail: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-[#E5EAF1] rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#081B33] mb-1">Study Center Physical Address:</label>
                  <input
                    type="text"
                    value={siteSettingsState.centerAddress}
                    onChange={(e) => setSiteSettingsState({ ...siteSettingsState, centerAddress: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#E5EAF1] rounded-lg"
                  />
                </div>

                <div className="pt-3 flex items-center justify-between">
                  {settingsSaved ? (
                    <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Changes saved to store!
                    </span>
                  ) : (
                    <span />
                  )}
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-white bg-[#2864DC] hover:bg-[#1e52bc] rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Settings</span>
                  </button>
                </div>
              </form>
            </div>
          )}

        </main>

      </div>

      {/* MODAL: ADD RESOURCE */}
      {resourceModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border border-[#E5EAF1] overflow-hidden">
            <div className="px-6 py-4 bg-[#081B33] text-white flex items-center justify-between border-b border-[#123D70]">
              <h3 className="text-sm font-bold font-['Plus_Jakarta_Sans']">Add New Study Material / Guide</h3>
              <button onClick={() => setResourceModalOpen(false)} className="text-slate-300 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateResource} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#081B33] mb-1">Resource Title: *</label>
                <input
                  type="text"
                  required
                  value={resTitle}
                  onChange={(e) => setResTitle(e.target.value)}
                  placeholder="e.g. Partnership Final Accounts: Dual Postings & Adjustments"
                  className="w-full px-3 py-2 border border-[#E5EAF1] rounded-lg focus:ring-2 focus:ring-[#2864DC] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#081B33] mb-1">Standard / Class:</label>
                  <select
                    value={resStandard}
                    onChange={(e) => setResStandard(e.target.value as AcademicStandard)}
                    className="w-full px-3 py-2 border border-[#E5EAF1] rounded-lg focus:ring-2 focus:ring-[#2864DC] focus:outline-none"
                  >
                    <option value="HSC 12th">HSC 12th</option>
                    <option value="SSC 10th">SSC 10th</option>
                    <option value="Commerce FYJC">Commerce FYJC</option>
                    <option value="Commerce SYJC">Commerce SYJC</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#081B33] mb-1">Subject Category:</label>
                  <select
                    value={resSubject}
                    onChange={(e) => setResSubject(e.target.value as SubjectCategory)}
                    className="w-full px-3 py-2 border border-[#E5EAF1] rounded-lg focus:ring-2 focus:ring-[#2864DC] focus:outline-none"
                  >
                    <option value="Bookkeeping & Accountancy">Bookkeeping & Accountancy</option>
                    <option value="Economics">Economics</option>
                    <option value="Organisation of Commerce (OCM)">OCM</option>
                    <option value="Secretarial Practice (SP)">Secretarial Practice (SP)</option>
                    <option value="Mathematics & Statistics">Mathematics & Statistics</option>
                    <option value="English Writing Skills">English Writing Skills</option>
                    <option value="Science & Technology">Science & Technology</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#081B33] mb-1">Resource Type:</label>
                  <select
                    value={resType}
                    onChange={(e) => setResType(e.target.value as ResourceType)}
                    className="w-full px-3 py-2 border border-[#E5EAF1] rounded-lg"
                  >
                    <option value="Study Notes">Study Notes</option>
                    <option value="Board Question Paper">Board Question Paper</option>
                    <option value="Model Answer Sheet">Model Answer Sheet</option>
                    <option value="Grammar & Writing Guide">Grammar & Writing Guide</option>
                    <option value="Formula Sheet">Formula Sheet</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#081B33] mb-1">Category Track:</label>
                  <select
                    value={resCategory}
                    onChange={(e) => setResCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border border-[#E5EAF1] rounded-lg"
                  >
                    <option value="Commerce">Commerce</option>
                    <option value="SSC">SSC</option>
                    <option value="HSC">HSC</option>
                    <option value="Writing Skills">Writing Skills</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#081B33] mb-1">Brief Description:</label>
                <textarea
                  rows={2}
                  value={resDescription}
                  onChange={(e) => setResDescription(e.target.value)}
                  placeholder="Summary of syllabus topics covered in this document..."
                  className="w-full px-3 py-2 border border-[#E5EAF1] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#081B33] mb-1">Study Guide Content (Markdown / Text): *</label>
                <textarea
                  required
                  rows={6}
                  value={resContent}
                  onChange={(e) => setResContent(e.target.value)}
                  placeholder="# Chapter Title&#10;&#10;## Key Board Formulae & Steps&#10;Write detailed notes here..."
                  className="w-full px-3 py-2 border border-[#E5EAF1] rounded-lg font-mono text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setResourceModalOpen(false)}
                  className="px-4 py-2 text-[#667085] hover:text-[#081B33]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-semibold text-white bg-[#2864DC] hover:bg-[#1e52bc] rounded-lg"
                >
                  Publish Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD QUESTION PAPER */}
      {paperModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg flex flex-col shadow-2xl border border-[#E5EAF1] overflow-hidden">
            <div className="px-6 py-4 bg-[#081B33] text-white flex items-center justify-between border-b border-[#123D70]">
              <h3 className="text-sm font-bold font-['Plus_Jakarta_Sans']">Add Board Question Paper</h3>
              <button onClick={() => setPaperModalOpen(false)} className="text-slate-300 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePaper} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#081B33] mb-1">Paper Title: *</label>
                <input
                  type="text"
                  required
                  value={paperTitle}
                  onChange={(e) => setPaperTitle(e.target.value)}
                  placeholder="e.g. HSC March 2024 Economics Board Paper with Model Solution"
                  className="w-full px-3 py-2 border border-[#E5EAF1] rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#081B33] mb-1">Standard:</label>
                  <select
                    value={paperStandard}
                    onChange={(e) => setPaperStandard(e.target.value as any)}
                    className="w-full px-3 py-2 border border-[#E5EAF1] rounded-lg"
                  >
                    <option value="HSC 12th">HSC 12th</option>
                    <option value="SSC 10th">SSC 10th</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#081B33] mb-1">Exam Session / Year:</label>
                  <input
                    type="text"
                    value={paperYear}
                    onChange={(e) => setPaperYear(e.target.value)}
                    placeholder="e.g. March 2024"
                    className="w-full px-3 py-2 border border-[#E5EAF1] rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#081B33] mb-1">Solution Summary / Key Highlights:</label>
                <textarea
                  rows={3}
                  value={paperSummary}
                  onChange={(e) => setPaperSummary(e.target.value)}
                  placeholder="Model solution steps, question paper format, marking distribution..."
                  className="w-full px-3 py-2 border border-[#E5EAF1] rounded-lg"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setPaperModalOpen(false)}
                  className="px-4 py-2 text-[#667085] hover:text-[#081B33]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-semibold text-white bg-[#123D70] hover:bg-[#081B33] rounded-lg"
                >
                  Add Question Paper
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
