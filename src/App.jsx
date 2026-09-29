import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DeviceFrame from './components/DeviceFrame';
import LoginView from './components/LoginView';
import SignUpView from './components/SignUpView';
import FishCounterDemo from './components/FishCounterDemo';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import HelpModal from './components/HelpModal';
import './App.css';

export default function App() {
  const [viewMode, setViewMode] = useState('mobile');
  const [activeScreen, setActiveScreen] = useState('login'); // 'login' | 'signup' | 'counter'
  const [currentUser, setCurrentUser] = useState(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    setActiveScreen('counter');
  };

  const handleSignUpSuccess = (userData) => {
    setCurrentUser(userData);
    setActiveScreen('counter');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveScreen('login');
  };

  return (
    <div className="app-root-layout">
      {/* Top Navbar with Responsive Art Direction Controls */}
      <Navbar 
        viewMode={viewMode}
        setViewMode={setViewMode}
        isLoggedIn={activeScreen === 'counter'}
        onLogout={handleLogout}
        onOpenHelp={() => setShowHelpModal(true)}
      />

      {/* Main Responsive Stage */}
      <main className="main-content-stage">
        <DeviceFrame viewMode={viewMode}>
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

          {activeScreen === 'counter' && (
            <FishCounterDemo 
              user={currentUser}
              onLogout={handleLogout}
            />
          )}
        </DeviceFrame>
      </main>

      {/* Modals */}
      <ForgotPasswordModal 
        isOpen={showForgotModal}
        onClose={() => setShowForgotModal(false)}
      />

      <HelpModal 
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
      />
    </div>
  );
}
