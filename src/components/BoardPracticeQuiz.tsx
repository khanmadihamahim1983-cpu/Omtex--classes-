import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award, ArrowRight, Sparkles } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  subject: string;
  standard: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    subject: 'Bookkeeping & Accountancy',
    standard: 'HSC 12th',
    question: 'In the absence of a partnership deed, the rate of interest on loan provided by a partner to the firm is:',
    options: ['6% per annum', '12% per annum', '10% per annum', 'No interest is allowed'],
    correctIndex: 0,
    explanation: 'As per the Indian Partnership Act 1932 (Section 13), if the partnership deed is silent, interest on loan provided by a partner is compulsory at 6% p.a.'
  },
  {
    id: 2,
    subject: 'Economics',
    standard: 'HSC 12th',
    question: 'When Marginal Utility (MU) is zero, Total Utility (TU) reaches its:',
    options: ['Minimum point', 'Maximum and constant point', 'Negative zone', 'Zero value'],
    correctIndex: 1,
    explanation: 'When Marginal Utility is zero, Total Utility is at its maximum (point of satiety). If consumption continues further, MU becomes negative and TU starts declining.'
  },
  {
    id: 3,
    subject: 'Organisation of Commerce (OCM)',
    standard: 'HSC 12th',
    question: 'Which of the following is considered the "King of the Market" in modern business?',
    options: ['Manufacturer', 'Consumer', 'Wholesaler', 'Retailer'],
    correctIndex: 1,
    explanation: 'According to modern consumer-centric marketing concepts, the Consumer is the king and pivot of all business and commercial activities.'
  },
  {
    id: 4,
    subject: 'Secretarial Practice (SP)',
    standard: 'HSC 12th',
    question: 'A company must maintain an Escrow Account in a Scheduled Bank for collecting:',
    options: ['Share Application Money', 'Director Fees', 'Audit Fees', 'Depreciation Reserves'],
    correctIndex: 0,
    explanation: 'As per Section 39 of the Companies Act 2013, all share application monies received must be kept segregated in a separate bank account (Escrow Account).'
  },
  {
    id: 5,
    subject: 'Science & Technology',
    standard: 'SSC 10th',
    question: 'In the modern periodic table, elements are arranged in the increasing order of their:',
    options: ['Atomic Masses (Mendeleev)', 'Atomic Numbers (Henry Moseley)', 'Valency numbers', 'Density'],
    correctIndex: 1,
    explanation: 'Henry Moseley showed that the atomic number (Z) is a more fundamental property of an element than its atomic mass. Elements are arranged by increasing atomic number.'
  }
];

export const BoardPracticeQuiz: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<{ [qId: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const handleReset = () => {
    setUserAnswers({});
    setIsSubmitted(false);
  };

  const score = calculateScore();
  const allAnswered = QUIZ_QUESTIONS.every((q) => userAnswers[q.id] !== undefined);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <section id="practice-quiz-section" className="py-16 sm:py-20 bg-[#FAFBFD] border-b border-[#E5EAF1] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with whileInView Fade-Up & Scale-In */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#2864DC] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TEST YOUR BOARD READINESS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-['Plus_Jakarta_Sans'] text-[#081B33] tracking-tight mb-3">
            5-Minute Board Objective Sprint
          </h2>
          <p className="text-xs sm:text-sm text-[#667085] max-w-lg mx-auto">
            Solve these recurring 1-mark objective questions from recent Maharashtra SSC & HSC board papers with instant answer explanations.
          </p>
        </motion.div>

        {/* Quiz Progress & Results Banner */}
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-6 rounded-2xl mb-8 border flex flex-col sm:flex-row items-center justify-between gap-4 ${
              score >= 4
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
                <Award className={`w-7 h-7 ${score >= 4 ? 'text-emerald-600' : 'text-amber-600'}`} />
              </div>
              <div>
                <h4 className="font-bold text-base font-['Plus_Jakarta_Sans']">
                  Your Score: {score} / {QUIZ_QUESTIONS.length} Marks
                </h4>
                <p className="text-xs opacity-90">
                  {score === 5
                    ? 'Outstanding! Flawless board recall and zero conceptual confusion.'
                    : score >= 3
                    ? 'Good preparation. Review the detailed explanations below to secure a perfect 20/20 in objectives.'
                    : 'Revise your textbook rules and retry to strengthen core fundamentals.'}
                </p>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-4 py-2 text-xs font-semibold bg-white rounded-xl shadow-xs hover:shadow transition-all flex items-center gap-1.5 shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Quiz</span>
            </button>
          </motion.div>
        )}

        {/* Questions List with whileInView Staggered Scale-In */}
        <div className="space-y-6">
          {QUIZ_QUESTIONS.map((q, qIndex) => {
            const selectedOption = userAnswers[q.id];
            const isCorrect = selectedOption === q.correctIndex;

            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 35, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.65, delay: qIndex * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E5EAF1] shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Meta info */}
                <div className="flex items-center justify-between text-xs text-[#667085] mb-3 pb-2 border-b border-[#E5EAF1]">
                  <span className="font-semibold text-[#123D70]">
                    Question {qIndex + 1} of {QUIZ_QUESTIONS.length}
                  </span>
                  <span>{q.subject} · {q.standard}</span>
                </div>

                {/* Question Text */}
                <h3 className="text-sm sm:text-base font-bold font-['Plus_Jakarta_Sans'] text-[#081B33] mb-4">
                  {q.question}
                </h3>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                  {q.options.map((opt, optIndex) => {
                    const isPicked = selectedOption === optIndex;
                    let optionStyle = 'bg-[#FAFBFD] border-[#E5EAF1] text-[#344054] hover:bg-slate-100';

                    if (isSubmitted) {
                      if (optIndex === q.correctIndex) {
                        optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold';
                      } else if (isPicked && !isCorrect) {
                        optionStyle = 'bg-rose-50 border-rose-300 text-rose-900 line-through';
                      }
                    } else if (isPicked) {
                      optionStyle = 'bg-[#EAF1FF] border-[#2864DC] text-[#123D70] font-semibold';
                    }

                    return (
                      <button
                        key={optIndex}
                        onClick={() => handleSelectOption(q.id, optIndex)}
                        disabled={isSubmitted}
                        className={`p-3 text-left text-xs rounded-xl border transition-all flex items-center justify-between ${optionStyle}`}
                      >
                        <span>{opt}</span>
                        {isSubmitted && optIndex === q.correctIndex && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        {isSubmitted && isPicked && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Box (Revealed after submission) */}
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-3 bg-[#FAFBFD] rounded-xl border border-[#E5EAF1] text-xs text-[#344054] flex items-start gap-2"
                  >
                    <HelpCircle className="w-4 h-4 text-[#2864DC] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#081B33]">Official Board Solution: </strong>
                      <span>{q.explanation}</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Submit Button */}
        {!isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <button
              onClick={() => setIsSubmitted(true)}
              disabled={!allAnswered}
              className={`px-8 py-3.5 text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-md ${
                allAnswered
                  ? 'bg-[#2864DC] hover:bg-[#1e52bc] text-white shadow-[#2864DC]/30'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {allAnswered ? 'Submit & Reveal Verified Answers' : 'Select an answer for all 5 questions to submit'}
            </button>
          </motion.div>
        )}

      </div>
      </section>
    </motion.div>
  );
};
