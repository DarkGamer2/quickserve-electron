import React, { createContext, useEffect, useState } from "react";
import api from "../../services/api";

interface AuthContextType {
    user: any;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (email: string, password: string, fullName: string, skillset: string[]) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            api.getJobs(token).then((res) => {
                setUser(res.data);
            }).catch((err) => {
                console.log(err);
                setToken(null);
                localStorage.removeItem('token');
            });
        }
    }, [token]);

    const login = async (email: string, password: string) => {
        const response = await api.login(email, password);
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
        setUser(null);
    };

    const register = async (email: string, password: string, fullName: string, skillset: string[]) => {
        const response = await api.register(email, password, fullName, skillset);
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;