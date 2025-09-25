import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { LoadingSpinner } from '../common';
import { ROUTES } from '../../constants/routes';
import { ChildrenProps } from '../../types';

interface ProtectedRouteProps extends ChildrenProps {
  redirectTo?: string;
}

export function ProtectedRoute({ children, redirectTo = ROUTES.LOGIN }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuthContext();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
