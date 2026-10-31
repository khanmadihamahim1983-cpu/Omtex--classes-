import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCw, ChevronLeft, ChevronRight, Sparkles, BookOpen, CheckCircle } from 'lucide-react';

interface Flashcard {
  id: string;
  category: string;
  standard: string;
  front: {
    question: string;
    context: string;
  };
  back: {
    answer: string;
    mnemonic?: string;
    scoringKey: string[];
  };
}

const FLASHCARD_DATA: Flashcard[] = [
  {
    id: 'fc-1',
    category: 'Bookkeeping & Accountancy',
    standard: 'HSC 12th',
    front: {
      question: 'What is the exact order of steps for calculating New RDD and Bad Debts on Debtors?',
      context: 'Recurring Board Exam Trap in Final Accounts'
    },
    back: {
      answer: 'Apply adjustments in this strict chronological order: 1) Add Unrecorded Sales to Debtors, 2) Deduct Further Bad Debts from new sum, 3) Calculate and deduct New RDD on remaining balance, 4) Calculate Provision for Discount on Debtors on net good debtors.',
      mnemonic: 'Order rule: U → B → R → D (Unrecorded → Bad debts → RDD → Discount)',
      scoringKey: ['Never calculate RDD before deducting further bad debts', 'Both effects must be posted simultaneously']
    }
  },
  {
    id: 'fc-2',
    category: 'Economics',
    standard: 'HSC 12th',
    front: {
      question: 'State the Law of Diminishing Marginal Utility (DMU) and its main assumptions.',
      context: 'Chapter 2: Utility Analysis (8 Marks Long Answer)'
    },
    back: {
      answer: 'According to Prof. Alfred Marshall: "Other things remaining constant, the additional benefit which a person derives from a given increase in his stock of a thing diminishes with every increase in the stock that he already has."',
      mnemonic: 'Assumptions Mnemonic: R-H-C-C-D (Rationality, Homogeneity, Continuity, Constancy, Divisibility)',
      scoringKey: ['Statement of Law verbatim', 'Schedule + Graph with downward sloping MU curve', 'Explanation of satiation point (MU = 0)']
    }
  },
  {
    id: 'fc-3',
    category: 'Organisation of Commerce (OCM)',
    standard: 'HSC 12th',
    front: {
      question: 'What is the "Gang Plank" in Henri Fayol’s Scalar Chain principle?',
      context: 'Principles of Management (Short Note & Concept)'
    },
    back: {
      answer: 'Scalar Chain is the hierarchy line from top to bottom. "Gang Plank" is an emergency direct cross-communication channel between two officers of the same level to avoid transmission delays without bypassing organizational discipline.',
      mnemonic: 'Gang Plank = Direct Horizontal Bridge in Urgent Scenarios',
      scoringKey: ['Draw scalar chain pyramid diagram', 'Specify prior permission of immediate superiors']
    }
  },
  {
    id: 'fc-4',
    category: 'Secretarial Practice (SP)',
    standard: 'HSC 12th',
    front: {
      question: 'What is the statutory requirement for Minimum Subscription under SEBI and Companies Act?',
      context: 'Issue of Shares Procedure'
    },
    back: {
      answer: 'Under SEBI regulations, a company must receive at least 90% of the net issue within 30 days of opening the issue. If not received, all application money must be refunded to applicants within 15 days without interest.',
      mnemonic: 'SEBI 90% in 30 Days → Refund in 15 Days',
      scoringKey: ['Penalty of 15% p.a. interest if delay occurs in refunding beyond 15 days']
    }
  },
  {
    id: 'fc-5',
    category: 'Science & Technology',
    standard: 'SSC 10th',
    front: {
      question: 'Distinguish between Fleming’s Left Hand Rule and Right Hand Rule.',
      context: 'Electric Motor vs Generator'
    },
    back: {
      answer: 'Left Hand Rule (Motor / Motion): Thumb = Force/Motion, Forefinger = Magnetic Field, Middle = Current. Right Hand Rule (Generator / Dynamo): Middle = Induced Current generated due to motion in magnetic field.',
      mnemonic: 'Left = Motor (Input electricity, output motion) | Right = Generator (Input motion, output current)',
      scoringKey: ['Draw finger arrangement perpendicular at 90°', 'State real device examples']
    }
  },
  {
    id: 'fc-6',
    category: 'English Writing Skills',
    standard: 'SSC 10th',
    front: {
      question: 'What is the mandatory 5-point structure for Poetic Appreciation in Maharashtra SSC?',
      context: 'Section III: Poetry (5 out of 5 Marks)'
    },
    back: {
      answer: '1. Title (½ Mark), 2. Name of the Poet (½ Mark), 3. Rhyme Scheme (1 Mark), 4. Figures of Speech (1 Mark - with example), 5. Theme / Central Idea (2 Marks in 2-3 concise lines).',
      mnemonic: 'T-P-R-F-T (Title, Poet, Rhyme, Figures, Theme)',
      scoringKey: ['Identify at least 1 figure of speech with explanation', 'Express poet’s emotional intent clearly']
    }
  }
];

