/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { EducationalStore } from './services/store';
import {
  EducationalResource,
  QuestionPaper,
  StudentReview,
  ContactEnquiry,
  Announcement,
  SiteSettings,
  SubjectCategory
} from './types';

import { ScrollProgress } from './components/ScrollProgress';
import { AnimatedHeader } from './components/AnimatedHeader';
import { CinematicHero } from './components/CinematicHero';
import { BoardCountdown } from './components/BoardCountdown';
import { LearningPromise } from './components/LearningPromise';
import { AcademicCategories } from './components/AcademicCategories';
import { FinalAccountsSimulator } from './components/FinalAccountsSimulator';
import { LearningLibrary } from './components/LearningLibrary';
import { ExamPreparation } from './components/ExamPreparation';
import { QuestionPapersSection } from './components/QuestionPapersSection';
import { CommerceLearning } from './components/CommerceLearning';
import { RevisionFlashcards } from './components/RevisionFlashcards';
import { BoardPracticeQuiz } from './components/BoardPracticeQuiz';
import { OmtexExperience } from './components/OmtexExperience';
import { StudentVoices } from './components/StudentVoices';
import { CallToAction } from './components/CallToAction';
import { PremiumFooter } from './components/PremiumFooter';

import { ResourceModal } from './components/ResourceModal';
import { SearchModal } from './components/SearchModal';
import { ReviewModal } from './components/ReviewModal';
import { EnquiryModal } from './components/EnquiryModal';
import { AdminDashboard } from './components/AdminDashboard';
import { studyAudio } from './components/CinematicStudyAudio';
import { Maximize2, Minimize2, Volume2, VolumeX, Search, ArrowUp, X } from 'lucide-react';

