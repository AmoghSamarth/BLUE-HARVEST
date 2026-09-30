import React from 'react';

/**
 * Dual Fish Yin-Yang SVG Spinner
 * Exact vector recreation of loadingScreenReference.png
 * Features:
 * - Top fish: Blue (#1D70F7) with dorsal fin, eye dot, and caudal fin.
 * - Bottom fish: Mint/Teal Green (#10B981) in 180° rotational symmetry.
 * - Clockwise continuous spinning animation.
 */
export const DualFishSpinner = ({ size = 140, className = '' }) => (
  <div 
    className={`dual-fish-spinner-wrap ${className}`}
    style={{ width: size, height: size }}
    aria-label="Loading animation"
    role="status"
  >
    <svg 
      viewBox="0 0 160 160" 
      width="100%" 
      height="100%" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      {/* Top Blue Fish */}
      <g stroke="#1D70F7" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Main Body Outline & S-curve Belly */}
        <path d="M 58 74 C 55 54, 70 38, 88 38 C 106 38, 120 52, 118 72 C 104 64, 92 68, 80 80 C 72 88, 62 84, 58 74 Z" />
        {/* Dorsal Fin on Top */}
        <path d="M 75 40 C 77 24, 82 22, 85 38" />
        {/* Caudal / Tail Fin on Right */}
        <path d="M 118 72 C 127 78, 131 84, 126 94 C 122 88, 116 84, 110 92 C 111 84, 114 78, 118 72 Z" />
        {/* Eye */}
        <circle cx="67" cy="67" r="2.8" fill="#1D70F7" stroke="none" />
      </g>

      {/* Bottom Mint/Teal Fish (180° Rotational Symmetry) */}
      <g transform="rotate(180 80 80)" stroke="#10B981" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Main Body Outline & S-curve Belly */}
        <path d="M 58 74 C 55 54, 70 38, 88 38 C 106 38, 120 52, 118 72 C 104 64, 92 68, 80 80 C 72 88, 62 84, 58 74 Z" />
        {/* Ventral Fin on Bottom */}
        <path d="M 75 40 C 77 24, 82 22, 85 38" />
        {/* Caudal / Tail Fin on Left */}
        <path d="M 118 72 C 127 78, 131 84, 126 94 C 122 88, 116 84, 110 92 C 111 84, 114 78, 118 72 Z" />
        {/* Eye */}
        <circle cx="67" cy="67" r="2.8" fill="#10B981" stroke="none" />
      </g>
    </svg>
  </div>
);

export default function DualFishLoader({ 
  text = 'Loading...', 
  subtitle = null, 
  size = 140,
  fullScreen = false,
  className = ''
}) {
  const content = (
    <div className={`dual-fish-loading-container ${className}`}>
      <DualFishSpinner size={size} />
      {text && <div className="dual-fish-loading-text">{text}</div>}
      {subtitle && <div className="dual-fish-loading-subtitle">{subtitle}</div>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="dual-fish-fullscreen-overlay">
        {content}
      </div>
    );
  }

  return content;
}
