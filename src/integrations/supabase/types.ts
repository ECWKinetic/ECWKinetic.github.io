export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      customer_profiles: {
        Row: {
          bio: string | null
          company_name: string | null
          created_at: string | null
          id: string
          job_title: string | null
          phone: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          bio?: string | null
          company_name?: string | null
          created_at?: string | null
          id?: string
          job_title?: string | null
          phone?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          bio?: string | null
          company_name?: string | null
          created_at?: string | null
          id?: string
          job_title?: string | null
          phone?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          preferences: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          preferences?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          preferences?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      project_briefs: {
        Row: {
          background_check_details: string | null
          background_check_required: string | null
          board_experience: string | null
          board_interaction: string | null
          budget_range: string | null
          certifications: string | null
          change_management_experience: string | null
          company_location: string | null
          company_name: string | null
          company_size_headcount: number | null
          company_size_revenue: number | null
          company_type: string | null
          compensation_model: string | null
          confidentiality_level: string | null
          consulting_background: string | null
          created_at: string | null
          decision_maker_name: string | null
          decision_maker_title: string | null
          direct_reports: string | null
          education_requirements: string | null
          engagement_trigger: string[] | null
          engagement_type: string | null
          equity_component: string | null
          equity_notes: string | null
          expected_duration: string | null
          expense_policy: string | null
          family_office_contact: string | null
          family_office_name: string | null
          functional_expertise: string[] | null
          hard_end_date: string | null
          id: string
          industry_experience_description: string | null
          industry_experience_required: string | null
          industry_sector: string | null
          interim_experience: string | null
          interview_steps: string | null
          job_description_upload: string | null
          key_stakeholders: string | null
          onsite_days_per_week: number | null
          onsite_expectation: string | null
          pe_experience: string | null
          pe_firm_name: string | null
          permanent_conversion: string | null
          portfolio_company_name: string | null
          primary_location: string | null
          primary_pe_contact_name: string | null
          primary_pe_contact_title: string | null
          project_description: string
          project_title: string
          public_company_experience: string | null
          references_required: string | null
          relationship_to_search: string | null
          reports_to_name: string | null
          reports_to_title: string | null
          requestor_company: string | null
          requestor_email: string | null
          requestor_name: string | null
          requestor_phone: string | null
          requestor_title: string | null
          required_skills: string[] | null
          role_summary: string | null
          role_title: string | null
          status: string | null
          success_fee: string | null
          success_metrics: string | null
          target_decision_date: string | null
          target_start_date: string | null
          team_dynamics_notes: string | null
          timeline: string | null
          top_objectives: Json | null
          travel_geography: string | null
          travel_requirement_percent: number | null
          turnaround_experience: string | null
          updated_at: string | null
          urgency_level: string | null
          user_id: string
          years_experience_min: number | null
        }
        Insert: {
          background_check_details?: string | null
          background_check_required?: string | null
          board_experience?: string | null
          board_interaction?: string | null
          budget_range?: string | null
          certifications?: string | null
          change_management_experience?: string | null
          company_location?: string | null
          company_name?: string | null
          company_size_headcount?: number | null
          company_size_revenue?: number | null
          company_type?: string | null
          compensation_model?: string | null
          confidentiality_level?: string | null
          consulting_background?: string | null
          created_at?: string | null
          decision_maker_name?: string | null
          decision_maker_title?: string | null
          direct_reports?: string | null
          education_requirements?: string | null
          engagement_trigger?: string[] | null
          engagement_type?: string | null
          equity_component?: string | null
          equity_notes?: string | null
          expected_duration?: string | null
          expense_policy?: string | null
          family_office_contact?: string | null
          family_office_name?: string | null
          functional_expertise?: string[] | null
          hard_end_date?: string | null
          id?: string
          industry_experience_description?: string | null
          industry_experience_required?: string | null
          industry_sector?: string | null
          interim_experience?: string | null
          interview_steps?: string | null
          job_description_upload?: string | null
          key_stakeholders?: string | null
          onsite_days_per_week?: number | null
          onsite_expectation?: string | null
          pe_experience?: string | null
          pe_firm_name?: string | null
          permanent_conversion?: string | null
          portfolio_company_name?: string | null
          primary_location?: string | null
          primary_pe_contact_name?: string | null
          primary_pe_contact_title?: string | null
          project_description: string
          project_title: string
          public_company_experience?: string | null
          references_required?: string | null
          relationship_to_search?: string | null
          reports_to_name?: string | null
          reports_to_title?: string | null
          requestor_company?: string | null
          requestor_email?: string | null
          requestor_name?: string | null
          requestor_phone?: string | null
          requestor_title?: string | null
          required_skills?: string[] | null
          role_summary?: string | null
          role_title?: string | null
          status?: string | null
          success_fee?: string | null
          success_metrics?: string | null
          target_decision_date?: string | null
          target_start_date?: string | null
          team_dynamics_notes?: string | null
          timeline?: string | null
          top_objectives?: Json | null
          travel_geography?: string | null
          travel_requirement_percent?: number | null
          turnaround_experience?: string | null
          updated_at?: string | null
          urgency_level?: string | null
          user_id: string
          years_experience_min?: number | null
        }
        Update: {
          background_check_details?: string | null
          background_check_required?: string | null
          board_experience?: string | null
          board_interaction?: string | null
          budget_range?: string | null
          certifications?: string | null
          change_management_experience?: string | null
          company_location?: string | null
          company_name?: string | null
          company_size_headcount?: number | null
          company_size_revenue?: number | null
          company_type?: string | null
          compensation_model?: string | null
          confidentiality_level?: string | null
          consulting_background?: string | null
          created_at?: string | null
          decision_maker_name?: string | null
          decision_maker_title?: string | null
          direct_reports?: string | null
          education_requirements?: string | null
          engagement_trigger?: string[] | null
          engagement_type?: string | null
          equity_component?: string | null
          equity_notes?: string | null
          expected_duration?: string | null
          expense_policy?: string | null
          family_office_contact?: string | null
          family_office_name?: string | null
          functional_expertise?: string[] | null
          hard_end_date?: string | null
          id?: string
          industry_experience_description?: string | null
          industry_experience_required?: string | null
          industry_sector?: string | null
          interim_experience?: string | null
          interview_steps?: string | null
          job_description_upload?: string | null
          key_stakeholders?: string | null
          onsite_days_per_week?: number | null
          onsite_expectation?: string | null
          pe_experience?: string | null
          pe_firm_name?: string | null
          permanent_conversion?: string | null
          portfolio_company_name?: string | null
          primary_location?: string | null
          primary_pe_contact_name?: string | null
          primary_pe_contact_title?: string | null
          project_description?: string
          project_title?: string
          public_company_experience?: string | null
          references_required?: string | null
          relationship_to_search?: string | null
          reports_to_name?: string | null
          reports_to_title?: string | null
          requestor_company?: string | null
          requestor_email?: string | null
          requestor_name?: string | null
          requestor_phone?: string | null
          requestor_title?: string | null
          required_skills?: string[] | null
          role_summary?: string | null
          role_title?: string | null
          status?: string | null
          success_fee?: string | null
          success_metrics?: string | null
          target_decision_date?: string | null
          target_start_date?: string | null
          team_dynamics_notes?: string | null
          timeline?: string | null
          top_objectives?: Json | null
          travel_geography?: string | null
          travel_requirement_percent?: number | null
          turnaround_experience?: string | null
          updated_at?: string | null
          urgency_level?: string | null
          user_id?: string
          years_experience_min?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "project_briefs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      talent_education: {
        Row: {
          created_at: string | null
          degree: string
          graduation_year: string | null
          id: string
          school: string
          talent_profile_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          degree: string
          graduation_year?: string | null
          id?: string
          school: string
          talent_profile_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          degree?: string
          graduation_year?: string | null
          id?: string
          school?: string
          talent_profile_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "talent_education_talent_profile_id_fkey"
            columns: ["talent_profile_id"]
            isOneToOne: false
            referencedRelation: "talent_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      talent_employment_history: {
        Row: {
          company_name: string
          created_at: string | null
          end_date: string | null
          id: string
          is_current_role: boolean | null
          responsibilities_accomplishments: string | null
          start_date: string
          talent_profile_id: string
          team_size_managed: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          company_name: string
          created_at?: string | null
          end_date?: string | null
          id?: string
          is_current_role?: boolean | null
          responsibilities_accomplishments?: string | null
          start_date: string
          talent_profile_id: string
          team_size_managed?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          company_name?: string
          created_at?: string | null
          end_date?: string | null
          id?: string
          is_current_role?: boolean | null
          responsibilities_accomplishments?: string | null
          start_date?: string
          talent_profile_id?: string
          team_size_managed?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "talent_employment_history_talent_profile_id_fkey"
            columns: ["talent_profile_id"]
            isOneToOne: false
            referencedRelation: "talent_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      talent_profiles: {
        Row: {
          availability: string | null
          availability_start_date: string | null
          bio: string | null
          board_experience: string | null
          certifications: string[] | null
          consulting_firms: string[] | null
          consulting_firms_other: string | null
          consulting_highest_title: string | null
          consulting_years_experience: number | null
          created_at: string | null
          current_company: string | null
          current_location: string | null
          current_title: string | null
          day_rate_expectation: string | null
          education: Json | null
          email: string | null
          employment_history: Json | null
          engagement_capacity: string | null
          equity_expectation: string | null
          executive_programs_attended: string | null
          executive_years_experience: number | null
          experience_years: number | null
          first_name: string | null
          full_name: string | null
          functional_experience: string[] | null
          functional_expertise: string[] | null
          geographies_supported: string[] | null
          highest_degree: string | null
          hourly_rate_expectation: string | null
          id: string
          ideal_next_role: string | null
          industries_worked_in: string[] | null
          industry_experience: string[] | null
          industry_notes: string | null
          last_name: string | null
          leadership_style: string | null
          linkedin_url: string | null
          location: string | null
          max_travel_percentage: number | null
          open_to_travel: string | null
          pe_board_experience: string | null
          pe_engagement_types: string[] | null
          pe_portfolio_experience: string | null
          pe_portfolio_experience_description: string | null
          pe_portfolio_years: number | null
          phone: string | null
          preferred_company_stage: string[] | null
          preferred_engagement: string[] | null
          preferred_industries_future: string[] | null
          preferred_role_types: string[] | null
          preferred_work_model: string | null
          profile_completed: boolean | null
          resume_file_path: string | null
          resume_url: string | null
          salary_expectation_fulltime: string | null
          skills: string[] | null
          summary_bio: string | null
          systems_experience: string[] | null
          technical_skills: string | null
          top_strengths: string | null
          total_years_experience: number | null
          types_of_pe_engagements: string[] | null
          updated_at: string | null
          user_id: string
          vc_experience: string | null
          willing_to_relocate: string | null
          willingness_for_success_fee: string | null
          years_in_pe_portfolio_roles: number | null
          years_in_primary_industry: number | null
        }
        Insert: {
          availability?: string | null
          availability_start_date?: string | null
          bio?: string | null
          board_experience?: string | null
          certifications?: string[] | null
          consulting_firms?: string[] | null
          consulting_firms_other?: string | null
          consulting_highest_title?: string | null
          consulting_years_experience?: number | null
          created_at?: string | null
          current_company?: string | null
          current_location?: string | null
          current_title?: string | null
          day_rate_expectation?: string | null
          education?: Json | null
          email?: string | null
          employment_history?: Json | null
          engagement_capacity?: string | null
          equity_expectation?: string | null
          executive_programs_attended?: string | null
          executive_years_experience?: number | null
          experience_years?: number | null
          first_name?: string | null
          full_name?: string | null
          functional_experience?: string[] | null
          functional_expertise?: string[] | null
          geographies_supported?: string[] | null
          highest_degree?: string | null
          hourly_rate_expectation?: string | null
          id?: string
          ideal_next_role?: string | null
          industries_worked_in?: string[] | null
          industry_experience?: string[] | null
          industry_notes?: string | null
          last_name?: string | null
          leadership_style?: string | null
          linkedin_url?: string | null
          location?: string | null
          max_travel_percentage?: number | null
          open_to_travel?: string | null
          pe_board_experience?: string | null
          pe_engagement_types?: string[] | null
          pe_portfolio_experience?: string | null
          pe_portfolio_experience_description?: string | null
          pe_portfolio_years?: number | null
          phone?: string | null
          preferred_company_stage?: string[] | null
          preferred_engagement?: string[] | null
          preferred_industries_future?: string[] | null
          preferred_role_types?: string[] | null
          preferred_work_model?: string | null
          profile_completed?: boolean | null
          resume_file_path?: string | null
          resume_url?: string | null
          salary_expectation_fulltime?: string | null
          skills?: string[] | null
          summary_bio?: string | null
          systems_experience?: string[] | null
          technical_skills?: string | null
          top_strengths?: string | null
          total_years_experience?: number | null
          types_of_pe_engagements?: string[] | null
          updated_at?: string | null
          user_id: string
          vc_experience?: string | null
          willing_to_relocate?: string | null
          willingness_for_success_fee?: string | null
          years_in_pe_portfolio_roles?: number | null
          years_in_primary_industry?: number | null
        }
        Update: {
          availability?: string | null
          availability_start_date?: string | null
          bio?: string | null
          board_experience?: string | null
          certifications?: string[] | null
          consulting_firms?: string[] | null
          consulting_firms_other?: string | null
          consulting_highest_title?: string | null
          consulting_years_experience?: number | null
          created_at?: string | null
          current_company?: string | null
          current_location?: string | null
          current_title?: string | null
          day_rate_expectation?: string | null
          education?: Json | null
          email?: string | null
          employment_history?: Json | null
          engagement_capacity?: string | null
          equity_expectation?: string | null
          executive_programs_attended?: string | null
          executive_years_experience?: number | null
          experience_years?: number | null
          first_name?: string | null
          full_name?: string | null
          functional_experience?: string[] | null
          functional_expertise?: string[] | null
          geographies_supported?: string[] | null
          highest_degree?: string | null
          hourly_rate_expectation?: string | null
          id?: string
          ideal_next_role?: string | null
          industries_worked_in?: string[] | null
          industry_experience?: string[] | null
          industry_notes?: string | null
          last_name?: string | null
          leadership_style?: string | null
          linkedin_url?: string | null
          location?: string | null
          max_travel_percentage?: number | null
          open_to_travel?: string | null
          pe_board_experience?: string | null
          pe_engagement_types?: string[] | null
          pe_portfolio_experience?: string | null
          pe_portfolio_experience_description?: string | null
          pe_portfolio_years?: number | null
          phone?: string | null
          preferred_company_stage?: string[] | null
          preferred_engagement?: string[] | null
          preferred_industries_future?: string[] | null
          preferred_role_types?: string[] | null
          preferred_work_model?: string | null
          profile_completed?: boolean | null
          resume_file_path?: string | null
          resume_url?: string | null
          salary_expectation_fulltime?: string | null
          skills?: string[] | null
          summary_bio?: string | null
          systems_experience?: string[] | null
          technical_skills?: string | null
          top_strengths?: string | null
          total_years_experience?: number | null
          types_of_pe_engagements?: string[] | null
          updated_at?: string | null
          user_id?: string
          vc_experience?: string | null
          willing_to_relocate?: string | null
          willingness_for_success_fee?: string | null
          years_in_pe_portfolio_roles?: number | null
          years_in_primary_industry?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "talent_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
