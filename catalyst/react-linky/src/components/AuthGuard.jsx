import React from 'react';
import { useAuth } from '../hooks/useAuth';
import Spinner from './Spinner';

const AuthGuard = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="App">
        <div className="glass-card" style={{ textAlign: 'center', margin: '2rem auto', maxWidth: '400px' }}>
          <h2>🔐 Checking Authentication</h2>
          <p>Please wait while we verify your login status...</p>
          <Spinner />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="App">
        <div className="glass-card" style={{ textAlign: 'center', margin: '2rem auto', maxWidth: '400px' }}>
          <h2>🚫 Access Denied</h2>
          <p>Redirecting to login...</p>
          <Spinner />
        </div>
      </div>
    );
  }

  return children;
};

export default AuthGuard;
