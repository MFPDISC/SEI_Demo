import React, { useEffect, useRef, useState } from 'react';
import '../styles/videoplayer.css';

export const VideoPlayer = ({ vimeoVideoId, title, isLive, onClose }) => {
  const playerRef = useRef(null);
  const [quality, setQuality] = useState('auto');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // Load Vimeo Player API
    const script = document.createElement('script');
    script.src = 'https://player.vimeo.com/api/player.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.Vimeo && playerRef.current) {
        const player = new window.Vimeo.Player(playerRef.current, {
          id: vimeoVideoId,
          width: '100%',
          responsive: true,
          autoplay: true,
          controls: true,
          quality: quality
        });

        player.on('play', () => setIsPlaying(true));
        player.on('pause', () => setIsPlaying(false));
        player.on('ended', () => setIsPlaying(false));
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [vimeoVideoId, quality]);

  const handleQualityChange = (newQuality) => {
    setQuality(newQuality);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="video-player-overlay" onClick={onClose}>
      <div className="video-player-container" onClick={(e) => e.stopPropagation()}>
        <div className="player-header">
          <div className="player-title-section">
            <h2 className="player-title">{title}</h2>
            {isLive && <span className="live-badge">LIVE</span>}
          </div>
          <button className="close-player" onClick={onClose}>×</button>
        </div>

        <div className="player-wrapper">
          <div ref={playerRef} className="vimeo-player"></div>
        </div>

        <div className="player-controls">
          <div className="quality-selector">
            <span className="control-label">Quality:</span>
            <div className="quality-buttons">
              <button
                className={`quality-btn ${quality === 'auto' ? 'active' : ''}`}
                onClick={() => handleQualityChange('auto')}
              >
                Auto
              </button>
              <button
                className={`quality-btn ${quality === '4k' ? 'active' : ''}`}
                onClick={() => handleQualityChange('4k')}
              >
                4K
              </button>
              <button
                className={`quality-btn ${quality === '1080p' ? 'active' : ''}`}
                onClick={() => handleQualityChange('1080p')}
              >
                1080p
              </button>
              <button
                className={`quality-btn ${quality === '720p' ? 'active' : ''}`}
                onClick={() => handleQualityChange('720p')}
              >
                720p
              </button>
              <button
                className={`quality-btn ${quality === '480p' ? 'active' : ''}`}
                onClick={() => handleQualityChange('480p')}
              >
                480p
              </button>
            </div>
          </div>

          <button className="fullscreen-btn" onClick={toggleFullscreen}>
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        </div>

        <div className="player-info">
          <p className="player-description">
            {isLive
              ? 'You are watching a live stream. Quality may vary based on your internet connection.'
              : 'Use the quality selector to adjust video quality based on your connection speed.'}
          </p>
        </div>
      </div>
    </div>
  );
};
