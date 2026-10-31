import React, { useState } from 'react';
import { X, Download, Printer, Copy, Check, BookOpen, Share2, ZoomIn, ZoomOut } from 'lucide-react';
import { EducationalResource } from '../types';

interface ResourceModalProps {
  resource: EducationalResource | null;
  onClose: () => void;
  onDownload: (resource: EducationalResource) => void;
}

export const ResourceModal: React.FC<ResourceModalProps> = ({
  resource,
  onClose,
  onDownload
}) => {
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  if (!resource) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${resource.title}\n\n${resource.description}\n\n${resource.content}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const fontClass =
    fontSize === 'normal'
      ? 'text-sm leading-relaxed'
      : fontSize === 'large'
      ? 'text-base leading-relaxed'
      : 'text-lg leading-loose';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-[#E5EAF1] overflow-hidden">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-[#081B33] text-white flex items-center justify-between border-b border-[#123D70]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#123D70] text-[#D6B46A] flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <span className="font-semibold text-[#D6B46A]">{resource.standard}</span>
                <span aria-hidden="true">·</span>
                <span>{resource.subject}</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold font-['Plus_Jakarta_Sans'] text-white truncate max-w-md sm:max-w-xl">
                {resource.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="px-6 py-2.5 bg-[#FAFBFD] border-b border-[#E5EAF1] flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3 text-xs text-[#667085]">
            <span>Type: <strong>{resource.type}</strong></span>
            <span aria-hidden="true">·</span>
            <span>Pages: <strong>{resource.pages}</strong></span>
            <span aria-hidden="true">·</span>
            <span>Size: <strong>{resource.fileSize}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            {/* Font Zoom Controls */}
            <div className="hidden sm:flex items-center bg-white border border-[#E5EAF1] rounded-lg p-0.5 text-xs text-[#667085]">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 rounded ${fontSize === 'normal' ? 'bg-[#EAF1FF] text-[#123D70] font-bold' : ''}`}
                title="Normal text size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 rounded ${fontSize === 'large' ? 'bg-[#EAF1FF] text-[#123D70] font-bold' : ''}`}
                title="Large text size"
              >
                A+
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="p-2 text-xs text-[#344054] hover:text-[#081B33] bg-white hover:bg-slate-50 border border-[#E5EAF1] rounded-lg flex items-center gap-1.5 transition-colors"
              title="Copy notes"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="p-2 text-xs text-[#344054] hover:text-[#081B33] bg-white hover:bg-slate-50 border border-[#E5EAF1] rounded-lg flex items-center gap-1.5 transition-colors"
              title="Print study sheet"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              onClick={() => onDownload(resource)}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#2864DC] hover:bg-[#1e52bc] rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Scrollable Document Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-white">
          
          {/* Executive Overview Banner */}
          <div className="bg-[#FAFBFD] p-5 rounded-xl border border-[#E5EAF1] mb-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#123D70] mb-2">
              Syllabus Coverage Summary
            </h4>
            <p className="text-xs sm:text-sm text-[#344054] leading-relaxed mb-4">
              {resource.description}
            </p>
            {resource.summaryPoints && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#344054]">
                {resource.summaryPoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <span className="text-[#2864DC] font-bold">✓</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Formatted Markdown Content */}
          <div className={`prose max-w-none text-[#344054] font-normal ${fontClass}`}>
            <pre className="whitespace-pre-wrap font-sans bg-transparent p-0 border-0 leading-relaxed text-[#344054]">
              {resource.content}
            </pre>
          </div>

          {/* Document Footer */}
          <div className="mt-12 pt-6 border-t border-[#E5EAF1] flex items-center justify-between text-xs text-[#667085]">
            <div>
              OMTEX CLASSES Academic Publishing Division · Maharashtra State Board
            </div>
            <div className="font-mono text-[11px]">
              Doc Ref: {resource.id}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