export default function App() {
  // Master Store State
  const [resources, setResources] = useState<EducationalResource[]>([]);
  const [questionPapers, setQuestionPapers] = useState<QuestionPaper[]>([]);
  const [reviews, setReviews] = useState<StudentReview[]>([]);
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(EducationalStore.getSettings());
  const [analytics, setAnalytics] = useState(EducationalStore.getAnalytics());

  // Interactive UI State
  const [selectedLibraryFilter, setSelectedLibraryFilter] = useState('All');
  const [activeResource, setActiveResource] = useState<EducationalResource | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  // Cinematic Fullscreen & Audio States
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Sync state from store
  const refreshFromStore = () => {
    setResources(EducationalStore.getResources());
    setQuestionPapers(EducationalStore.getQuestionPapers());
    setReviews(EducationalStore.getReviews());
    setEnquiries(EducationalStore.getEnquiries());
    setAnnouncements(EducationalStore.getAnnouncements());
    setSettings(EducationalStore.getSettings());
    setAnalytics(EducationalStore.getAnalytics());
  };

  useEffect(() => {
    refreshFromStore();
  }, []);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Global Keyboard Shortcuts (Ctrl+K / Cmd+K for search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Toggle true Fullscreen mode
  const toggleFullscreen = () => {
    try {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err) => {
          console.warn('Fullscreen request failed:', err);
        });
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    } catch (e) {
      console.warn('Fullscreen not supported in this environment', e);
    }
  };

  // Toggle ambient focus audio
  const toggleAmbientAudio = () => {
    const playing = studyAudio.toggle();
    setIsAudioPlaying(playing);
  };

  // Smooth scroll helper
  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'ssc-section') {
      setSelectedLibraryFilter('SSC');
      const el = document.getElementById('library-section');
      el?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (sectionId === 'hsc-section') {
      setSelectedLibraryFilter('HSC');
      const el = document.getElementById('library-section');
      el?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Resource handlers
  const handleViewResource = (resource: EducationalResource) => {
    EducationalStore.incrementView(resource.id);
    setActiveResource(resource);
    refreshFromStore();
  };

  const handleDownloadResource = (resource: EducationalResource) => {
    EducationalStore.incrementDownload(resource.id);
    refreshFromStore();

    // Trigger instant clean text / markdown file download
    const blob = new Blob([`${resource.title}\n\n${resource.description}\n\n${resource.content}`], {
      type: 'text/markdown;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resource.title.replace(/[^a-zA-Z0-9]/g, '_')}_OMTEX_CLASSES.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Direct selection from Academic Categories
  const handleSelectCategory = (catKey: string) => {
    if (catKey === 'Question Papers') {
      scrollToSection('question-papers-section');
      return;
    }
    if (catKey === 'Commerce') {
      scrollToSection('commerce-section');
      return;
    }
    setSelectedLibraryFilter(catKey);
    scrollToSection('library-section');
  };

  const handleSelectCommerceSubject = (subject: SubjectCategory) => {
    setSelectedLibraryFilter('Commerce');
    scrollToSection('library-section');
  };

  // Question Paper Solution Viewer
  const handleOpenPaperSolution = (paper: QuestionPaper) => {
    const simulatedResource: EducationalResource = {
      id: paper.id,
      title: `${paper.title} — Official Examiner Model Solution`,
      standard: paper.standard,
      subject: paper.subject,
      type: 'Model Answer Sheet',
      category: 'Question Papers',
      description: paper.solutionSummary,
      content: `# ${paper.title}
## Examination Session: ${paper.year} · Maximum Marks: ${paper.marks} · Time: ${paper.duration}
### Maharashtra State Board of Secondary & Higher Secondary Education (MSBSHSE)

---

### General Instructions & Board Examiner Evaluation Rules:
1. All questions are compulsory as per the standard Maharashtra Board question format.
2. In Bookkeeping, working notes are compulsory and carry 25% of the total question marks.
3. In Economics, diagrams must be drawn neatly with X-axis and Y-axis properly labeled.
4. Poetic appreciation must strictly follow the 5-point layout.

---

### Solved Answers & Marking Distribution:
${paper.solutionSummary}

#### Question 1 (Objective Section - 20 Marks)
- Multiple Choice Questions: Verified correct options A, C, B, D with statutory explanations.
- One Word / Term: Complete legal and accounting terms given as per textbook definitions.
- True or False with Reasons: Full 2-point rationale provided for full marks.

#### Question 2 & 3 (Short Answer & Working Notes)
- Complete journal entries and ledger account formats provided.
- Calculation of Goodwill, Capital Balances, and Realization Account postings step-by-step.

#### Question 4 & 5 (Long Practical Problem - 8 Marks)
- Tally verified with zero discrepancy.
- Balanced Sheet format adheres to revised Maharashtra Board requirements.`,
      fileSize: '3.4 MB',
      pages: 14,
      year: paper.year,
      updatedAt: 'October 2024',
      isPublished: true,
      downloadsCount: 1540,
      viewsCount: 4200,
      summaryPoints: [
        'Complete marking criteria breakdown',
        'Official ledger format balance sheet tally',
        'Time management tips for final 15 minutes'
      ]
    };
    handleViewResource(simulatedResource);
  };

  const handleSubmitReview = (reviewData: Omit<StudentReview, 'id' | 'date' | 'status'>) => {
    EducationalStore.addReview(reviewData);
    refreshFromStore();
  };

  const handleSubmitEnquiry = (enquiryData: Omit<ContactEnquiry, 'id' | 'createdAt' | 'status'>) => {
    EducationalStore.addEnquiry(enquiryData);
    refreshFromStore();
  };

  const activeAnnouncement = announcements.find((a) => a.isActive);

  return (
    <div className="w-full min-h-screen bg-[#FAFBFD] text-[#344054] flex flex-col font-['Inter',sans-serif] overflow-x-hidden">
      {/* 1. Scroll Reading Progress */}
      <ScrollProgress />

      {/* 2. Cinematic Header (Transparent over hero, transforms into frosted navy, Fullscreen + Sound) */}
      <AnimatedHeader
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigate={scrollToSection}
        onToggleAdmin={() => setIsAdminOpen((prev) => !prev)}
        isAdminOpen={isAdminOpen}
        onOpenEnquiry={() => setIsEnquiryModalOpen(true)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={toggleAmbientAudio}
      />

      {/* SECTION 1: THE OPENING (Full-screen navy hero with cinematic photography and particle canvas) */}
      <CinematicHero
        onExploreResources={() => scrollToSection('library-section')}
        onDiscoverOmtex={() => scrollToSection('promise-section')}
        announcement={activeAnnouncement}
      />

      {/* NEWEST FEATURE 1: Maharashtra Board Live Exam Countdown Ticker */}
      <BoardCountdown />

      {/* SECTION 2: THE LEARNING PROMISE (White section with 3 editorial feature cards) */}
      <LearningPromise
        onLearnMore={(category) => {
          setSelectedLibraryFilter(category);
          scrollToSection('library-section');
        }}
      />

      {/* SECTION 3: EXPLORE YOUR ACADEMIC WORLD (Deep blue section with 6 category cards) */}
      <AcademicCategories onSelectCategory={handleSelectCategory} />

      {/* NEWEST FEATURE 2: Interactive Final Accounts Dual-Effect Simulator Engine */}
      <FinalAccountsSimulator />

      {/* SECTION 4: THE LEARNING LIBRARY (Clean white background, real published resources, live filters) */}
      <LearningLibrary
        resources={resources}
        selectedFilter={selectedLibraryFilter}
        onFilterChange={setSelectedLibraryFilter}
        onViewResource={handleViewResource}
        onDownloadResource={handleDownloadResource}
      />

      {/* NEWEST FEATURE 3: 3D Interactive Revision Flashcards Deck */}
      <RevisionFlashcards />

      {/* SECTION 5: THE EXAM PREPARATION EXPERIENCE (Split-screen layout with parallax photography) */}
      <ExamPreparation
        onBrowseQuestionPapers={() => scrollToSection('question-papers-section')}
        onExploreStudyMaterials={() => scrollToSection('library-section')}
      />

      {/* Dedicated Maharashtra Board Solved Question Papers Section */}
      <QuestionPapersSection
        questionPapers={questionPapers}
        onOpenSolution={handleOpenPaperSolution}
      />

      {/* NEWEST FEATURE 4: 5-Minute Board Objective Practice Quizzer */}
      <BoardPracticeQuiz />

      {/* SECTION 6: COMMERCE LEARNING (Deep academic blue #123D70, white, and subtle gold accents) */}
      <CommerceLearning onSelectCommerceSubject={handleSelectCommerceSubject} />

      {/* SECTION 7: THE OMTEX EXPERIENCE (Editorial section, generous whitespace, 5 highlights) */}
      <OmtexExperience />

      {/* SECTION 8: STUDENT VOICES (Porcelain background, authentic approved student reviews) */}
      <StudentVoices
        reviews={reviews}
        onOpenReviewModal={() => setIsReviewModalOpen(true)}
      />

      {/* SECTION 9: FINAL CINEMATIC CALL TO ACTION (Midnight navy with subtle animated glow) */}
      <CallToAction
        onExploreStudyMaterials={() => scrollToSection('library-section')}
        onBrowseQuestionPapers={() => scrollToSection('question-papers-section')}
      />

      {/* SECTION 10: PREMIUM FOOTER (Calm, dark, elegant footer with contact and legal links) */}
      <PremiumFooter
        settings={settings}
        onNavigate={scrollToSection}
        onOpenEnquiry={() => setIsEnquiryModalOpen(true)}
        onOpenPrivacy={() => setPrivacyModalOpen(true)}
        onOpenTerms={() => setTermsModalOpen(true)}
      />

      {/* FLOATING CINEMATIC CONTROL BAR (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2 p-1.5 bg-[#081B33]/90 backdrop-blur-md rounded-2xl border border-[#123D70]/80 shadow-2xl">
        <button
          onClick={toggleFullscreen}
          className={`p-2.5 rounded-xl transition-all flex items-center gap-1.5 text-xs ${
            isFullscreen
              ? 'bg-[#2864DC] text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
          title={isFullscreen ? 'Exit Full Screen' : 'Toggle Full Screen Cinematic View'}
          aria-label="Toggle Full Screen"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          <span className="hidden sm:inline font-semibold">
            {isFullscreen ? 'Exit Full Screen' : 'Full Screen'}
          </span>
        </button>

        <button
          onClick={toggleAmbientAudio}
          className={`p-2.5 rounded-xl transition-all flex items-center gap-1.5 text-xs ${
            isAudioPlaying
              ? 'bg-[#D6B46A] text-[#081B33] font-bold shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
          title={isAudioPlaying ? 'Mute Study Soundscape' : 'Play Ambient Focus Soundscape'}
          aria-label="Toggle Focus Soundscape"
        >
          {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          <span className="hidden sm:inline">
            {isAudioPlaying ? 'Mute Audio' : 'Focus Audio'}
          </span>
        </button>

        <button
          onClick={() => setIsSearchOpen(true)}
          className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors text-xs"
          title="Search Archive (⌘K)"
        >
          <Search className="w-4 h-4" />
        </button>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors text-xs"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive Modal 1: Document Reader */}
      <ResourceModal
        resource={activeResource}
        onClose={() => setActiveResource(null)}
        onDownload={handleDownloadResource}
      />

      {/* Interactive Modal 2: Instant Search Dialog */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        resources={resources}
        questionPapers={questionPapers}
        onSelectResource={handleViewResource}
        onSelectQuestionPaper={handleOpenPaperSolution}
      />

      {/* Interactive Modal 3: Submit Student Review */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmitReview={handleSubmitReview}
      />

      {/* Interactive Modal 4: Student Counseling & Inquiry */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        settings={settings}
        onSubmitEnquiry={handleSubmitEnquiry}
      />

      {/* SECTION 10: BACKEND & ADMIN DASHBOARD */}
      {isAdminOpen && (
        <AdminDashboard
          resources={resources}
          questionPapers={questionPapers}
          reviews={reviews}
          enquiries={enquiries}
          announcements={announcements}
          settings={settings}
          analytics={analytics}
          onClose={() => setIsAdminOpen(false)}
          onAddResource={(res) => {
            EducationalStore.addResource(res);
            refreshFromStore();
          }}
          onUpdateResource={(id, updates) => {
            EducationalStore.updateResource(id, updates);
            refreshFromStore();
          }}
          onDeleteResource={(id) => {
            EducationalStore.deleteResource(id);
            refreshFromStore();
          }}
          onAddQuestionPaper={(paper) => {
            EducationalStore.addQuestionPaper(paper);
            refreshFromStore();
          }}
          onDeleteQuestionPaper={(id) => {
            EducationalStore.deleteQuestionPaper(id);
            refreshFromStore();
          }}
          onToggleReview={(id) => {
            EducationalStore.toggleReviewStatus(id);
            refreshFromStore();
          }}
          onDeleteReview={(id) => {
            EducationalStore.deleteReview(id);
            refreshFromStore();
          }}
          onUpdateEnquiryStatus={(id, status) => {
            EducationalStore.updateEnquiryStatus(id, status);
            refreshFromStore();
          }}
          onUpdateAnnouncements={(annList) => {
            EducationalStore.updateAnnouncements(annList);
            refreshFromStore();
          }}
          onUpdateSettings={(newSettings) => {
            EducationalStore.updateSettings(newSettings);
            refreshFromStore();
          }}
          onResetData={() => {
            EducationalStore.resetToDefault();
            refreshFromStore();
          }}
        />
      )}

      {/* Privacy Policy Modal */}
      {privacyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl border border-[#E5EAF1]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF1] mb-4">
              <h3 className="text-base font-bold text-[#081B33]">Privacy Policy</h3>
              <button onClick={() => setPrivacyModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-slate-600" />
              </button>
            </div>
            <p className="text-xs text-[#344054] leading-relaxed mb-4">
              OMTEX CLASSES respects the privacy of all students and parents. We do not sell or lease personal data to third parties. Any contact information submitted via counseling forms is utilized exclusively to provide board examination updates and educational materials.
            </p>
            <div className="text-right">
              <button
                onClick={() => setPrivacyModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#123D70] rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Terms of Educational Use Modal */}
      {termsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl border border-[#E5EAF1]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF1] mb-4">
              <h3 className="text-base font-bold text-[#081B33]">Terms of Educational Use</h3>
              <button onClick={() => setTermsModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-slate-600" />
              </button>
            </div>
            <p className="text-xs text-[#344054] leading-relaxed mb-4">
              All question papers, model answer keys, and chapter notes published on OMTEX CLASSES are intended solely for personal, non-commercial self-study by Maharashtra State Board students. Redistribution or unauthorized resale is prohibited.
            </p>
            <div className="text-right">
              <button
                onClick={() => setTermsModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#123D70] rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
