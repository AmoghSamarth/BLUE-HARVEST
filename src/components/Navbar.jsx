import React from 'react';
import { Smartphone, Monitor, Tablet, Fish, Sparkles, HelpCircle, CheckCircle } from 'lucide-react';

export default function Navbar({ 
  viewMode, 
  setViewMode, 
  isLoggedIn, 
  onLogout,
  onOpenHelp 
}) {
  return (
    <header className="top-global-navbar" role="banner">
      <div className="navbar-container">
        {/* Brand / Logo */}
        <div className="brand-group">
          <div className="brand-pill">
            <span className="brand-icon-wrapper">
              <Fish size={18} className="brand-fish-icon" />
            </span>
            <span className="brand-title">Blue Harvest</span>
            <span className="brand-tag">v2.4 Live</span>
          </div>

          <div className="system-status desktop-only">
            <span className="status-dot"></span>
            <span className="status-label">AI Spawn Counter: <strong>Active</strong></span>
          </div>
        </div>

        {/* Viewport switcher & Tools for testing responsiveness */}
        <div className="controls-group">
          <div className="device-switcher" role="group" aria-label="Device Preview Modes">
            <button
              type="button"
              className={`device-btn ${viewMode === 'mobile' ? 'active' : ''}`}
              onClick={() => setViewMode('mobile')}
              title="Mobile Phone View (390px)"
              aria-label="Mobile Phone View"
            >
              <Smartphone size={16} />
              <span className="btn-text">Mobile View</span>
            </button>

            <button
              type="button"
              className={`device-btn ${viewMode === 'tablet' ? 'active' : ''}`}
              onClick={() => setViewMode('tablet')}
              title="Tablet View (768px)"
              aria-label="Tablet View"
            >
              <Tablet size={16} />
              <span className="btn-text">Tablet</span>
            </button>

            <button
              type="button"
              className={`device-btn ${viewMode === 'fluid' ? 'active' : ''}`}
              onClick={() => setViewMode('fluid')}
              title="Fluid Fullscreen View"
              aria-label="Fluid Responsive Desktop View"
            >
              <Monitor size={16} />
              <span className="btn-text">Fluid Responsive</span>
            </button>
          </div>

          {/* Action buttons */}
          <div className="nav-actions">
            {isLoggedIn ? (
              <button 
                type="button" 
                className="nav-action-btn logout-btn"
                onClick={onLogout}
              >
                Sign Out
              </button>
            ) : (
              <button 
                type="button" 
                className="nav-action-btn help-btn"
                onClick={onOpenHelp}
                title="About Blue Harvest for Fish Farmers"
              >
                <HelpCircle size={17} />
                <span className="help-text">Guide</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
