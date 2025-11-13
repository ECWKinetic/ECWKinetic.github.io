import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Briefcase, Plus, Edit, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProjectBrief {
  id: string;
  company_name: string | null;
  project_title: string;
  project_description: string;
  required_skills: string[];
  budget_range: string | null;
  timeline: string | null;
  status: string;
  created_at: string;
}

export default function ProjectBriefPage() {
  const { user, profile, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [briefs, setBriefs] = useState<ProjectBrief[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBrief, setEditingBrief] = useState<ProjectBrief | null>(null);
  const [formData, setFormData] = useState({
    company_name: '',
    project_title: '',
    project_description: '',
    required_skills: '',
    budget_range: '',
    timeline: ''
  });
  const [saving, setSaving] = useState(false);

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
    if (!user || !formData.project_title || !formData.project_description) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please fill in required fields'
      });
      return;
    }

    setSaving(true);
    try {
      const skills = formData.required_skills
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      const briefData = {
        user_id: user.id,
        company_name: formData.company_name || null,
        project_title: formData.project_title,
        project_description: formData.project_description,
        required_skills: skills,
        budget_range: formData.budget_range || null,
        timeline: formData.timeline || null,
        status: 'draft'
      };

      if (editingBrief) {
        const { error } = await supabase
          .from('project_briefs')
          .update(briefData)
          .eq('id', editingBrief.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('project_briefs')
          .insert(briefData);
        if (error) throw error;
      }

      toast({
        title: 'Success',
        description: editingBrief ? 'Brief updated' : 'Brief created'
      });

      setShowForm(false);
      setEditingBrief(null);
      setFormData({
        company_name: '',
        project_title: '',
        project_description: '',
        required_skills: '',
        budget_range: '',
        timeline: ''
      });
      fetchBriefs();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to save brief'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (brief: ProjectBrief) => {
    setEditingBrief(brief);
    setFormData({
      company_name: brief.company_name || '',
      project_title: brief.project_title,
      project_description: brief.project_description,
      required_skills: brief.required_skills.join(', '),
      budget_range: brief.budget_range || '',
      timeline: brief.timeline || ''
    });
    setShowForm(true);
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
                          <CardTitle>{brief.project_title}</CardTitle>
                          {brief.company_name && (
                            <CardDescription>{brief.company_name}</CardDescription>
                          )}
                        </div>
                        <Badge>{brief.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{brief.project_description}</p>
                      {brief.required_skills.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {brief.required_skills.map((skill, idx) => (
                            <Badge key={idx} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(brief)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
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
              <CardTitle>{editingBrief ? 'Edit Brief' : 'Create New Brief'}</CardTitle>
              <CardDescription>Fill in the details about your project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name (Optional)</Label>
                <Input
                  id="company"
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  value={formData.project_title}
                  onChange={(e) => setFormData({ ...formData, project_title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Project Description *</Label>
                <Textarea
                  id="description"
                  value={formData.project_description}
                  onChange={(e) => setFormData({ ...formData, project_description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Required Skills (comma-separated)</Label>
                <Input
                  id="skills"
                  placeholder="e.g., React, Design, Marketing"
                  value={formData.required_skills}
                  onChange={(e) => setFormData({ ...formData, required_skills: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget Range</Label>
                  <Input
                    id="budget"
                    placeholder="e.g., $10k-$50k"
                    value={formData.budget_range}
                    onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeline">Timeline</Label>
                  <Input
                    id="timeline"
                    placeholder="e.g., 3-6 months"
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSubmit} disabled={saving}>
                  {saving ? 'Saving...' : editingBrief ? 'Update Brief' : 'Create Brief'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingBrief(null);
                    setFormData({
                      company_name: '',
                      project_title: '',
                      project_description: '',
                      required_skills: '',
                      budget_range: '',
                      timeline: ''
                    });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
