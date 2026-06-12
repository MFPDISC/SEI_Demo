import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/home.css';

export const Home = ({ user }) => {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  const [regions, setRegions] = useState([]);
  const [liveEvents, setLiveEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [currentFeatured, setCurrentFeatured] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('live');

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [homepage, live, upcoming] = await Promise.all([
          axios.get('/api/homepage'),
          axios.get('/api/events/live'),
          axios.get('/api/events/upcoming')
        ]);

        setFeatured(homepage.data.featured || []);
        setCategories(homepage.data.categories || []);
        setRegions(homepage.data.regions || []);
        setLiveEvents(live.data.live_events || []);
        setUpcomingEvents(upcoming.data.upcoming_events || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching home data:', error);
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  useEffect(() => {
    if (featured.length === 0) return;

    const interval = setInterval(() => {
      setCurrentFeatured((prev) => (prev + 1) % featured.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [featured.length]);

  const handleNextFeatured = () => {
    setCurrentFeatured((prev) => (prev + 1) % featured.length);
  };

  const handlePrevFeatured = () => {
    setCurrentFeatured((prev) => (prev - 1 + featured.length) % featured.length);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEventIcon = (category) => {
    const icons = {
      'Football': 'FOOT',
      'Cricket': 'CRIC',
      'Rugby': 'RUGY',
      'Tennis': 'TENN',
      'Athletics': 'ATH',
      'Basketball': 'BASK',
      'Hockey': 'HOCK',
      'Volleyball': 'VOLL'
    };
    return icons[category] || 'SPRT';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Football': 'FOOT',
      'Cricket': 'CRIC',
      'Rugby': 'RUGY',
      'Tennis': 'TENN',
      'Athletics': 'ATH',
      'Basketball': 'BASK'
    };
    return icons[category] || 'SPRT';
  };

  const getRegionFlag = (region) => {
    const flags = {
      'Africa': 'AFR',
      'UK': 'UK',
      'Europe': 'EUR',
      'Americas': 'AMR',
      'Asia': 'ASI'
    };
    return flags[region] || 'GLB';
  };

  if (loading) {
    return (
      <div className="home-container">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Secondary Navigation */}
      <div className="secondary-nav">
        <button
          className={`sec-nav-btn ${activeSection === 'live' ? 'active' : ''}`}
          onClick={() => setActiveSection('live')}
        >
          Live Now
        </button>
        <button
          className={`sec-nav-btn ${activeSection === 'fixtures' ? 'active' : ''}`}
          onClick={() => setActiveSection('fixtures')}
        >
          Fixtures
        </button>
        <button
          className={`sec-nav-btn ${activeSection === 'results' ? 'active' : ''}`}
          onClick={() => setActiveSection('results')}
        >
          Results
        </button>
        <button
          className={`sec-nav-btn ${activeSection === 'videos' ? 'active' : ''}`}
          onClick={() => setActiveSection('videos')}
        >
          Videos
        </button>
        <button
          className={`sec-nav-btn ${activeSection === 'news' ? 'active' : ''}`}
          onClick={() => setActiveSection('news')}
        >
          News
        </button>
      </div>

      {/* Featured Carousel */}
      {featured.length > 0 && (
        <div className="featured-carousel">
          {featured.map((event, index) => (
            <div
              key={event.id}
              className={`featured-item ${index === currentFeatured ? 'active' : ''}`}
              style={{
                backgroundImage: `url('${event.thumbnail_url}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="featured-content">
                <span className={`featured-badge ${event.status}`}>
                  {event.status === 'live' ? 'LIVE NOW' : 'COMING SOON'}
                </span>
                <h2 className="featured-title">{event.title}</h2>
                <p className="featured-description">{event.description}</p>
                <div className="featured-meta">
                  <span>{getEventIcon(event.sport_category)} • {event.sport_category}</span>
                  <span>{getRegionFlag(event.region)} • {event.region}</span>
                  <span>{formatDate(event.start_time)}</span>
                </div>
              </div>
              <div className="carousel-controls">
                <button
                  className="carousel-btn"
                  onClick={handlePrevFeatured}
                  aria-label="Previous"
                >
                  ‹
                </button>
                <button
                  className="carousel-btn"
                  onClick={handleNextFeatured}
                  aria-label="Next"
                >
                  ›
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Browse by Category */}
      {categories.length > 0 && (
        <div className="browse-section">
          <div className="section-header">
            <h2 className="section-title">Browse by Sport</h2>
            <a href="#" className="view-all">View All →</a>
          </div>
          <div className="browse-grid">
            {categories.map((category) => (
              <div key={category} className="browse-item">
                <div className="browse-item-content">
                  <div className="browse-item-icon">{getCategoryIcon(category)}</div>
                  <div className="browse-item-name">{category}</div>
                  <div className="browse-item-count">Explore</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Live Events */}
      {liveEvents.length > 0 && (
        <div className="browse-section">
          <div className="section-header">
            <h2 className="section-title">Live Now</h2>
            <a href="#" className="view-all">View All →</a>
          </div>
          <div className="events-grid">
            {liveEvents.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-thumbnail">
                  <span>{getEventIcon(event.sport_category)}</span>
                  <span className="event-status live">Live</span>
                </div>
                <div className="event-info">
                  <span className="event-category">{event.sport_category}</span>
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-description">{event.description}</p>
                  <span className="event-time">{event.region}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <div className="browse-section">
          <div className="section-header">
            <h2 className="section-title">Upcoming Events</h2>
            <a href="#" className="view-all">View All →</a>
          </div>
          <div className="events-grid">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-thumbnail">
                  <span>{getEventIcon(event.sport_category)}</span>
                  <span className="event-status upcoming">Upcoming</span>
                </div>
                <div className="event-info">
                  <span className="event-category">{event.sport_category}</span>
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-description">{event.description}</p>
                  <span className="event-time">{formatDate(event.start_time)}</span>
                  <span className="event-region">{event.region}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Browse by Region */}
      {regions.length > 0 && (
        <div className="browse-section">
          <div className="section-header">
            <h2 className="section-title">Browse by Region</h2>
            <a href="#" className="view-all">View All →</a>
          </div>
          <div className="browse-grid">
            {regions.map((region) => (
              <div key={region} className="browse-item">
                <div className="browse-item-content">
                  <div className="browse-item-icon">{getRegionFlag(region)}</div>
                  <div className="browse-item-name">{region}</div>
                  <div className="browse-item-count">Explore</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="cta-section">
        <h2>Upgrade to Premium</h2>
        <p>Watch in 4K, download episodes, and more. Get 7 days free.</p>
        <button className="cta-button">Explore Plans</button>
      </div>
    </div>
  );
};
