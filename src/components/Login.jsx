import React, { useState } from 'react';
import '../styles/auth.css';

export const Login = ({ auth, onSwitchToSignup }) => {
  const [email, setEmail] = useState('demo@seimediagroup.co');
  const [password, setPassword] = useState('Emile2304#');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await auth.login(email, password);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">SEI</h1>
          <p className="auth-subtitle">Sport Entertainment International</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              disabled={auth.loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={auth.loading}
              required
            />
          </div>

          {auth.error && <div className="form-error">{auth.error}</div>}

          <button
            type="submit"
            className="btn-primary"
            disabled={auth.loading}
          >
            {auth.loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="link-button"
            >
              Create one
            </button>
          </p>
        </div>

        <div className="demo-banner">
          💡 Demo credentials pre-filled
        </div>
      </div>
    </div>
  );
};
