-- Add consulting and PE experience fields to talent_profiles table
ALTER TABLE talent_profiles 
ADD COLUMN IF NOT EXISTS consulting_firms text[] DEFAULT ARRAY[]::text[],
ADD COLUMN IF NOT EXISTS consulting_firms_other text,
ADD COLUMN IF NOT EXISTS consulting_years_experience numeric,
ADD COLUMN IF NOT EXISTS consulting_highest_title text,
ADD COLUMN IF NOT EXISTS pe_portfolio_years numeric,
ADD COLUMN IF NOT EXISTS pe_board_experience text,
ADD COLUMN IF NOT EXISTS pe_engagement_types text[] DEFAULT ARRAY[]::text[],
ADD COLUMN IF NOT EXISTS pe_portfolio_experience_description text;

COMMENT ON COLUMN talent_profiles.consulting_firms IS 'Array of consulting firms worked at';
COMMENT ON COLUMN talent_profiles.consulting_firms_other IS 'Other consulting firm not in the list';
COMMENT ON COLUMN talent_profiles.consulting_years_experience IS 'Total years of consulting experience';
COMMENT ON COLUMN talent_profiles.consulting_highest_title IS 'Highest title achieved in consulting';
COMMENT ON COLUMN talent_profiles.pe_portfolio_years IS 'Years of portfolio company experience';
COMMENT ON COLUMN talent_profiles.pe_board_experience IS 'Board reporting experience';
COMMENT ON COLUMN talent_profiles.pe_engagement_types IS 'Types of PE engagements';
COMMENT ON COLUMN talent_profiles.pe_portfolio_experience_description IS 'Description of PE portfolio experience';