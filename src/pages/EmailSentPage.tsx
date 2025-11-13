import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, AlertCircle } from 'lucide-react';

export default function EmailSentPage() {
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { signInWithMagicLink } = useAuth();

  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate('/login');
    }
  }, [email, navigate]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResend = async () => {
    if (!canResend || !email) return;

    setIsResending(true);
    try {
      await signInWithMagicLink(email);
      setCountdown(60);
      setCanResend(false);
    } catch (error) {
      // Error already handled in context
    } finally {
      setIsResending(false);
    }
  };

  if (!email) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Mail className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Check Your Email</CardTitle>
          <CardDescription>We've sent a magic link to</CardDescription>
          <p className="font-medium text-foreground mt-1">{email}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3 text-sm text-muted-foreground">
            <p className="text-center">
              Click the link to sign in. The link expires in 60 minutes.
            </p>

            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-medium text-foreground">Didn't receive the email?</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Check your spam/junk folder</li>
                    <li>Make sure {email} is correct</li>
                    <li>Usually arrives within 1-2 minutes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={handleResend}
            disabled={!canResend || isResending}
            className="w-full"
            variant="outline"
          >
            {isResending ? (
              'Sending...'
            ) : canResend ? (
              'Resend Link'
            ) : (
              `Resend Link (${countdown}s)`
            )}
          </Button>

          <div className="text-center">
            <Link
              to="/login"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Change Email
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
