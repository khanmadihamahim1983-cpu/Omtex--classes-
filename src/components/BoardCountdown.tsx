import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Download } from 'lucide-react';

export const BoardCountdown: React.FC = () => {
  const [selectedExam, setSelectedExam] = useState<'HSC' | 'SSC'>('HSC');
  
  // Maharashtra Board standard examination target dates
  const hscTargetDate = new Date('2025-02-21T09:00:00+05:30').getTime();
  const sscTargetDate = new Date('2025-03-01T09:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const target = selectedExam === 'HSC' ? hscTargetDate : sscTargetDate;
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [selectedExam, hscTargetDate, sscTargetDate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="bg-gradient-to-r from-[#061426] via-[#081B33] to-[#123D70] border-y border-[#123D70]/80 py-7 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-32 bg-[#2864DC]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Left: Info & Mode Switcher */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-xl bg-[#123D70]/80 border border-[#D6B46A]/40 text-[#D6B46A] flex items-center justify-center shrink-0 shadow-inner">
            <Clock className="w-6 h-6 animate-pulse" />
          </div>

          <div>
            <div className="inline-flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold tracking-widest text-[#D6B46A] uppercase">
                MAHARASHTRA STATE BOARD EXAM COUNTDOWN
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <h3 className="text-base sm:text-lg font-bold font-['Plus_Jakarta_Sans'] text-white">
              Official MSBSHSE 2025 Board Examination Timer
            </h3>
            <p className="text-xs text-slate-300">
              {selectedExam === 'HSC'
                ? 'Higher Secondary Certificate (HSC) begins Feb 21, 2025'
                : 'Secondary School Certificate (SSC) begins Mar 01, 2025'}
            </p>
          </div>

          {/* Toggle buttons */}
          <div className="inline-flex p-1 bg-black/40 rounded-xl border border-white/10 shrink-0 mt-2 sm:mt-0">
            <button
              onClick={() => setSelectedExam('HSC')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedExam === 'HSC'
                  ? 'bg-[#2864DC] text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              HSC 12th
            </button>
            <button
              onClick={() => setSelectedExam('SSC')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedExam === 'SSC'
                  ? 'bg-[#2864DC] text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              SSC 10th
            </button>
          </div>
        </div>

        {/* Right: Live Ticking Countdown Units with Staggered Scale-In */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {[
            { label: 'DAYS', val: timeLeft.days },
            { label: 'HOURS', val: timeLeft.hours },
            { label: 'MINUTES', val: timeLeft.minutes },
            { label: 'SECONDS', val: timeLeft.seconds }
          ].map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center bg-[#081B33]/90 border border-[#123D70] hover:border-[#D6B46A]/60 px-3 sm:px-4 py-2.5 rounded-xl shadow-lg min-w-[62px] sm:min-w-[72px] transition-colors"
            >
              <span className="text-xl sm:text-2xl font-bold font-mono text-[#D6B46A] tabular-nums tracking-tight">
                {String(item.val).padStart(2, '0')}
              </span>
              <span className="text-[9px] font-semibold text-slate-300 tracking-wider">
                {item.label}
              </span>
            </motion.div>
          ))}

          {/* Download Official Timetable PDF */}
          <button
            onClick={() => {
              alert(
                `Downloading official Maharashtra State Board ${selectedExam} 2025 Examination Timetable PDF.`
              );
            }}
            className="hidden xl:flex items-center gap-2 px-4 py-3 text-xs font-semibold text-white bg-[#123D70] hover:bg-[#1f5699] border border-white/10 rounded-xl transition-all shadow-sm"
            title="Download Timetable"
          >
            <Download className="w-4 h-4 text-[#D6B46A]" />
            <span>Official Timetable</span>
          </button>
        </div>

      </div>
    </motion.div>
  );
};
