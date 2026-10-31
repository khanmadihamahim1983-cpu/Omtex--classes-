import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, GraduationCap, TrendingUp, FileText, CheckCircle2, Feather, BookMarked } from 'lucide-react';

interface AcademicCategoriesProps {
  onSelectCategory: (categoryKey: string) => void;
}

export const AcademicCategories: React.FC<AcademicCategoriesProps> = ({ onSelectCategory }) => {
  const categories = [
    {
      id: 'ssc',
      title: 'Maharashtra SSC',
      standardLabel: 'Class 10 Board',
      description: 'Science, Mathematics, Social Sciences, and Languages with past 5-year question papers, model drafts, and marking guidelines.',
      image: '/src/assets/images/omtex_exam_prep_1793469110686.jpg',
      icon: GraduationCap,
      categoryKey: 'SSC'
    },
    {
      id: 'hsc',
      title: 'Maharashtra HSC',
      standardLabel: 'Class 12 Board',
      description: 'Higher Secondary education resources designed for scoring maximum distinctions across commerce and arts streams.',
      image: '/src/assets/images/omtex_campus_architecture_1793469110684.jpg',
      icon: BookMarked,
      categoryKey: 'HSC'
    },
    {
      id: 'commerce',
      title: 'Commerce Stream',
      standardLabel: 'FYJC & SYJC Specialized',
      description: 'Bookkeeping & Accountancy, Economics, OCM, Secretarial Practice (SP), and Mathematics with comprehensive solved problems.',
      image: '/src/assets/images/omtex_commerce_desk_1793469111096.jpg',
      icon: TrendingUp,
      categoryKey: 'Commerce'
    },
    {
      id: 'materials',
      title: 'Study Materials',
      standardLabel: 'Chapter-wise Notes',
      description: 'Curated revision summaries, distinction formula sheets, concept blueprints, and high-yield examination tips.',
      image: '/src/assets/images/omtex_hero_library_1793469110394.jpg',
      icon: FileText,
      categoryKey: 'All'
    },
    {
      id: 'question-papers',
      title: 'Question Papers',
      standardLabel: 'Board March & July Sets',
      description: 'Official Maharashtra Board question papers from 2020 to 2024 with verified examiner model answer keys.',
      image: '/src/assets/images/omtex_exam_prep_1793469110686.jpg',
      icon: CheckCircle2,
      categoryKey: 'Question Papers'
    },
    {
      id: 'writing-skills',
      title: 'English Writing Skills',
      standardLabel: 'Formats & 5/5 Templates',
      description: 'Master Formal Letters, News Reports, Dialogue Writing, Speech Delivery, and Poetic Appreciation without guesswork.',
      image: '/src/assets/images/omtex_campus_architecture_1793469110684.jpg',
      icon: Feather,
      categoryKey: 'Writing Skills'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <section id="academic-world-section" className="py-16 sm:py-20 bg-[#081B33] text-white relative overflow-hidden">
        {/* Background ambient accents */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#123D70]/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#2864DC]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-5">
            <div className="max-w-xl">
              <span className="text-xs font-bold tracking-[0.2em] text-[#D6B46A] uppercase mb-2 block">
                ACADEMIC DOMAINS
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Plus_Jakarta_Sans'] tracking-tight text-white">
                Your Studies. One Destination.
              </h2>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm max-w-md">
              Structured category pathways tailored specifically to the Maharashtra State Board curriculum for frictionless navigation.
            </p>
          </div>

          {/* 6 Category Cards Grid - Medium Proportions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {categories.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.categoryKey)}
                  className="group relative h-80 sm:h-84 rounded-2xl overflow-hidden cursor-pointer border border-[#123D70]/60 hover:border-[#D6B46A]/80 transition-all duration-300 shadow-xl"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectCategory(cat.categoryKey);
                    }
                  }}
                >
                  {/* Background Image with Zoom on hover */}
                  <img
                    src={cat.image}
                    alt={cat.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700 ease-out"
                  />

                  {/* Dark Navy Scrim Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061426] via-[#081B33]/80 to-[#081B33]/30 group-hover:via-[#081B33]/65 transition-all duration-300" />

                  {/* Card Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    {/* Top: Icon & Standard Label */}
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-[#D6B46A] group-hover:scale-110 group-hover:bg-[#2864DC] group-hover:text-white transition-all duration-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-300 tracking-wider uppercase bg-[#123D70]/80 px-2.5 py-0.5 rounded-md border border-white/10">
                        {cat.standardLabel}
                      </span>
                    </div>

                    {/* Bottom: Title, Description, Arrow Button */}
                    <div>
                      <h3 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-white mb-1.5 group-hover:text-[#D6B46A] transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
                        {cat.description}
                      </p>

                      <div className="inline-flex items-center gap-2 text-xs font-bold text-white group-hover:text-[#D6B46A] tracking-wider uppercase">
                        <span>Explore Category</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>
    </motion.div>
  );
};
