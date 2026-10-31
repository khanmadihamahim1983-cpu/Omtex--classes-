import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Download, BookOpen, Clock, FileText, Filter, Eye, Sparkles } from 'lucide-react';
import { EducationalResource } from '../types';

interface LearningLibraryProps {
  resources: EducationalResource[];
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  onViewResource: (resource: EducationalResource) => void;
  onDownloadResource: (resource: EducationalResource) => void;
}

export const LearningLibrary: React.FC<LearningLibraryProps> = ({
  resources,
  selectedFilter,
  onFilterChange,
  onViewResource,
  onDownloadResource
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStandard, setSelectedStandard] = useState<'All' | 'SSC 10th' | 'HSC 12th'>('All');

  const filterTabs = [
    { id: 'All', label: 'All Resources' },
    { id: 'Commerce', label: 'Commerce Stream' },
    { id: 'SSC', label: 'SSC Class 10' },
    { id: 'HSC', label: 'HSC Class 12' },
    { id: 'Writing Skills', label: 'Writing Skills' },
    { id: 'Question Papers', label: 'Question Papers' }
  ];

  const filteredResources = useMemo(() => {
    return resources.filter((item) => {
      if (!item.isPublished) return false;

      // Category filter
      if (selectedFilter !== 'All') {
        if (selectedFilter === 'Commerce' && item.category !== 'Commerce') return false;
        if (selectedFilter === 'SSC' && item.category !== 'SSC' && !item.standard.includes('SSC')) return false;
        if (selectedFilter === 'HSC' && item.category !== 'HSC' && !item.standard.includes('HSC')) return false;
        if (selectedFilter === 'Writing Skills' && item.category !== 'Writing Skills' && item.subject !== 'English Writing Skills') return false;
        if (selectedFilter === 'Question Papers' && item.type !== 'Board Question Paper' && item.category !== 'Question Papers') return false;
      }

      // Standard filter
      if (selectedStandard !== 'All') {
        if (!item.standard.includes(selectedStandard)) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesSubject = item.subject.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesType = item.type.toLowerCase().includes(query);
        if (!matchesTitle && !matchesSubject && !matchesDesc && !matchesType) return false;
      }

      return true;
    });
  }, [resources, selectedFilter, selectedStandard, searchQuery]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <section id="library-section" className="py-16 sm:py-20 bg-[#FAFBFD] border-b border-[#E5EAF1] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="text-xs font-bold tracking-[0.2em] text-[#2864DC] uppercase mb-2 block">
              VERIFIED SYLLABUS ARCHIVE
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Plus_Jakarta_Sans'] text-[#081B33] tracking-tight mb-3">
              A Library Built Around Your Learning.
            </h2>
            <p className="text-xs sm:text-sm text-[#667085] leading-relaxed max-w-2xl mx-auto">
              Every chapter, model answer, and writing format is reviewed for syllabus accuracy by experienced educators. Clean, comprehensive, and permanently accessible.
            </p>
          </div>

          {/* Filter Bar & Search Controls */}
          <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#E5EAF1] shadow-sm mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Category Tabs (Segmented Control with Animated Layout) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none" role="tablist">
              {filterTabs.map((tab) => {
                const isActive = selectedFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onFilterChange(tab.id)}
                    className={`relative px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      isActive ? 'text-white font-semibold' : 'text-[#667085] hover:text-[#081B33] hover:bg-slate-100'
                    }`}
                    role="tab"
                    aria-selected={isActive}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabBadge"
                        className="absolute inset-0 bg-[#123D70] rounded-lg -z-10 shadow-sm"
                        transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      />
                    )}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Search Input Box */}
            <div className="relative min-w-[240px] lg:min-w-[290px]">
              <Search className="w-3.5 h-3.5 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search chapters, subjects..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FAFBFD] border border-[#E5EAF1] rounded-xl text-[#081B33] placeholder-[#667085] focus:outline-none focus:ring-2 focus:ring-[#2864DC] focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#667085] hover:text-[#081B33]"
                >
                  Clear
                </button>
              )}
            </div>

          </div>

          {/* Standard Sub-filter Pills */}
          <div className="flex items-center gap-2 mb-6 text-xs text-[#667085]">
            <span className="font-semibold text-[#081B33] flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#2864DC]" />
              Grade Filter:
            </span>
            {(['All', 'SSC 10th', 'HSC 12th'] as const).map((std) => (
              <button
                key={std}
                onClick={() => setSelectedStandard(std)}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedStandard === std
                    ? 'bg-[#2864DC] text-white font-medium shadow-xs'
                    : 'bg-white border border-[#E5EAF1] text-[#667085] hover:text-[#081B33]'
                }`}
              >
                {std === 'All' ? 'All Grades' : std}
              </button>
            ))}
            <span className="ml-auto text-xs text-[#667085]">
              Showing <strong className="text-[#081B33]">{filteredResources.length}</strong> authenticated materials
            </span>
          </div>

          {/* Resource Cards Grid */}
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              <AnimatePresence>
                {filteredResources.map((resource) => (
                  <article
                    key={resource.id}
                    className="group bg-white rounded-2xl border border-[#E5EAF1] hover:border-[#2864DC]/50 p-6 shadow-sm hover:shadow-xl hover:shadow-[#081B33]/6 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Clean unboxed metadata with typographic separators */}
                      <div className="flex items-center flex-wrap gap-2 text-[11px] text-[#667085] mb-2.5 pb-2.5 border-b border-[#E5EAF1]">
                        <span className="font-semibold text-[#123D70]">{resource.subject}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#081B33] font-medium">{resource.standard}</span>
                        <span aria-hidden="true">·</span>
                        <span>{resource.type}</span>
                      </div>

                      {/* Resource Title */}
                      <h3
                        onClick={() => onViewResource(resource)}
                        className="text-base sm:text-lg font-bold font-['Plus_Jakarta_Sans'] text-[#081B33] hover:text-[#2864DC] transition-colors leading-snug cursor-pointer mb-2.5"
                      >
                        {resource.title}
                      </h3>

                      {/* Short Description */}
                      <p className="text-xs text-[#344054] line-clamp-3 leading-relaxed mb-5">
                        {resource.description}
                      </p>

                      {/* Summary bullet highlights */}
                      {resource.summaryPoints && resource.summaryPoints.length > 0 && (
                        <div className="bg-[#FAFBFD] p-2.5 rounded-lg border border-[#E5EAF1]/70 mb-5 text-[11px] text-[#344054]">
                          <span className="font-semibold text-[#123D70] block mb-1 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-[#D6B46A]" /> Key Takeaways:
                          </span>
                          <ul className="space-y-1 pl-3.5 list-disc text-slate-600">
                            {resource.summaryPoints.slice(0, 2).map((pt, i) => (
                              <li key={i} className="line-clamp-1">{pt}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Card Footer: Metadata and Action Buttons */}
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-[#667085] pt-3 border-t border-[#E5EAF1] mb-3.5">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          Updated {resource.updatedAt}
                        </span>
                        <span className="font-mono text-[10px] tabular-nums">
                          {resource.pages} Pages · {resource.fileSize}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          onClick={() => onViewResource(resource)}
                          className="px-3 py-1.5 text-xs font-semibold text-[#081B33] bg-[#EAF1FF] hover:bg-[#d5e4ff] rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                          aria-label={`Read ${resource.title}`}
                        >
                          <Eye className="w-3.5 h-3.5 text-[#2864DC]" />
                          <span>Read</span>
                        </button>
                        <button
                          onClick={() => onDownloadResource(resource)}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-[#2864DC] hover:bg-[#1e52bc] rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                          aria-label={`Download ${resource.title}`}
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>

                  </article>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-2xl border border-[#E5EAF1] p-10 text-center max-w-md mx-auto">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h4 className="text-base font-bold text-[#081B33] mb-1.5 font-['Plus_Jakarta_Sans']">
                No matching resources found
              </h4>
              <p className="text-xs text-[#667085] mb-5">
                We couldn't find any documents matching &ldquo;{searchQuery}&rdquo;. Try adjusting your search query or reset the standard filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  onFilterChange('All');
                  setSelectedStandard('All');
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#2864DC] hover:bg-[#1e52bc] rounded-xl transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </div>
      </section>
    </motion.div>
  );
};
