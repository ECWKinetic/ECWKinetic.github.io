import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TalentProfile {
  skills: string[];
  experience_years: number | null;
  availability: string | null;
  linkedin_url: string | null;
  bio: string | null;
}

export default function TalentNetworkPage() {
  const { user, profile, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [talentProfile, setTalentProfile] = useState<TalentProfile>({
    skills: [],
    experience_years: null,
    availability: null,
    linkedin_url: null,
    bio: null
  });
  const [skillsInput, setSkillsInput] = useState('');

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
        setTalentProfile(data);
        setSkillsInput(data.skills?.join(', ') || '');
      }
    } catch (error: any) {
      console.error('Error fetching talent profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const skills = skillsInput
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      const profileData = {
        user_id: user.id,
        skills,
        experience_years: talentProfile.experience_years,
        availability: talentProfile.availability,
        linkedin_url: talentProfile.linkedin_url,
        bio: talentProfile.bio
      };

      const { error } = await supabase
        .from('talent_profiles')
        .upsert(profileData, { onConflict: 'user_id' });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Your profile has been updated'
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to update profile'
      });
    } finally {
      setSaving(false);
    }
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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-6 w-6" />
            <div>
              <h1 className="font-semibold">Talent Network</h1>
              <p className="text-sm text-muted-foreground">{profile?.email}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>
              Keep your profile up to date to get matched with the right opportunities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="bio">Professional Summary</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
                value={talentProfile.bio || ''}
                onChange={(e) => setTalentProfile({ ...talentProfile, bio: e.target.value })}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills (comma-separated)</Label>
              <Input
                id="skills"
                placeholder="e.g., React, TypeScript, Node.js"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  type="number"
                  placeholder="e.g., 5"
                  value={talentProfile.experience_years || ''}
                  onChange={(e) => setTalentProfile({ 
                    ...talentProfile, 
                    experience_years: e.target.value ? parseInt(e.target.value) : null 
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">Availability</Label>
                <Input
                  id="availability"
                  placeholder="e.g., Full-time, Part-time"
                  value={talentProfile.availability || ''}
                  onChange={(e) => setTalentProfile({ ...talentProfile, availability: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input
                id="linkedin"
                type="url"
                placeholder="https://linkedin.com/in/your-profile"
                value={talentProfile.linkedin_url || ''}
                onChange={(e) => setTalentProfile({ ...talentProfile, linkedin_url: e.target.value })}
              />
            </div>

            <Button onClick={handleSave} disabled={saving} className="w-full">
              {saving ? 'Saving...' : 'Save Profile'}
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
