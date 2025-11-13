import { EmploymentEntry } from '@/components/talent/EmploymentHistoryRepeater';
import { EducationEntry } from '@/components/talent/EducationRepeater';

export interface TalentProfileData {
  // Step 2: Personal Information
  full_name: string;
  email: string;
  phone: string;
  location: string;
  linkedin_url: string | null;

  // Step 3: Professional Summary
  bio: string | null;

  // Step 4: Employment History
  employment_history: EmploymentEntry[];

  // Step 5: Education
  education: EducationEntry[];

  // Step 6: Skills & Expertise
  skills: string[];

  // Step 7: Certifications
  certifications: string[];

  // Step 8: Industry Experience
  industry_experience: string[];

  // Step 9: Functional Expertise
  functional_expertise: string[];

  // Step 10: Availability & Preferences
  availability: string | null;
  experience_years: number | null;
  preferred_engagement: string[];
  
  // AI parsing metadata
  ai_parsed_data?: any;
  resume_file_path?: string;
}

export const SKILLS_OPTIONS = [
  'Strategic Planning',
  'Financial Analysis',
  'M&A',
  'Due Diligence',
  'Portfolio Management',
  'Operational Excellence',
  'Change Management',
  'Digital Transformation',
  'Data Analytics',
  'Risk Management',
  'Compliance',
  'Business Development',
  'Sales & Marketing',
  'Product Management',
  'Project Management',
  'Team Leadership',
  'Stakeholder Management',
  'Negotiation',
  'Problem Solving',
  'Communication',
];

export const INDUSTRY_OPTIONS = [
  'Technology',
  'Healthcare',
  'Financial Services',
  'Manufacturing',
  'Retail',
  'Consumer Goods',
  'Energy',
  'Real Estate',
  'Transportation',
  'Telecommunications',
  'Media & Entertainment',
  'Hospitality',
  'Education',
  'Professional Services',
  'Aerospace & Defense',
  'Automotive',
  'Pharmaceuticals',
  'Industrial',
];

export const FUNCTIONAL_EXPERTISE_OPTIONS = [
  'General Management',
  'Finance & Accounting',
  'Operations',
  'Supply Chain',
  'Human Resources',
  'Information Technology',
  'Sales & Marketing',
  'Business Development',
  'Strategy & Consulting',
  'Legal & Compliance',
  'Research & Development',
  'Product Development',
  'Customer Success',
  'Corporate Development',
  'Investor Relations',
];

export const ENGAGEMENT_OPTIONS = [
  'Interim Executive',
  'Operating Partner',
  'Board Member',
  'Strategic Advisor',
  'Full-time Executive',
  'Project-based Consulting',
];
