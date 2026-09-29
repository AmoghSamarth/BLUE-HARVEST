import React, { useState } from 'react';
import LoginView from './components/LoginView';
import SignUpView from './components/SignUpView';
import HomePage from './components/HomePage';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import './App.css';

export default function App() {
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const initialScreen = searchParams?.get('screen') || 'login';
  const [activeScreen, setActiveScreen] = useState(initialScreen); // 'login' | 'signup' | 'home'
  const [currentUser, setCurrentUser] = useState(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    setActiveScreen('home');
    setNotification(`Welcome back, ${userData.username}!`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSignUpSuccess = (userData) => {
    setCurrentUser(userData);
    setActiveScreen('home');
    setNotification(`Account created for ${userData.username}!`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveScreen('login');
  };

  return (
    <div className={`app-viewport-wrapper screen-${activeScreen}`}>
      <div className={`app-mobile-container mode-${activeScreen}`}>
        {activeScreen === 'login' && (
          <LoginView 
            onLoginSuccess={handleLoginSuccess}
            onSwitchToSignUp={() => setActiveScreen('signup')}
            onForgotPassword={() => setShowForgotModal(true)}
          />
        )}

        {activeScreen === 'signup' && (
          <SignUpView 
            onSignUpSuccess={handleSignUpSuccess}
            onSwitchToLogin={() => setActiveScreen('login')}
          />
        )}

        {activeScreen === 'home' && (
          <HomePage 
            user={currentUser} 
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
