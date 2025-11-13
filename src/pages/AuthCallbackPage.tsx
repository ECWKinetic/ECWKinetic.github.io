import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AuthCallbackPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the hash from URL (magic link token)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const type = hashParams.get('type');

        if (!accessToken || type !== 'magiclink') {
          throw new Error('Invalid or expired link');
        }

        // Verify session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        if (!session) throw new Error('No session found');

        // Get the user type from localStorage (set during login)
        const pendingUserType = localStorage.getItem('pendingUserType') as 'talent' | 'customer' | null;
        
        if (!pendingUserType) {
          throw new Error('User type not found');
        }

        // Check if profile exists, if not it will be created by trigger
        // Wait a moment for trigger to complete
        await new Promise(resolve => setTimeout(resolve, 500));

        // Verify profile was created with correct user type
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          console.error('Profile error:', profileError);
        }

        // Clear pending user type
        localStorage.removeItem('pendingUserType');

        setStatus('success');

        // Redirect to appropriate dashboard
        setTimeout(() => {
          const redirectPath = pendingUserType === 'talent' ? '/talent-network' : '/project-brief';
          navigate(redirectPath, { replace: true });
        }, 1500);

      } catch (error: any) {
        console.error('Auth callback error:', error);
        setStatus('error');
        
        if (error.message?.includes('expired')) {
          setErrorMessage('This link has expired. Please request a new one.');
        } else if (error.message?.includes('invalid')) {
          setErrorMessage('This link is invalid. Please try signing in again.');
        } else {
          setErrorMessage(error.message || 'An error occurred during sign in.');
        }
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {status === 'loading' && (
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            )}
            {status === 'success' && (
              <div className="rounded-full bg-green-100 dark:bg-green-900 p-3">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            )}
            {status === 'error' && (
              <div className="rounded-full bg-destructive/10 p-3">
                <AlertCircle className="h-8 w-8 text-destructive" />
              </div>
            )}
          </div>
          <CardTitle>
            {status === 'loading' && 'Verifying your link...'}
            {status === 'success' && 'Welcome!'}
            {status === 'error' && 'Sign In Failed'}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {status === 'loading' && (
            <p className="text-muted-foreground">Please wait while we verify your credentials.</p>
          )}
          {status === 'success' && (
            <p className="text-muted-foreground">Redirecting you to your dashboard...</p>
          )}
          {status === 'error' && (
            <>
              <p className="text-muted-foreground">{errorMessage}</p>
              <Button onClick={() => navigate('/login')} className="w-full">
                Back to Login
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
