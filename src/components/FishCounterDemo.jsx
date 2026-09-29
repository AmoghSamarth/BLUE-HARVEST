import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  RefreshCw, 
  CheckCircle, 
  Sliders, 
  Download, 
  LogOut, 
  Layers, 
  Zap, 
  Info,
  Maximize2
} from 'lucide-react';

export default function FishCounterDemo({ user, onLogout }) {
  const [fryCount, setFryCount] = useState(487);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedSample, setSelectedSample] = useState(1);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const videoRef = useRef(null);

  // Simulated fry coordinates for bounding boxes
  const sampleData = {
    1: { count: 487, density: '44 fry/cm²', avgSize: '4.8 mm', status: 'Optimal Vigor' },
    2: { count: 712, density: '68 fry/cm²', avgSize: '3.9 mm', status: 'High Density' },
    3: { count: 320, density: '29 fry/cm²', avgSize: '5.2 mm', status: 'Prime Fingerling' },
  };

  const handleRescan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const nextSample = (selectedSample % 3) + 1;
      setSelectedSample(nextSample);
      setFryCount(sampleData[nextSample].count);
    }, 900);
  };

  const toggleCamera = async () => {
    if (cameraActive) {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
      setCameraActive(false);
    } else {
      try {
        setCameraError(null);
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraActive(true);
      } catch (err) {
        console.warn('Camera access not granted or unavailable:', err);
        setCameraError('Camera access not available in this preview. Using AI aquaculture simulation sample.');
        setTimeout(() => setCameraError(null), 4000);
      }
    }
  };

  return (
    <div className="counter-screen-wrapper">
      {/* Top Header */}
      <div className="counter-app-bar">
        <div className="counter-user-info">
          <div className="avatar-chip">
            {user?.username?.charAt(0)?.toUpperCase() || 'F'}
          </div>
          <div>
            <div className="counter-user-name">{user?.username || 'Aquafarmer'}</div>
            <div className="counter-user-loc">{user?.pondLocation || 'Hatchery Pond #1'}</div>
          </div>
        </div>

        <button 
          type="button" 
          className="counter-logout-btn" 
          onClick={onLogout}
          title="Sign out back to login"
        >
          <LogOut size={16} />
          <span>Exit</span>
        </button>
      </div>

      {/* Main Viewfinder Section */}
      <div className="viewfinder-container">
        <div className="viewfinder-lens">
          {cameraActive ? (
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="live-video-stream"
            />
          ) : (
            <div className={`simulated-tray sample-bg-${selectedSample}`}>
              {/* Aquatic Grid Lines */}
              <div className="hud-grid-overlay"></div>

              {/* AI Bounding Boxes overlay */}
              <div className="ai-boxes-overlay">
                {[...Array(18)].map((_, i) => (
                  <div 
                    key={i} 
                    className="ai-fry-box"
                    style={{
                      top: `${14 + (i * 22) % 68}%`,
                      left: `${10 + (i * 37) % 78}%`,
                      animationDelay: `${i * 0.15}s`
                    }}
                  >
                    <span className="box-tag">Fry #{i + 1} (99%)</span>
                  </div>
                ))}
              </div>

              {/* Live Scan Line */}
              {isScanning && <div className="scanning-laser-bar"></div>}
            </div>
          )}

          {/* HUD Status Badges */}
          <div className="hud-header">
            <span className="hud-badge live-tag">
              <span className="live-dot"></span> LIVE AI VISION
            </span>
            <span className="hud-badge count-tag">
              YOLOv8-Fry v3.2
            </span>
          </div>

          {/* Big HUD Counter in Center */}
          <div className="hud-total-banner">
            <div className="hud-count-value">{fryCount}</div>
            <div className="hud-count-caption">Fish Fry Counted</div>
          </div>

          {/* HUD Corner Accents */}
          <div className="hud-corner top-left"></div>
          <div className="hud-corner top-right"></div>
          <div className="hud-corner bottom-left"></div>
          <div className="hud-corner bottom-right"></div>
        </div>

        {cameraError && (
          <div className="camera-notice-toast">
            <Info size={15} />
            <span>{cameraError}</span>
          </div>
        )}
      </div>

      {/* Telemetry Stats Cards */}
      <div className="stats-metric-grid">
        <div className="metric-chip">
          <span className="metric-title">Density</span>
          <span className="metric-number">{sampleData[selectedSample].density}</span>
        </div>
        <div className="metric-chip">
          <span className="metric-title">Avg Length</span>
          <span className="metric-number">{sampleData[selectedSample].avgSize}</span>
        </div>
        <div className="metric-chip">
          <span className="metric-title">Health State</span>
          <span className="metric-number highlight">{sampleData[selectedSample].status}</span>
        </div>
      </div>

      {/* Controls & Actions */}
      <div className="counter-actions-panel">
        <button 
          type="button" 
          className="counter-action-btn primary-action"
          onClick={handleRescan}
          disabled={isScanning}
        >
          <RefreshCw size={18} className={isScanning ? 'spin-icon' : ''} />
          <span>{isScanning ? 'Analyzing Spawn…' : 'Scan New Tray'}</span>
        </button>

        <button 
          type="button" 
          className={`counter-action-btn secondary-action ${cameraActive ? 'active-cam' : ''}`}
          onClick={toggleCamera}
        >
          <Camera size={18} />
          <span>{cameraActive ? 'Stop Camera' : 'Live Camera'}</span>
        </button>
      </div>

      <div className="batch-save-bar">
        <button 
          type="button" 
          className="save-batch-btn"
          onClick={() => alert(`Batch #${Date.now().toString().slice(-4)} saved: ${fryCount} fry recorded in Hatchery ledger.`)}
        >
          <Download size={16} />
          <span>Save Batch Record to Ledger</span>
        </button>
      </div>
    </div>
  );
}
