import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, FileCheck, ArrowRight, CornerDownLeft } from 'lucide-react';
import { EducationalResource, QuestionPaper } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  resources: EducationalResource[];
  questionPapers: QuestionPaper[];
  onSelectResource: (resource: EducationalResource) => void;
  onSelectQuestionPaper: (paper: QuestionPaper) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  resources,
  questionPapers,
  onSelectResource,
  onSelectQuestionPaper
}) => {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredResources = resources.filter((res) => {
    if (!res.isPublished) return false;
    if (selectedTag !== 'All') {
      if (selectedTag === 'Commerce' && res.category !== 'Commerce') return false;
      if (selectedTag === 'SSC' && !res.standard.includes('SSC')) return false;
      if (selectedTag === 'HSC' && !res.standard.includes('HSC')) return false;
    }
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      res.title.toLowerCase().includes(q) ||
      res.subject.toLowerCase().includes(q) ||
      res.description.toLowerCase().includes(q)
    );
  });

  const filteredPapers = questionPapers.filter((paper) => {
    if (selectedTag !== 'All') {
      if (selectedTag === 'SSC' && paper.standard !== 'SSC 10th') return false;
      if (selectedTag === 'HSC' && paper.standard !== 'HSC 12th') return false;
    }
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      paper.title.toLowerCase().includes(q) ||
      paper.subject.toLowerCase().includes(q) ||
      paper.year.toLowerCase().includes(q)
    );
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-[#E5EAF1] overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 bg-white border-b border-[#E5EAF1] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#2864DC] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search study materials, board papers, final accounts..."
            className="w-full text-sm sm:text-base text-[#081B33] placeholder-[#667085] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg text-xs"
          >
            Esc
          </button>
        </div>

        {/* Quick Filter Tag Buttons */}
        <div className="px-4 py-2.5 bg-[#FAFBFD] border-b border-[#E5EAF1] flex items-center gap-1.5 overflow-x-auto text-xs">
          <span className="text-[#667085] font-semibold mr-1">Filter:</span>
          {['All', 'Commerce', 'HSC', 'SSC'].map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                selectedTag === tag
                  ? 'bg-[#123D70] text-white font-medium'
                  : 'bg-white border border-[#E5EAF1] text-[#667085] hover:text-[#081B33]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-6 flex-1">
          {/* Study Materials Group */}
          <div>
            <div className="text-[11px] font-bold text-[#667085] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#2864DC]" />
              <span>Study Notes & Guides ({filteredResources.length})</span>
            </div>
            {filteredResources.length > 0 ? (
              <div className="space-y-1.5">
                {filteredResources.slice(0, 5).map((res) => (
                  <button
                    key={res.id}
                    onClick={() => {
                      onClose();
                      onSelectResource(res);
                    }}
                    className="w-full text-left p-3 rounded-xl hover:bg-[#FAFBFD] border border-transparent hover:border-[#E5EAF1] transition-all flex items-start justify-between group"
                  >
                    <div>
                      <div className="text-xs text-[#667085] mb-0.5">
                        <span className="font-semibold text-[#123D70]">{res.subject}</span> · {res.standard}
                      </div>
                      <div className="text-sm font-semibold text-[#081B33] group-hover:text-[#2864DC] transition-colors line-clamp-1">
                        {res.title}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#2864DC] shrink-0 mt-2 transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-xs text-[#667085] py-2 italic">No study notes match your query.</div>
            )}
          </div>

          {/* Question Papers Group */}
          <div>
            <div className="text-[11px] font-bold text-[#667085] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-[#D6B46A]" />
              <span>Board Question Papers ({filteredPapers.length})</span>
            </div>
            {filteredPapers.length > 0 ? (
              <div className="space-y-1.5">
                {filteredPapers.slice(0, 4).map((paper) => (
                  <button
                    key={paper.id}
                    onClick={() => {
                      onClose();
                      onSelectQuestionPaper(paper);
                    }}
                    className="w-full text-left p-3 rounded-xl hover:bg-[#FAFBFD] border border-transparent hover:border-[#E5EAF1] transition-all flex items-start justify-between group"
                  >
                    <div>
                      <div className="text-xs text-[#667085] mb-0.5">
                        <span className="font-semibold text-[#123D70]">{paper.standard}</span> · {paper.year}
                      </div>
                      <div className="text-sm font-semibold text-[#081B33] group-hover:text-[#2864DC] transition-colors line-clamp-1">
                        {paper.title}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#2864DC] shrink-0 mt-2 transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-xs text-[#667085] py-2 italic">No question papers match your query.</div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-[#FAFBFD] border-t border-[#E5EAF1] text-[11px] text-[#667085] flex items-center justify-between">
          <span className="flex items-center gap-1">
            Press <kbd className="px-1.5 py-0.5 bg-white border border-[#E5EAF1] rounded text-[10px]">Enter</kbd> to open
          </span>
          <span>OMTEX CLASSES Digital Archive</span>
        </div>

      </div>
    </div>
  );
};
