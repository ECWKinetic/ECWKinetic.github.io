import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { emailSchema as emailValidation } from '@/lib/validation';

const emailSchema = z.object({
  email: emailValidation,
});

type EmailForm = z.infer<typeof emailSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithMagicLink } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit: handleFormSubmit
  } = useForm<EmailForm>({
    resolver: zodResolver(emailSchema)
  });

  const onSubmit = async (data: EmailForm) => {
    setIsLoading(true);
    try {
      await signInWithMagicLink(data.email);
      navigate('/login/email-sent', {
        state: { email: data.email }
      });
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome</CardTitle>
          <CardDescription>Sign in to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleFormSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your@email.com" 
                {...register('email')} 
                disabled={isLoading} 
                autoComplete="email" 
                inputMode="email" 
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
              style={{ backgroundColor: '#379392' }}
            >
              {isLoading ? 'Sending...' : 'Send Magic Link'}
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              We'll send you a secure login link to access your account
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
