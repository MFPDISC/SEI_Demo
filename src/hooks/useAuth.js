import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = '/api';

// Detect if running on GitHub Pages (demo mode)
const isDemoMode = window.location.hostname.includes('github.io');

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // If demo mode, auto-login with mock user
    if (isDemoMode) {
      setIsAuthenticated(true);
      setUser({
        id: 'demo-user',
        name: 'Demo User',
        email: 'demo@seimediagroup.co',
        plan: 'Premium'
      });
      return;
    }

    const token = localStorage.getItem('seiToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
          fetchCurrentUser(token);
        } else {
          localStorage.removeItem('seiToken');
        }
      } catch (err) {
        localStorage.removeItem('seiToken');
      }
    }
  }, []);

  const fetchCurrentUser = useCallback(async (token) => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data.user);
    } catch (err) {
      console.error('Failed to fetch current user:', err);
      localStorage.removeItem('seiToken');
      setIsAuthenticated(false);
    }
  }, []);

  const register = useCallback(async (email, password, name) => {
    // In demo mode, simulate successful registration
    if (isDemoMode) {
      setLoading(true);
      setTimeout(() => {
        const mockUser = { id: 'demo-user', name, email, plan: 'Free' };
        setUser(mockUser);
        setIsAuthenticated(true);
        setLoading(false);
      }, 500);
      return { success: true, user: { name, email, plan: 'Free' } };
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
        name
      });

      localStorage.setItem('seiToken', response.data.token);
      setUser(response.data.user);
      setIsAuthenticated(true);

      return { success: true, user: response.data.user };
    } catch (err) {
      const message = err.response?.data?.error || 'Registration failed';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    // In demo mode, simulate successful login
    if (isDemoMode) {
      setLoading(true);
      setTimeout(() => {
        const mockUser = { id: 'demo-user', name: 'Demo User', email, plan: 'Premium' };
        setUser(mockUser);
        setIsAuthenticated(true);
        setLoading(false);
      }, 500);
      return { success: true, user: { name: 'Demo User', email, plan: 'Premium' } };
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });

      localStorage.setItem('seiToken', response.data.token);
      setUser(response.data.user);
      setIsAuthenticated(true);

      return { success: true, user: response.data.user };
    } catch (err) {
      const message = err.response?.data?.error || 'Login failed';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('seiToken');
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  }, []);

  const upgradePlan = useCallback(async (plan) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('seiToken');
      const response = await axios.post(`${API_URL}/subscriptions/upgrade`, { plan }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUser(response.data.user);
      return { success: true, user: response.data.user };
    } catch (err) {
      const message = err.response?.data?.error || 'Upgrade failed';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    error,
    isAuthenticated,
    register,
    login,
    logout,
    upgradePlan
  };
};
