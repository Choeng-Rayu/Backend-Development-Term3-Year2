import React, { createContext, useContext, useState, useEffect } from 'react';
import { isAuthenticated, getToken } from '../utils/auth';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in when app loads
        const checkAuth = () => {
            const user = isAuthenticated();
            setAuth(user);
            setLoading(false);
        };

        checkAuth();
    }, []);

    const value = {
        auth,
        setAuth,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
