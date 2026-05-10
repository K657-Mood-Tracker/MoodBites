import { createContext, useState, useEffect, useContext, type ReactNode } from 'react';

type AuthContextType = {
    isAuthenticated: boolean;
    user: any | null;
    login: (token: string, userData: any) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_BACKEND_URL || '';
        const verifyUrl = apiUrl ? `${apiUrl}/api/verify-token` : '/api/verify-token';

        if (token) {
            console.log('AuthContext verify-token request to', verifyUrl);
            fetch(verifyUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(async res => {
                const data = await res.json().catch(() => null);
                if (!res.ok) {
                    console.warn('AuthContext verify-token failed', res.status, data);
                    throw new Error(data?.message || 'Verify token failed');
                }
                return data;
            })
            .then(data => {
                console.log('AuthContext verify-token response', data);
                if (data?.user) {
                    setIsAuthenticated(true);
                    setUser(data.user);
                } else {
                    setIsAuthenticated(false);
                    setUser(null);
                }
            })
            .catch(error => {
                console.error('AuthContext verify-token error:', error);
                setIsAuthenticated(false);
                setUser(null);
            })
            .finally(() => setLoading(false));
        } else {
            setLoading(false);
            setIsAuthenticated(false);
            setUser(null);
        }
    }, []);

    const login = (token: string, userData: any) => {
        console.log('AuthContext login userData', userData);
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
