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
      talent_profiles: {
        Row: {
          availability: string | null
          bio: string | null
          created_at: string | null
          experience_years: number | null
          id: string
          linkedin_url: string | null
          resume_url: string | null
          skills: string[] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          availability?: string | null
          bio?: string | null
          created_at?: string | null
          experience_years?: number | null
          id?: string
          linkedin_url?: string | null
          resume_url?: string | null
          skills?: string[] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          availability?: string | null
          bio?: string | null
          created_at?: string | null
          experience_years?: number | null
          id?: string
          linkedin_url?: string | null
          resume_url?: string | null
          skills?: string[] | null
          updated_at?: string | null
          user_id?: string
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
