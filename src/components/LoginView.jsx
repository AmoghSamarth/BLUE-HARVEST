import React, { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export default function LoginView({ 
  onLoginSuccess, 
  onSwitchToSignUp, 
  onForgotPassword 
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ username: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = 'Please enter your username';
    }
    if (!password) {
      newErrors.password = 'Please enter your password';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        username: username.trim(),
        role: 'Hatchery Manager',
        pondLocation: 'Pond Delta #4',
      });
    }, 750);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        username: 'AquaFarmer',
        role: 'Aquaculture Specialist',
        pondLocation: 'Valley Hatchery 2',
      });
    }, 600);
  };

  const fillDemoCredentials = () => {
    setUsername('samarth_aquafarm');
    setPassword('SpawnCounter2026!');
    setErrors({});
  };

  return (
    <div className="login-screen-wrapper">
      {/* Background SVG Organic Waves */}
      <svg 
        className="screen-waves" 
        viewBox="0 0 420 340" 
        preserveAspectRatio="none" 
        aria-hidden="true"
      >
        <path 
          d="M0 80C100 55 170 120 270 115S380 95 420 85V340H0Z" 
          fill="#BED7FF" 
          opacity="0.95"
        />
        <path 
          d="M0 125C95 135 175 185 260 185S380 170 420 165V340H0Z" 
          fill="#7AA6FF" 
        />
        <path 
          d="M0 180C70 195 160 220 250 240S370 275 420 280V340H0Z" 
          fill="#2564F4" 
        />
        <path 
          d="M0 260C80 275 190 288 280 295S380 306 420 308V340H0Z" 
          fill="#0C286D" 
        />
      </svg>

      <div className="login-content-container">
        {/* Blue Harvest Logo Badge */}
        <div className="app-logo-badge" aria-label="Blue Harvest Logo">
          <svg 
            className="fish-swim-icon"
            width="52" 
            height="52" 
            viewBox="0 0 48 48" 
            fill="none"
          >
            {/* Streamlined Fish Silhouette */}
            <path 
              d="M6 24 C12 11, 24 8, 33 13 L42 7 V37 L33 31 C24 36, 12 33, 6 24 Z" 
              fill="#FFFFFF"
            />
            {/* Fish Eye */}
            <circle cx="15" cy="21" r="2.8" fill="#2564F4"/>
          </svg>
        </div>

        {/* Title & Tagline */}
        <h1 className="app-title">Blue Harvest</h1>
        <p className="app-subtitle">Count fish spawn live with your camera</p>

        {/* Main Form */}
        <form className="login-form" onSubmit={handleLogin} noValidate>
          {/* Username Field */}
          <div className={`form-group ${errors.username ? 'has-error' : ''}`}>
            <label htmlFor="username-input" className="form-label">
              Username
            </label>
            <div className="neumorphic-input-box">
              <input
                id="username-input"
                type="text"
                className="neumorphic-input"
                placeholder="Enter your username"
                autoComplete="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errors.username) setErrors(prev => ({ ...prev, username: '' }));
                }}
                disabled={isLoading}
              />
            </div>
            {errors.username && (
              <span className="field-error-message">{errors.username}</span>
            )}
          </div>

          {/* Password Field */}
          <div className={`form-group ${errors.password ? 'has-error' : ''}`}>
            <label htmlFor="password-input" className="form-label">
              Password
            </label>
            <div className="neumorphic-input-box password-box">
              <input
                id="password-input"
                type={showPassword ? 'text' : 'password'}
                className="neumorphic-input"
                placeholder="Enter your password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                }}
                disabled={isLoading}
              />
              <button
                type="button"
                className="eye-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff size={19} className="eye-icon" />
                ) : (
                  <Eye size={19} className="eye-icon" />
                )}
              </button>
            </div>
            {errors.password && (
              <span className="field-error-message">{errors.password}</span>
            )}
          </div>

          {/* Forgot Password link */}
          <div className="forgot-password-row">
            <button
              type="button"
              className="forgot-link"
              onClick={onForgotPassword}
            >
              Forgot password?
            </button>
          </div>

          {/* Primary Log In Button */}
          <button
            type="submit"
            className="action-btn primary-login-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="btn-loading-state">
                <Loader2 size={20} className="spin-icon" />
                <span>Logging in…</span>
              </span>
            ) : (
              <span>Log in</span>
            )}
          </button>
        </form>

        {/* Continue with Google */}
        <button
          type="button"
          className="action-btn google-login-btn"
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          {/* Authentic Google Multi-color G */}
          <svg className="google-icon" width="22" height="22" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z"/>
            <path fill="#FBBC05" d="M10.5 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.9-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.9-6.1z"/>
            <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"/>
          </svg>
          <span className="google-btn-text">Continue with Google</span>
        </button>

        {/* Quick Demo Fill Pill */}
        <div className="demo-credentials-bar">
          <button 
            type="button" 
            className="demo-pill-btn"
            onClick={fillDemoCredentials}
            title="Auto-fill demo test credentials"
          >
            ⚡ Auto-fill Farmer Demo
          </button>
        </div>

        {/* Bottom Section Resting on Wave */}
        <div className="bottom-wave-section">
          <p className="registration-prompt">Not registered yet?</p>
          <button
            type="button"
            className="action-btn signup-switch-btn"
            onClick={onSwitchToSignUp}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
