import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Award } from 'lucide-react';

interface ExamPreparationProps {
  onBrowseQuestionPapers: () => void;
  onExploreStudyMaterials: () => void;
}

export const ExamPreparation: React.FC<ExamPreparationProps> = ({
  onBrowseQuestionPapers,
  onExploreStudyMaterials
}) => {
  const highlights = [
    'Official Maharashtra Board Question Papers with Step-by-Step Marking Rubrics',
    'Handwritten model solution sheets for Ledger Balances and Balance Sheet tallies',
    'High-frequency 8-mark and 5-mark recurring exam questions curated by board evaluators',
    'Time management blueprints for the 3-hour exam window to prevent unfinished papers'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <section id="exam-prep-section" className="py-16 sm:py-20 bg-white border-b border-[#E5EAF1] overflow-hidden relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Split Screen 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Educational Photography with Parallax & Levitation */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-[#E5EAF1] shadow-xl group">
                <img
                  src="/src/assets/images/omtex_exam_prep_1793469110686.jpg"
                  alt="Student studying with focus using OMTEX Classes board preparation materials"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center aspect-[4/3] transform group-hover:scale-104 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081B33]/65 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Overlay Badge with Smooth Float */}
                <div className="absolute bottom-5 left-5 right-5 p-3.5 sm:p-4 rounded-xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg text-[#081B33] flex items-center justify-between animate-float">
                  <div>
                    <div className="text-[10px] font-bold text-[#2864DC] uppercase tracking-wider">
                      BOARD PREPARATION SERIES
                    </div>
                    <div className="text-xs sm:text-sm font-bold font-['Plus_Jakarta_Sans'] text-[#081B33]">
                      100% Maharashtra Board Solved Papers
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-[#EAF1FF] text-[#2864DC] flex items-center justify-center shrink-0 shadow-xs">
                    <Award className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Subtle decorative background blur */}
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-[#EAF1FF] rounded-full blur-3xl -z-10 pointer-events-none" />
            </motion.div>

            {/* Right Column: Editorial Text & CTAs */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-start"
            >
              <div className="text-xs font-bold tracking-[0.2em] text-[#2864DC] uppercase mb-2.5">
                EXAMINATION MASTERY
              </div>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-['Plus_Jakarta_Sans'] text-[#081B33] tracking-tight leading-tight mb-4">
                Prepare Smarter. Feel More Confident.
              </h2>
              
              <p className="text-sm sm:text-base text-[#344054] leading-relaxed mb-6">
                Explore previous examination papers, solved questions, study notes, and revision resources in one organised place.
                We take the anxiety out of board exams by providing verified, examiner-checked solutions that reveal precisely how marks are awarded.
              </p>

              {/* Checklist with Staggered Entrance */}
              <div className="space-y-3 mb-8 w-full">
                {highlights.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex items-start gap-2.5"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#EAF1FF] text-[#2864DC] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm text-[#344054] font-medium leading-relaxed">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onBrowseQuestionPapers}
                  className="px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-[#2864DC] hover:bg-[#1e52bc] rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Browse Question Papers</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onExploreStudyMaterials}
                  className="px-5 py-3 text-xs sm:text-sm font-semibold text-[#081B33] bg-[#FAFBFD] hover:bg-slate-100 border border-[#E5EAF1] rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Study Materials</span>
                </motion.button>
              </div>

            </motion.div>

          </div>

        </div>
      </section>
    </motion.div>
  );
};
