import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calculator, PieChart, Briefcase, FileSignature, Sigma, Sparkles } from 'lucide-react';
import { SubjectCategory } from '../types';

interface CommerceLearningProps {
  onSelectCommerceSubject: (subject: SubjectCategory) => void;
}

export const CommerceLearning: React.FC<CommerceLearningProps> = ({
  onSelectCommerceSubject
}) => {
  const subjects = [
    {
      name: 'Bookkeeping and Accountancy' as SubjectCategory,
      code: 'BK-50',
      description: 'Partnership Final Accounts, Reconstitution, Dissolution, Company Accounts & Computerised Accounting.',
      topics: ['Trading & P&L Formats', '14 Standard Adjustments', 'Bills of Exchange Rules'],
      icon: Calculator,
      featured: true
    },
    {
      name: 'Economics' as SubjectCategory,
      code: 'ECO-49',
      description: 'Micro & Macro Economics, Utility Analysis, Demand Elasticity, National Income & Public Finance in India.',
      topics: ['Law of DMU Diagrams', 'Price Elasticity Methods', 'Budget Deficit Types'],
      icon: PieChart,
      featured: true
    },
    {
      name: 'Organisation of Commerce (OCM)' as SubjectCategory,
      code: 'OCM-51',
      description: 'Principles of Management, Entrepreneurship Development, Business Services, Consumer Rights & Marketing.',
      topics: ['Fayol’s 14 Principles', 'Functions of Management', 'Consumer Protection Act'],
      icon: Briefcase,
      featured: false
    },
    {
      name: 'Secretarial Practice (SP)' as SubjectCategory,
      code: 'SP-52',
      description: 'Issue of Shares, Debentures, Depository System, Payment of Dividend & Interest, and Financial Markets.',
      topics: ['Statutory Allotment Rules', 'Allotment Letter Templates', 'SEBI Guidelines'],
      icon: FileSignature,
      featured: false
    },
    {
      name: 'Mathematics & Statistics' as SubjectCategory,
      code: 'MATHS-88',
      description: 'Mathematical Logic, Matrices, Differentiation, Integration, Linear Programming, and Probability Distributions.',
      topics: ['Truth Tables & Duality', 'Matrix Inversion Method', 'LPP Graphical Solutions'],
      icon: Sigma,
      featured: false
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <section id="commerce-section" className="py-16 sm:py-20 bg-[#123D70] text-white relative overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2864DC]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#D6B46A]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Visual Identity */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16"
        >
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#D6B46A] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SPECIALIZED COMMERCE FACULTY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-['Plus_Jakarta_Sans'] tracking-tight text-white mb-4">
              Commerce, Made More Understandable.
            </h2>
            <p className="text-sm sm:text-base text-slate-200/90 max-w-2xl leading-relaxed">
              For over two decades, OMTEX Classes has set the benchmark for Maharashtra Board HSC Commerce preparation. We turn abstract accounting rules into intuitive logical systems.
            </p>
          </div>

          <div className="lg:col-span-4 lg:text-right">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 bg-white/10 px-3.5 py-1.5 rounded-lg border border-white/10">
              <span>HSC Commerce Syllabus (Std. 11 & 12)</span>
            </div>
          </div>
        </motion.div>

        {/* Feature Banner: Commerce Photography with whileInView Scale-In */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 rounded-2xl overflow-hidden border border-[#D6B46A]/30 relative shadow-2xl group"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 items-center bg-[#081B33]">
            <div className="md:col-span-7 p-8 sm:p-12">
              <span className="text-[11px] font-bold tracking-widest text-[#D6B46A] uppercase mb-2 block">
                SPECIALIST METHODOLOGY
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-white mb-4">
                The Practical Approach to High Distinction
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Instead of forcing students to memorize endless journal entries, we teach the fundamental principles of double-entry bookkeeping, economic reasoning, and managerial structures.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-200">
                <span className="flex items-center gap-1.5">✓ 100% Solved Board Adjustments</span>
                <span className="flex items-center gap-1.5">✓ Working Notes Formats</span>
                <span className="flex items-center gap-1.5">✓ Model Answer Keys</span>
              </div>
            </div>
            <div className="md:col-span-5 h-64 md:h-full relative overflow-hidden">
              <img
                src="/src/assets/images/omtex_commerce_desk_1793469111096.jpg"
                alt="Commerce study desk with ledger, calculator, and economics reference"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform group-hover:scale-106 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#081B33] via-transparent to-transparent md:block hidden" />
            </div>
          </div>
        </motion.div>

        {/* 5 Subject Cards Grid with Staggered Scale-In */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((sub, index) => {
            const Icon = sub.icon;
            return (
              <motion.div
                key={sub.code}
                initial={{ opacity: 0, y: 40, scale: 0.93 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="bg-white/95 text-[#081B33] rounded-2xl p-7 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#EAF1FF] text-[#123D70] group-hover:bg-[#123D70] group-hover:text-[#D6B46A] transition-all duration-300 flex items-center justify-center shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#667085] bg-slate-100 px-2 py-0.5 rounded">
                      {sub.code}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-[#081B33] mb-2 group-hover:text-[#2864DC] transition-colors">
                    {sub.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#344054] leading-relaxed mb-5">
                    {sub.description}
                  </p>

                  {/* Core Topics Checklist */}
                  <div className="space-y-1.5 pb-4 border-b border-[#E5EAF1] mb-5">
                    {sub.topics.map((t, idx) => (
                      <div key={idx} className="text-[11px] text-[#667085] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D6B46A]" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectCommerceSubject(sub.name)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-[#123D70] hover:text-white bg-[#EAF1FF] hover:bg-[#123D70] transition-colors flex items-center justify-center gap-2 group-hover:shadow-sm"
                >
                  <span>Explore {sub.name.split(' ')[0]} Materials</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                </motion.button>
              </motion.div>
            );
          })}
        </div>

      </div>
      </section>
    </motion.div>
  );
};
