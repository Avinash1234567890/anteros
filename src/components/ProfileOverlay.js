// NOTE: Legacy overlay used to block sections until profile completion.
// Left in codebase for reference; no longer applied.
import React from 'react';
import MandatoryProfile from './MandatoryProfile';

const ProfileOverlay = ({ children, showOverlay = false }) => {
  if (!showOverlay) {
    return children;
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Render the component with overlay */}
      <div style={{
        opacity: 0.3,
        pointerEvents: 'none',
        filter: 'blur(2px)'
      }}>
        {children}
      </div>
      
      {/* Overlay content */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          color: '#374151'
        }}>
          <h3 style={{ margin: '0 0 10px 0' }}>Complete Your Profile</h3>
          <p style={{ margin: '0', fontSize: '14px', color: '#6b7280' }}>
            Fill out your profile to access this feature
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverlay;
