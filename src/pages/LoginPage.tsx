import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Briefcase } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address')
});
type EmailForm = z.infer<typeof emailSchema>;
export default function LoginPage() {
  const [selectedType, setSelectedType] = useState<'talent' | 'customer' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    signInWithMagicLink
  } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: {
      errors
    },
    getValues
  } = useForm<EmailForm>({
    resolver: zodResolver(emailSchema)
  });
  const onUserTypeSelect = async (userType: 'talent' | 'customer') => {
    const email = getValues('email');
    if (!email || errors.email) return;
    setSelectedType(userType);
    setIsLoading(true);
    try {
      await signInWithMagicLink(email, userType);
      navigate('/login/email-sent', {
        state: {
          email,
          userType
        }
      });
    } catch (error) {
      setIsLoading(false);
      setSelectedType(null);
    }
  };
  return <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome</CardTitle>
          <CardDescription>Sign in to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={e => e.preventDefault()} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="your@email.com" {...register('email')} disabled={isLoading} autoComplete="email" inputMode="email" />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-3">
              <Label>What brings you here?</Label>
              
              <Button type="button" variant="outline" className="w-full h-auto py-4 flex flex-col items-start gap-2" onClick={() => onUserTypeSelect('talent')} disabled={isLoading || !!errors.email}>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span className="font-semibold">I'm Talent</span>
                </div>
                <span className="text-sm text-muted-foreground">Log into your profile or sign up to join our talent network</span>
              </Button>

              <Button type="button" variant="outline" className="w-full h-auto py-4 flex flex-col items-start gap-2" onClick={() => onUserTypeSelect('customer')} disabled={isLoading || !!errors.email}>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  <span className="font-semibold">I'm a Client (New and Existing)</span>
                </div>
                <span className="text-sm text-muted-foreground">Review and submit project briefs</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>;
}