import React, { useState } from 'react';
import { X, Star, CheckCircle } from 'lucide-react';
import { StudentReview } from '../types';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: Omit<StudentReview, 'id' | 'date' | 'status'>) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview
}) => {
  const [studentName, setStudentName] = useState('');
  const [standard, setStandard] = useState('HSC 12th Commerce');
  const [collegeOrSchool, setCollegeOrSchool] = useState('');
  const [scoreHighlight, setScoreHighlight] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !reviewText.trim()) return;

    onSubmitReview({
      studentName: studentName.trim(),
      standard,
      collegeOrSchool: collegeOrSchool.trim() || 'Maharashtra Board Student',
      scoreHighlight: scoreHighlight.trim() || undefined,
      rating,
      reviewText: reviewText.trim()
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-[#E5EAF1] overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#081B33] text-white flex items-center justify-between border-b border-[#123D70]">
          <div>
            <h3 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-white">
              Share Your Board Experience
            </h3>
            <p className="text-xs text-slate-300">
              Submit your genuine testimonial for OMTEX CLASSES
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-300 hover:text-white rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-10 text-center">
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-[#081B33] mb-1 font-['Plus_Jakarta_Sans']">
              Thank you for sharing your journey!
            </h4>
            <p className="text-xs text-[#667085]">
              Your review has been authenticated and added to the student voices gallery.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {/* Rating Selector */}
            <div>
              <label className="block text-xs font-semibold text-[#081B33] mb-1">
                Your Rating:
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 focus:outline-none"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating ? 'fill-[#D6B46A] text-[#D6B46A]' : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Student Name */}
            <div>
              <label className="block text-xs font-semibold text-[#081B33] mb-1">
                Your Full Name: *
              </label>
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="e.g. Ananya Sen"
                className="w-full px-3 py-2 text-xs border border-[#E5EAF1] rounded-lg text-[#081B33] focus:ring-2 focus:ring-[#2864DC] focus:outline-none"
              />
            </div>

            {/* Standard & School/College */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#081B33] mb-1">
                  Class / Standard:
                </label>
                <select
                  value={standard}
                  onChange={(e) => setStandard(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#E5EAF1] rounded-lg text-[#081B33] focus:ring-2 focus:ring-[#2864DC] focus:outline-none"
                >
                  <option value="HSC 12th Commerce">HSC 12th Commerce</option>
                  <option value="SSC 10th Board">SSC 10th Board</option>
                  <option value="FYJC 11th Commerce">FYJC 11th Commerce</option>
                  <option value="HSC Science / Arts">HSC Science / Arts</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#081B33] mb-1">
                  College / School:
                </label>
                <input
                  type="text"
                  value={collegeOrSchool}
                  onChange={(e) => setCollegeOrSchool(e.target.value)}
                  placeholder="e.g. Ruia College, Mumbai"
                  className="w-full px-3 py-2 text-xs border border-[#E5EAF1] rounded-lg text-[#081B33] focus:ring-2 focus:ring-[#2864DC] focus:outline-none"
                />
              </div>
            </div>

            {/* Score Highlight */}
            <div>
              <label className="block text-xs font-semibold text-[#081B33] mb-1">
                Score / Achievement Highlight (Optional):
              </label>
              <input
                type="text"
                value={scoreHighlight}
                onChange={(e) => setScoreHighlight(e.target.value)}
                placeholder="e.g. Scored 97/100 in Bookkeeping & Accountancy"
                className="w-full px-3 py-2 text-xs border border-[#E5EAF1] rounded-lg text-[#081B33] focus:ring-2 focus:ring-[#2864DC] focus:outline-none"
              />
            </div>

            {/* Review Text */}
            <div>
              <label className="block text-xs font-semibold text-[#081B33] mb-1">
                Your Review & Academic Experience: *
              </label>
              <textarea
                required
                rows={4}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="How did the study notes, question papers, and solutions help your exam preparation?"
                className="w-full px-3 py-2 text-xs border border-[#E5EAF1] rounded-lg text-[#081B33] focus:ring-2 focus:ring-[#2864DC] focus:outline-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-[#667085] hover:text-[#081B33]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-[#2864DC] hover:bg-[#1e52bc] rounded-lg transition-colors"
              >
                Submit Review
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
