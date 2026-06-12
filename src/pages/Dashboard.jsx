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
          className={`tab-button ${activeTab === 'videos' ? 'active' : ''}`}
          onClick={() => setActiveTab('videos')}
        >
          My Videos
        </button>
        <button
          className={`tab-button ${activeTab === 'upload' ? 'active' : ''}`}
          onClick={() => setActiveTab('upload')}
        >
          Upload
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

        {activeTab === 'videos' && (
          <div className="tab-pane">
            <h2>Your Videos</h2>
            <div className="empty-state">
              <div className="empty-icon">VID</div>
              <h3>No videos yet</h3>
              <p>Start by uploading your first sports content</p>
            </div>
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="tab-pane">
            <h2>Upload Sports Content</h2>
            <div className="upload-area">
              <div className="upload-icon">UPLOAD</div>
              <p className="upload-text">
                <strong>Click to upload or drag and drop</strong>
                <br />
                MP4, MKV, WebM up to 5GB
              </p>
            </div>
            {user.plan === 'free' && (
              <div className="plan-limit-warning">
                Free plan: Limited to 1 video. Upgrade to upload more!
              </div>
            )}
          </div>
        )}

        {activeTab === 'subscription' && (
          <div className="tab-pane">
            <h2>Subscription Plans</h2>
            <div className="plans-grid">
              <div className="plan-card">
                <h3>Free</h3>
                <div className="price"><span className="amount">$0</span><span className="period">/month</span></div>
                <p className="plan-description">Perfect for testing</p>
                <ul className="features-list">
                  <li><span className="check">✓</span> 1 video upload</li>
                  <li><span className="check">✓</span> Basic streaming</li>
                  <li><span className="check">✓</span> Standard quality (480p)</li>
                </ul>
                <button className="btn-plan" disabled>Current Plan</button>
              </div>

              <div className="plan-card highlighted">
                <div className="popular-badge">Popular</div>
                <h3>Professional</h3>
                <div className="price"><span className="amount">$29</span><span className="period">/month</span></div>
                <p className="plan-description">For content creators</p>
                <ul className="features-list">
                  <li><span className="check">✓</span> 50 video uploads</li>
                  <li><span className="check">✓</span> HD streaming (1080p)</li>
                  <li><span className="check">✓</span> Advanced analytics</li>
                  <li><span className="check">✓</span> Priority support</li>
                </ul>
                <button className="btn-plan">Upgrade to Pro</button>
              </div>

              <div className="plan-card">
                <h3>Elite</h3>
                <div className="price"><span className="amount">$99</span><span className="period">/month</span></div>
                <p className="plan-description">For sports broadcasters</p>
                <ul className="features-list">
                  <li><span className="check">✓</span> Unlimited uploads</li>
                  <li><span className="check">✓</span> 4K streaming</li>
                  <li><span className="check">✓</span> Live streaming</li>
                  <li><span className="check">✓</span> API access</li>
                </ul>
                <button className="btn-plan">Upgrade to Elite</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
