import React, { useState, useRef } from 'react';
import { 
  Bell, 
  User, 
  Image as ImageIcon, 
  Camera, 
  Video, 
  ChevronRight, 
  Settings, 
  BarChart3, 
  Sprout, 
  Home, 
  FileText, 
  BarChart2, 
  X, 
  CheckCircle2, 
  RefreshCw,
  LogOut,
  Sliders,
  Check
} from 'lucide-react';

export default function HomePage({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('home');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [scanningImage, setScanningImage] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // Notifications list
  const notifications = [
    { id: 1, title: 'Batch #4028 Verified', desc: '487 fry counted with 99.2% accuracy', time: '10m ago' },
    { id: 2, title: 'Hatchery Sync Complete', desc: 'Ledger exported to Pond Delta #4 database', time: '2h ago' },
    { id: 3, title: 'AI Model Updated', desc: 'YOLOv8-Fry v3.4 optimized for fingerlings', time: '1d ago' },
  ];

  // History list
  const historyItems = [
    { id: 'BAT-4028', date: 'Today, 4:15 PM', count: 487, density: '44 fry/cm²', pond: 'Pond Delta #4' },
    { id: 'BAT-4027', date: 'Today, 11:30 AM', count: 712, density: '68 fry/cm²', pond: 'Nursery Tray #2' },
    { id: 'BAT-4026', date: 'Yesterday, 5:20 PM', count: 320, density: '29 fry/cm²', pond: 'Fingerling Tank A' },
  ];

  const handleImageSelected = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setScanningImage(url);
      runAiScan();
    }
  };

  const runAiScan = () => {
    setIsAnalyzing(true);
    setScanResult(null);
    setTimeout(() => {
      setIsAnalyzing(false);
      const randomCount = Math.floor(Math.random() * 250) + 380;
      setScanResult({
        count: randomCount,
        confidence: '99.4%',
        density: `${Math.round(randomCount / 11)} fry/cm²`,
        avgLength: '4.6 mm',
        vigorIndex: 'Optimal Vigor',
      });
    }, 1200);
  };

  return (
    <div className="home-screen-wrapper">
      {/* Hidden File / Camera Inputs */}
      <input 
        type="file" 
        ref={fileInputRef} 
        accept="image/*" 
        style={{ display: 'none' }}
        onChange={handleImageSelected} 
      />
      <input 
        type="file" 
        ref={cameraInputRef} 
        accept="image/*" 
        capture="environment"
        style={{ display: 'none' }}
        onChange={handleImageSelected} 
      />

      {/* Main Scrollable Content */}
      <div className="home-scroll-container">
        {/* Top Header Bar */}
        <header className="home-header">
          <div className="home-brand">
            <div className="home-logo-circle" aria-label="Blue Harvest Logo">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <path d="M4 16 C8 8, 16 6, 22 10 L28 6 V26 L22 22 C16 26, 8 24, 4 16 Z" fill="#FFFFFF"/>
                <circle cx="10" cy="14" r="2" fill="#2F6BFF"/>
              </svg>
            </div>
            <span className="home-brand-title">Blue Harvest</span>
          </div>

          <div className="home-header-actions">
            <button 
              type="button" 
              className="icon-action-btn notif-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
            >
              <Bell size={20} className="header-action-icon" />
              <span className="notif-red-dot"></span>
            </button>

            <button 
              type="button" 
              className="icon-action-btn avatar-btn"
              onClick={() => setShowProfileModal(true)}
              aria-label="User Profile"
            >
              <User size={20} className="header-action-icon" />
            </button>
          </div>
        </header>

        {activeTab === 'home' && (
          <>
            {/* Hero Section with Tub Image Blend */}
            <section className="home-hero-section">
              <div className="hero-text-content">
                <h1 className="hero-heading">
                  Count Fish<br />
                  Fingerlings <span className="highlight-blue">Easily</span>
                </h1>
                <p className="hero-subtext">
                  Upload a photo or use your camera to get an accurate count of fish fingerlings and fry.
                </p>
              </div>

              {/* Top-Right Circular Tub with Fish Fry Swimming */}
              <div className="hero-tub-illustration" aria-hidden="true">
                <div className="tub-outer-rim">
                  <div className="tub-water-surface">
                    {/* Realistic Fry Particles in Basin */}
                    <div className="fry-particles-group">
                      {[...Array(38)].map((_, i) => (
                        <div 
                          key={i} 
                          className="fry-particle"
                          style={{
                            top: `${12 + (i * 23) % 72}%`,
                            left: `${14 + (i * 31) % 74}%`,
                            transform: `rotate(${((i * 47) % 360)}deg)`,
                            animationDelay: `${(i * 0.18)}s`
                          }}
                        ></div>
                      ))}
                    </div>
                    {/* Basin Water Ripple Lighting */}
                    <div className="water-glare-ring"></div>
                  </div>
                </div>
              </div>

              {/* Subtle wave curve at the base of hero */}
              <div className="hero-wave-divider">
                <svg viewBox="0 0 420 40" preserveAspectRatio="none">
                  <path d="M0,25 C120,40 280,10 420,28 L420,40 L0,40 Z" fill="#FFFFFF"/>
                </svg>
              </div>
            </section>

            {/* Primary Action Cards Grid (Upload Image & Use Camera) */}
            <section className="action-cards-grid">
              {/* Upload Image Card */}
              <div 
                className="action-card upload-card"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                role="button"
                tabIndex={0}
              >
                <div className="card-top-row">
                  <div className="card-icon-badge blue-badge">
                    <ImageIcon size={24} className="card-icon" />
                  </div>
                  <ChevronRight size={20} className="card-chevron blue-chevron" />
                </div>
                <div className="card-text-block">
                  <h2 className="card-title">Upload Image</h2>
                  <p className="card-subtitle">From gallery or files</p>
                </div>
              </div>

              {/* Use Camera Card */}
              <div 
                className="action-card camera-card"
                onClick={() => cameraInputRef.current && cameraInputRef.current.click()}
                role="button"
                tabIndex={0}
              >
                <div className="card-top-row">
                  <div className="card-icon-badge green-badge">
                    <Camera size={24} className="card-icon" />
                  </div>
                  <ChevronRight size={20} className="card-chevron green-chevron" />
                </div>
                <div className="card-text-block">
                  <h2 className="card-title">Use Camera</h2>
                  <p className="card-subtitle">Take a photo now</p>
                </div>
              </div>
            </section>

            {/* Video Counting Card (Full Width) */}
            <section className="secondary-action-section">
              <div className="action-card video-card">
                <div className="video-card-left">
                  <div className="card-icon-badge amber-badge">
                    <Video size={24} className="card-icon" />
                  </div>
                  <div className="video-text-block">
                    <h2 className="card-title">Video Counting</h2>
                    <span className="coming-soon-tag">Coming Soon</span>
                  </div>
                </div>
                <ChevronRight size={20} className="card-chevron gray-chevron" />
              </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works-section">
              <h2 className="section-title">How It Works</h2>
              
              <div className="steps-flow-container">
                {/* Step 1 */}
                <div className="step-flow-item">
                  <div className="step-circle-wrapper">
                    <span className="step-counter-badge">1</span>
                    <div className="step-icon-circle">
                      <ImageIcon size={26} className="step-icon" />
                    </div>
                  </div>
                  <h3 className="step-title">Upload or Capture</h3>
                  <p className="step-desc">Take a photo or choose an image</p>
                </div>

                {/* Connecting Arrow */}
                <div className="step-arrow-divider" aria-hidden="true">
                  <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
                    <path d="M1 8H24M24 8L18 2M24 8L18 14" stroke="#93C5FD" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Step 2 */}
                <div className="step-flow-item">
                  <div className="step-circle-wrapper">
                    <span className="step-counter-badge">2</span>
                    <div className="step-icon-circle">
                      <Settings size={26} className="step-icon" />
                    </div>
                  </div>
                  <h3 className="step-title">AI Processing</h3>
                  <p className="step-desc">Our system analyzes the image</p>
                </div>

                {/* Connecting Arrow */}
                <div className="step-arrow-divider" aria-hidden="true">
                  <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
                    <path d="M1 8H24M24 8L18 2M24 8L18 14" stroke="#93C5FD" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Step 3 */}
                <div className="step-flow-item">
                  <div className="step-circle-wrapper">
                    <span className="step-counter-badge">3</span>
                    <div className="step-icon-circle">
                      <BarChart3 size={26} className="step-icon" />
                    </div>
                  </div>
                  <h3 className="step-title">Get Count</h3>
                  <p className="step-desc">View the estimated fingerling count</p>
                </div>
              </div>
            </section>

            {/* Supporting Sustainable Aquaculture Banner */}
            <section className="sustainability-banner">
              <div className="banner-content">
                <div className="banner-sprout-badge">
                  <Sprout size={24} className="sprout-icon" />
                </div>
                <div className="banner-text">
                  <h3 className="banner-heading">Supporting Sustainable Aquaculture</h3>
                  <p className="banner-subtext">For healthier farms and brighter tomorrows.</p>
                </div>
              </div>

              {/* Landscape Illustration Artwork (Pond, Trees, Hills, Clouds) */}
              <div className="banner-artwork" aria-hidden="true">
                <svg viewBox="0 0 240 120" preserveAspectRatio="none">
                  {/* Sky Clouds */}
                  <path d="M60 25 C65 18 78 18 84 25 C90 22 100 26 102 32 H54 C54 28 56 24 60 25 Z" fill="#FFFFFF" opacity="0.8"/>
                  <path d="M160 18 C164 12 176 12 181 18 C186 15 194 19 196 24 H154 C154 20 156 17 160 18 Z" fill="#FFFFFF" opacity="0.8"/>
                  
                  {/* Background Soft Blue Mountains */}
                  <path d="M90 60 Q140 30 190 60 L240 65 V120 H90 Z" fill="#B9D5FA" opacity="0.6"/>
                  
                  {/* Rolling Green Hills */}
                  <path d="M80 80 Q130 50 180 75 Q210 65 240 70 V120 H80 Z" fill="#58B27B"/>
                  
                  {/* Tree Foliage */}
                  <circle cx="160" cy="55" r="16" fill="#3D9962"/>
                  <circle cx="180" cy="50" r="18" fill="#2E8550"/>
                  <circle cx="205" cy="53" r="17" fill="#3D9962"/>
                  <circle cx="225" cy="56" r="15" fill="#2E8550"/>
                  <circle cx="140" cy="62" r="12" fill="#4AA86F"/>

                  {/* Water Pond in Foreground */}
                  <path d="M95 120 Q120 78 170 82 Q220 86 240 95 V120 H95 Z" fill="#60A5FA"/>
                  <path d="M125 120 Q150 92 195 95 Q225 98 240 105 V120 H125 Z" fill="#38BDF8"/>
                  <path d="M100 82 Q125 76 168 80 Q215 84 240 92" stroke="#A7F3D0" strokeWidth="3" fill="none"/>
                </svg>
              </div>
            </section>
          </>
        )}

        {/* History Tab View */}
        {activeTab === 'history' && (
          <section className="history-tab-content">
            <h2 className="section-title">Counting History</h2>
            <div className="history-cards-list">
              {historyItems.map((item) => (
                <div key={item.id} className="history-card">
                  <div className="history-card-header">
                    <span className="history-id">{item.id}</span>
                    <span className="history-date">{item.date}</span>
                  </div>
                  <div className="history-card-body">
                    <div className="history-count-badge">
                      <span className="count-num">{item.count}</span>
                      <span className="count-label">Fingerlings</span>
                    </div>
                    <div className="history-details">
                      <div className="detail-item"><strong>Pond:</strong> {item.pond}</div>
                      <div className="detail-item"><strong>Density:</strong> {item.density}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Reports Tab View */}
        {activeTab === 'reports' && (
          <section className="reports-tab-content">
            <h2 className="section-title">Hatchery Reports</h2>
            <div className="report-summary-card">
              <div className="summary-stat-row">
                <div className="summary-stat">
                  <span className="stat-title">Total Fry Counted</span>
                  <span className="stat-value">12,480</span>
                </div>
                <div className="summary-stat">
                  <span className="stat-title">Avg Accuracy</span>
                  <span className="stat-value highlight">99.4%</span>
                </div>
              </div>
              <div className="report-progress-bar">
                <div className="progress-fill" style={{ width: '84%' }}></div>
              </div>
              <span className="progress-caption">Monthly Nursery Target: 84% Achieved</span>
            </div>
          </section>
        )}

        {/* Profile Tab View */}
        {activeTab === 'profile' && (
          <section className="profile-tab-content">
            <h2 className="section-title">Aquafarm Profile</h2>
            <div className="profile-card-details">
              <div className="profile-avatar-circle">
                <User size={36} className="profile-user-icon" />
              </div>
              <h3 className="profile-user-name">{user?.username || 'samarth_aquafarm'}</h3>
              <p className="profile-user-role">{user?.role || 'Hatchery Manager'}</p>
              <div className="profile-info-grid">
                <div className="profile-info-row">
                  <span>Farm Location</span>
                  <strong>{user?.pondLocation || 'Pond Delta #4, Sector B'}</strong>
                </div>
                <div className="profile-info-row">
                  <span>Detection Engine</span>
                  <strong>YOLOv8-Fry Live v3.4</strong>
                </div>
              </div>
              <button 
                type="button" 
                className="action-btn logout-action-btn"
                onClick={onLogout}
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </div>
          </section>
        )}
      </div>

      {/* Fixed Bottom Navigation Bar */}
      <nav className="home-bottom-nav" role="navigation" aria-label="Bottom Navigation">
        <div className="nav-items-wrapper">
          <button 
            type="button" 
            className={`nav-tab-item ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            <div className="nav-icon-container">
              <Home size={22} className="nav-svg-icon" />
            </div>
            <span className="nav-tab-label">Home</span>
          </button>

          <button 
            type="button" 
            className={`nav-tab-item ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <div className="nav-icon-container">
              <FileText size={22} className="nav-svg-icon" />
            </div>
            <span className="nav-tab-label">History</span>
          </button>

          <button 
            type="button" 
            className={`nav-tab-item ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            <div className="nav-icon-container">
              <BarChart2 size={22} className="nav-svg-icon" />
            </div>
            <span className="nav-tab-label">Reports</span>
          </button>

          <button 
            type="button" 
            className={`nav-tab-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <div className="nav-icon-container">
              <User size={22} className="nav-svg-icon" />
            </div>
            <span className="nav-tab-label">Profile</span>
          </button>
        </div>

        {/* iOS Home Indicator Bar */}
        <div className="home-indicator-pill-bar"></div>
      </nav>

      {/* Notifications Drawer */}
      {showNotifications && (
        <div className="modal-backdrop" onClick={() => setShowNotifications(false)}>
          <div className="notif-drawer-card" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h3 className="drawer-title">Notifications</h3>
              <button 
                type="button" 
                className="drawer-close-btn"
                onClick={() => setShowNotifications(false)}
              >
                <X size={18} />
              </button>
            </div>
            <div className="notif-list">
              {notifications.map((n) => (
                <div key={n.id} className="notif-item">
                  <div className="notif-badge">
                    <CheckCircle2 size={16} className="notif-check" />
                  </div>
                  <div>
                    <strong>{n.title}</strong>
                    <p>{n.desc}</p>
                    <span className="notif-time">{n.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* User Profile Modal */}
      {showProfileModal && (
        <div className="modal-backdrop" onClick={() => setShowProfileModal(false)}>
          <div className="modal-card profile-quick-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              type="button" 
              className="modal-close-btn"
              onClick={() => setShowProfileModal(false)}
            >
              <X size={18} />
            </button>
            <div className="profile-modal-avatar">
              <User size={30} className="header-action-icon" />
            </div>
            <h3 className="profile-modal-name">{user?.username || 'samarth_aquafarm'}</h3>
            <span className="profile-modal-role">{user?.role || 'Hatchery Operator'}</span>
            <div className="profile-modal-info">
              <div><strong>Pond:</strong> {user?.pondLocation || 'Pond Delta #4'}</div>
              <div><strong>Status:</strong> AI Vision Active</div>
            </div>
            <button 
              type="button" 
              className="action-btn logout-btn-modal"
              onClick={() => {
                setShowProfileModal(false);
                onLogout();
              }}
            >
              <LogOut size={16} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}

      {/* AI Scanning Modal Result */}
      {(isAnalyzing || scanResult) && (
        <div className="modal-backdrop">
          <div className="modal-card scan-result-modal">
            {isAnalyzing ? (
              <div className="analyzing-state">
                <div className="scan-radar-spinner">
                  <RefreshCw size={36} className="spin-icon" />
                </div>
                <h3>Analyzing Fish Spawn…</h3>
                <p>Running onboard neural counting algorithm on fingerlings...</p>
              </div>
            ) : (
              <div className="scan-success-content">
                <div className="result-header">
                  <CheckCircle2 size={36} className="success-icon" />
                  <h3>Count Verified!</h3>
                </div>
                <div className="big-count-display">
                  <span className="count-number">{scanResult.count}</span>
                  <span className="count-caption">Fingerlings Detected</span>
                </div>
                <div className="result-metrics-grid">
                  <div className="result-metric-card">
                    <span>Confidence</span>
                    <strong>{scanResult.confidence}</strong>
                  </div>
                  <div className="result-metric-card">
                    <span>Density</span>
                    <strong>{scanResult.density}</strong>
                  </div>
                  <div className="result-metric-card">
                    <span>Avg Length</span>
                    <strong>{scanResult.avgLength}</strong>
                  </div>
                </div>
                <button 
                  type="button" 
                  className="action-btn primary-login-btn close-scan-btn"
                  onClick={() => setScanResult(null)}
                >
                  Save to Hatchery Ledger
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
