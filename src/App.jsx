/**
 * Main App Component
 */

import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Dashboard } from './pages/Dashboard';
import { Footer } from './components/Footer';
import './styles/app.css';

function App() {
  const auth = useAuth();
  const [showLogin, setShowLogin] = useState(true);

  if (!auth.isAuthenticated || !auth.user) {
    return showLogin ? (
      <Login
        auth={auth}
        onSwitchToSignup={() => setShowLogin(false)}
      />
    ) : (
      <Signup
        auth={auth}
        onSwitchToLogin={() => setShowLogin(true)}
      />
    );
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>SEI<span>.</span></h1>
          <span className="tagline">Sport Entertainment International</span>
        </div>

        <div className="navbar-sports">
          <a href="#" className="sport-link">Football</a>
          <a href="#" className="sport-link">Rugby</a>
          <a href="#" className="sport-link">Cricket</a>
          <a href="#" className="sport-link">Tennis</a>
          <a href="#" className="sport-link">Athletics</a>
          <a href="#" className="sport-link">More</a>
        </div>

        <div className="navbar-actions">
          <button className="nav-btn search-btn">Search</button>
          <div className="navbar-user">
            <span className="user-name">{auth.user.name}</span>
            <span className="user-plan">{auth.user.plan}</span>
            <button onClick={auth.logout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </nav>
      <Dashboard user={auth.user} />
      <Footer />
    </div>
  );
}

export default App;
