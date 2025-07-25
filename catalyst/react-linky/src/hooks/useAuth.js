import {useEffect, useState} from 'react';

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
            const response = await fetch('https://linky-778776887.development.catalystserverless.com/server/CRUD/users/current', {
                credentials: 'include',
            });

            if (response.ok) {
                const userData = await response.json();
                console.log("userData", userData);
                // if (userData && (userData.user_id || userData.id)) {
                    setIsAuthenticated(true);
                    setUser(userData);
                // }
                // else {
                //     setIsAuthenticated(false);
                //     redirectToLogin();
                // }
            }
            // else {
            //     console.log('User not authenticated, status:', response.status);
            //     setIsAuthenticated(false);
            //     redirectToLogin();
            // }
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
