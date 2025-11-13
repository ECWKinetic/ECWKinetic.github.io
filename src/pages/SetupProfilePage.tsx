import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Users, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SetupProfilePage() {
  const [createTalent, setCreateTalent] = useState(false);
  const [createCustomer, setCreateCustomer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { createTalentProfile, createCustomerProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!createTalent && !createCustomer) {
      toast({
        variant: 'destructive',
        title: 'Selection Required',
        description: 'Please select at least one profile type to continue.'
      });
      return;
    }

    setIsLoading(true);
    try {
      if (createTalent) {
        await createTalentProfile();
      }
      if (createCustomer) {
        await createCustomerProfile();
      }

      toast({
        title: 'Success',
        description: 'Your profile(s) have been created!'
      });

      // Navigate based on what was created
      if (createTalent && createCustomer) {
        navigate('/select-role', { replace: true });
      } else if (createTalent) {
        navigate('/talent-network', { replace: true });
      } else {
        navigate('/project-brief', { replace: true });
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to create profile(s)'
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to Kinetic</CardTitle>
          <CardDescription>
            Choose which profile(s) you'd like to create. You can add more later.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
              <Checkbox
                id="talent"
                checked={createTalent}
                onCheckedChange={(checked) => setCreateTalent(checked as boolean)}
                disabled={isLoading}
              />
              <div className="flex-1 space-y-1">
                <Label
                  htmlFor="talent"
                  className="flex items-center gap-2 text-base font-semibold cursor-pointer"
                >
                  <Users className="h-5 w-5" />
                  Talent Profile
                </Label>
                <p className="text-sm text-muted-foreground">
                  Join our talent network, showcase your skills, and connect with opportunities
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
              <Checkbox
                id="customer"
                checked={createCustomer}
                onCheckedChange={(checked) => setCreateCustomer(checked as boolean)}
                disabled={isLoading}
              />
              <div className="flex-1 space-y-1">
                <Label
                  htmlFor="customer"
                  className="flex items-center gap-2 text-base font-semibold cursor-pointer"
                >
                  <Briefcase className="h-5 w-5" />
                  Client Profile
                </Label>
                <p className="text-sm text-muted-foreground">
                  Submit project briefs, manage engagements, and access our talent pool
                </p>
              </div>
            </div>
          </div>

          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={isLoading || (!createTalent && !createCustomer)}
            style={{ backgroundColor: '#379392' }}
          >
            {isLoading ? 'Creating Profile(s)...' : 'Continue'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
