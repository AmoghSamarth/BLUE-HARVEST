import React from 'react';
import { X, Fish, Camera, Check, ShieldAlert, Cpu } from 'lucide-react';

export default function HelpModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card help-modal-card" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close guide modal"
        >
          <X size={20} />
        </button>

        <div className="modal-icon-badge">
          <Fish size={26} className="modal-badge-icon" />
        </div>

        <h2 className="modal-title">Blue Harvest Guide</h2>
        <p className="modal-description">
          A mobile-first aquaculture vision system designed for fish farmers, hatcheries, and nursery technicians.
        </p>

        <div className="guide-steps-list">
          <div className="guide-step">
            <div className="step-num">1</div>
            <div className="step-body">
              <strong>Capture Pond Sample</strong>
              <p>Place fry tray under indirect daylight. Ensure 2-3 cm shallow water level for maximum contrast.</p>
            </div>
          </div>

          <div className="guide-step">
            <div className="step-num">2</div>
            <div className="step-body">
              <strong>Instant AI Counting</strong>
              <p>The onboard neural model tags individual fry silhouettes and calculates density in under 600ms.</p>
            </div>
          </div>

          <div className="guide-step">
            <div className="step-num">3</div>
            <div className="step-body">
              <strong>Hatchery Ledger Sync</strong>
              <p>Export certified batch reports for stocking, sales, and feed optimization.</p>
            </div>
          </div>
        </div>

        <button 
          type="button" 
          className="action-btn primary-login-btn"
          onClick={onClose}
        >
          Got It, Let's Count!
        </button>
      </div>
    </div>
  );
}
