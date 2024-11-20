// FILE: src/context/auth/Auth.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

interface User {
  _id: string;
  email: string;
  fullName: string;
  skillset?: string[];
  profilePic?: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  useEffect(() => {
    const fetchProfile = async () => {
      console.log(`${user?._id}`);
      if (token) {
        try {
          const response = await axios.get(`http://localhost:3000/api/users/profile/${user?._id}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });
          setUser(response.data);
        } catch (error) {
          setToken(null);
          localStorage.removeItem('token');
        }
      }
    };

    fetchProfile();
  }, [token, user?._id]);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { email, password }, { withCredentials: true });
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};