import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import PortalHeader from '@/components/portal/PortalHeader';
import { WizardProgress } from '@/components/talent/WizardProgress';
import { WizardNavigation } from '@/components/talent/wizard/WizardNavigation';
import { Step1Resume } from '@/components/talent/wizard/Step1Resume';
import { Step2PersonalInfo } from '@/components/talent/wizard/Step2PersonalInfo';
import { Step3Summary } from '@/components/talent/wizard/Step3Summary';
import { Step4Employment } from '@/components/talent/wizard/Step4Employment';
import { Step5Education } from '@/components/talent/wizard/Step5Education';
import { Step6Skills } from '@/components/talent/wizard/Step6Skills';
import { Step7Certifications } from '@/components/talent/wizard/Step7Certifications';
import { Step8Industry } from '@/components/talent/wizard/Step8Industry';
import { Step9Functional } from '@/components/talent/wizard/Step9Functional';
import { Step10ConsultingPE } from '@/components/talent/wizard/Step10ConsultingPE';
import { Step11Availability } from '@/components/talent/wizard/Step11Availability';
import { Step12Review } from '@/components/talent/wizard/Step12Review';
import { TalentProfileData, SKILLS_OPTIONS, INDUSTRY_OPTIONS, FUNCTIONAL_EXPERTISE_OPTIONS } from '@/types/talentProfile';
import { normalizeRepeaterData } from '@/lib/repeaterUtils';
import { normalizeSelectOptions } from '@/lib/utils';

const STEP_TITLES = [
  'Resume',
  'Personal Info',
  'Summary',
  'Employment',
  'Education',
  'Skills',
  'Certifications',
  'Industry',
  'Functional',
  'Consulting & PE',
  'Availability',
  'Review',
];

