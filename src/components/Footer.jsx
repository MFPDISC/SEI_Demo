import React from 'react';
import '../styles/footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-brand">SEI<span>.</span></h3>
          <p className="footer-tagline">Sport Entertainment International</p>
          <p className="footer-description">
            Premium sports streaming platform delivering live and on-demand content across Africa and beyond.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Sports</h4>
          <ul className="footer-links">
            <li><a href="#">Football</a></li>
            <li><a href="#">Rugby</a></li>
            <li><a href="#">Cricket</a></li>
            <li><a href="#">Tennis</a></li>
            <li><a href="#">Athletics</a></li>
            <li><a href="#">Basketball</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Platform</h4>
          <ul className="footer-links">
            <li><a href="#">Live Streaming</a></li>
            <li><a href="#">On Demand</a></li>
            <li><a href="#">Highlights</a></li>
            <li><a href="#">Schedule</a></li>
            <li><a href="#">Results</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Company</h4>
          <ul className="footer-links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Partnerships</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Legal</h4>
          <ul className="footer-links">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Cookie Policy</a></li>
            <li><a href="#">Accessibility</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          © 2026 Sport Entertainment International. All rights reserved.
        </p>
        <div className="footer-social">
          <a href="#" className="social-link">Twitter</a>
          <a href="#" className="social-link">Facebook</a>
          <a href="#" className="social-link">Instagram</a>
          <a href="#" className="social-link">YouTube</a>
        </div>
      </div>
    </footer>
  );
};
