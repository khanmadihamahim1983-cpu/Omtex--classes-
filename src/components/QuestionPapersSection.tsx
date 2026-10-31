import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, CheckCircle2, Download, Search, Calendar, Award } from 'lucide-react';
import { QuestionPaper } from '../types';

interface QuestionPapersSectionProps {
  questionPapers: QuestionPaper[];
  onOpenSolution: (paper: QuestionPaper) => void;
}

export const QuestionPapersSection: React.FC<QuestionPapersSectionProps> = ({
  questionPapers,
  onOpenSolution
}) => {
  const [selectedStandard, setSelectedStandard] = useState<'All' | 'SSC 10th' | 'HSC 12th'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPapers = questionPapers.filter((paper) => {
    if (selectedStandard !== 'All' && paper.standard !== selectedStandard) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = paper.title.toLowerCase().includes(q);
      const matchSubject = paper.subject.toLowerCase().includes(q);
      const matchYear = paper.year.toLowerCase().includes(q);
      if (!matchTitle && !matchSubject && !matchYear) return false;
    }
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <section id="question-papers-section" className="py-16 sm:py-20 bg-white border-b border-[#E5EAF1] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header with whileInView Fade-Up & Scale-In */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
          >
            <div className="max-w-xl">
              <span className="text-xs font-bold tracking-[0.2em] text-[#2864DC] uppercase mb-2.5 block">
                OFFICIAL BOARD ARCHIVES
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Plus_Jakarta_Sans'] tracking-tight text-[#081B33]">
                Maharashtra Board Question Papers
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#667085] max-w-md">
              Authenticated question papers from recent board examinations with verified solution steps and marking schemes.
            </p>
          </motion.div>

          {/* Filter & Search Bar with Scale-In */}
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#FAFBFD] p-3 sm:p-4 rounded-xl border border-[#E5EAF1] mb-8 flex flex-col sm:flex-row items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-bold text-[#081B33] mr-1">Grade:</span>
              {(['All', 'HSC 12th', 'SSC 10th'] as const).map((std) => (
                <button
                  key={std}
                  onClick={() => setSelectedStandard(std)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    selectedStandard === std
                      ? 'bg-[#123D70] text-white shadow-xs font-semibold'
                      : 'bg-white border border-[#E5EAF1] text-[#667085] hover:text-[#081B33]'
                  }`}
                >
                  {std === 'All' ? 'All Classes' : std}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search paper or year..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#E5EAF1] rounded-lg text-[#081B33] focus:outline-none focus:ring-2 focus:ring-[#2864DC]"
              />
            </div>
          </motion.div>

          {/* Papers Grid with whileInView Staggered Scale-In */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence>
              {filteredPapers.map((paper, idx) => (
                <motion.div
                  key={paper.id}
                  layout
                  initial={{ opacity: 0, y: 40, scale: 0.93 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.7, delay: Math.min(idx * 0.1, 0.35), ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -5, transition: { duration: 0.25 } }}
                  className="bg-white rounded-xl border border-[#E5EAF1] hover:border-[#123D70]/50 p-5 shadow-xs hover:shadow-lg hover:shadow-[#081B33]/6 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Quiet unboxed metadata */}
                    <div className="flex items-center gap-2 text-xs text-[#667085] mb-2.5">
                      <span className="font-semibold text-[#123D70]">{paper.standard}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {paper.year}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{paper.marks} Marks ({paper.duration})</span>
                    </div>

                    <h3 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#081B33] mb-2 leading-snug group-hover:text-[#2864DC] transition-colors">
                      {paper.title}
                    </h3>

                    <p className="text-xs text-[#344054] leading-relaxed mb-3 line-clamp-2">
                      {paper.solutionSummary}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-[#2864DC] font-medium mb-5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2864DC]" />
                      <span>Includes Examiner Solution & Marking Key</span>
                    </div>
                  </div>

                  <div className="pt-3.5 border-t border-[#E5EAF1] flex items-center gap-2.5">
                    <button
                      onClick={() => onOpenSolution(paper)}
                      className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-[#123D70] hover:bg-[#081B33] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Solutions</span>
                    </button>
                    <button
                      onClick={() => {
                        // Safe notification instead of alert
                        const toast = document.createElement('div');
                        toast.className = 'fixed bottom-6 right-6 bg-[#081B33] text-white px-4 py-3 rounded-xl shadow-xl z-50 text-xs font-medium animate-fade-in flex items-center gap-2';
                        toast.innerHTML = `<span>Downloading <b>${paper.title}</b> PDF archive...</span>`;
                        document.body.appendChild(toast);
                        setTimeout(() => toast.remove(), 2500);
                      }}
                      className="p-2 text-[#081B33] bg-[#EAF1FF] hover:bg-[#d5e4ff] rounded-lg transition-colors cursor-pointer"
                      title="Direct Download PDF"
                      aria-label="Download Paper PDF"
                    >
                      <Download className="w-4 h-4 text-[#2864DC]" />
                    </button>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>
    </motion.div>
  );
};
