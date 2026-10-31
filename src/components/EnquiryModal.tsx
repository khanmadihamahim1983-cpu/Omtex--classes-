import React, { useState } from 'react';
import { X, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';
import { ContactEnquiry, SiteSettings } from '../types';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SiteSettings;
  onSubmitEnquiry: (enquiry: Omit<ContactEnquiry, 'id' | 'createdAt' | 'status'>) => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSubmitEnquiry
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [standard, setStandard] = useState('HSC 12th Commerce');
  const [subjectInterest, setSubjectInterest] = useState('Commerce All Subjects');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;

    onSubmitEnquiry({
      fullName: fullName.trim(),
      email: email.trim() || 'student@omtex.edu',
      phone: phone.trim(),
      standard,
      subjectInterest,
      message: message.trim() || 'General inquiry regarding board syllabus guidance'
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
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
              Academic Counseling & Inquiries
            </h3>
            <p className="text-xs text-slate-300">
              Direct guidance from OMTEX CLASSES academic counselors
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
              Inquiry Received Successfully!
            </h4>
            <p className="text-xs text-[#667085]">
              Our academic counselors will get in touch with you shortly at {phone}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            <div>
              <label className="block text-xs font-semibold text-[#081B33] mb-1">
                Student Full Name: *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Yashvardhan Patil"
                className="w-full px-3 py-2 text-xs border border-[#E5EAF1] rounded-lg text-[#081B33] focus:ring-2 focus:ring-[#2864DC] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#081B33] mb-1">
                  Phone / WhatsApp: *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98XXX XXXXX"
                  className="w-full px-3 py-2 text-xs border border-[#E5EAF1] rounded-lg text-[#081B33] focus:ring-2 focus:ring-[#2864DC] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#081B33] mb-1">
                  Email Address:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full px-3 py-2 text-xs border border-[#E5EAF1] rounded-lg text-[#081B33] focus:ring-2 focus:ring-[#2864DC] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#081B33] mb-1">
                  Academic Class:
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
                  Subject Interest:
                </label>
                <select
                  value={subjectInterest}
                  onChange={(e) => setSubjectInterest(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#E5EAF1] rounded-lg text-[#081B33] focus:ring-2 focus:ring-[#2864DC] focus:outline-none"
                >
                  <option value="Commerce All Subjects">Commerce All Subjects</option>
                  <option value="Bookkeeping & Accountancy">Bookkeeping & Accountancy</option>
                  <option value="Economics">Economics</option>
                  <option value="Organisation of Commerce (OCM)">OCM</option>
                  <option value="Secretarial Practice (SP)">Secretarial Practice</option>
                  <option value="SSC English Writing Skills">SSC English Writing Skills</option>
                  <option value="Board Prelims Test Series">Board Prelims Test Series</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#081B33] mb-1">
                Your Specific Query or Goals:
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Mention chapters where you need support, test series questions, or counseling..."
                className="w-full px-3 py-2 text-xs border border-[#E5EAF1] rounded-lg text-[#081B33] focus:ring-2 focus:ring-[#2864DC] focus:outline-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
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
                Send Request
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
