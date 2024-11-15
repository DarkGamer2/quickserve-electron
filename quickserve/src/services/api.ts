// FILE: src/services/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const register = (email: string, password: string, role: string, skillset: string[]) => {
  return axios.post(
    `${API_URL}/auth/register`, 
    { email, password, role, skillset },
    {
      
      withCredentials: true // Ensures cookies are sent with the request
    }
  );
};

const login = (email: string, password: string) => {
  return axios.post(
    `${API_URL}/auth/login`, 
    { email, password },
    {
      withCredentials: true // Ensures cookies are sent with the request
    }
  );
};

const getJobs = (token: string) => {
  return axios.get(
    `${API_URL}/jobs`, 
    {
      headers: { Authorization: `Bearer ${token}`, "Access-Control-Allow-Origin": "*" },
      withCredentials: true, // Ensures cookies are sent with the request
    }
  );
};

export default {
  register,
  login,
  getJobs,
};
