import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, ArrowRight, CheckCircle2, AlertTriangle, Sparkles, BookOpen, Layers } from 'lucide-react';

interface AdjustmentData {
  id: string;
  name: string;
  category: string;
  journalEntry: {
    debit: string;
    credit: string;
    narration: string;
  };
  firstEffect: {
    account: 'Trading Account' | 'Profit & Loss Account';
    side: 'Debit Side' | 'Credit Side';
    treatment: string;
  };
  secondEffect: {
    account: 'Balance Sheet';
    side: 'Assets Side' | 'Liabilities Side';
    treatment: string;
  };
  examinerTip: string;
  exampleAmount: string;
}

const ADJUSTMENTS_LIST: AdjustmentData[] = [
  {
    id: 'closing-stock',
    name: 'Closing Stock (at Cost or Market Value)',
    category: 'Stock & Inventory',
    exampleAmount: '₹65,000 (Cost: ₹65,000 | Market: ₹72,000)',
    journalEntry: {
      debit: 'Closing Stock A/c  Dr.',
      credit: 'To Trading A/c',
      narration: '(Being closing stock recorded at the end of the accounting period at cost or market value, whichever is lower)'
    },
    firstEffect: {
      account: 'Trading Account',
      side: 'Credit Side',
      treatment: 'Show as a separate item: "By Closing Stock" at lowest value (₹65,000).'
    },
    secondEffect: {
      account: 'Balance Sheet',
      side: 'Assets Side',
      treatment: 'Show under Current Assets: "Closing Stock" (₹65,000).'
    },
    examinerTip: 'Principle of Conservatism: Always take the lower value between Cost and Market value. Never take the higher figure!'
  },
  {
    id: 'outstanding-expenses',
    name: 'Outstanding Expenses (Unpaid Salaries / Wages)',
    category: 'Accruals & Liabilities',
    exampleAmount: '₹8,000',
    journalEntry: {
      debit: 'Concerned Expense A/c (e.g. Salaries A/c)  Dr.',
      credit: 'To Outstanding Salaries A/c',
      narration: '(Being unpaid salary for the year provided for)'
    },
    firstEffect: {
      account: 'Profit & Loss Account',
      side: 'Debit Side',
      treatment: 'Add to the respective expense (e.g. "To Salaries + Add: Outstanding ₹8,000").'
    },
    secondEffect: {
      account: 'Balance Sheet',
      side: 'Liabilities Side',
      treatment: 'Show under Current Liabilities as "Outstanding Salaries" (₹8,000).'
    },
    examinerTip: 'If wages are outstanding, add on Trading A/c Debit side. If salaries/rent are outstanding, add on P&L A/c Debit side.'
  },
  {
    id: 'prepaid-expenses',
    name: 'Prepaid / Unexpired Expenses (Prepaid Insurance)',
    category: 'Accruals & Assets',
    exampleAmount: '₹3,500',
    journalEntry: {
      debit: 'Prepaid Insurance A/c  Dr.',
      credit: 'To Insurance A/c',
      narration: '(Being insurance premium paid in advance adjusted)'
    },
    firstEffect: {
      account: 'Profit & Loss Account',
      side: 'Debit Side',
      treatment: 'Deduct from respective expense: "To Insurance Less: Prepaid (₹3,500)".'
    },
    secondEffect: {
      account: 'Balance Sheet',
      side: 'Assets Side',
      treatment: 'Show under Current Assets as "Prepaid Insurance" (₹3,500).'
    },
    examinerTip: 'Check hidden adjustment dates! E.g. "Insurance paid for year ending 30th June" when financial year ends 31st March (3 months prepaid).'
  },
  {
    id: 'bad-debts-rdd',
    name: 'Further Bad Debts & New R.D.D. (Provision on Debtors)',
    category: 'Debtors Adjustments',
    exampleAmount: 'Bad Debts: ₹2,000 + 5% RDD on Sundry Debtors',
    journalEntry: {
      debit: 'Profit & Loss A/c  Dr.',
      credit: 'To Provision for Bad & Doubtful Debts A/c (and Sundry Debtors)',
      narration: '(Being additional bad debts written off and provision created on remaining good debtors)'
    },
    firstEffect: {
      account: 'Profit & Loss Account',
      side: 'Debit Side',
      treatment: 'Apply standard formula: To Old Bad Debts + Add: New Bad Debts + Add: New RDD - Less: Old RDD (from Trial Balance).'
    },
    secondEffect: {
      account: 'Balance Sheet',
      side: 'Assets Side',
      treatment: 'Sundry Debtors Less: Further Bad Debts, and THEN calculate and deduct New R.D.D. from the net remaining balance!'
    },
    examinerTip: 'CRITICAL ORDER: 1) Add unrecorded sales, 2) Deduct further bad debts, 3) Deduct new RDD, 4) Deduct discount on debtors. Never change this sequence!'
  },
  {
    id: 'depreciation',
    name: 'Depreciation on Plant, Machinery & Assets',
    category: 'Asset Valuation',
    exampleAmount: '10% on Plant & Machinery (₹1,50,000)',
    journalEntry: {
      debit: 'Depreciation A/c  Dr.',
      credit: 'To Plant & Machinery A/c',
      narration: '(Being depreciation charged at 10% on machinery)'
    },
    firstEffect: {
      account: 'Profit & Loss Account',
      side: 'Debit Side',
      treatment: 'Show as a separate item: "To Depreciation on Plant & Machinery" (₹15,000).'
    },
    secondEffect: {
      account: 'Balance Sheet',
      side: 'Assets Side',
      treatment: 'Deduct from Plant & Machinery: ₹1,50,000 Less: Depreciation ₹15,000 = Outer column ₹1,35,000.'
    },
    examinerTip: 'Watch out for dates of additions! If new machinery was purchased on 1st October, calculate depreciation for only 6 months on that addition.'
  },
  {
    id: 'goods-drawings',
    name: 'Goods Withdrawn by Partner for Personal Use',
    category: 'Partnership Capital',
    exampleAmount: '₹5,000',
    journalEntry: {
      debit: "Partner's Capital / Current A/c  Dr.",
      credit: 'To Trading A/c (or Goods Withdrawn A/c)',
      narration: '(Being goods withdrawn by partner for personal consumption)'
    },
    firstEffect: {
      account: 'Trading Account',
      side: 'Credit Side',
      treatment: 'Show as "By Goods withdrawn by Partner for personal use" (₹5,000).'
    },
    secondEffect: {
      account: 'Balance Sheet',
      side: 'Liabilities Side',
      treatment: "Deduct from Partner's Capital Account (or debit to Partner's Current Account)."
    },
    examinerTip: 'Do not confuse this with goods destroyed by fire! Goods withdrawn directly reduce the partner capital or current balance.'
  }
];

