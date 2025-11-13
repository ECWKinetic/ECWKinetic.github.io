import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredProfileType: 'talent' | 'customer';
}

export default function ProtectedRoute({ children, requiredProfileType }: ProtectedRouteProps) {
  const { user, talentProfile, customerProfile, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const hasRequiredProfile = requiredProfileType === 'talent' 
    ? !!talentProfile 
    : !!customerProfile;

  if (!hasRequiredProfile) {
    // User doesn't have this profile type yet
    return <Navigate to="/setup-profile" replace />;
  }

  return <>{children}</>;
}
