import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

const ProtectedRoute = ({ role }) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }

    if (user?.role !== role) {
      navigate(`/${user.role}`, { replace: true });
    }
  }, [isAuthenticated, user, role, navigate]);

  return isAuthenticated ? <Outlet /> : null;
};

export default ProtectedRoute;