export default function TalentNetworkPage() {
  const { user, profile, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [aiFilledData, setAiFilledData] = useState<any>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  
  const [formData, setFormData] = useState<TalentProfileData>({
    id: undefined,
    full_name: profile?.full_name || '',
    email: profile?.email || '',
    phone: '',
    location: '',
    linkedin_url: null,
    bio: null,
    employment_history: [],
    education: [],
    skills: [],
    certifications: [],
    industry_experience: [],
    functional_expertise: [],
    consulting_firms: [],
    consulting_firms_other: null,
    consulting_years_experience: null,
    consulting_highest_title: null,
    pe_portfolio_years: null,
    pe_board_experience: null,
    pe_engagement_types: [],
    pe_portfolio_experience_description: null,
    availability: null,
    experience_years: null,
    preferred_engagement: [],
  });

  useEffect(() => {
    fetchTalentProfile();
  }, [user]);

  const fetchTalentProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('talent_profiles')
        .select('*, updated_at')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setLastUpdated(data.updated_at ? new Date(data.updated_at) : null);
        setFormData({
          id: data.id,
          full_name: data.full_name || profile?.full_name || '',
          email: data.email || profile?.email || '',
          phone: data.phone || '',
          location: data.location || '',
          linkedin_url: data.linkedin_url,
          bio: data.bio,
          employment_history: normalizeRepeaterData(Array.isArray(data.employment_history) ? data.employment_history as any : []),
          education: normalizeRepeaterData(Array.isArray(data.education) ? data.education as any : []),
          skills: normalizeSelectOptions(data.skills, SKILLS_OPTIONS),
          certifications: Array.isArray(data.certifications) ? data.certifications : [],
          industry_experience: normalizeSelectOptions(data.industry_experience, INDUSTRY_OPTIONS),
          functional_expertise: normalizeSelectOptions(data.functional_expertise, FUNCTIONAL_EXPERTISE_OPTIONS),
          consulting_firms: Array.isArray(data.consulting_firms) ? data.consulting_firms : [],
          consulting_firms_other: data.consulting_firms_other,
          consulting_years_experience: data.consulting_years_experience,
          consulting_highest_title: data.consulting_highest_title,
          pe_portfolio_years: data.pe_portfolio_years,
          pe_board_experience: data.pe_board_experience,
          pe_engagement_types: Array.isArray(data.pe_engagement_types) ? data.pe_engagement_types : [],
          pe_portfolio_experience_description: data.pe_portfolio_experience_description,
          availability: data.availability,
          experience_years: data.experience_years,
          preferred_engagement: Array.isArray(data.preferred_engagement) ? data.preferred_engagement : [],
        });
      }
    } catch (error: any) {
      console.error('Error fetching talent profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResumeDataParsed = (parsedData: any, filePath: string) => {
    setAiFilledData(parsedData);
    setFormData(prev => ({
      ...prev,
      full_name: parsedData.personal_info?.name || prev.full_name,
      email: parsedData.personal_info?.email || prev.email,
      phone: parsedData.personal_info?.phone || prev.phone,
      location: parsedData.personal_info?.location || prev.location,
      linkedin_url: parsedData.personal_info?.linkedin || prev.linkedin_url,
      bio: parsedData.summary_bio || prev.bio,
      employment_history: normalizeRepeaterData(parsedData.employment_history) || normalizeRepeaterData(prev.employment_history),
      education: normalizeRepeaterData(parsedData.education) || normalizeRepeaterData(prev.education),
      skills: normalizeSelectOptions(parsedData.skills, SKILLS_OPTIONS) || prev.skills,
      certifications: parsedData.certifications || prev.certifications,
      industry_experience: normalizeSelectOptions(parsedData.industry_experience, INDUSTRY_OPTIONS) || prev.industry_experience,
      functional_expertise: normalizeSelectOptions(parsedData.functional_expertise, FUNCTIONAL_EXPERTISE_OPTIONS) || prev.functional_expertise,
      resume_file_path: filePath,
    }));
  };

  const updateFormData = (field: keyof TalentProfileData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveAndExit = async () => {
    await handleSave();
  };

  const handleSave = async (showToast = true) => {
    if (!user) return;

    setSaving(true);
    try {
      const profileData: any = {
        ...(formData.id && { id: formData.id }),
        user_id: user.id,
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        linkedin_url: formData.linkedin_url,
        bio: formData.bio,
        employment_history: formData.employment_history,
        education: formData.education,
        skills: normalizeSelectOptions(formData.skills, SKILLS_OPTIONS),
        certifications: formData.certifications.filter(c => c.trim()),
        industry_experience: normalizeSelectOptions(formData.industry_experience, INDUSTRY_OPTIONS),
        functional_expertise: normalizeSelectOptions(formData.functional_expertise, FUNCTIONAL_EXPERTISE_OPTIONS),
        consulting_firms: formData.consulting_firms,
        consulting_firms_other: formData.consulting_firms_other,
        consulting_years_experience: formData.consulting_years_experience,
        consulting_highest_title: formData.consulting_highest_title,
        pe_portfolio_years: formData.pe_portfolio_years,
        pe_board_experience: formData.pe_board_experience,
        pe_engagement_types: formData.pe_engagement_types,
        pe_portfolio_experience_description: formData.pe_portfolio_experience_description,
        availability: formData.availability,
        experience_years: formData.experience_years,
        preferred_engagement: formData.preferred_engagement,
        resume_file_path: formData.resume_file_path,
      };

      const { error } = await supabase
        .from('talent_profiles')
        .upsert(profileData);

      if (error) throw error;

      if (showToast) {
        toast({
          title: 'Success',
          description: currentStep === 12 ? 'Your profile has been submitted!' : 'Your progress has been saved',
        });
      }

      if (currentStep === 12) {
        navigate('/');
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to save profile',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleNext = async () => {
    if (currentStep === 12) {
      await handleSave();
    } else {
      setCurrentStep(prev => Math.min(prev + 1, 12));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const getAiFilledEmploymentIds = () => {
    return aiFilledData?.employment_history?.map((job: any) => job.id) || [];
  };

  const getAiFilledEducationIds = () => {
    return aiFilledData?.education?.map((edu: any) => edu.id) || [];
  };

  const getAiFilledOptions = (field: 'skills' | 'industry_experience' | 'functional_expertise') => {
    return aiFilledData?.[field] || [];
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Resume data={formData} onResumeDataParsed={handleResumeDataParsed} />;
      case 2:
        return <Step2PersonalInfo data={formData} onChange={updateFormData} />;
      case 3:
        return <Step3Summary data={formData} onChange={updateFormData} />;
      case 4:
        return <Step4Employment data={formData} onChange={updateFormData} aiFilledIds={getAiFilledEmploymentIds()} />;
      case 5:
        return <Step5Education data={formData} onChange={updateFormData} aiFilledIds={getAiFilledEducationIds()} />;
      case 6:
        return <Step6Skills data={formData} onChange={updateFormData} aiFilledOptions={getAiFilledOptions('skills')} />;
      case 7:
        return <Step7Certifications data={formData} onChange={updateFormData} />;
      case 8:
        return <Step8Industry data={formData} onChange={updateFormData} aiFilledOptions={getAiFilledOptions('industry_experience')} />;
      case 9:
        return <Step9Functional data={formData} onChange={updateFormData} aiFilledOptions={getAiFilledOptions('functional_expertise')} />;
      case 10:
        return <Step10ConsultingPE data={formData} onChange={updateFormData} />;
      case 11:
        return <Step11Availability data={formData} onChange={updateFormData} />;
      case 12:
        return <Step12Review data={formData} onEditStep={goToStep} />;
      default:
        return null;
    }
  };

  const getLastUpdatedMessage = () => {
    if (!formData.id && !lastUpdated) {
      return (
        <div className="bg-muted/50 rounded-lg p-4 mb-6">
          <p className="text-sm text-muted-foreground">
            <strong>Welcome!</strong> Complete your profile to join our talent network.
            {currentStep === 1 && " You don't need to upload your resume - you can fill out all sections manually if you prefer."}
          </p>
        </div>
      );
    }

    const getDaysAgo = () => {
      if (!lastUpdated) return '';
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - lastUpdated.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return 'today';
      if (diffDays === 1) return '1 day ago';
      return `${diffDays} days ago`;
    };
    
    return (
      <div className="bg-muted/50 rounded-lg p-4 mb-6">
        <p className="text-sm text-muted-foreground">
          {lastUpdated && <><strong>Last updated:</strong> {getDaysAgo()}. </>}
          You can update your profile information at any time.
          {currentStep === 1 && " You don't need to upload your resume again - you can fill out all sections manually."}
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <PortalHeader 
        portalType="talent"
        userEmail={profile?.email || ''}
        onSignOut={handleSignOut}
      />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {getLastUpdatedMessage()}
        
        <WizardProgress 
          currentStep={currentStep} 
          totalSteps={12} 
          stepTitles={STEP_TITLES}
          onStepClick={goToStep}
        />

        {renderStep()}

        <WizardNavigation
          currentStep={currentStep}
          totalSteps={12}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSaveAndExit={handleSaveAndExit}
          isLoading={saving}
        />
      </main>
    </div>
  );
}
