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
import { Step10Availability } from '@/components/talent/wizard/Step10Availability';
import { Step11Review } from '@/components/talent/wizard/Step11Review';
import { TalentProfileData } from '@/types/talentProfile';
import { normalizeRepeaterData } from '@/lib/repeaterUtils';

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
  
  const [formData, setFormData] = useState<TalentProfileData>({
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
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setFormData({
          full_name: data.full_name || profile?.full_name || '',
          email: data.email || profile?.email || '',
          phone: data.phone || '',
          location: data.location || '',
          linkedin_url: data.linkedin_url,
          bio: data.bio,
          employment_history: normalizeRepeaterData(Array.isArray(data.employment_history) ? data.employment_history as any : []),
          education: normalizeRepeaterData(Array.isArray(data.education) ? data.education as any : []),
          skills: Array.isArray(data.skills) ? data.skills : [],
          certifications: Array.isArray(data.certifications) ? data.certifications : [],
          industry_experience: Array.isArray(data.industry_experience) ? data.industry_experience : [],
          functional_expertise: Array.isArray(data.functional_expertise) ? data.functional_expertise : [],
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
      skills: parsedData.skills || prev.skills,
      certifications: parsedData.certifications || prev.certifications,
      industry_experience: parsedData.industry_experience || prev.industry_experience,
      functional_expertise: parsedData.functional_expertise || prev.functional_expertise,
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
        user_id: user.id,
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        linkedin_url: formData.linkedin_url,
        bio: formData.bio,
        employment_history: formData.employment_history,
        education: formData.education,
        skills: formData.skills,
        certifications: formData.certifications.filter(c => c.trim()),
        industry_experience: formData.industry_experience,
        functional_expertise: formData.functional_expertise,
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
          description: currentStep === 11 ? 'Your profile has been submitted!' : 'Your progress has been saved',
        });
      }

      if (currentStep === 11) {
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
    if (currentStep === 11) {
      await handleSave();
    } else {
      setCurrentStep(prev => Math.min(prev + 1, 11));
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
        return <Step10Availability data={formData} onChange={updateFormData} />;
      case 11:
        return <Step11Review data={formData} onEditStep={goToStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PortalHeader 
        portalType="talent"
        userEmail={profile?.email || ''}
        onSignOut={handleSignOut}
      />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <WizardProgress 
          currentStep={currentStep} 
          totalSteps={11} 
          stepTitles={STEP_TITLES}
        />

        {renderStep()}

        <WizardNavigation
          currentStep={currentStep}
          totalSteps={11}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSaveAndExit={handleSaveAndExit}
          isLoading={saving}
        />
      </main>
    </div>
  );
}
