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
  const [loading, setLoading] = useState<boolean>(true); // Added loading state for better UX

  // Fetch user profile data after authentication
  useEffect(() => {
    const fetchProfile = async () => {
      // Ensure that both token and user._id are available before making the request
      if (token && user?._id) {
        try {
          const response = await axios.get(`http://localhost:3000/api/users/profile/${user._id}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });
          setUser(response.data); // Set user data after fetching
        } catch (error) {
          console.error('Error fetching profile:', error);
          setToken(null);
          localStorage.removeItem('token'); // Remove token if the request fails
        } finally {
          setLoading(false); // Stop loading when the fetch is complete
        }
      } else {
        setLoading(false); // No token or user, stop loading
      }
    };

    fetchProfile();
  }, [token, user?._id]); // Re-run effect if token or user._id changes

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { email, password }, { withCredentials: true });
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user); // Immediately set user after login
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setUser(null); // Clear user data on logout
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading state while fetching profile
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
