-- Add comprehensive fields to project_briefs table for detailed project briefs

-- STEP 1 - Company Profile
ALTER TABLE project_briefs ADD COLUMN portfolio_company_name TEXT;
ALTER TABLE project_briefs ADD COLUMN company_location TEXT;
ALTER TABLE project_briefs ADD COLUMN industry_sector TEXT;
ALTER TABLE project_briefs ADD COLUMN company_size_revenue NUMERIC;
ALTER TABLE project_briefs ADD COLUMN company_size_headcount NUMERIC;
ALTER TABLE project_briefs ADD COLUMN company_type TEXT;
ALTER TABLE project_briefs ADD COLUMN pe_firm_name TEXT;
ALTER TABLE project_briefs ADD COLUMN primary_pe_contact_name TEXT;
ALTER TABLE project_briefs ADD COLUMN primary_pe_contact_title TEXT;
ALTER TABLE project_briefs ADD COLUMN family_office_name TEXT;
ALTER TABLE project_briefs ADD COLUMN family_office_contact TEXT;

-- STEP 2 - Requestor & Decision Maker
ALTER TABLE project_briefs ADD COLUMN requestor_name TEXT;
ALTER TABLE project_briefs ADD COLUMN requestor_title TEXT;
ALTER TABLE project_briefs ADD COLUMN requestor_company TEXT;
ALTER TABLE project_briefs ADD COLUMN requestor_email TEXT;
ALTER TABLE project_briefs ADD COLUMN requestor_phone TEXT;
ALTER TABLE project_briefs ADD COLUMN relationship_to_search TEXT;
ALTER TABLE project_briefs ADD COLUMN decision_maker_name TEXT;
ALTER TABLE project_briefs ADD COLUMN decision_maker_title TEXT;

-- STEP 3 - Nature of the Need
ALTER TABLE project_briefs ADD COLUMN engagement_type TEXT;
ALTER TABLE project_briefs ADD COLUMN role_title TEXT;
ALTER TABLE project_briefs ADD COLUMN role_summary TEXT;
ALTER TABLE project_briefs ADD COLUMN job_description_upload TEXT;
ALTER TABLE project_briefs ADD COLUMN engagement_trigger TEXT[];
ALTER TABLE project_briefs ADD COLUMN top_objectives JSONB;
ALTER TABLE project_briefs ADD COLUMN success_metrics TEXT;

-- STEP 4 - Timing & Urgency
ALTER TABLE project_briefs ADD COLUMN urgency_level TEXT;
ALTER TABLE project_briefs ADD COLUMN target_start_date DATE;
ALTER TABLE project_briefs ADD COLUMN expected_duration TEXT;
ALTER TABLE project_briefs ADD COLUMN hard_end_date DATE;

-- STEP 5 - Reporting & Team Structure
ALTER TABLE project_briefs ADD COLUMN reports_to_name TEXT;
ALTER TABLE project_briefs ADD COLUMN reports_to_title TEXT;
ALTER TABLE project_briefs ADD COLUMN board_interaction TEXT;
ALTER TABLE project_briefs ADD COLUMN direct_reports TEXT;
ALTER TABLE project_briefs ADD COLUMN key_stakeholders TEXT;
ALTER TABLE project_briefs ADD COLUMN team_dynamics_notes TEXT;

-- STEP 6 - Experience Requirements
ALTER TABLE project_briefs ADD COLUMN years_experience_min NUMERIC;
ALTER TABLE project_briefs ADD COLUMN industry_experience_required TEXT;
ALTER TABLE project_briefs ADD COLUMN industry_experience_description TEXT;
ALTER TABLE project_briefs ADD COLUMN pe_experience TEXT;
ALTER TABLE project_briefs ADD COLUMN functional_expertise TEXT[];
ALTER TABLE project_briefs ADD COLUMN turnaround_experience TEXT;
ALTER TABLE project_briefs ADD COLUMN change_management_experience TEXT;
ALTER TABLE project_briefs ADD COLUMN interim_experience TEXT;
ALTER TABLE project_briefs ADD COLUMN education_requirements TEXT;
ALTER TABLE project_briefs ADD COLUMN certifications TEXT;
ALTER TABLE project_briefs ADD COLUMN consulting_background TEXT;
ALTER TABLE project_briefs ADD COLUMN public_company_experience TEXT;
ALTER TABLE project_briefs ADD COLUMN board_experience TEXT;

-- STEP 7 - Work Model & Travel
ALTER TABLE project_briefs ADD COLUMN primary_location TEXT;
ALTER TABLE project_briefs ADD COLUMN onsite_expectation TEXT;
ALTER TABLE project_briefs ADD COLUMN onsite_days_per_week NUMERIC;
ALTER TABLE project_briefs ADD COLUMN travel_requirement_percent NUMERIC;
ALTER TABLE project_briefs ADD COLUMN travel_geography TEXT;

-- STEP 8 - Compensation (budget_range already exists)
ALTER TABLE project_briefs ADD COLUMN compensation_model TEXT;
ALTER TABLE project_briefs ADD COLUMN equity_component TEXT;
ALTER TABLE project_briefs ADD COLUMN equity_notes TEXT;
ALTER TABLE project_briefs ADD COLUMN success_fee TEXT;
ALTER TABLE project_briefs ADD COLUMN expense_policy TEXT;

-- STEP 9 - Process Expectations
ALTER TABLE project_briefs ADD COLUMN interview_steps TEXT;
ALTER TABLE project_briefs ADD COLUMN target_decision_date DATE;
ALTER TABLE project_briefs ADD COLUMN references_required TEXT;
ALTER TABLE project_briefs ADD COLUMN background_check_required TEXT;
ALTER TABLE project_briefs ADD COLUMN background_check_details TEXT;
ALTER TABLE project_briefs ADD COLUMN confidentiality_level TEXT;
ALTER TABLE project_briefs ADD COLUMN permanent_conversion TEXT;