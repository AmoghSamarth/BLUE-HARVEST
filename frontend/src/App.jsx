import React, { useState, useEffect } from 'react';
import LoginView from './components/LoginView';
import SignUpView from './components/SignUpView';
import HomePage from './components/HomePage';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import './App.css';

/**
 * Parses route info from current browser location.
 * Supports /login, /signup, /home, /count, /pipeline, /history, /reports, /profile
 * and legacy ?screen= query parameter.
 */
function parseRouteFromLocation() {
  if (typeof window === 'undefined') {
    return { screen: 'login', tab: 'home', countTrigger: false };
  }

  const searchParams = new URLSearchParams(window.location.search);
  const screenParam = searchParams.get('screen');

  if (screenParam) {
    return {
      screen: screenParam === 'signup' ? 'signup' : screenParam === 'home' ? 'home' : 'login',
      tab: searchParams.get('tab') || 'home',
      countTrigger: searchParams.get('action') === 'count',
    };
  }

  const rawPath = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';

  if (rawPath === '/signup') {
    return { screen: 'signup', tab: 'home', countTrigger: false };
  }
  if (rawPath === '/login') {
    return { screen: 'login', tab: 'home', countTrigger: false };
  }
  if (rawPath === '/history') {
    return { screen: 'home', tab: 'history', countTrigger: false };
  }
  if (rawPath === '/reports') {
    return { screen: 'home', tab: 'reports', countTrigger: false };
  }
  if (rawPath === '/profile') {
    return { screen: 'home', tab: 'profile', countTrigger: false };
  }
  if (rawPath === '/count' || rawPath === '/pipeline') {
    return { screen: 'home', tab: 'home', countTrigger: true };
  }
  if (rawPath === '/home') {
    return { screen: 'home', tab: 'home', countTrigger: false };
  }

  // Root '/' defaults to 'login' unless a stored session exists
  return { screen: 'login', tab: 'home', countTrigger: false };
}

export default function App() {
  const [route, setRoute] = useState(parseRouteFromLocation);
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('blueharvest_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [autoTriggerCount, setAutoTriggerCount] = useState(route.countTrigger ? Date.now() : null);

  // Sync state on browser back/forward (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const currentRoute = parseRouteFromLocation();
      setRoute(currentRoute);
      if (currentRoute.countTrigger) {
        setAutoTriggerCount(Date.now());
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path, replace = false) => {
    if (typeof window !== 'undefined') {
      if (replace) {
        window.history.replaceState(null, '', path);
      } else {
        window.history.pushState(null, '', path);
      }
    }
    const currentRoute = parseRouteFromLocation();
    setRoute(currentRoute);
    if (currentRoute.countTrigger) {
      setAutoTriggerCount(Date.now());
    }
  };

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    try {
      localStorage.setItem('blueharvest_user', JSON.stringify(userData));
    } catch {
      // ignore storage error
    }
    navigateTo('/home');
    setNotification(`Welcome back, ${userData.username}!`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSignUpSuccess = (userData) => {
    setCurrentUser(userData);
    try {
      localStorage.setItem('blueharvest_user', JSON.stringify(userData));
    } catch {
      // ignore storage error
    }
    navigateTo('/home');
    setNotification(`Account created for ${userData.username}!`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('blueharvest_user');
    } catch {
      // ignore storage error
    }
    navigateTo('/login');
  };

  const handleTabChange = (newTab) => {
    navigateTo(`/${newTab}`);
  };

  const handleCountRequested = () => {
    navigateTo('/count');
  };

  return (
    <div className={`app-viewport-wrapper screen-${route.screen}`}>
      <div className={`app-mobile-container mode-${route.screen}`}>
        {route.screen === 'login' && (
          <LoginView 
            onLoginSuccess={handleLoginSuccess}
            onSwitchToSignUp={() => navigateTo('/signup')}
            onForgotPassword={() => setShowForgotModal(true)}
          />
        )}

        {route.screen === 'signup' && (
          <SignUpView 
            onSignUpSuccess={handleSignUpSuccess}
            onSwitchToLogin={() => navigateTo('/login')}
          />
        )}

        {route.screen === 'home' && (
          <HomePage 
            user={currentUser} 
            activeTab={route.tab}
            onTabChange={handleTabChange}
            onCountRequested={handleCountRequested}
            autoTriggerCount={autoTriggerCount}
            onLogout={handleLogout} 
          />
        )}

        {notification && (
          <div className="app-toast-notification" role="status">
            <span>{notification}</span>
          </div>
        )}
      </div>

      <ForgotPasswordModal 
        isOpen={showForgotModal}
        onClose={() => setShowForgotModal(false)}
      />
    </div>
  );
}
