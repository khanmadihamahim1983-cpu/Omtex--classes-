import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, Shield, BookOpen, Clock } from 'lucide-react';
import { SiteSettings } from '../types';

interface PremiumFooterProps {
  settings: SiteSettings;
  onNavigate: (sectionId: string) => void;
  onOpenEnquiry: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const PremiumFooter: React.FC<PremiumFooterProps> = ({
  settings,
  onNavigate,
  onOpenEnquiry,
  onOpenPrivacy,
  onOpenTerms
}) => {
  return (
    <footer className="bg-[#061426] text-slate-300 border-t border-[#123D70]/60 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#123D70]/50">
          
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded bg-gradient-to-br from-[#2864DC] to-[#123D70] border border-[#D6B46A]/50 flex items-center justify-center">
                <span className="font-bold text-white text-base font-['Plus_Jakarta_Sans']">Ω</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-['Plus_Jakarta_Sans']">
                OMTEX <span className="text-[#D6B46A]">CLASSES</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm mb-6">
              A premier educational institution and digital resource archive dedicated to academic excellence in Maharashtra State Board SSC (Class 10) and HSC (Class 12 Commerce & Arts).
            </p>

            <div className="flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#D6B46A]" />
                <span>{settings.boardAffiliation}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#2864DC]" />
                <span>{settings.workingHours}</span>
              </div>
            </div>
          </div>

          {/* Academic Categories (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-5 font-['Plus_Jakarta_Sans']">
              Academic Tracks
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('ssc-section')}
                  className="hover:text-white transition-colors text-left"
                >
                  Maharashtra SSC (10th)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('hsc-section')}
                  className="hover:text-white transition-colors text-left"
                >
                  Maharashtra HSC (12th)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('commerce-section')}
                  className="hover:text-white transition-colors text-left text-[#EAF1FF]"
                >
                  Commerce Stream Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('library-section')}
                  className="hover:text-white transition-colors text-left"
                >
                  Bookkeeping Notes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('library-section')}
                  className="hover:text-white transition-colors text-left"
                >
                  Economics Solutions
                </button>
              </li>
            </ul>
          </div>

          {/* Important Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-5 font-['Plus_Jakarta_Sans']">
              Resources
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('question-papers-section')}
                  className="hover:text-white transition-colors text-left"
                >
                  Board Solved Papers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('library-section')}
                  className="hover:text-white transition-colors text-left"
                >
                  English Writing Skills
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reviews-section')}
                  className="hover:text-white transition-colors text-left"
                >
                  Student Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenEnquiry}
                  className="hover:text-white transition-colors text-left text-[#D6B46A]"
                >
                  Counseling & Inquiries
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('experience-section')}
                  className="hover:text-white transition-colors text-left"
                >
                  About OMTEX
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Information (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-5 font-['Plus_Jakarta_Sans']">
              Study Center Contact
            </h4>
            <div className="space-y-3.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D6B46A] shrink-0 mt-0.5" />
                <span>{settings.centerAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#2864DC] shrink-0" />
                <a href={`tel:${settings.contactPhone}`} className="hover:text-white">
                  {settings.contactPhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#2864DC] shrink-0" />
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-white">
                  {settings.contactEmail}
                </a>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={onOpenEnquiry}
                className="w-full py-2 px-3 text-xs font-semibold text-white bg-[#123D70] hover:bg-[#1a4f8d] border border-white/10 rounded-lg transition-colors text-center"
              >
                Book Study Consultation
              </button>
            </div>
          </div>

        </div>

        {/* Quiet Sub-Footer (Copyright & Legal) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} OMTEX CLASSES. All educational rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button onClick={onOpenPrivacy} className="hover:text-slate-200 transition-colors">
              Privacy Policy
            </button>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <button onClick={onOpenTerms} className="hover:text-slate-200 transition-colors">
              Terms of Educational Use
            </button>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <a
              href="https://www.omtexclasses.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-slate-200 transition-colors"
            >
              <span>Original Archive</span>
              <ExternalLink className="w-3 h-3 text-[#D6B46A]" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
