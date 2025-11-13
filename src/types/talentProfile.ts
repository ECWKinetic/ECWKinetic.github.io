import { EmploymentEntry } from '@/components/talent/EmploymentHistoryRepeater';
import { EducationEntry } from '@/components/talent/EducationRepeater';

export interface TalentProfileData {
  // Database ID (for existing profiles)
  id?: string;
  
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

  // Step 10: Consulting & PE Experience
  consulting_firms: string[];
  consulting_firms_other: string | null;
  consulting_years_experience: number | null;
  consulting_highest_title: string | null;
  pe_portfolio_years: number | null;
  pe_board_experience: string | null;
  pe_engagement_types: string[];
  pe_portfolio_experience_description: string | null;

  // Step 11: Availability & Preferences
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

export const CONSULTING_FIRMS_OPTIONS = [
  'Alvarez & Marsal (A&M)',
  'AlixPartners',
  'Bain & Company',
  'Berkeley Research Group (BRG)',
  'Boston Consulting Group (BCG)',
  'Deloitte',
  'EY (Ernst & Young)',
  'FTI Consulting',
  'Kearney',
  'KPMG',
  'LEK Consulting',
  'McKinsey & Company',
  'OC&C Strategy Consultants',
  'Oliver Wyman',
  'PwC (beyond Strategy&)',
  'Roland Berger',
  'Strategy& (PwC)',
  'Other',
];

export const PE_ENGAGEMENT_OPTIONS = [
  'Interim Executive',
  'Operating Partner',
  'Board Member',
  'Strategic Advisor',
  'Portfolio Company CEO/C-Suite',
  'Transformation Leader',
  'Value Creation Consultant',
];
