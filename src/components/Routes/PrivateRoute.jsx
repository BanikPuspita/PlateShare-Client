import React from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const {user, loading} = useAuth();

    if (loading) return <div className="p-6">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;


    return children
};

export default PrivateRoute;