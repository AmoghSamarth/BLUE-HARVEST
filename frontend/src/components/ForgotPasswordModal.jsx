import React, { useState } from 'react';
import { X, Mail, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';

export default function ForgotPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setEmail('');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {!isSubmitted ? (
          <>
            <div className="modal-icon-badge">
              <Mail size={26} className="modal-badge-icon" />
            </div>
            <h2 className="modal-title">Reset Password</h2>
            <p className="modal-description">
              Enter your registered email or phone number. We'll send you a 6-digit verification code to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className={`form-group ${error ? 'has-error' : ''}`}>
                <label className="form-label">Email or Mobile Number</label>
                <div className="neumorphic-input-box">
                  <input
                    type="text"
                    className="neumorphic-input"
                    placeholder="farmer@aquatech.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    autoFocus
                  />
                </div>
                {error && <span className="field-error-message">{error}</span>}
              </div>

              <button 
                type="submit" 
                className="action-btn primary-login-btn modal-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="btn-loading-state">
                    <Loader2 size={18} className="spin-icon" />
                    <span>Sending code…</span>
                  </span>
                ) : (
                  <span>Send Recovery Code</span>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="modal-success-state">
            <div className="modal-icon-badge success-badge">
              <CheckCircle2 size={32} className="success-icon" />
            </div>
            <h2 className="modal-title">Code Sent!</h2>
            <p className="modal-description">
              We have sent a verification code to <strong>{email}</strong>. Check your inbox to proceed.
            </p>
            <button 
              type="button" 
              className="action-btn primary-login-btn"
              onClick={handleReset}
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
