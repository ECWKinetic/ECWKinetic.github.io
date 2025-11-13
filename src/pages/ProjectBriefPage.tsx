import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Briefcase, Plus, Edit, Trash, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProjectBrief {
  id: string;
  [key: string]: any;
}

const TOTAL_STEPS = 10;

export default function ProjectBriefPage() {
  const { user, profile, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [briefs, setBriefs] = useState<ProjectBrief[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    fetchBriefs();
  }, [user]);

  const fetchBriefs = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('project_briefs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBriefs(data || []);
    } catch (error: any) {
      console.error('Error fetching briefs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!user || !confirmed) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please confirm the information is accurate'
      });
      return;
    }

    setSaving(true);
    try {
      const briefData = {
        user_id: user.id,
        ...formData,
        status: 'submitted'
      };

      const { error } = await supabase
        .from('project_briefs')
        .insert(briefData);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Project brief submitted successfully'
      });

      setShowForm(false);
      setCurrentStep(1);
      setFormData({});
      setConfirmed(false);
      fetchBriefs();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to submit brief'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this brief?')) return;

    try {
      const { error } = await supabase
        .from('project_briefs')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Brief deleted'
      });
      fetchBriefs();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to delete brief'
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleMultiSelect = (field: string, option: string) => {
    const current = formData[field] || [];
    const updated = current.includes(option)
      ? current.filter((item: string) => item !== option)
      : [...current, option];
    updateFormData(field, updated);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Company Profile
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Step 1: Company Profile</h3>
            <div className="space-y-2">
              <Label htmlFor="portfolio_company_name">Portfolio Company Name</Label>
              <Input
                id="portfolio_company_name"
                value={formData.portfolio_company_name || ''}
                onChange={(e) => updateFormData('portfolio_company_name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company_location">Headquarters Location (City, State, Country)</Label>
              <Input
                id="company_location"
                value={formData.company_location || ''}
                onChange={(e) => updateFormData('company_location', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry_sector">Industry Sector</Label>
              <Select value={formData.industry_sector || ''} onValueChange={(v) => updateFormData('industry_sector', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="Industrial Services">Industrial Services</SelectItem>
                  <SelectItem value="Logistics">Logistics</SelectItem>
                  <SelectItem value="Construction">Construction</SelectItem>
                  <SelectItem value="SaaS">SaaS</SelectItem>
                  <SelectItem value="Consumer">Consumer</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company_size_revenue">Revenue (Optional)</Label>
                <Input
                  id="company_size_revenue"
                  type="number"
                  value={formData.company_size_revenue || ''}
                  onChange={(e) => updateFormData('company_size_revenue', parseFloat(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company_size_headcount">Headcount (Optional)</Label>
                <Input
                  id="company_size_headcount"
                  type="number"
                  value={formData.company_size_headcount || ''}
                  onChange={(e) => updateFormData('company_size_headcount', parseFloat(e.target.value))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company_type">Company Ownership Type *</Label>
              <Select value={formData.company_type || ''} onValueChange={(v) => updateFormData('company_type', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="Public">Public</SelectItem>
                  <SelectItem value="Private">Private (no sponsor)</SelectItem>
                  <SelectItem value="PE-backed">PE-backed</SelectItem>
                  <SelectItem value="Venture-backed">Venture-backed</SelectItem>
                  <SelectItem value="Family Office">Family Office–owned</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.company_type === 'PE-backed' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="pe_firm_name">PE Firm Name</Label>
                  <Input
                    id="pe_firm_name"
                    value={formData.pe_firm_name || ''}
                    onChange={(e) => updateFormData('pe_firm_name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primary_pe_contact_name">Primary PE Contact Name</Label>
                  <Input
                    id="primary_pe_contact_name"
                    value={formData.primary_pe_contact_name || ''}
                    onChange={(e) => updateFormData('primary_pe_contact_name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primary_pe_contact_title">Primary PE Contact Title</Label>
                  <Input
                    id="primary_pe_contact_title"
                    value={formData.primary_pe_contact_title || ''}
                    onChange={(e) => updateFormData('primary_pe_contact_title', e.target.value)}
                  />
                </div>
              </>
            )}
            {formData.company_type === 'Family Office' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="family_office_name">Family Office Name</Label>
                  <Input
                    id="family_office_name"
                    value={formData.family_office_name || ''}
                    onChange={(e) => updateFormData('family_office_name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="family_office_contact">Family Office Contact</Label>
                  <Input
                    id="family_office_contact"
                    value={formData.family_office_contact || ''}
                    onChange={(e) => updateFormData('family_office_contact', e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
        );

      case 2: // Requestor & Decision Maker
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Step 2: Requestor & Decision Maker</h3>
            <div className="space-y-2">
              <Label htmlFor="requestor_name">Requestor Name</Label>
              <Input id="requestor_name" value={formData.requestor_name || ''} onChange={(e) => updateFormData('requestor_name', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="requestor_title">Requestor Title</Label>
              <Input id="requestor_title" value={formData.requestor_title || ''} onChange={(e) => updateFormData('requestor_title', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="requestor_company">Requestor Company</Label>
              <Input id="requestor_company" value={formData.requestor_company || ''} onChange={(e) => updateFormData('requestor_company', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="requestor_email">Requestor Email</Label>
              <Input id="requestor_email" type="email" value={formData.requestor_email || ''} onChange={(e) => updateFormData('requestor_email', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="requestor_phone">Requestor Phone</Label>
              <Input id="requestor_phone" type="tel" value={formData.requestor_phone || ''} onChange={(e) => updateFormData('requestor_phone', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="relationship_to_search">Relationship to Search</Label>
              <Select value={formData.relationship_to_search || ''} onValueChange={(v) => updateFormData('relationship_to_search', v)}>
                <SelectTrigger><SelectValue placeholder="Select relationship" /></SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="PE Partner">PE Partner</SelectItem>
                  <SelectItem value="Portfolio Company Exec">Portfolio Company Exec</SelectItem>
                  <SelectItem value="HR/People Ops">HR/People Ops</SelectItem>
                  <SelectItem value="Board Member">Board Member</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="decision_maker_name">Decision Maker Name</Label>
              <Input id="decision_maker_name" value={formData.decision_maker_name || ''} onChange={(e) => updateFormData('decision_maker_name', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="decision_maker_title">Decision Maker Title</Label>
              <Input id="decision_maker_title" value={formData.decision_maker_title || ''} onChange={(e) => updateFormData('decision_maker_title', e.target.value)} />
            </div>
          </div>
        );

      case 3: // Nature of the Need
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Step 3: Nature of the Need</h3>
            <div className="space-y-2">
              <Label htmlFor="engagement_type">Engagement Type *</Label>
              <Select value={formData.engagement_type || ''} onValueChange={(v) => updateFormData('engagement_type', v)}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="Interim Executive">Interim Executive</SelectItem>
                  <SelectItem value="Project Consultant">Project Consultant</SelectItem>
                  <SelectItem value="Fractional Leader">Fractional Leader</SelectItem>
                  <SelectItem value="Advisor">Advisor</SelectItem>
                  <SelectItem value="Not Sure">Not Sure</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role_title">Role Title</Label>
              <Input id="role_title" value={formData.role_title || ''} onChange={(e) => updateFormData('role_title', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role_summary">One-line Summary of the Need</Label>
              <Textarea id="role_summary" value={formData.role_summary || ''} onChange={(e) => updateFormData('role_summary', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Engagement Trigger (select all that apply)</Label>
              <div className="grid grid-cols-2 gap-2">
                {['Post-acquisition integration', 'Turnaround / crisis', 'Pre-sale preparation', 'Sudden departure', 'Failed search', 'M&A readiness', 'System implementation', 'Restructuring', 'Growth / scaling', 'Other'].map(option => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      checked={(formData.engagement_trigger || []).includes(option)}
                      onCheckedChange={() => handleMultiSelect('engagement_trigger', option)}
                    />
                    <label className="text-sm">{option}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Top 3 Objectives</Label>
              {[0, 1, 2].map(i => (
                <Input
                  key={i}
                  placeholder={`Objective ${i + 1}`}
                  value={formData.top_objectives?.[i] || ''}
                  onChange={(e) => {
                    const objectives = formData.top_objectives || ['', '', ''];
                    objectives[i] = e.target.value;
                    updateFormData('top_objectives', objectives);
                  }}
                />
              ))}
            </div>
            <div className="space-y-2">
              <Label htmlFor="success_metrics">How success will be measured</Label>
              <Textarea id="success_metrics" value={formData.success_metrics || ''} onChange={(e) => updateFormData('success_metrics', e.target.value)} />
            </div>
          </div>
        );

      case 4: // Timing & Urgency
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Step 4: Timing & Urgency</h3>
            <div className="space-y-2">
              <Label htmlFor="urgency_level">Urgency Level</Label>
              <Select value={formData.urgency_level || ''} onValueChange={(v) => updateFormData('urgency_level', v)}>
                <SelectTrigger><SelectValue placeholder="Select urgency" /></SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="Immediate">Immediate (0–2 weeks)</SelectItem>
                  <SelectItem value="Near-term">Near-term (2–4 weeks)</SelectItem>
                  <SelectItem value="Flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="target_start_date">Target Start Date</Label>
              <Input id="target_start_date" type="date" value={formData.target_start_date || ''} onChange={(e) => updateFormData('target_start_date', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expected_duration">Expected Duration (e.g., "3 months", "until Mar 2026")</Label>
              <Input id="expected_duration" value={formData.expected_duration || ''} onChange={(e) => updateFormData('expected_duration', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hard_end_date">Hard End Date (Optional)</Label>
              <Input id="hard_end_date" type="date" value={formData.hard_end_date || ''} onChange={(e) => updateFormData('hard_end_date', e.target.value)} />
            </div>
          </div>
        );

      case 5: // Reporting & Team Structure
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Step 5: Reporting & Team Structure</h3>
            <div className="space-y-2">
              <Label htmlFor="reports_to_name">Reports To Name</Label>
              <Input id="reports_to_name" value={formData.reports_to_name || ''} onChange={(e) => updateFormData('reports_to_name', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reports_to_title">Reports To Title</Label>
              <Input id="reports_to_title" value={formData.reports_to_title || ''} onChange={(e) => updateFormData('reports_to_title', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="board_interaction">Board Interaction</Label>
              <Select value={formData.board_interaction || ''} onValueChange={(v) => updateFormData('board_interaction', v)}>
                <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="None">None</SelectItem>
                  <SelectItem value="Occasional">Occasional</SelectItem>
                  <SelectItem value="Regular">Regular</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="direct_reports">Number and types of direct reports</Label>
              <Input id="direct_reports" value={formData.direct_reports || ''} onChange={(e) => updateFormData('direct_reports', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="key_stakeholders">Key Stakeholders</Label>
              <Textarea id="key_stakeholders" value={formData.key_stakeholders || ''} onChange={(e) => updateFormData('key_stakeholders', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="team_dynamics_notes">Team sensitivities or known challenges (optional)</Label>
              <Textarea id="team_dynamics_notes" value={formData.team_dynamics_notes || ''} onChange={(e) => updateFormData('team_dynamics_notes', e.target.value)} />
            </div>
          </div>
        );

      case 6: // Experience Requirements
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Step 6: Experience Requirements</h3>
            <div className="space-y-2">
              <Label htmlFor="years_experience_min">Minimum Years of Experience</Label>
              <Input id="years_experience_min" type="number" value={formData.years_experience_min || ''} onChange={(e) => updateFormData('years_experience_min', parseFloat(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry_experience_required">Industry Experience</Label>
              <Select value={formData.industry_experience_required || ''} onValueChange={(v) => updateFormData('industry_experience_required', v)}>
                <SelectTrigger><SelectValue placeholder="Select requirement" /></SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="Required">Required</SelectItem>
                  <SelectItem value="Preferred">Preferred</SelectItem>
                  <SelectItem value="Not required">Not required</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry_experience_description">Industry Experience Description</Label>
              <Input id="industry_experience_description" value={formData.industry_experience_description || ''} onChange={(e) => updateFormData('industry_experience_description', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pe_experience">PE Experience</Label>
              <Select value={formData.pe_experience || ''} onValueChange={(v) => updateFormData('pe_experience', v)}>
                <SelectTrigger><SelectValue placeholder="Select requirement" /></SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="Required">Required</SelectItem>
                  <SelectItem value="Preferred">Preferred</SelectItem>
                  <SelectItem value="Not required">Not required</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Functional Expertise (select all that apply)</Label>
              <div className="grid grid-cols-2 gap-2">
                {['Finance', 'Ops', 'Supply Chain', 'Technology', 'Sales', 'M&A', 'PMO/Transformation', 'Data/BI', 'Other'].map(option => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      checked={(formData.functional_expertise || []).includes(option)}
                      onCheckedChange={() => handleMultiSelect('functional_expertise', option)}
                    />
                    <label className="text-sm">{option}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="turnaround_experience">Turnaround Experience</Label>
                <Select value={formData.turnaround_experience || ''} onValueChange={(v) => updateFormData('turnaround_experience', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    <SelectItem value="Required">Required</SelectItem>
                    <SelectItem value="Preferred">Preferred</SelectItem>
                    <SelectItem value="Not required">Not required</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="change_management_experience">Change Management</Label>
                <Select value={formData.change_management_experience || ''} onValueChange={(v) => updateFormData('change_management_experience', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    <SelectItem value="None">None</SelectItem>
                    <SelectItem value="Some">Some</SelectItem>
                    <SelectItem value="Extensive">Extensive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="interim_experience">Interim Experience</Label>
              <Select value={formData.interim_experience || ''} onValueChange={(v) => updateFormData('interim_experience', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="Required">Required</SelectItem>
                  <SelectItem value="Preferred">Preferred</SelectItem>
                  <SelectItem value="Not required">Not required</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="education_requirements">Education Requirements</Label>
              <Select value={formData.education_requirements || ''} onValueChange={(v) => updateFormData('education_requirements', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="None">None</SelectItem>
                  <SelectItem value="Bachelor's">Bachelor's</SelectItem>
                  <SelectItem value="MBA preferred">MBA preferred</SelectItem>
                  <SelectItem value="MBA required">MBA required</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="certifications">Certifications</Label>
              <Input id="certifications" value={formData.certifications || ''} onChange={(e) => updateFormData('certifications', e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="consulting_background">Consulting Background</Label>
                <Select value={formData.consulting_background || ''} onValueChange={(v) => updateFormData('consulting_background', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    <SelectItem value="Required">Required</SelectItem>
                    <SelectItem value="Preferred">Preferred</SelectItem>
                    <SelectItem value="Not required">Not required</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="public_company_experience">Public Company Experience</Label>
                <Select value={formData.public_company_experience || ''} onValueChange={(v) => updateFormData('public_company_experience', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    <SelectItem value="Required">Required</SelectItem>
                    <SelectItem value="Preferred">Preferred</SelectItem>
                    <SelectItem value="Not required">Not required</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="board_experience">Board Experience</Label>
              <Select value={formData.board_experience || ''} onValueChange={(v) => updateFormData('board_experience', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="Required">Required</SelectItem>
                  <SelectItem value="Preferred">Preferred</SelectItem>
                  <SelectItem value="Not required">Not required</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 7: // Work Model & Travel
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Step 7: Work Model & Travel</h3>
            <div className="space-y-2">
              <Label htmlFor="primary_location">Primary Location</Label>
              <Input id="primary_location" value={formData.primary_location || ''} onChange={(e) => updateFormData('primary_location', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="onsite_expectation">Onsite Expectation</Label>
              <Select value={formData.onsite_expectation || ''} onValueChange={(v) => updateFormData('onsite_expectation', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="Fully remote">Fully remote</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                  <SelectItem value="Mostly onsite">Mostly onsite</SelectItem>
                  <SelectItem value="Full onsite">Full onsite</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {(formData.onsite_expectation === 'Hybrid' || formData.onsite_expectation === 'Mostly onsite') && (
              <div className="space-y-2">
                <Label htmlFor="onsite_days_per_week">Onsite Days Per Week</Label>
                <Input id="onsite_days_per_week" type="number" min="1" max="7" value={formData.onsite_days_per_week || ''} onChange={(e) => updateFormData('onsite_days_per_week', parseFloat(e.target.value))} />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="travel_requirement_percent">Travel Requirement (%)</Label>
              <Input id="travel_requirement_percent" type="number" min="0" max="100" value={formData.travel_requirement_percent || ''} onChange={(e) => updateFormData('travel_requirement_percent', parseFloat(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="travel_geography">Travel Geography</Label>
              <Input id="travel_geography" value={formData.travel_geography || ''} onChange={(e) => updateFormData('travel_geography', e.target.value)} />
            </div>
          </div>
        );

      case 8: // Compensation
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Step 8: Compensation</h3>
            <div className="space-y-2">
              <Label htmlFor="budget_range">Budget Range (e.g., "$175–225/hr" or "$1,600–2,000/day")</Label>
              <Input id="budget_range" value={formData.budget_range || ''} onChange={(e) => updateFormData('budget_range', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="compensation_model">Compensation Model</Label>
              <Select value={formData.compensation_model || ''} onValueChange={(v) => updateFormData('compensation_model', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="Day rate">Day rate</SelectItem>
                  <SelectItem value="Hourly">Hourly</SelectItem>
                  <SelectItem value="Retainer + Variable">Retainer + Variable</SelectItem>
                  <SelectItem value="Project-based">Project-based</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="equity_component">Equity Component</Label>
              <Select value={formData.equity_component || ''} onValueChange={(v) => updateFormData('equity_component', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="None">None</SelectItem>
                  <SelectItem value="Possible">Possible</SelectItem>
                  <SelectItem value="Expected">Expected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {(formData.equity_component === 'Possible' || formData.equity_component === 'Expected') && (
              <div className="space-y-2">
                <Label htmlFor="equity_notes">Equity Notes</Label>
                <Textarea id="equity_notes" value={formData.equity_notes || ''} onChange={(e) => updateFormData('equity_notes', e.target.value)} />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="success_fee">Success Fee (Optional)</Label>
              <Input id="success_fee" value={formData.success_fee || ''} onChange={(e) => updateFormData('success_fee', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expense_policy">Expense Policy</Label>
              <Textarea id="expense_policy" value={formData.expense_policy || ''} onChange={(e) => updateFormData('expense_policy', e.target.value)} />
            </div>
          </div>
        );

      case 9: // Process Expectations
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Step 9: Process Expectations</h3>
            <div className="space-y-2">
              <Label htmlFor="interview_steps">Expected Interview Process</Label>
              <Textarea id="interview_steps" value={formData.interview_steps || ''} onChange={(e) => updateFormData('interview_steps', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="target_decision_date">Target Decision Date</Label>
              <Input id="target_decision_date" type="date" value={formData.target_decision_date || ''} onChange={(e) => updateFormData('target_decision_date', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="references_required">References Required</Label>
              <Select value={formData.references_required || ''} onValueChange={(v) => updateFormData('references_required', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="None">None</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3+">3+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="background_check_required">Background Check Required</Label>
              <Select value={formData.background_check_required || ''} onValueChange={(v) => updateFormData('background_check_required', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.background_check_required === 'Yes' && (
              <div className="space-y-2">
                <Label htmlFor="background_check_details">Background Check Details</Label>
                <Textarea id="background_check_details" value={formData.background_check_details || ''} onChange={(e) => updateFormData('background_check_details', e.target.value)} />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="confidentiality_level">Confidentiality Level</Label>
              <Select value={formData.confidentiality_level || ''} onValueChange={(v) => updateFormData('confidentiality_level', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="Public">Public</SelectItem>
                  <SelectItem value="Controlled disclosure">Controlled disclosure</SelectItem>
                  <SelectItem value="Stealth">Stealth</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="permanent_conversion">Permanent Conversion</Label>
              <Select value={formData.permanent_conversion || ''} onValueChange={(v) => updateFormData('permanent_conversion', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="Not possible">Not possible</SelectItem>
                  <SelectItem value="Possible">Possible</SelectItem>
                  <SelectItem value="Preferred">Preferred</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 10: // Final Review & Submit
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Step 10: Final Review & Submit</h3>
            <div className="space-y-4 bg-muted p-4 rounded-lg max-h-96 overflow-y-auto">
              <h4 className="font-semibold">Summary of Your Submission</h4>
              {Object.entries(formData).map(([key, value]) => {
                if (!value || (Array.isArray(value) && value.length === 0)) return null;
                return (
                  <div key={key} className="text-sm">
                    <span className="font-medium">{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}: </span>
                    <span className="text-muted-foreground">
                      {Array.isArray(value) ? value.join(', ') : typeof value === 'object' ? JSON.stringify(value) : String(value)}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="confirm"
                checked={confirmed}
                onCheckedChange={(checked) => setConfirmed(checked as boolean)}
              />
              <label htmlFor="confirm" className="text-sm font-medium">
                I confirm the information provided is accurate
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="h-6 w-6" />
            <div>
              <h1 className="font-semibold">Project Briefs</h1>
              <p className="text-sm text-muted-foreground">{profile?.email}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {!showForm ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Your Project Briefs</h2>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Brief
              </Button>
            </div>

            {briefs.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No briefs yet. Create your first one to get started!
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {briefs.map((brief) => (
                  <Card key={brief.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <CardTitle>{brief.role_title || brief.portfolio_company_name || 'Untitled Brief'}</CardTitle>
                          {brief.portfolio_company_name && (
                            <CardDescription>{brief.portfolio_company_name}</CardDescription>
                          )}
                        </div>
                        <Badge>{brief.status || 'draft'}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{brief.role_summary || brief.project_description}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleDelete(brief.id)}>
                          <Trash className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Create New Project Brief</CardTitle>
              <CardDescription>
                Step {currentStep} of {TOTAL_STEPS}
              </CardDescription>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {renderStepContent()}

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                {currentStep < TOTAL_STEPS ? (
                  <Button onClick={nextStep}>
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={saving || !confirmed}>
                    {saving ? 'Submitting...' : 'Submit Brief'}
                  </Button>
                )}
              </div>

              <Button
                variant="ghost"
                onClick={() => {
                  setShowForm(false);
                  setCurrentStep(1);
                  setFormData({});
                  setConfirmed(false);
                }}
                className="w-full"
              >
                Cancel
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