export const RevisionFlashcards: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const card = FLASHCARD_DATA[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % FLASHCARD_DATA.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + FLASHCARD_DATA.length) % FLASHCARD_DATA.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <section id="flashcards-section" className="py-16 sm:py-20 bg-white border-b border-[#E5EAF1] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#2864DC] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>3D INTERACTIVE REVISION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Plus_Jakarta_Sans'] text-[#081B33] tracking-tight mb-3">
              Exam Distinction Flashcard Deck
            </h2>
            <p className="text-xs sm:text-sm text-[#667085] max-w-xl mx-auto">
              Test your board exam recall in under 60 seconds. Click the card or press Flip to reveal verified examiner model answers and memory mnemonics.
            </p>
          </div>

          {/* Card Canvas Container - Medium Proportions */}
          <div className="max-w-xl mx-auto">
            {/* Card Counter & Subject */}
            <div className="flex items-center justify-between text-xs text-[#667085] mb-3 px-1">
              <span className="font-semibold text-[#123D70]">
                {card.category} · {card.standard}
              </span>
              <span className="font-mono tabular-nums">
                Card {currentIndex + 1} of {FLASHCARD_DATA.length}
              </span>
            </div>

            {/* 3D Flip Card */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="w-full h-72 sm:h-80 cursor-pointer select-none [perspective:1000px] group"
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full relative [transform-style:preserve-3d] rounded-2xl shadow-xl hover:shadow-2xl transition-shadow"
              >
                {/* FRONT OF CARD */}
                <div className="absolute inset-0 [backface-visibility:hidden] bg-[#FAFBFD] border-2 border-[#E5EAF1] hover:border-[#2864DC]/50 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="inline-block px-2.5 py-0.5 bg-[#EAF1FF] text-[#2864DC] text-[10px] font-bold rounded-lg uppercase tracking-wider mb-3">
                      {card.front.context}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold font-['Plus_Jakarta_Sans'] text-[#081B33] leading-snug">
                      {card.front.question}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#E5EAF1] text-xs text-[#667085]">
                    <span className="flex items-center gap-1.5 text-[#2864DC] font-semibold text-xs">
                      <RotateCw className="w-3.5 h-3.5 animate-spin-slow" /> Click card to flip answer
                    </span>
                    <span className="text-[10px] bg-white border border-[#E5EAF1] px-2 py-0.5 rounded">
                      3D Flip
                    </span>
                  </div>
                </div>

                {/* BACK OF CARD (Rotated 180 deg) */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#081B33] text-white border-2 border-[#D6B46A]/60 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2.5 border-b border-white/10 mb-3">
                      <span className="text-[10px] font-bold text-[#D6B46A] uppercase tracking-wider">
                        Verified Board Answer
                      </span>
                      {card.back.mnemonic && (
                        <span className="text-[10px] bg-[#123D70] text-[#D6B46A] px-2 py-0.5 rounded-full font-mono">
                          💡 Mnemonic
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-3">
                      {card.back.answer}
                    </p>

                    {card.back.mnemonic && (
                      <div className="bg-[#123D70]/60 p-2 rounded-lg border border-[#D6B46A]/30 text-xs text-[#D6B46A] font-semibold mb-2">
                        {card.back.mnemonic}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-medium text-xs">
                      <CheckCircle className="w-3.5 h-3.5" /> Board Examiner Criteria
                    </span>
                    <span className="text-[10px] text-slate-400">Click to flip front</span>
                  </div>
                </div>

              </motion.div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-5 px-1">
              <button
                onClick={handlePrev}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#081B33] bg-white hover:bg-slate-100 border border-[#E5EAF1] rounded-xl shadow-xs transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-[#123D70] hover:bg-[#081B33] rounded-xl shadow-sm transition-colors"
              >
                <RotateCw className="w-3 h-3" />
                <span>{isFlipped ? 'Show Question' : 'Reveal Answer'}</span>
              </button>

              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#081B33] bg-white hover:bg-slate-100 border border-[#E5EAF1] rounded-xl shadow-xs transition-colors"
              >
                <span>Next Card</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </section>
    </motion.div>
  );
};
