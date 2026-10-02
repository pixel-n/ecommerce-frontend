import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute({ children }) {
  const { user } = useAuth();
  // Verifies user is authenticated and possesses admin role
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
}