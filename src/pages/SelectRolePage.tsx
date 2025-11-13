import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Briefcase, ArrowRight } from 'lucide-react';

export default function SelectRolePage() {
  const navigate = useNavigate();

  const handleRoleSelect = (role: 'talent' | 'customer') => {
    localStorage.setItem('currentRole', role);
    const path = role === 'talent' ? '/talent-network' : '/project-brief';
    navigate(path, { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Choose Your Portal</h1>
          <p className="text-muted-foreground">
            You have both talent and client profiles. Select which portal you'd like to access.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleRoleSelect('talent')}>
            <CardHeader>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Talent Portal</CardTitle>
              <CardDescription>
                Manage your talent profile, update skills, and track opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full group" 
                onClick={() => handleRoleSelect('talent')}
                style={{ backgroundColor: '#379392' }}
              >
                Access Talent Portal
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleRoleSelect('customer')}>
            <CardHeader>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Client Portal</CardTitle>
              <CardDescription>
                Create and manage project briefs, review talent matches, and track engagements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full group" 
                onClick={() => handleRoleSelect('customer')}
                style={{ backgroundColor: '#C49A6C' }}
              >
                Access Client Portal
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
