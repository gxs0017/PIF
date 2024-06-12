import React from 'react';
import { Navigate } from 'react-router-dom';

const withAuth = (Component, requiredRole) => {
  return (props) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return <Navigate to="/login" />;
    }

    const user = JSON.parse(atob(token.split('.')[1]));
    if (requiredRole && user.role !== requiredRole) {
      return <Navigate to="/profile" />;
    }

    return <Component {...props} />;
  };
};

export default withAuth;
