import { createContext, useState, useEffect, useContext, type ReactNode, use } from 'react';

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
        const apiUrl = import.meta.env.VITE_BACKEND_URL;

        if (token) {
            fetch(`${apiUrl}/verify-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data) {
                setIsAuthenticated(true);
                setUser(data.user);
                }
            })
            .finally(() => setLoading(false));
        } else {
            setLoading(false);
            setIsAuthenticated(false);
            setUser(null);
        }
    }, []);

    const login = (token: string, userData: any) => {
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
