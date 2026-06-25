import React from 'react'
import { useAuth } from '../Context/AuthContext'
import Loader from './Loader';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <Loader />;
    if (!user) return <Navigate to={'/authentication/user-login'} replace />
    return children;
}

export default ProtectedRoute