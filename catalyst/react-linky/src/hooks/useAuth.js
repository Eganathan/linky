import { useState, useEffect } from 'react';

const CATALYST_LOGIN_URL = 'https://linky-778776887.development.catalystserverless.com/__catalyst/auth/login';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const checkAuthStatus = async () => {
    try {
      // Check if we're on localhost (development bypass)
      if (window.location.hostname === 'localhost') {
        console.log('Development mode: bypassing authentication');
        setIsAuthenticated(true);
        setUser({ 
          user_id: 'dev-user', 
          email: 'dev@localhost.com', 
          first_name: 'Developer',
          last_name: 'User'
        });
        setIsLoading(false);
        return;
      }

      // For production, try to get user details from Catalyst server function
      const response = await fetch('/server/getCurrentUser');
      
      if (response.ok) {
        const userData = await response.json();
        console.log("userData", userData);
        if (userData && (userData.user_id || userData.id)) {
          setIsAuthenticated(true);
          setUser(userData);
        } else {
          setIsAuthenticated(false);
          redirectToLogin();
        }
      } else {
        console.log('User not authenticated, status:', response.status);
        setIsAuthenticated(false);
        redirectToLogin();
      }
    } catch (error) {
      console.log('Authentication check failed:', error.message);
      setIsAuthenticated(false);
      redirectToLogin();
    } finally {
      setIsLoading(false);
    }
  };

  const redirectToLogin = () => {
    // Add the current URL as a redirect parameter so user comes back after login
    const currentUrl = window.location.href;
    const loginUrl = `${CATALYST_LOGIN_URL}?redirect=${encodeURIComponent(currentUrl)}`;
    window.location.href = loginUrl;
  };

  const logout = async () => {
    try {
      // For development mode, just clear state
      if (process.env.NODE_ENV === 'development' && window.location.hostname === 'localhost') {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      // For production, call Catalyst logout
      const response = await fetch('/__catalyst/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      setIsAuthenticated(false);
      setUser(null);
      
      if (response.ok) {
        redirectToLogin();
      } else {
        // Force redirect even if logout fails
        redirectToLogin();
      }
    } catch (error) {
      console.error('Logout failed:', error);
      // Force redirect to login even if logout API fails
      setIsAuthenticated(false);
      setUser(null);
      redirectToLogin();
    }
  };

  return {
    isAuthenticated,
    isLoading,
    user,
    logout,
    checkAuthStatus,
  };
};
