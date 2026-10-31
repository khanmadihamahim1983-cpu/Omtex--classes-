import React from 'react';
import { motion } from 'motion/react';
import { Layers, Navigation, FileCheck2, BookOpenCheck, Smartphone } from 'lucide-react';

export const OmtexExperience: React.FC = () => {
  const experiences = [
    {
      title: 'Organised Study Resources',
      description: 'Never waste hours searching across unverified forums. Every resource is cataloged by standard, stream, and exact board chapter code.',
      icon: Layers
    },
    {
      title: 'Easy Navigation',
      description: 'Zero clutter, zero distracting advertisements. Direct access to your study guides with lightning-fast search and instant reading drawers.',
      icon: Navigation
    },
    {
      title: 'Board Examination Materials',
      description: 'Past board papers, model question sets, and evaluation keys aligned strictly with the current Maharashtra State Board syllabus.',
      icon: FileCheck2
    },
    {
      title: 'Chapter-wise Learning',
      description: 'Structured from fundamental concepts to advanced exam applications, ensuring no gaps in your conceptual foundation.',
      icon: BookOpenCheck
    },
    {
      title: 'Mobile-friendly Access',
      description: 'Engineered for seamless reading on smartphones and tablets so you can review formula sheets and adjustments during commutes.',
      icon: Smartphone
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <section id="experience-section" className="py-16 sm:py-20 bg-[#FAFBFD] border-b border-[#E5EAF1] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Headline with Generous Spacing & Scale-In */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-20"
        >
          <span className="text-xs font-bold tracking-[0.25em] text-[#2864DC] uppercase mb-4 block">
            THE STUDENT EXPERIENCE
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-['Plus_Jakarta_Sans'] text-[#081B33] tracking-tight leading-[1.15] mb-6">
            Learning Should Feel Simpler.
          </h2>
          <p className="text-base sm:text-lg text-[#667085] leading-relaxed">
            Students face enough academic pressure during board years. The tools you rely on to study should be quiet, disciplined, and flawlessly organized.
          </p>
        </motion.div>

        {/* 2-Column Split: Visual Campus Architecture + Editorial Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Architectural Image with whileInView Scale-In */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="rounded-3xl overflow-hidden border border-[#E5EAF1] shadow-2xl relative group">
              <img
                src="/src/assets/images/omtex_campus_architecture_1793469110684.jpg"
                alt="Contemporary learning academy space with students collaborating"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center aspect-[4/5] transform group-hover:scale-104 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081B33]/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-xl">
                <span className="text-[10px] font-bold text-[#D6B46A] tracking-wider uppercase block mb-1">
                  COMMITTED TO EXCELLENCE
                </span>
                <p className="text-xs font-medium text-[#081B33] leading-relaxed">
                  &ldquo;A disciplined environment creates focused students. Our digital materials mirror the thoughtful pedagogy of our physical classrooms.&rdquo;
                </p>
              </div>
            </div>
          </motion.div>

          {/* 5 Distinct Editorial Feature Highlights with Staggered Scale-In */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {experiences.map((exp, idx) => {
              const Icon = exp.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 35, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.65, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E5EAF1] hover:border-[#2864DC]/40 shadow-sm hover:shadow-md transition-all duration-200 flex items-start gap-5 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#FAFBFD] group-hover:bg-[#EAF1FF] border border-[#E5EAF1] text-[#123D70] group-hover:text-[#2864DC] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold font-['Plus_Jakarta_Sans'] text-[#081B33] mb-1.5 group-hover:text-[#2864DC] transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#344054] leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
      </section>
    </motion.div>
  );
};
