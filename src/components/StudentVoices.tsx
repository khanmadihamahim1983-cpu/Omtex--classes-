import React from 'react';
import { motion } from 'motion/react';
import { Star, MessageSquarePlus, Quote, CheckCircle } from 'lucide-react';
import { StudentReview } from '../types';

interface StudentVoicesProps {
  reviews: StudentReview[];
  onOpenReviewModal: () => void;
}

export const StudentVoices: React.FC<StudentVoicesProps> = ({
  reviews,
  onOpenReviewModal
}) => {
  const approvedReviews = reviews.filter((r) => r.status === 'approved');

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <section id="reviews-section" className="py-16 sm:py-20 bg-[#FAFBFD] border-b border-[#E5EAF1] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with whileInView Scale-In */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-[0.2em] text-[#2864DC] uppercase mb-3 block">
              AUTHENTIC STUDENT FEEDBACK
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-['Plus_Jakarta_Sans'] tracking-tight text-[#081B33]">
              Experiences That Matter.
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenReviewModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#081B33] bg-white hover:bg-slate-50 border border-[#E5EAF1] rounded-xl shadow-sm hover:shadow transition-all"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#2864DC]" />
              <span>Share Your Board Experience</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Reviews Grid with Staggered Fade-Up & Scale-In */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {approvedReviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 40, scale: 0.93 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: idx * 0.14, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="bg-white p-8 sm:p-10 rounded-2xl border border-[#E5EAF1] hover:border-[#2864DC]/30 shadow-sm hover:shadow-xl hover:shadow-[#081B33]/6 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <Quote className="w-10 h-10 text-[#EAF1FF] group-hover:text-[#dbe8ff] transition-colors absolute top-6 right-6 pointer-events-none" />

              <div>
                {/* Star Rating & Score Highlight */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1" aria-label={`${review.rating} out of 5 stars`}>
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D6B46A] text-[#D6B46A]" />
                    ))}
                  </div>
                  {review.scoreHighlight && (
                    <span className="text-xs font-bold text-[#123D70] bg-[#EAF1FF] px-2.5 py-1 rounded-md">
                      {review.scoreHighlight}
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <p className="text-sm sm:text-base text-[#344054] leading-relaxed italic mb-8">
                  &ldquo;{review.reviewText}&rdquo;
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="pt-5 border-t border-[#E5EAF1] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-[#081B33] font-['Plus_Jakarta_Sans']">
                      {review.studentName}
                    </span>
                    <span title="Verified Student" className="inline-flex">
                      <CheckCircle className="w-3.5 h-3.5 text-[#2864DC]" />
                    </span>
                  </div>
                  <div className="text-xs text-[#667085] mt-0.5">
                    {review.collegeOrSchool}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-medium text-[#123D70]">
                    {review.standard}
                  </div>
                  <div className="text-[11px] text-[#667085]">
                    {review.date}
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
      </section>
    </motion.div>
  );
};
