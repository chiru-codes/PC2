import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isLogged, loaded } = useAuth();

    if (!loaded) {
        return null;
    }

    return isLogged ? <>{children}</> : <Navigate to="/login" replace />;
}
