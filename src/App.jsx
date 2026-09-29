import React, { useState } from 'react';
import LoginView from './components/LoginView';
import SignUpView from './components/SignUpView';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import './App.css';

export default function App() {
  const [activeScreen, setActiveScreen] = useState('login'); // 'login' | 'signup'
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleLoginSuccess = (userData) => {
    setNotification(`Welcome back, ${userData.username}!`);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleSignUpSuccess = (userData) => {
    setNotification(`Account created for ${userData.username}!`);
    setActiveScreen('login');
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <div className="app-viewport-wrapper">
      <div className="app-mobile-container">
        {activeScreen === 'login' ? (
          <LoginView 
            onLoginSuccess={handleLoginSuccess}
            onSwitchToSignUp={() => setActiveScreen('signup')}
            onForgotPassword={() => setShowForgotModal(true)}
          />
        ) : (
          <SignUpView 
            onSignUpSuccess={handleSignUpSuccess}
            onSwitchToLogin={() => setActiveScreen('login')}
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
