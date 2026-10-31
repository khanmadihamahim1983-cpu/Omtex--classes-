export type AcademicStandard = 'SSC 10th' | 'HSC 12th' | 'Commerce FYJC' | 'Commerce SYJC' | 'All Standards';

export type SubjectCategory =
  | 'Bookkeeping & Accountancy'
  | 'Economics'
  | 'Organisation of Commerce (OCM)'
  | 'Secretarial Practice (SP)'
  | 'Mathematics & Statistics'
  | 'English Writing Skills'
  | 'Science & Technology'
  | 'Social Sciences'
  | 'General Revision';

export type ResourceType =
  | 'Study Notes'
  | 'Board Question Paper'
  | 'Model Answer Sheet'
  | 'Chapter Solution'
  | 'Grammar & Writing Guide'
  | 'Formula Sheet';

export interface EducationalResource {
  id: string;
  title: string;
  standard: AcademicStandard;
  subject: SubjectCategory;
  type: ResourceType;
  category: 'SSC' | 'HSC' | 'Commerce' | 'Writing Skills' | 'Question Papers';
  description: string;
  content: string; // rich formatted text / study guide
  summaryPoints?: string[];
  fileSize: string;
  pages: number;
  year?: string;
  updatedAt: string;
  isPublished: boolean;
  downloadsCount: number;
  viewsCount: number;
  featured?: boolean;
}

export interface QuestionPaper {
  id: string;
  title: string;
  standard: 'SSC 10th' | 'HSC 12th';
  subject: SubjectCategory;
  year: string;
  session: 'March' | 'July' | 'Preliminary' | 'Board Model';
  marks: number;
  duration: string;
  solutionAvailable: boolean;
  solutionSummary: string;
  questionsCount: number;
  downloadUrl?: string;
}

export interface StudentReview {
  id: string;
  studentName: string;
  standard: string;
  collegeOrSchool: string;
  reviewText: string;
  rating: number;
  date: string;
  status: 'approved' | 'pending';
  scoreHighlight?: string;
}

export interface ContactEnquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  standard: string;
  subjectInterest: string;
  message: string;
  createdAt: string;
  status: 'New' | 'Contacted' | 'Resolved';
}

export interface Announcement {
  id: string;
  title: string;
  badge: string;
  linkText: string;
  linkAction: string;
  isActive: boolean;
  priority: 'high' | 'normal';
  date: string;
}

export interface SiteSettings {
  instituteName: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  contactEmail: string;
  contactPhone: string;
  centerAddress: string;
  workingHours: string;
  academicYear: string;
  boardAffiliation: string;
}
