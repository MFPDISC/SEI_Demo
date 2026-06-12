import React, { useState } from 'react';
import { Home } from './Home';
import '../styles/dashboard.css';

export const Dashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="dashboard">
      <div className="dashboard-tabs">
        <button
          className={`tab-button ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          Home
        </button>
        <button
          className={`tab-button ${activeTab === 'watchlist' ? 'active' : ''}`}
          onClick={() => setActiveTab('watchlist')}
        >
          My Watchlist
        </button>
        <button
          className={`tab-button ${activeTab === 'subscription' ? 'active' : ''}`}
          onClick={() => setActiveTab('subscription')}
        >
          Subscription
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'home' && <Home user={user} />}

        {activeTab === 'watchlist' && (
          <div className="tab-pane">
            <h2>My Watchlist</h2>
            <div className="empty-state">
              <div className="empty-icon">WATCH</div>
              <h3>Your watchlist is empty</h3>
              <p>Browse events and add them to your watchlist to watch later</p>
            </div>
          </div>
        )}

        {activeTab === 'subscription' && (
          <div className="tab-pane">
            <h2>Subscription Plans</h2>
            <div className="plans-grid">
              <div className="plan-card">
                <h3>Free</h3>
                <div className="price"><span className="amount">R0</span><span className="period">/month</span></div>
                <p className="plan-description">Perfect for casual viewers</p>
                <ul className="features-list">
                  <li><span className="check">✓</span> Access to free content</li>
                  <li><span className="check">✓</span> Standard quality (480p)</li>
                  <li><span className="check">✓</span> Limited ads</li>
                </ul>
                <button className="btn-plan" disabled>Current Plan</button>
              </div>

              <div className="plan-card">
                <h3>Standard</h3>
                <div className="price"><span className="amount">R29</span><span className="period">/month</span></div>
                <p className="plan-description">For sports enthusiasts</p>
                <ul className="features-list">
                  <li><span className="check">✓</span> Access to all content</li>
                  <li><span className="check">✓</span> HD streaming (1080p)</li>
                  <li><span className="check">✓</span> Ad-free experience</li>
                  <li><span className="check">✓</span> Watch on 2 devices</li>
                </ul>
                <button className="btn-plan">Upgrade to Standard</button>
              </div>

              <div className="plan-card highlighted">
                <div className="popular-badge">Popular</div>
                <h3>Premium</h3>
                <div className="price"><span className="amount">R89</span><span className="period">/month</span></div>
                <p className="plan-description">For ultimate sports fans</p>
                <ul className="features-list">
                  <li><span className="check">✓</span> Everything in Standard</li>
                  <li><span className="check">✓</span> 4K Ultra HD streaming</li>
                  <li><span className="check">✓</span> Watch on 4 devices</li>
                  <li><span className="check">✓</span> Download for offline viewing</li>
                </ul>
                <button className="btn-plan">Upgrade to Premium</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