export const FinalAccountsSimulator: React.FC = () => {
  const [selectedId, setSelectedId] = useState(ADJUSTMENTS_LIST[0].id);

  const activeAdj = ADJUSTMENTS_LIST.find((a) => a.id === selectedId) || ADJUSTMENTS_LIST[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <section id="adjustment-simulator" className="py-16 sm:py-20 bg-[#081B33] text-white relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/3 left-1/5 w-80 h-80 bg-[#2864DC]/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#D6B46A]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#D6B46A] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INTERACTIVE HSC COMMERCE SIMULATOR</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Plus_Jakarta_Sans'] tracking-tight text-white mb-3">
              Partnership Final Accounts Dual-Effect Engine
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Select any board examination adjustment below to visually observe the double-entry posting rules, official journal entry, and examiner scoring tips.
            </p>
          </div>

          {/* Adjustment Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none justify-start lg:justify-center">
            {ADJUSTMENTS_LIST.map((adj) => {
              const isSelected = adj.id === selectedId;
              return (
                <button
                  key={adj.id}
                  onClick={() => setSelectedId(adj.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 border ${
                    isSelected
                      ? 'bg-[#2864DC] text-white border-[#2864DC] shadow-lg shadow-[#2864DC]/30'
                      : 'bg-[#123D70]/60 text-slate-300 hover:text-white border-white/10 hover:border-white/20'
                  }`}
                >
                  {adj.name.split('(')[0]}
                </button>
              );
            })}
          </div>

          {/* Interactive Dual-Effect Display Canvas */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeAdj.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
            >
              {/* Left Column: Journal Entry & Examiner Golden Tip (5 cols) */}
              <div className="lg:col-span-5 bg-[#061426] border border-[#123D70] rounded-2xl p-6 flex flex-col justify-between shadow-xl">
                <div>
                  <div className="flex items-center justify-between pb-2.5 border-b border-white/10 mb-3">
                    <span className="text-[10px] font-bold text-[#D6B46A] uppercase tracking-wider">
                      {activeAdj.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {activeAdj.exampleAmount}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-['Plus_Jakarta_Sans'] text-white mb-3">
                    {activeAdj.name}
                  </h3>

                  {/* Journal Entry Specimen */}
                  <div className="bg-[#081B33] p-3.5 rounded-xl border border-white/10 mb-5 font-mono text-xs">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1.5 font-sans font-bold">
                      Official Double-Entry Journal Rule:
                    </div>
                    <div className="text-[#EAF1FF] font-semibold mb-1">
                      {activeAdj.journalEntry.debit}
                    </div>
                    <div className="text-[#D6B46A] font-semibold pl-4 mb-1.5">
                      {activeAdj.journalEntry.credit}
                    </div>
                    <div className="text-slate-400 text-[10px] italic font-sans">
                      {activeAdj.journalEntry.narration}
                    </div>
                  </div>
                </div>

                {/* Examiner Tip Alert Box */}
                <div className="bg-[#123D70]/50 border border-[#D6B46A]/40 p-3.5 rounded-xl text-xs flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-[#D6B46A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#D6B46A] block mb-0.5 uppercase tracking-wide text-[10px]">
                      Board Examiner Tip:
                    </span>
                    <p className="text-slate-200 leading-relaxed text-[11px]">
                      {activeAdj.examinerTip}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: 1st Effect vs 2nd Effect (7 cols) */}
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* 1st Effect Card */}
                <div className="bg-white text-[#081B33] rounded-2xl p-6 border border-white/20 shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-[#E5EAF1]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-[#EAF1FF] text-[#2864DC] font-bold text-xs flex items-center justify-center font-mono">
                          1
                        </span>
                        <span className="text-[11px] font-bold text-[#123D70] uppercase tracking-wider">
                          First Effect
                        </span>
                      </div>
                      <span className="text-[10px] font-bold bg-[#FAFBFD] text-[#2864DC] border border-[#E5EAF1] px-2 py-0.5 rounded">
                        {activeAdj.firstEffect.side}
                      </span>
                    </div>

                    <div className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#081B33] mb-2">
                      {activeAdj.firstEffect.account}
                    </div>

                    <p className="text-xs text-[#344054] leading-relaxed mb-4">
                      {activeAdj.firstEffect.treatment}
                    </p>
                  </div>

                  <div className="bg-[#FAFBFD] p-2.5 rounded-xl border border-[#E5EAF1] text-[11px] text-[#667085] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Affects Gross or Net Profit Calculation</span>
                  </div>
                </div>

                {/* 2nd Effect Card */}
                <div className="bg-white text-[#081B33] rounded-2xl p-6 border border-white/20 shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-[#E5EAF1]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-[#FFF8E6] text-[#D6B46A] font-bold text-xs flex items-center justify-center font-mono">
                          2
                        </span>
                        <span className="text-[11px] font-bold text-[#123D70] uppercase tracking-wider">
                          Second Effect
                        </span>
                      </div>
                      <span className="text-[10px] font-bold bg-[#FAFBFD] text-[#123D70] border border-[#E5EAF1] px-2 py-0.5 rounded">
                        {activeAdj.secondEffect.side}
                      </span>
                    </div>

                    <div className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#081B33] mb-2">
                      {activeAdj.secondEffect.account}
                    </div>

                    <p className="text-xs text-[#344054] leading-relaxed mb-4">
                      {activeAdj.secondEffect.treatment}
                    </p>
                  </div>

                  <div className="bg-[#FAFBFD] p-2.5 rounded-xl border border-[#E5EAF1] text-[11px] text-[#667085] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2864DC] shrink-0" />
                    <span>Maintains Dual Balance Sheet Equation Tally</span>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>
    </motion.div>
  );
};
