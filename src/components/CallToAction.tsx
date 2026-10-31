import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, FileCheck } from 'lucide-react';

interface CallToActionProps {
  onExploreStudyMaterials: () => void;
  onBrowseQuestionPapers: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({
  onExploreStudyMaterials,
  onBrowseQuestionPapers
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <section className="relative py-16 sm:py-20 bg-[#081B33] text-white overflow-hidden">
      {/* Background Photography with Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/omtex_hero_library_1793469110394.jpg"
          alt="Atmospheric study library background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-20 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061426] via-[#081B33]/92 to-[#081B33]" />
      </div>

      {/* Subtle animated background glow rings */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-[#2864DC]/20 rounded-full blur-[110px] animate-pulse-glow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[200px] bg-[#D6B46A]/15 rounded-full blur-[90px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center"
      >
        
        {/* Eyebrow */}
        <div className="text-xs font-bold tracking-[0.25em] text-[#D6B46A] uppercase mb-4">
          YOUR BOARD EXAMINATION COMPANION
        </div>

        {/* Heading with Motion Reveal */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold font-['Plus_Jakarta_Sans'] tracking-tight text-white mb-6 leading-tight">
          Make Your Next Step Count.
        </h2>

        {/* Supporting text */}
        <p className="text-base sm:text-lg text-slate-200/90 max-w-2xl leading-relaxed mb-10 text-balance">
          Explore learning resources that help you prepare, practise, and keep moving forward with complete peace of mind.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onExploreStudyMaterials}
            className="w-full sm:w-auto px-8 py-4 text-sm sm:text-base font-semibold text-white bg-[#2864DC] hover:bg-[#1e52bc] rounded-xl shadow-xl shadow-[#2864DC]/30 hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-2 group relative overflow-hidden"
          >
            <BookOpen className="w-4 h-4" />
            <span>Explore Study Materials</span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBrowseQuestionPapers}
            className="w-full sm:w-auto px-8 py-4 text-sm sm:text-base font-medium text-slate-200 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl backdrop-blur-sm transition-all duration-200 flex items-center justify-center gap-2"
          >
            <FileCheck className="w-4 h-4 text-[#D6B46A]" />
            <span>Browse Question Papers</span>
          </motion.button>
        </div>

      </motion.div>
      </section>
    </motion.div>
  );
};
