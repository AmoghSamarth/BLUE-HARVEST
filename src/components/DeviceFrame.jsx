import React from 'react';
import { Smartphone, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function DeviceFrame({ 
  viewMode, 
  children 
}) {
  return (
    <div className={`responsive-viewport-canvas mode-${viewMode}`}>
      {viewMode === 'mobile' ? (
        <div className="art-direction-stage">
          {/* Left / Ambient Showcase on desktop */}
          <div className="desktop-showcase-panel">
            <div className="showcase-badge">
              <Sparkles size={16} className="sparkle-icon" />
              <span>Next-Gen Aquaculture</span>
            </div>
            <h2 className="showcase-title">
              Instant Fish Fry Counting With AI Precision
            </h2>
            <p className="showcase-desc">
              Blue Harvest transforms standard smartphone cameras into automated hatchery counters, eliminating manual labor and reducing fry mortality.
            </p>

            <div className="showcase-feature-list">
              <div className="feature-item">
                <CheckCircle2 size={18} className="feat-check" />
                <div>
                  <strong>Real-time Spawn Detection:</strong> Sub-second fry identification even in turbulent nursery water.
                </div>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={18} className="feat-check" />
                <div>
                  <strong>99.4% Counting Accuracy:</strong> Trained on over 2.5M carp, tilapia, and salmon fingerling samples.
                </div>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={18} className="feat-check" />
                <div>
                  <strong>Offline Field Ready:</strong> Works directly on mobile devices with zero internet needed at pond side.
                </div>
              </div>
            </div>

            <div className="device-spec-chip">
              <Smartphone size={16} />
              <span>Previewing: Native Mobile App Shell (390px × 844px)</span>
            </div>
          </div>

          {/* Smartphone Hardware Frame */}
          <div className="smartphone-outer-chassis">
            {/* Dynamic Island / Speaker Notch */}
            <div className="smartphone-top-bezel">
              <div className="dynamic-island">
                <div className="camera-dot"></div>
                <div className="sensor-bar"></div>
              </div>
            </div>

            {/* Hardware Side Buttons */}
            <div className="hw-button volume-up"></div>
            <div className="hw-button volume-down"></div>
            <div className="hw-button power-btn"></div>

            {/* Phone Screen Screen Glass */}
            <div className="smartphone-screen-glass">
              {children}
            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="smartphone-home-bar-wrapper">
              <div className="smartphone-home-bar"></div>
            </div>
          </div>
        </div>
      ) : viewMode === 'tablet' ? (
        <div className="tablet-frame-wrapper">
          <div className="tablet-chassis">
            <div className="tablet-screen">
              {children}
            </div>
          </div>
        </div>
      ) : (
        /* Fluid Responsive View */
        <div className="fluid-responsive-canvas">
          <div className="fluid-content-card">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
