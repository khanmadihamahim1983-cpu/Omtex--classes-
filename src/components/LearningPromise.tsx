import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Compass, ShieldCheck, ArrowRight } from 'lucide-react';

interface LearningPromiseProps {
  onLearnMore: (category: string) => void;
}

export const LearningPromise: React.FC<LearningPromiseProps> = ({ onLearnMore }) => {
  const promises = [
    {
      number: '01',
      title: 'Learn with Clarity',
      subtitle: 'Conceptual Foundations',
      description:
        'Detailed chapter notes that strip away rote-learning jargon. We break down intricate commerce entries, mathematical theorems, and grammatical structures into intuitive, step-by-step principles.',
      icon: BookOpen,
      actionText: 'Explore Subject Guides',
      category: 'Commerce'
    },
    {
      number: '02',
      title: 'Prepare with Confidence',
      subtitle: 'Board Exam Precision',
      description:
        'Access genuine Maharashtra State Board previous year question papers with verified model solutions, official mark weighting breakdowns, and presentation checklists to eliminate exam anxiety.',
      icon: ShieldCheck,
      actionText: 'Browse Question Papers',
      category: 'Question Papers'
    },
    {
      number: '03',
      title: 'Move Forward with Purpose',
      subtitle: 'Targeted Revision Pathways',
      description:
        'Designed around your schedule. From 10-minute quick formula sheets to comprehensive 8-mark long answer blueprints, every resource is crafted to make your daily study sessions purposeful.',
      icon: Compass,
      actionText: 'View Revision Notes',
      category: 'Writing Skills'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <section id="promise-section" className="py-16 sm:py-20 bg-white border-b border-[#E5EAF1] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="text-xs font-bold tracking-[0.2em] text-[#2864DC] uppercase mb-2">
              THE OMTEX PHILOSOPHY
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#081B33] font-['Plus_Jakarta_Sans'] tracking-tight mb-3">
              Everything You Need to Learn Better.
            </h2>
            <p className="text-sm sm:text-base text-[#667085] leading-relaxed max-w-2xl mx-auto">
              Education should never feel overwhelming. We combine disciplined academic rigor with crystal-clear clarity to give Maharashtra students a quiet, focused edge.
            </p>
          </div>

          {/* 3 Staggered Editorial Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
            {promises.map((promise, index) => {
              const Icon = promise.icon;
              return (
                <div
                  key={promise.number}
                  className="group relative bg-[#FAFBFD] hover:bg-white p-7 sm:p-8 rounded-2xl border border-[#E5EAF1] hover:border-[#2864DC]/40 shadow-sm hover:shadow-xl hover:shadow-[#081B33]/8 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle top animated accent bar on hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2864DC] via-[#D6B46A] to-[#2864DC] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Card Index & Icon */}
                    <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#E5EAF1]">
                      <span className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-[#123D70] group-hover:text-[#2864DC] transition-colors tabular-nums">
                        {promise.number}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#EAF1FF] text-[#2864DC] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#2864DC] group-hover:text-white transition-all duration-300 shadow-sm">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <div className="text-[11px] font-semibold text-[#D6B46A] tracking-wider uppercase mb-1">
                      {promise.subtitle}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#081B33] font-['Plus_Jakarta_Sans'] mb-3 group-hover:text-[#123D70] transition-colors">
                      {promise.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#344054] leading-relaxed mb-5">
                      {promise.description}
                    </p>
                  </div>

                  {/* Footer Action */}
                  <button
                    onClick={() => onLearnMore(promise.category)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#2864DC] group-hover:text-[#123D70] tracking-wide uppercase transition-colors pt-3 border-t border-[#E5EAF1]/60 w-full"
                  >
                    <span>{promise.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </motion.div>
  );
};
