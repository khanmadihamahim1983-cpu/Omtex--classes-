import React, { useState, useEffect } from 'react';
import { Search, ShieldCheck, Menu, X, ArrowRight, Maximize2, Minimize2, Volume2, VolumeX, Sparkles } from 'lucide-react';

interface AnimatedHeaderProps {
  onOpenSearch: () => void;
  onNavigate: (sectionId: string) => void;
  onToggleAdmin: () => void;
  isAdminOpen: boolean;
  onOpenEnquiry: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  onOpenSearch,
  onNavigate,
  onToggleAdmin,
  isAdminOpen,
  onOpenEnquiry,
  isFullscreen,
  onToggleFullscreen,
  isAudioPlaying,
  onToggleAudio
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'bg-[#081B33]/95 backdrop-blur-md py-2.5 border-b border-[#123D70]/60 shadow-lg shadow-black/20'
          : 'bg-gradient-to-b from-[#061426]/90 via-[#061426]/50 to-transparent py-4 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 lg:gap-6">
          
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('hero')}
              className="group flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B46A] rounded-sm"
              aria-label="OMTEX CLASSES Homepage"
            >
              <div className="w-8 h-8 rounded bg-gradient-to-br from-[#2864DC] to-[#123D70] border border-[#D6B46A]/50 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                <span className="font-bold text-white text-sm tracking-wider font-['Plus_Jakarta_Sans']">Ω</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-bold tracking-tight text-white font-['Plus_Jakarta_Sans'] whitespace-nowrap">
                  OMTEX <span className="text-[#D6B46A] font-semibold">CLASSES</span>
                </span>
                <span className="text-[9px] text-slate-300 tracking-wider uppercase font-medium">
                  Academic Excellence
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Clean, single-line typography with hover transitions) */}
          <nav className="hidden xl:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-200" aria-label="Main Navigation">
            <button
              onClick={() => handleNavClick('hero')}
              className="hover:text-white transition-colors duration-200 whitespace-nowrap shrink-0 py-1"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('commerce-section')}
              className="hover:text-white transition-colors duration-200 whitespace-nowrap shrink-0 py-1 text-[#EAF1FF]"
            >
              Commerce
            </button>
            <button
              onClick={() => handleNavClick('adjustment-simulator')}
              className="hover:text-[#D6B46A] transition-colors duration-200 whitespace-nowrap shrink-0 py-1 flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-[#D6B46A]" />
              <span>Final Accounts Simulator</span>
            </button>
            <button
              onClick={() => handleNavClick('flashcards-section')}
              className="hover:text-white transition-colors duration-200 whitespace-nowrap shrink-0 py-1"
            >
              3D Flashcards
            </button>
            <button
              onClick={() => handleNavClick('library-section')}
              className="hover:text-white transition-colors duration-200 whitespace-nowrap shrink-0 py-1"
            >
              Study Materials
            </button>
            <button
              onClick={() => handleNavClick('question-papers-section')}
              className="hover:text-white transition-colors duration-200 whitespace-nowrap shrink-0 py-1"
            >
              Question Papers
            </button>
            <button
              onClick={() => handleNavClick('practice-quiz-section')}
              className="hover:text-white transition-colors duration-200 whitespace-nowrap shrink-0 py-1"
            >
              Practice Quiz
            </button>
          </nav>

          {/* Zone 3: Interactive Controls & Fullscreen */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            
            {/* Ambient Study Audio Toggle */}
            <button
              onClick={onToggleAudio}
              className={`p-2 rounded-lg transition-colors border text-xs flex items-center gap-1.5 ${
                isAudioPlaying
                  ? 'bg-[#D6B46A] text-[#081B33] border-[#D6B46A] font-semibold'
                  : 'bg-white/10 hover:bg-white/15 text-slate-200 border-white/10'
              }`}
              title={isAudioPlaying ? 'Mute Ambient Study Audio' : 'Play Cinematic Study Soundscape'}
              aria-label="Toggle Ambient Audio"
            >
              {isAudioPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="hidden md:inline text-[11px]">{isAudioPlaying ? 'Sound On' : 'Focus Audio'}</span>
            </button>

            {/* Fullscreen Cinematic Mode Button */}
            <button
              onClick={onToggleFullscreen}
              className={`p-2 rounded-lg transition-colors border text-xs flex items-center gap-1.5 ${
                isFullscreen
                  ? 'bg-[#2864DC] text-white border-[#2864DC]'
                  : 'bg-white/10 hover:bg-white/15 text-slate-200 border-white/10'
              }`}
              title={isFullscreen ? 'Exit Full Screen' : 'Enter Full Screen Cinematic Mode'}
              aria-label="Toggle Full Screen"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline text-[11px]">
                {isFullscreen ? 'Exit Full' : 'Full Screen'}
              </span>
            </button>

            {/* Instant Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs font-medium text-slate-200 hover:text-white bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg transition-colors whitespace-nowrap shrink-0"
              title="Search materials (Ctrl+K)"
              aria-label="Open search dialog"
            >
              <Search className="w-3.5 h-3.5 text-[#D6B46A]" />
              <kbd className="hidden lg:inline text-[9px] bg-black/40 text-slate-300 px-1 py-0.5 rounded font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Admin Portal Switch */}
            <button
              onClick={onToggleAdmin}
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                isAdminOpen
                  ? 'bg-[#D6B46A] text-[#081B33] font-semibold'
                  : 'text-slate-200 hover:text-white bg-white/10 hover:bg-white/15 border border-white/10'
              }`}
              title="Toggle Academic Admin Management Suite"
              aria-label="Toggle Administrator Dashboard"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{isAdminOpen ? 'Close' : 'Admin'}</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => handleNavClick('library-section')}
              className="px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#2864DC] hover:bg-[#1f52b7] rounded-lg shadow-sm hover:shadow transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#081B33] border-b border-[#123D70] px-5 py-6 mt-2 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-semibold text-[#D6B46A] tracking-wider uppercase">Academic Tracks & Features</span>
            <button
              onClick={() => handleNavClick('hero')}
              className="text-left text-sm text-slate-200 hover:text-white py-1.5 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('adjustment-simulator')}
              className="text-left text-sm text-[#D6B46A] font-semibold py-1.5 transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#D6B46A]" />
              <span>Final Accounts Simulator (New)</span>
            </button>
            <button
              onClick={() => handleNavClick('flashcards-section')}
              className="text-left text-sm text-slate-200 hover:text-white py-1.5 transition-colors"
            >
              3D Revision Flashcards
            </button>
            <button
              onClick={() => handleNavClick('practice-quiz-section')}
              className="text-left text-sm text-slate-200 hover:text-white py-1.5 transition-colors"
            >
              Board Objective Practice Quiz
            </button>
            <button
              onClick={() => handleNavClick('commerce-section')}
              className="text-left text-sm text-slate-200 hover:text-white py-1.5 transition-colors"
            >
              HSC Commerce Stream Hub
            </button>
            <button
              onClick={() => handleNavClick('library-section')}
              className="text-left text-sm text-slate-200 hover:text-white py-1.5 transition-colors"
            >
              Study Materials & Notes
            </button>
            <button
              onClick={() => handleNavClick('question-papers-section')}
              className="text-left text-sm text-slate-200 hover:text-white py-1.5 transition-colors"
            >
              Board Question Papers (Solved)
            </button>
            <button
              onClick={() => handleNavClick('reviews-section')}
              className="text-left text-sm text-slate-200 hover:text-white py-1.5 transition-colors"
            >
              Student Testimonials & Toppers
            </button>

            <div className="pt-4 border-t border-[#123D70]/80 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onToggleFullscreen();
                }}
                className="w-full py-2.5 text-center text-xs font-semibold text-white bg-[#2864DC] hover:bg-[#1e52bc] rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Maximize2 className="w-4 h-4" />
                <span>{isFullscreen ? 'Exit Full Screen' : 'Toggle Full Screen Cinematic Mode'}</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="w-full py-2.5 text-center text-xs font-semibold text-white bg-[#123D70] hover:bg-[#1a4a84] rounded-lg transition-colors"
              >
                Request Counseling / Inquiry
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onToggleAdmin();
                }}
                className="w-full py-2.5 text-center text-xs font-semibold text-[#081B33] bg-[#D6B46A] hover:bg-[#e4c47d] rounded-lg transition-colors"
              >
                {isAdminOpen ? 'Close Admin Dashboard' : 'Open Admin Dashboard'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
