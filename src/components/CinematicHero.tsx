import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ChevronRight, BookOpen, GraduationCap, Award, Sparkles } from 'lucide-react';
import { Announcement } from '../types';
import { CinematicParticles } from './CinematicParticles';

interface CinematicHeroProps {
  onExploreResources: () => void;
  onDiscoverOmtex: () => void;
  announcement?: Announcement;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({
  onExploreResources,
  onDiscoverOmtex,
  announcement
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] lg:min-h-[88vh] flex flex-col justify-between pt-20 sm:pt-24 pb-8 bg-[#081B33] overflow-hidden"
    >
      {/* Background Image with Cinematic Subtle Zoom Animation */}
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1.04, opacity: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        <img
          src="/src/assets/images/omtex_hero_library_1793469110394.jpg"
          alt="Cinematic academic study environment at OMTEX CLASSES"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        {/* Deep midnight navy and atmospheric gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#081B33]/92 via-[#081B33]/80 to-[#081B33]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#123D70]/40 via-transparent to-transparent pointer-events-none" />
      </motion.div>

      {/* Floating Canvas Dust Particles in Sunbeam */}
      <CinematicParticles />

      {/* Atmospheric Ambient Glowing Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/6 w-[420px] h-[420px] bg-[#2864DC]/15 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/5 w-[380px] h-[380px] bg-[#D6B46A]/12 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto flex flex-col items-center">
        
        {/* Optional Announcement Banner */}
        {announcement && announcement.isActive && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-slate-200 text-xs backdrop-blur-sm transition-colors cursor-pointer group"
            onClick={onExploreResources}
          >
            <span className="bg-[#2864DC] text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
              {announcement.badge}
            </span>
            <span className="truncate max-w-xs sm:max-w-md text-slate-100 group-hover:text-white transition-colors">
              {announcement.title}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-[#D6B46A] shrink-0 group-hover:translate-x-1 transition-transform" />
          </motion.div>
        )}

        {/* Eyebrow Text with Staggered Expansion */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: '0.4em' }}
          animate={{ opacity: 1, letterSpacing: '0.25em' }}
          transition={{ duration: 1.2, delay: 0.35, ease: 'easeOut' }}
          className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#D6B46A] uppercase mb-3"
        >
          <span>LEARN</span>
          <span className="text-white/40" aria-hidden="true">•</span>
          <span>GROW</span>
          <span className="text-white/40" aria-hidden="true">•</span>
          <span>ACHIEVE</span>
        </motion.div>

        {/* Main Heading with Motion Reveal */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white font-['Plus_Jakarta_Sans'] max-w-3xl leading-[1.14] mb-4 text-balance"
        >
          Your Future Begins With What You{' '}
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#D6B46A] via-[#FFF3D1] to-[#D6B46A] animate-shimmer underline decoration-[#D6B46A]/50 decoration-wavy underline-offset-8">
            Learn.
          </span>
        </motion.h1>

        {/* Supporting Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: 'easeOut' }}
          className="text-sm sm:text-base md:text-lg text-slate-200/90 max-w-xl leading-relaxed font-normal mb-8 text-balance"
        >
          Discover quality study materials, board examination resources, chapter-wise solutions, and learning guides designed to help you move forward with confidence.
        </motion.p>

        {/* CTA Buttons with Staggered Slide-In & Magnetic Hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto"
        >
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onExploreResources}
            className="w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-[#2864DC] hover:bg-[#1e53bc] rounded-xl shadow-lg shadow-[#2864DC]/30 hover:shadow-xl transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#2864DC] relative overflow-hidden group cursor-pointer"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Explore Learning Resources</span>
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onDiscoverOmtex}
            className="w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-medium text-slate-200 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl backdrop-blur-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <GraduationCap className="w-4 h-4 text-[#D6B46A]" />
            <span>Discover OMTEX Classes</span>
          </motion.button>
        </motion.div>

        {/* Quick Trust Highlights with Gentle Float */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-10 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 sm:gap-8 text-center max-w-lg mx-auto"
        >
          <div className="hover:-translate-y-0.5 transition-transform">
            <div className="text-base sm:text-xl font-bold text-white font-['Plus_Jakarta_Sans'] tabular-nums">25+</div>
            <div className="text-[11px] text-slate-300 font-medium">Years Heritage</div>
          </div>
          <div className="hover:-translate-y-0.5 transition-transform">
            <div className="text-base sm:text-xl font-bold text-[#D6B46A] font-['Plus_Jakarta_Sans'] tabular-nums">100%</div>
            <div className="text-[11px] text-slate-300 font-medium">Verified Board Papers</div>
          </div>
          <div className="hover:-translate-y-0.5 transition-transform">
            <div className="text-base sm:text-xl font-bold text-white font-['Plus_Jakarta_Sans'] tabular-nums">50K+</div>
            <div className="text-[11px] text-slate-300 font-medium">Students Mentored</div>
          </div>
        </motion.div>

      </div>

      {/* Subtle Scroll Indicator with Motion */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="relative z-20 flex flex-col items-center justify-center pt-4 text-center"
      >
        <button
          onClick={onDiscoverOmtex}
          className="group flex flex-col items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase font-semibold text-slate-400 hover:text-slate-200 transition-colors focus:outline-none cursor-pointer"
          aria-label="Scroll to explore next section"
        >
          <span>SCROLL TO EXPLORE</span>
          <div className="w-4 h-7 rounded-full border border-slate-400/40 flex items-start justify-center p-0.5">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-2 bg-[#D6B46A] rounded-full"
            />
          </div>
        </button>
      </motion.div>

    </section>
  );
};
