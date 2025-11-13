import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredUserType: 'talent' | 'customer';
}

export default function ProtectedRoute({ children, requiredUserType }: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth();

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

  if (profile?.user_type !== requiredUserType) {
    // Wrong user type - redirect to their correct dashboard
    const correctPath = profile?.user_type === 'talent' 
      ? '/talent-network' 
      : '/project-brief';
    return <Navigate to={correctPath} replace />;
  }

  return <>{children}</>;
}
